/**
 * Ranking do Desafio Prompt Injection — backend em Google Apps Script.
 *
 * Como usar:
 * 1. Abra a planilha do ranking no Google Drive.
 * 2. Menu Extensões → Apps Script. Apague o conteúdo e cole este arquivo. Salve.
 * 3. Implantar → Nova implantação → tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa. Implantar.
 * 4. Copie a URL do app da Web (termina em /exec) e coloque no desafio.
 *
 * Antes de cada aula, se quiser zerar o ranking, rode a função limparRanking
 * pelo editor (botão Executar). A planilha guarda todas as tentativas; o
 * ranking mostra o melhor score de cada apelido.
 */

// Vazio quando o script é colado dentro da planilha (Extensões → Apps Script).
// Num projeto avulso, coloque aqui o ID da planilha (o trecho da URL entre /d/ e /edit).
var SHEET_ID = '';
var HEADERS = ['data', 'turma', 'apelido', 'score', 'acertos', 'etapas', 'tempo_seg', 'id_tentativa'];
var MAX_LINHAS_RANKING = 50;
var CACHE_SEGUNDOS = 5;
var APELIDO_OK = /^[A-Za-z0-9À-ÖØ-öø-ÿ ._-]{2,20}$/;

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'ranking') {
    var turma = cleanTurma_(p.turma);
    var cache = CacheService.getScriptCache();
    var chave = 'rk:' + turma;
    var guardado = cache.get(chave);
    if (guardado) return texto_(guardado);
    var corpo = JSON.stringify(ranking_(turma));
    cache.put(chave, corpo, CACHE_SEGUNDOS);
    return texto_(corpo);
  }
  return json_({ ok: true, servico: 'ranking-desafio-prompt-injection' });
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '');
  } catch (err) {
    return json_({ ok: false, error: 'JSON inválido' });
  }
  if (!data || typeof data !== 'object') return json_({ ok: false, error: 'JSON inválido' });

  var nick = cleanNick_(data.nick);
  var total = toInt_(data.total, 1, 50);
  var correct = total === null ? null : toInt_(data.correct, 0, total);
  var seconds = toInt_(data.seconds, 0, 86400);
  var turma = cleanTurma_(data.turma);
  var runId = String(data.runId || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 40);
  if (!nick || total === null || correct === null || seconds === null) {
    return json_({ ok: false, error: 'Dados inválidos' });
  }
  // O score é recalculado aqui, a partir dos acertos, em vez de confiar no valor enviado.
  var score = Math.round((correct / total) * 100);

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, error: 'Servidor ocupado, tente de novo' });
  try {
    var sh = planilha_();
    if (runId && sh.getLastRow() > 1) {
      var ids = sh.getRange(2, 8, sh.getLastRow() - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === runId) return json_({ ok: true, score: score, repetido: true });
      }
    }
    sh.appendRow([new Date(), turma, celulaSegura_(nick), score, correct, total, seconds, runId]);
  } finally {
    lock.releaseLock();
  }
  CacheService.getScriptCache().remove('rk:' + turma);
  return json_({ ok: true, score: score });
}

/** Zera o ranking (mantém o cabeçalho). Rode pelo editor antes da aula, se quiser. */
function limparRanking() {
  var sh = planilha_();
  if (sh.getLastRow() > 1) sh.deleteRows(2, sh.getLastRow() - 1);
}

function ranking_(turma) {
  var sh = planilha_();
  var last = sh.getLastRow();
  if (last < 2) return { ok: true, turma: turma, jogadores: 0, rows: [] };
  var values = sh.getRange(2, 1, last - 1, 8).getValues();
  var melhor = {};
  values.forEach(function (r) {
    if (cleanTurma_(r[1]) !== turma) return;
    var nick = String(r[2]).replace(/^'/, '').trim();
    if (!nick) return;
    var item = {
      nick: nick,
      score: Number(r[3]) || 0,
      correct: Number(r[4]) || 0,
      total: Number(r[5]) || 0,
      seconds: Number(r[6]) || 0,
      at: r[0] instanceof Date ? r[0].getTime() : Number(new Date(r[0])) || 0
    };
    var k = nick.toLowerCase();
    if (!melhor[k] || compara_(item, melhor[k]) < 0) melhor[k] = item;
  });
  var rows = Object.keys(melhor).map(function (k) { return melhor[k]; }).sort(compara_);
  return {
    ok: true,
    turma: turma,
    jogadores: rows.length,
    rows: rows.slice(0, MAX_LINHAS_RANKING).map(function (x) {
      return { nick: x.nick, score: x.score, correct: x.correct, total: x.total, seconds: x.seconds };
    })
  };
}

// Maior score primeiro; empate: menor tempo; depois, quem terminou antes.
function compara_(a, b) {
  return (b.score - a.score) || (a.seconds - b.seconds) || (a.at - b.at);
}

function planilha_() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function cleanNick_(s) {
  var v = String(s || '').replace(/[\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim();
  return APELIDO_OK.test(v) ? v : '';
}

function cleanTurma_(t) {
  var v = String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
  return v || 'geral';
}

function toInt_(v, min, max) {
  var n = Number(v);
  if (!isFinite(n)) return null;
  n = Math.round(n);
  return n < min || n > max ? null : n;
}

// Evita que um apelido começando com = + - @ vire fórmula na planilha.
function celulaSegura_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return texto_(JSON.stringify(obj));
}

function texto_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}
