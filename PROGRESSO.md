# PROGRESSO — Nativa Coop

Protótipo navegável (SvelteKit + TypeScript + Tailwind v4). Dados simulados em `localStorage`.
Rodar: `npm install` · `npm run dev` · build: `npm run build`.

## Decisões tomadas
- **Tailwind v4**: não existe `tailwind.config`; os tokens da paleta (`branco`, `verde`, `verde-escuro`, `marrom`, `marrom-escuro` e derivados) estão em `@theme` em `src/routes/layout.css`.
- **SvelteKit 3**: a config do Svelte fica dentro de `vite.config.ts`. `adapter-static` com fallback SPA e `ssr = false` (tudo roda no navegador, com `localStorage`).
- **Motor genérico de CRUD** (`src/lib/recursos.ts` + `RecursoLista/Form/Detalhe`) para RF01, RF02, RF03, RF07, RF11, RF12 e Compradores. Telas dedicadas para campanhas, pedidos, consolidação, compras, recebimento, estoque, distribuição e comercialização.
- **RN10 (limite por cotas)**: limite do cooperado por insumo = `cotas × limitePorCota` definido em cada item da campanha. Mostra "limite restante" e bloqueia acima dele.
- **RN09**: distribuição só com pedido "Aprovado/Pago". O pagamento é confirmado manualmente pelo Gestor no detalhe do pedido (o sistema não processa pagamento).
- **RN11**: toda entrada (recebimento) e saída (distribuição/ajuste) cria movimentação `MOV-0001…` e atualiza o saldo. A baixa da distribuição ocorre uma única vez (UC10.2; botão desabilitado após confirmar; distribuição concluída não reabre).
- **Contraste dos botões**: `#4F9808` com texto branco dá 3,6:1. Para manter a cor oficial e passar no WCAG AA, o texto dos botões é negrito ≥ 18,7px ("texto grande", exige 3:1). Textos pequenos em verde usam `verde-escuro`; avisos usam o token `aviso-texto` (`#8A5000`) para texto, mantendo `#B26A00` em bordas/ícones.
- **Área do produtor**: início com 4 opções (Fazer pedido, Meus pedidos, Campanhas abertas, Minhas propriedades); Meus dados e Capacidade ficam na barra inferior / em "Meus dados".
- **Imagens**: Unsplash (ver `CREDITOS_IMAGENS.md`). A logo tem muita margem branca; usada sem alteração.
- **Login**: formulário valida CPF/CNPJ/e-mail e senha, mas não autentica de verdade; acesso pelos 3 botões de demonstração.

## Fases
- [x] Fase 1 — Setup (SvelteKit, paleta, fontes, componentes UI, utilitários de CPF/CNPJ/moeda/data)
- [x] Fase 2 — Design system (`/design`), barra A-/A/A+ e alto contraste, skip link, foco visível
- [x] Fase 3 — Landing `/`, login `/login`, proteção de rotas por perfil ("Acesso não permitido")
- [x] Fase 4 — Layout da gestão (sidebar recolhível, topbar) e dashboard `/gestao`
- [x] Fase 5 — Telas da gestão RF01–RF13
- [x] Fase 6 — Área do produtor `/produtor`
- [x] Fase 7 — Estados e feedback (skeleton, vazio, erro 404/500, toast, confirmações, erro no campo)
- [x] Fase 8 — Revisão de qualidade (ver abaixo)
- [x] Fase 9 — `/telas`, `TELAS.md`, `npm run prints`

## Cobertura dos casos de uso
| RF | UC | Rota |
|---|---|---|
| RF01 | UC01.1 / 01.2 / 01.3 | `/gestao/cooperados/nova` · `/:id/editar` · lista e detalhe · `/produtor/dados` |
| RF02 | UC02.1 / 02.2 / 02.3 | `/gestao/propriedades…` · `/produtor/propriedades` |
| RF03 | UC03.1 / 03.2 / 03.3 | `/gestao/capacidade…` · `/produtor/capacidade` |
| RF04 | UC04.1 / 04.2 / 04.3 | `/gestao/campanhas…` · `/produtor/campanhas` |
| RF05 | UC05.1 / 05.2 / 05.3 | `/gestao/pedidos…` · `/produtor/pedido` · `/produtor/pedidos` |
| RF06 / 06.1 | UC06.1–06.3, 06.1.1–06.1.3 | `/gestao/consolidacao…` (+ `/gestao/compras…`) |
| RF07 | UC07.1–07.3 | `/gestao/fornecedores…` |
| RF08 | UC08.1–08.3 | `/gestao/recebimento…` (conferência item a item) |
| RF09 | UC09.1–09.3 | `/gestao/estoque` (saldos + movimentações) e entrada via recebimento |
| RF10 | UC10.1–10.3 | `/gestao/distribuicao…` |
| RF11 | UC11.1–11.3 | `/gestao/producao…` |
| RF12 | UC12.1–12.3 | `/gestao/catalogo…` |
| RF13 | UC13.1–13.3 | `/gestao/comercializacao…` (+ `/gestao/compradores…`) |

