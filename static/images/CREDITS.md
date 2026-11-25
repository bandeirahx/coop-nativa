# Créditos de imagens — Nativa Coop

**Regra:** a aplicação usa exclusivamente as fotografias fornecidas pelo usuário para este projeto. Nenhuma imagem foi baixada de bancos externos e nenhuma foto foi substituída por gradiente, padrão CSS ou SVG decorativo.

## Originais

Os 10 JPGs originais foram mantidos em `static/images/novas/raw/`.

| Arquivo | Conteúdo |
|---------|----------|
| `argila.jpg` | Solo de argila avermelhada |
| `colmeia.jpg` | Colmeia de mel em close-up |
| `aneis-arvore.jpg` | Anéis de crescimento de tronco |
| `folhagem.jpg` | Folhagem verde em close-up |
| `madeira-verde.jpg` | Madeira com veios e musgo |
| `veias-folha.jpg` | Veias de folha em tons ocre |
| `folha-verde.jpg` | Folha verde com veias definidas |
| `penas.jpg` | Penas de ave (azul, turquesa, ferrugem) |
| `pelagem.jpg` | Pelagem de felino com rosetas |
| `areia.jpg` | Areia com sulcos formados pelo vento |

## Variantes WebP

Geradas com `sharp` pelo script `scripts/imagens.mjs`:

- `static/images/novas/heroes/*.webp` — 1920 px de largura, qualidade 78 (heroes e fundos de tela).
- `static/images/novas/cards/*.webp` — 800 px de largura, qualidade 78 (cards, painéis e texturas).
- `static/images/novas/logo-selo.png` — logo recortado (transparência preservada) para o selo areia.

## Uso por tela

| Tela / módulo | Foto |
|---------------|------|
| Landing — hero | `heroes/landing.webp` (veias de folha) |
| Landing — galeria | cards das 10 fotografias |
| Login — painel foto | `heroes/login.webp` (madeira verde) |
| Painel / fundo das áreas | `cards/fundo.webp` (madeira verde, overlay escuro) |
| Cooperados | `heroes/cooperados.webp` / `cards/cooperados.webp` (argila) |
| Compras coletivas | `heroes/compras.webp` / `cards/compras.webp` (colmeia) |
| Estoque | `heroes/estoque.webp` / `cards/estoque.webp` (anéis da árvore) |
| Comercialização | `heroes/comercializacao.webp` / `cards/comercializacao.webp` (folhagem) |
| Produtor — muda | `cards/muda.webp` (folha verde) |
| Estados vazios / destaques | `cards/penas.webp`, `cards/pelagem.webp`, `cards/areia.webp` |

Fotos reaproveitadas quando necessário usam `background-position`, `background-size` e overlay diferentes, conforme a identidade de cada módulo.
