# Desafio Prompt Injection

Desafio interativo de Segurança da Informação sobre **prompt injection**, feito para uso em aula com vários alunos ao mesmo tempo.

1. **Objetivo e Taxonomia de Bloom:** a tela inicial mostra o objetivo do desafio e os níveis da Taxonomia de Bloom Revisada trabalhados. O nível que se deseja alcançar é o **Criar**.
2. **Vídeo de abertura:** um trecho de 55 s (0:10 a 1:05) do vídeo *Is Your LLM safe from prompt injection?*, do canal oficial do Google Cloud, que explica o que é prompt injection com uma analogia e exemplos reais. O vídeo é em inglês, com legenda (dá para traduzir para português nas configurações do player), e a página traz um resumo em português. Ele toca dentro da página.
3. **Apelido:** antes de começar, cada aluno escolhe um apelido (de 2 a 20 caracteres). Há um aviso para não usar dados pessoais.
4. **6 etapas:** cada uma com um tipo de desafio diferente e uma explicação educativa depois de cada resposta.
5. **Score de 0 a 100:** `acertos ÷ 6 × 100`, arredondado. Faixas: 80–100 *Bem defendido*, 50–79 *Em alerta*, 0–49 *Exposto*.
6. **Ranking da turma:** mostra o melhor score de cada apelido. Em caso de empate, fica na frente quem terminou mais rápido. O ranking se atualiza sozinho a cada 15 segundos.

| Etapa | Tipo de desafio | Nível de Bloom |
| --- | --- | --- |
| 1 | Reconheça o ataque (escolha única) | Entender |
| 2 | Ache a injeção (escolher a linha maliciosa de um e-mail) | Aplicar |
| 3 | Verdadeiro ou falso | Analisar |
| 4 | Monte a defesa (múltipla escolha) | Avaliar |
| 5 | Avalie o risco (comparar integrações) | Avaliar |
| 6 | Ordene o fluxo seguro (ordenação) | Criar |

## Instalar no celular ou no computador

Publicado no GitHub Pages, o desafio também pode ser instalado como app (PWA). No Chrome ou no Edge, use o ícone de instalar na barra de endereço. No iPhone, use Safari → Compartilhar → "Adicionar à Tela de Início". Com internet, o app sempre carrega a versão mais nova. Sem internet, abre a última versão guardada, mas o ranking só funciona on-line.

## Endereços úteis em aula

- Desafio: `https://<usuario>.github.io/<repositorio>/`
- Ranking em tela cheia, para projetar no Meet: acrescente `?ranking` ao endereço.
- Ranking separado por turma: acrescente `?turma=nome-da-turma` (por exemplo, `?turma=novembro`). Para ver o ranking dessa turma, use `?turma=novembro&ranking`.

## Ranking compartilhado (planilha Google)

O GitHub Pages só hospeda arquivos. Por isso, o ranking grava as tentativas numa planilha do Google por meio de um pequeno script (`apps-script/Code.gs`). Enquanto o script não estiver configurado, o ranking funciona só no próprio dispositivo de cada aluno.

1. Crie (ou abra) uma planilha do Google para o ranking.
2. Menu **Extensões → Apps Script**. Apague o conteúdo do editor, cole o arquivo `apps-script/Code.gs` e salve.
3. Clique em **Implantar → Nova implantação**. Em "Selecionar tipo", escolha **App da Web**.
4. Configure **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**. Clique em **Implantar** e autorize o acesso. Se o Google mostrar "app não verificado", clique em *Avançado → Acessar*: o script é seu e só mexe nessa planilha.
5. Copie a **URL do app da Web** (termina em `/exec`).
6. No `index.html`, procure `/*RANKING_URL*/` e coloque a URL entre as aspas: `url: 'https://script.google.com/macros/s/.../exec' /*RANKING_URL*/,`.

Para zerar o ranking antes de uma aula, rode a função `limparRanking` no editor do Apps Script. A planilha guarda todas as tentativas (data, turma, apelido, score, acertos, tempo).

**Limites:** o score é calculado no navegador do aluno. O script recalcula o score a partir dos acertos, mas alguém com conhecimento técnico ainda poderia enviar um resultado falso. Para um jogo em aula isso basta; para nota oficial, não.

## Publicar no GitHub Pages

1. Envie para a raiz de um repositório **público** os arquivos `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, `README.md` e as pastas `icons` e `apps-script`.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment → Source**, escolha **Deploy from a branch**. Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.
4. Depois de 1 a 2 minutos, o desafio fica disponível em `https://<usuario>.github.io/<repositorio>/`.

## Editar perguntas e explicações

Todo o conteúdo fica no `<script>` do `index.html`. O objetivo e os níveis de Bloom ficam em `OBJECTIVE` e `BLOOM`. As etapas ficam em `STAGES`: cada etapa tem `title`, `options` (marque a certa com `correct: true`) e `explain` (as partes da explicação). As faixas do score ficam em `LEVELS`.