Exceções com mensagem na tela: documento inválido/duplicado, cotas inválidas, justificativa de cotas obrigatória, cooperado inativo/inexistente, campos vazios, quantidade zero/negativa, acima do estoque, acima do limite por cotas (RN10), pedido não autorizado (RN09), estoque insuficiente no UC10.1, "sem pedidos para consolidar", divergência de recebimento, erro ao salvar.

## Revisão de qualidade (Fase 8)

### Resultado da Fase 8
- **Rotas testadas** em 390, 768 e 1440px (35 rotas da gestão/públicas + 7 do produtor, por perfil): sem overflow horizontal após correções (`/login` e `/design` no celular foram ajustados).
- **Acessibilidade (axe, WCAG A/AA)**: corrigidos contraste do texto âmbar, dos botões verdes, do item ativo da sidebar e do cartão de destaque do produtor. Sem violações restantes nas rotas varridas.
- **Fluxos verificados com script**: UC10.2 (zero, acima do estoque, baixa única, movimentação MOV-xxxx), RN09 no UC10.1, RN10 no UC05.1, UC01.2 (justificativa obrigatória, resumo, histórico, documento duplicado/inválido). Um bug achado e corrigido: a justificativa de cotas não era validada.
- Todos os UCs da tabela da seção 3 têm tela (ver tabela acima).

### Pendências / limitações conhecidas
- Teclado: foco visível e skip link implementados; não foi feita auditoria manual completa com leitor de tela.
- Login não autentica de verdade (somente botões de demonstração); "esqueci minha senha" é só visual.
- `UC13.3` edita só a situação do pedido (aprovar/cancelar), não os itens.
- Os dados ficam no `localStorage` do navegador; para resetar, limpe os dados do site.
- Imagens: apenas 3 fotos do Unsplash (hero, muda, lavoura); `lavoura.jpg` está baixada mas não usada nas telas.
- `hero.jpg` tem 1,7 MB; comprimir antes de publicar.

## Material para o documento
- `/telas`: índice navegável por RF → UC. `TELAS.md`: lista no formato do grupo (`npm run telas`).
- `npm run prints` (com `npm run dev` ligado): 79 capturas em `prints/` (gestão 1440×900, produtor 390×844).

## Ajustes pós-entrega (prints e UC10.1)
- [x] `scripts/prints.mjs`: contexto com `locale: pt-BR` e `timezoneId: America/Araguaina`. Como o Chromium headless ainda exibe `<input type=date>` como mm/dd/aaaa, o script troca esses campos por texto dd/mm/aaaa só no momento da captura.
- [x] Prints mobile: a barra inferior fixa do produtor recebe `position: static` antes da captura (não aparece mais no meio da página).
- [x] **UC10.1 reescrito** (`/gestao/distribuicao/nova`): sem o campo "Pedido". O usuário informa cooperado, insumo e data; "Continuar" abre o painel de verificação (cooperado e insumo cadastrados, pedido Aprovado/Pago identificado automaticamente, estoque disponível — cada item com ✓ ou mensagem de erro). "Confirmar registro" só aparece quando tudo passa; mudar qualquer campo descarta a verificação. A mensagem de que não há baixa no estoque continua. Verificado: o saldo do estoque não muda ao registrar.
- [x] Tela inicial do produtor (`/produtor`) incluída em `src/lib/telas.ts`, em `TELAS.md` e nos prints.
- [x] Variantes de print:
  - `...-preenchido.png` (15): cooperado, propriedade, capacidade, campanha, pedido, consolidação, fornecedor, recebimento, distribuição (UC10.1 com painel de verificação aprovado), produção, catálogo, comprador, comercialização e pedido do produtor.
  - `...-excecao.png` (6): UC01.1 (CPF inválido), UC05.1 gestão (acima do limite por cotas), UC05.1 produtor (acima do limite), UC10.1 (pedido não autorizado, RN09), UC10.2 (quantidade acima do limite das cotas, RN10) e UC11.1 (cooperado inativo).
- UC10.2 nos prints usa a distribuição #2 (Maria das Dores, limite 24) para o exemplo de exceção do limite por cotas.
- Bug corrigido durante a captura: `/gestao/recebimento/nova?compra=2` quebrava ("Algo deu errado") por um `bind:value` indefinido no campo "Recebido".
