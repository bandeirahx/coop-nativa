# Design System — Nativa Coop

Documentação da estilização de interface da aplicação Nativa Coop, branch `feature/estilizacao-interface`.

---

## 1. Objetivo

Refazer a estilização da aplicação usando **imagens reais de elementos do agro** (madeira, folhas, grãos, frutos, peles de animais) como base visual — não texturas CSS, não SVG patterns, não gradientes simulando textura. A interface é **viva, colorida e séria**, temática à cooperativa agrícola comunitária, com **alto contraste em relação à logo**, eliminando o fundo branco do PNG.

---

## 2. Paleta de cores

| Uso | Cor | Hex | Aplicação |
|-----|-----|-----|-----------|
| Primária (base da logo) | Verde oliva | `#4A5D23` | Botões primários, títulos, destaques |
| Secundária | Marrom café | `#3E2C1C` | Navegação, bordas, textos secundários |
| Acento 1 | Terracota vivo | `#C4552A` | Estado pendente, avisos |
| Acento 2 | Amarelo-ouro (milho) | `#D9A020` | Módulo de compras/grãos |
| Acento 3 | Vinho (frutos) | `#7A2E2E` | Estado cancelado, frutos |
| Acento 4 | Verde folha vibrante | `#6B8E23` | Módulo de folhas, sucessos |
| Acento 5 | Azul profundo (céu/água) | `#2E4A6B` | Estado aprovado/pago |
| Fundo claro | Areia | `#F5F1E8` | Fundo geral, cards sobrepostos |
| Fundo escuro | Marrom profundo | `#2E241B` | Cabeçalhos, rodapé, sidebar |
| Texto principal | Marrom quase preto | `#2E241B` | Corpo de texto |
| Texto claro | Areia clara | `#F5F1E8` | Texto sobre fundos escuros |

Contraste mínimo WCAG AA garantido em todos os textos e componentes.

---

## 3. Imagens reais de agro (texturas fotográficas)

Todas as imagens são **fotografias reais** obtidas do Pexels (uso comercial gratuito). Não foram usadas texturas CSS, SVG patterns ou `feTurbulence`.

| Módulo | Imagem | Arquivo | Descrição | Licença |
|--------|--------|---------|-----------|---------|
| Cooperados | Madeira | `static/textures/wood-coop.webp` | Textura de madeira rústica escura | Pexels |
| Compras Coletivas | Grãos | `static/textures/grains-purchase.jpg` | Grãos de trigo e milho em close-up | Pexels |
| Estoque | Couro/Pele | `static/textures/leather-stock.jpg` | Textura de couro natural | Pexels |
| Comercialização | Frutos | `static/textures/fruits-sales.jpg` | Cascas de frutas cítricas em macro | Pexels |
| Comercialização | Folhas | `static/textures/leaves-sales.jpg` | Folhas verdes com veias visíveis | Pexels |
| Geral (hero/login) | Lavoura | `static/images/hero.jpg` | Foto de campo agrícola | Projeto |

### Cuidados de licença

- Verificar a licença individual de cada imagem antes de redistribuir isoladamente.
- Não redistribuir o arquivo da imagem isoladamente fora do contexto da aplicação.
- Imagens otimizadas: madeira em WebP (186 KB), demais em JPEG comprimido pelo Pexels.
- `background-size: cover` ou `repeat` conforme o caso.

---

## 4. Integração da logo

A logo (`static/logo.png`) tem fundo transparente (PNG). Para evitar o fundo branco visível:

- Fundo dos locais da logo em **areia** (`#F5F1E8`), **bege** ou **marrom profundo** (`#2E241B`) — nunca branco puro.
- Uso de `mix-blend-mode: multiply` em fundos claros (logo escura sobre fundo claro).
- Uso de `mix-blend-mode: screen` em fundos escuros (logo clara sobre fundo escuro).
- Classe `logo-container` com padding e `border-radius` para integração visual.
- Classe `logo-escuro` para uso sobre fundos marrom profundo.

---

## 5. Tipografia

| Uso | Fonte | Estilo |
|-----|-------|--------|
| Títulos | Merriweather (serif) | 700 (negrito), sóbria |
| Corpo e interface | Inter (sans-serif) | 400/500/600/700, legível |
| Sem | Fontes manuscritas ou infantis |

Fontes carregadas via `@fontsource` em `src/routes/layout.css`.

---

## 6. Componentes estilizados

### Botões
- **Primário**: fundo verde oliva (`#4A5D23`), texto branco, sombra suave.
- **Secundário**: fundo transparente, contorno marrom café, texto marrom profundo.
- **Acento**: fundo terracota (`#C4552A`), texto branco.
- **Grande**: padding aumentado, tamanho de fonte 1.125rem.
- Foco visível com outline azul profundo (`#2E4A6B`).

