# Desafio Prompt Injection

Desafio interativo de Segurança da Informação sobre **prompt injection**, em 6 etapas. Cada etapa tem um tipo de desafio diferente e, depois de cada resposta, aparece uma explicação educativa do item. No fim, a pessoa recebe um **score de segurança de 0 a 100**, calculado pela quantidade de acertos.

| Etapa | Tipo de desafio | Nível de Bloom |
| --- | --- | --- |
| 1 | Reconheça o ataque (escolha única) | Entender |
| 2 | Ache a injeção (escolher a linha maliciosa de um e-mail) | Aplicar |
| 3 | Verdadeiro ou falso | Analisar |
| 4 | Monte a defesa (múltipla escolha) | Avaliar |
| 5 | Avalie o risco (comparar integrações) | Avaliar |
| 6 | Ordene o fluxo seguro (ordenação) | Criar |

**Score:** `acertos ÷ 6 × 100`, arredondado. Faixas: 80–100 *Bem defendido*, 50–79 *Em alerta*, 0–49 *Exposto*.

É um site estático (um único `index.html`, sem servidor e sem dependências para instalar). Nenhuma resposta sai do navegador de quem joga.

## Publicar no GitHub Pages

1. Crie um repositório **público** no GitHub (por exemplo, `desafio-prompt-injection`).
2. Envie para a raiz do repositório os arquivos `index.html`, `.nojekyll` e `README.md`.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**; em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.
5. Depois de 1 a 2 minutos, o desafio fica disponível em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

## Editar perguntas e explicações

Todo o conteúdo fica no início do `<script>` do `index.html`, na lista `STAGES`. Cada etapa tem `title`, `options` (marque a certa com `correct: true`) e `explain` (as partes da explicação). As faixas do score ficam logo abaixo, em `LEVELS`.
