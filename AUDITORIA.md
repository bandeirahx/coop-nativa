# Auditoria — branch feature/estilizacao-interface (estado inicial)

## Arquivos de estilo
- `src/lib/design-tokens.css` — tokens de cor, tipografia, espaçamento, raio, sombra, overlay e textura (única fonte de verdade; ainda incompleta: faltam variáveis usadas pelos componentes, ex. branco, marrom-escuro, verde-claro/escuro, aviso/erro, raio alias `--radius-card`).
- `src/routes/layout.css` — globais, utilitários de texto/bg/borda/spacing, alto contraste, tabelas responsivas, texturas/overlays, logo selo, focus visível. Importava `./design-tokens.css` (caminho errado) e `@fontsource/merriweather` (pacote não instalado).

## Componentes UI (`src/lib/components/ui`)
Button, Card, Table, Modal, FormField, Input, Select, Badge, EmptyState, ConfirmDialog, Toast, Carregar, StatusGrande. Vários usam classes/tokens não definidos (`bg-branco`, `text-branco`, `text-marrom-escuro`, `bg-verde-claro`, `border-verde`, `bg-aviso-claro`, `text-aviso-texto`, `bg-erro-claro`, `text-erro`, `border-dashed`, `--radius-card`, `backdrop:bg-marrom-escuro`).

## Layout (`src/lib/components/layout`)
Topbar, Sidebar, PageHeader, AccessibilityBar, Guard, RecursoLista/Form/Detalhe, PedidoForm, CampanhaForm, GruposConsolidados. Topbar usa textura madeira + overlay cooperados (brief pede terra/lavoura no header). Logo usada como `` direta (risco de halo branco sobre fundos escuros).

## Telas (rotas)
Públicas: `/` (landing), `/login`, `/design`, `/telas`, `+error`.
Gestão: `/gestao` (dashboard), campanhas, pedidos, consolidacao, compras, recebimento, estoque, distribuicao, comercializacao, `[recurso]` (genérico: cooperados, propriedades, capacidade, fornecedores, compradores, catalogo, producao) com nova/editar/detalhe.
Produtor: `/produtor` (início), campanhas, capacidade, dados, pedidos, `[id]`.

## Componentes novo já na branch
`src/lib/components/ui/Logo.svelte` (logo em selo areia/marrom, sem halo branco), texturas WebP em `static/images/textures/webp/{madeira,graos,couro,folhas,fruta,terra}.webp`, hero/lavoura/semente, `static/images/CREDITS.md`.

## Resumo do que será alterado (10 linhas)
1. Completar `design-tokens.css` com todos os tokens usados (branco, marrom-escuro, derivados de verde/aviso/erro, raio alias) sem adicionar cores fora da paleta do brief.
2. Acrescentar classes utilitárias ausentes em `layout.css` e corrigir import do design-tokens e fonte Merriweather.
3. Substituir uso de `img` direto da logo pelo componente `Logo.svelte` (selo areia/marrom, sem halo branco) no header, sidebar, landing e rodapé.
4. Header/topbar: textura de terra/lavoura com overlay escuro em vez de madeira+overlay cooperados.
5. Criar componente de herói por módulo (imagem de textura + overlay do acento 55–80% + blend multiply + grão sutil).
6. Aplicar herói e acento dominante nas telas de cada módulo: Cooperados (terracota/madeira), Compras (ouro/grãos), Estoque (vinho/couro), Comercialização (azul/folhas-fruta).
7. Padronizar componentes de apoio (tabelas, formulários, modais, cards, botões, badges, toast, estados vazios) sobre painéis claros flutuantes, nunca sobre foto.
8. Garantir contraste WCAG AA (texto sobre overlay escuro ou painel translúcido/sólido) e foco visível.
9. Verificar visual em 1440px, 768px e 390px; salvar screenshots antes/depois em `docs/screenshots/`.
10. Rodar `npm run build` e manter todos os casos de uso funcionais (nenhuma funcionalidade quebrada).