### Cards
- Cada card recebe uma `textura` opcional (`madeira`, `graos`, `couro`, `frutos`, `folhas`) aplicada como `background-image` real.
- Overlay de cor integrado à paleta para garantir legibilidade.
- Conteúdo sempre sobre camada sólida (`rgba(245, 241, 232, 0.92)`) para contraste AA.

### Campos de formulário
- Label em negrito, marrom profundo.
- Input/select com fundo branco, borda marrom-clara, foco com borda verde oliva e sombra.
- Erros destacados com borda terracota/vermelho e fundo claro de aviso.

### Tabelas
- Cabeçalho em marrom profundo com texto branco.
- Linhas alternadas com fundo areia claro.
- Mobile: linhas viram cards empilhados com rótulo via `data-label`.

### Modais / Confirmações
- Fundo branco com overlay escuro semi-transparente.
- Conteúdo sobre camada sólida para legibilidade.

### Badges / Status
- Cada status tem cor própria: verde (Aberta/Distribuído), terracota (Pendente), azul (Aprovado/Pago), vinho (Cancelado/Encerrada), areia sobre marrom (padrão).

---

## 7. Texturas por módulo

| Módulo | Textura predominante | Acento de cor | Uso visual |
|--------|---------------------|---------------|------------|
| Cooperados | Madeira | Verde oliva | Sidebar, cards de cadastro |
| Compras Coletivas | Grãos | Ouro (`#D9A020`) | Cards de campanhas, consolidação |
| Estoque | Couro/Pele | Marrom café | Cards de estoque, recebimento |
| Comercialização | Frutos / Folhas | Terracota / Verde folha | Cards de produção, catálogo, comercialização |

---

## 8. Responsividade

- Telas ≤639px: tabelas viram cards empilhados, barra inferior do produtor fixa, menus adaptados.
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px).
- Validação em mobile, tablet e desktop.

---

## 9. Acessibilidade

- Contraste mínimo WCAG AA em todos os textos e componentes.
- Foco visível em todos os elementos interativos.
- Skip link para pular conteúdo.
- Barra de acessibilidade (A-/A/A+/alto contraste) em todas as páginas.
- Alto contraste desativa texturas de fundo que prejudiquem leitura.
- Textos sempre sobre camada sólida ou overlay com contraste AA.

---

## 10. Arquivos modificados

- `src/routes/layout.css` — paleta, texturas, tipografia, componentes base
- `src/lib/components/ui/Button.svelte` — botões com nova paleta
- `src/lib/components/ui/Card.svelte` — cards com textura por módulo
- `src/lib/components/ui/Input.svelte` — campos com novo estilo
- `src/lib/components/ui/Select.svelte` — selects com novo estilo
- `src/lib/components/ui/FormField.svelte` — labels e erros
- `src/lib/components/ui/Modal.svelte` — modais com overlay
- `src/lib/components/ui/ConfirmDialog.svelte` — confirmações
- `src/lib/components/ui/Table.svelte` — tabelas responsivas
- `src/lib/components/ui/Badge.svelte` — badges coloridos
- `src/lib/components/ui/StatusGrande.svelte` — status grandes
- `src/lib/components/layout/Sidebar.svelte` — sidebar com textura de madeira
- `src/lib/components/layout/Topbar.svelte` — header com textura
- `src/lib/components/layout/PageHeader.svelte` — cabeçalho de página
- `src/lib/components/layout/AccessibilityBar.svelte` — barra de acessibilidade
- `src/routes/+page.svelte` — landing page estilizada
- `src/routes/login/+page.svelte` — login com textura
- `src/routes/design/+page.svelte` — design system
- `src/routes/gestao/+layout.svelte` — layout de gestão
- `src/routes/produtor/+layout.svelte` — layout do produtor
- `src/routes/produtor/+page.svelte` — início do produtor
- `src/routes/produtor/campanhas/+page.svelte` — campanhas do produtor
- `docs/design-system.md` — este documento

---

## 11. Critérios de aceite

| Critério | Status |
|----------|--------|
| Uso de imagens reais de agro (não texturas CSS/SVG) | ✅ |
| Logo sem fundo branco visível | ✅ |
| Paleta colorida e variada (não restrita a terroso/verde) | ✅ |
| Contraste AA em textos e componentes | ✅ |
| Interface viva, séria e sem elementos infantilizados | ✅ |
| Responsividade validada em mobile, tablet e desktop | ✅ |
| Documentação em `docs/design-system.md` | ✅ |
