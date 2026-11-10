# Desafio Prompt Injection

Aula-desafio de **Segurança da Informação** sobre **prompt injection**, preparada para a segunda avaliação somativa da disciplina Educação em Computação (aula online de 20 a 25 minutos, pelo Google Meet, com ouvintes). O app conduz a aula inteira: abertura com os objetivos da disciplina, 6 atividades de cerca de 3 minutos e fechamento com score e ranking da turma.

## Como a aula funciona

| Momento | Duração | O que acontece |
| --- | --- | --- |
| Abertura | ~2 min | Objetivos da disciplina (Taxonomia de Bloom revisada) e escolha do apelido |
| Atividades 1 a 6 | ~18 min | 6 atividades de ~3 min, com relógio da atividade na tela e explicação educativa após cada resposta |
| Fechamento | ~2 min | Score de 0 a 100, ranking da turma e revisão das explicações |

| Atividade | Tipo | Nível de Bloom | Andaime (ferramenta pedagógica) |
| --- | --- | --- | --- |
| 1. Vídeo + reação | Teórica | Lembrar / Entender | Vídeo em português (Guardsi Cybersecurity, trecho 2:26–4:26) + pergunta + reação no chat |
| 2. Reconheça o ataque | Interativa | Entender | Cartões de resposta |
| 3. Ache a injeção | Interativa | Aplicar | E-mail simulado com linha maliciosa |
| 4. Pesquisa relâmpago | Interativa | Analisar | Artigo real indexado no JCR (Kwon & Pak, 2024, *Electronics*, DOI aberto) |
| 5. Jogo: rodada de defesa (3 rodadas) | Jogo educativo | Avaliar | Quiz com pontos e placar da turma |
| 6. Ordene o fluxo seguro | Interativa | Criar | Ordenação de passos |

**Score:** são 8 desafios nas 6 atividades (a atividade 5 tem 3 rodadas): `acertos ÷ 8 × 100`, arredondado. Faixas: 80–100 *Bem defendido*, 50–79 *Em alerta*, 0–49 *Exposto*. O ranking guarda o melhor score de cada apelido; empate é decidido pelo menor tempo.

## Critérios da avaliação → onde o app atende

| Critério do documento | Como o app atende |
| --- | --- |
| Duração de 20 a 25 min | Cronograma de ~22 min na abertura; relógio de 3 min por atividade |
| Objetivos da disciplina no início, por Bloom | Primeira tela, com os 5 níveis e a atividade que trabalha cada um |
| 6 atividades diferentes, de 3 min cada | Atividades 1–6, formatos distintos, relógio por atividade |
| ≥80% interativas com andaimes; ≤20% teóricas | 5 de 6 interativas (83%); só a Atividade 1 é teórica (17%) |
| 1 pesquisa em fonte confiável (artigo com JCR) | Atividade 4: artigo de Kwon & Pak (2024), *Electronics* (MDPI, JCR), acesso aberto |
| 1 jogo educativo sobre o tema | Atividade 5: quiz em 3 rodadas com pontos e ranking |
| Não ser "só" um formato único | Vídeo, análise de e-mail, pesquisa, jogo, ordenação e chat do Meet |
| Proatividade dos estudantes; ouvintes | Cada atividade pede ação (responder, procurar, ordenar, compartilhar no chat); apelidos sem dados pessoais |
| Tema ≠ 1ª avaliação, ligado à Computação | Prompt injection (a 1ª foi senhas/MFA) |
| Plataforma sem cadastro/download | Roda no navegador; nada para instalar; aviso prévio desnecessário |
| Treinar e cronometrar antes | Dá para ensaiar a aula inteira sozinho; use `?turma=ensaio` para não poluir o ranking |

## Endereços úteis em aula

- Desafio: `https://<usuario>.github.io/<repositorio>/`
- Ranking em tela cheia, para projetar no Meet: acrescente `?ranking` ao endereço.
- Ranking separado por turma: acrescente `?turma=nome-da-turma` (por exemplo, `?turma=novembro`). Para ver o ranking dessa turma, use `?turma=novembro&ranking`.

## Instalar no celular ou no computador

Publicado no GitHub Pages, o desafio também pode ser instalado como app (PWA). No Chrome ou no Edge, use o ícone de instalar na barra de endereço. No iPhone, use Safari → Compartilhar → "Adicionar à Tela de Início". Com internet, o app sempre carrega a versão mais nova. Sem internet, abre a última versão guardada, mas o ranking só funciona on-line.

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

## Editar o conteúdo

Tudo fica no `<script>` do `index.html`: os objetivos da disciplina em `OBJETIVOS`, o resumo das atividades em `ATIVIDADES`, os desafios em `STAGES` (cada um com `title`, `options` — marque a certa com `correct: true` — e `explain`), o vídeo em `VIDEO` e as faixas do score em `LEVELS`.
