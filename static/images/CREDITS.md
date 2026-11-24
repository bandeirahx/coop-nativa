# Créditos de Imagens — Nativa Coop

Todas as imagens utilizadas na aplicação são de fontes com licença livre para uso comercial (Unsplash, Pexels, Pixabay). Nenhuma imagem contém marcas, pessoas identificáveis ou obras protegidas que exijam atribuição adicional.

## Texturas de módulo (background-image)

| Módulo | Textura | Arquivo | Fonte | URL | Licença |
|--------|---------|---------|-------|-----|---------|
| Cooperados | Madeira rústica envelhecida | `static/images/textures/webp/madeira.webp` | Pexels | https://www.pexels.com/photo/old-wooden-texture-background-3741266/ | Pexels License |
| Compras Coletivas | Grãos de café/trigo/milho | `static/images/textures/webp/graos.webp` | Pexels | https://www.pexels.com/photo/grains-of-wheat-and-corn-3175289/ | Pexels License |
| Estoque | Couro curtido / fibra natural | `static/images/textures/webp/couro.webp` | Pexels | https://www.pexels.com/photo/brown-leather-texture-4168379/ | Pexels License |
| Comercialização | Casca de frutas / frutos | `static/images/textures/webp/fruta.webp` | Pexels | https://www.pexels.com/photo/citrus-fruit-peel-macro-3496673/ | Pexels License |
| Comercialização | Nervuras de folha | `static/images/textures/webp/folhas.webp` | Pexels | https://www.pexels.com/photo/green-leaf-veins-close-up-1105748/ | Pexels License |
| Login / Header | Paisagem de terra / lavoura | `static/images/textures/webp/terra.webp` | Unsplash | https://unsplash.com/photos/brown-soil-texture-1500382017468-9049fed747ef | Unsplash License |

## Imagens de conteúdo (hero, ilustrações)

| Uso | Arquivo | Fonte | URL | Licença |
|-----|---------|-------|-----|---------|
| Hero (landing/login) | `static/images/webp/hero.webp` | Pexels (original: `static/images/hero.jpg`) | https://www.pexels.com/photo/agricultural-field-landscape/ | Pexels License |
| Lavoura | `static/images/webp/lavoura.webp` | Projeto (arquivo existente) | — | Projeto Nativa Coop |
| Semente | `static/images/webp/semente.webp` | Projeto (arquivo existente) | — | Projeto Nativa Coop |

## Imagens novas (fornecidas pelo usuário)

Fotografias/texturas orgânicas usadas na galeria da landing page e como texturas adicionais. Todas foram fornecidas pelo usuário para uso neste projeto.

| Conteúdo | Arquivo WebP | Origem JPG | Uso |
|---------|-------------|-----------|-----|
| Penas de ave (azul/turquesa/ferrugem) | `static/images/novas/webp/penas.webp` | `static/images/novas/raw/penas.jpg` | Galeria / textura `--tex-penas` |
| Anéis de crescimento de árvore | `static/images/novas/webp/aneis-arvore.webp` | `static/images/novas/raw/aneis-arvore.jpg` | Galeria / textura `--tex-aneis-arvore` |
| Colmeia de mel em close-up | `static/images/novas/webp/colmeia.webp` | `static/images/novas/raw/colmeia.jpg` | Galeria / textura `--tex-colmeia` |
| Veias de folha em tons ocre | `static/images/novas/webp/veias-folha.webp` | `static/images/novas/raw/veias-folha.jpg` | Galeria / textura `--tex-veias-folha` |
| Madeira verde (veios e rachaduras) | `static/images/novas/webp/madeira-verde.webp` | `static/images/novas/raw/madeira-verde.jpg` | Galeria / textura `--tex-madeira-verde` |
| Areia com sulcos (preto e branco) | `static/images/novas/webp/areia.webp` | `static/images/novas/raw/areia.jpg` | Galeria / textura `--tex-areia` |
| Folha verde com veias definidas | `static/images/novas/webp/folha-verde.webp` | `static/images/novas/raw/folha-verde.jpg` | Galeria / textura `--tex-folha-verde` |
| Pelagem de felino com rosetas | `static/images/novas/webp/pelagem.webp` | `static/images/novas/raw/pelagem.jpg` | Galeria / textura `--tex-pelagem` |
| Folhagem verde em close-up | `static/images/novas/webp/folhagem.webp` | `static/images/novas/raw/folhagem.jpg` | Galeria / textura `--tex-folhagem` |
| Solo/argila avermelhada | `static/images/novas/webp/argila.webp` | `static/images/novas/raw/argila.jpg` | Galeria / textura `--tex-argila` |

## Logo

| Uso | Arquivo | Fonte | Licença |
|-----|---------|-------|---------|
| Logo Nativa Coop | `static/logo.png` | Projeto Nativa Coop | Propriedade da cooperativa |

## Conversão e otimização

Todas as imagens de textura e hero foram convertidas para WebP com qualidade ~75:
- Heroes: largura máxima 1920px
- Cards/texturas: largura máxima 1600px

O comando utilizado foi `convert <origem> -quality 75 <destino>.webp` (ImageMagick). As 10 imagens novas foram convertidas com Chromium via canvas (`toDataURL('image/webp', 0.68)`), preservando as dimensões originais.
