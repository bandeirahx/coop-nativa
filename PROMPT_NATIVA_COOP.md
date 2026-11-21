## ⚠️ Antes de tudo: leia o `skill.md`

1. **Antes de executar qualquer fase, leia o arquivo `skill.md` que está na raiz do projeto** e siga as instruções dele durante todo o trabalho.
2. O `skill.md` define **como trabalhar** (economia de créditos/tokens, forma de responder, leitura de arquivos, etc.). Este prompt define **o que construir**. Se os dois parecerem conflitar, siga o `skill.md` na forma de trabalhar e este prompt no conteúdo (requisitos, telas, regras de negócio).
3. Ao retomar o trabalho em uma nova conversa, leia de novo o `skill.md` e o `PROGRESSO.md` antes de continuar. Não releia este prompt inteiro se não for necessário: consulte só a seção da fase atual.
4. Se o `skill.md` não existir na pasta, avise e siga em frente.

---

## 0. Seu papel

Você é um desenvolvedor front-end sênior. Vai construir o **protótipo navegável de alta fidelidade** de um sistema web para uma cooperativa agrícola. O objetivo principal é ter **telas bonitas, coerentes e completas**, porque o professor vai avaliar os **prints das telas** (eles entram na seção "11. Telas do Software" do documento de requisitos). Não precisa de back-end real: use **dados simulados** guardados em memória e em `localStorage`.

Regras de trabalho:
1. Execute as fases **na ordem**. Ao terminar cada fase, rode o projeto (`npm run dev`) e confira se compila sem erro antes de seguir.
2. Siga sempre as regras do `skill.md`.
3. Mantenha um arquivo `PROGRESSO.md` com um checklist de todas as fases e telas, marcando `[x]` o que foi concluído e anotando decisões tomadas.
4. Siga **exatamente** os nomes de requisitos (RF), casos de uso (UC), atores e regras de negócio (RN) deste documento. Cada tela deve mostrar discretamente o código do caso de uso (ex.: `UC10.1`) no rodapé ou no canto, para facilitar a rastreabilidade.
5. Toda exceção descrita nos casos de uso deve virar uma **mensagem visível na tela** (alerta, toast ou texto de erro no campo). O professor cobra coerência entre caso de uso e tela.
6. Não invente funcionalidades fora do escopo (nada de pagamento online, nota fiscal, chat, app nativo).
7. Código limpo, componentizado, em português nos textos da interface.

---

## 1. Stack

- **SvelteKit** + **TypeScript** + **Tailwind CSS**
- Ícones: `lucide-svelte`
- Sem banco de dados: crie stores em `src/lib/stores/` com dados mock iniciais em `src/lib/mock/` e persistência em `localStorage`.
- Fontes: **Plus Jakarta Sans** (títulos) e **Inter** (corpo), via `@fontsource`. Detalhes na seção 2.

> Se o grupo decidir usar outra stack (React + Vite, HTML/CSS/JS puro), mantenha todas as outras instruções e troque só esta seção.

---

## 2. Contexto do sistema

**Nativa Coop** é um sistema web responsivo de gestão de uma cooperativa agrícola. Ele centraliza 4 grandes processos:
1. **Cadastro** de cooperados, propriedades e capacidade produtiva.
2. **Compra coletiva de insumos**: campanhas → pedidos dos cooperados → consolidação → compra com fornecedor → recebimento → estoque → distribuição.
3. **Produção**: registro da produção disponível dos cooperados.
4. **Comercialização**: catálogo de produtos e pedidos de compradores.

Fornecedores e compradores **não acessam** o sistema; são apenas cadastrados pela equipe.

### Atores (perfis de login)
| Perfil | O que faz |
|---|---|
| **Administrador/Gestor da Cooperativa** | Acesso a tudo. Cadastra, edita, aprova e toma decisões. |
| **Equipe Operacional/Administrativa** | Operação do dia a dia: fornecedores, recebimento, estoque, distribuição, consultas. |
| **Agricultor Cooperado** | Acesso restrito e simplificado: consulta seus dados, suas propriedades, capacidade produtiva e campanhas; faz pedido de insumos. |

### Decisões de interface já tomadas pelo grupo
- **Web responsivo**, um único sistema.
- **Duas áreas**:
  - `/gestao/...` → Administrador/Gestor e Equipe Operacional. Visual mais técnico: sidebar, tabelas, filtros, cards de indicadores.
  - `/produtor/...` → Agricultor Cooperado. Pensada para **celular e para pessoas mais velhas**: letras grandes, botões grandes, poucos itens por tela, ícones com texto, linguagem simples. O produtor pode abrir o link direto da área dele.
- **Acessibilidade é o foco**: botão de aumentar/diminuir fonte, modo alto contraste, foco visível no teclado, `aria-label` em ícones, contraste mínimo WCAG AA, labels em todos os campos.
- **Paleta oficial do grupo** (use só estas cores e as variações indicadas):
  | Token | Cor | Uso |
  |---|---|---|
  | `branco` | `#FFFFFF` | Fundo principal, cards |
  | `verde` | `#4F9808` | Cor da marca: botões principais, destaques, ícones, itens ativos do menu, badges de sucesso |
  | `verde-escuro` | `#3F7A06` | **Texto e links em verde** e hover dos botões (o `#4F9808` sobre branco tem contraste 3,6:1, insuficiente para texto pequeno; o `#3F7A06` tem 5,2:1 e passa no WCAG AA) |
  | `marrom` | `#4E3A3F` | Títulos, textos secundários fortes, sidebar da gestão, botões secundários |
  | `marrom-escuro` | `#281D1E` | Texto principal do corpo, rodapé, cabeçalhos escuros |
  | derivados | tons claros gerados a partir do verde e do marrom (ex.: `#F3F8EC` verde 5%, `#F5F2F2` marrom 5%, bordas `#E7E2E3`) | Fundos de seção, linhas de tabela alternadas, bordas |
  - Cores de estado (erro, aviso) podem ser adicionadas apenas para feedback: erro `#C62828`, aviso `#B26A00`.
  - Botão principal: fundo `#4F9808` com texto branco **em negrito e tamanho ≥ 16px**; no hover/foco, `#3F7A06`.
  - Gere a configuração no `tailwind.config` com esses tokens e não use cores fora dela.
- **Logo oficial**: o arquivo da logo está junto com este prompt na raiz do projeto. Copie para `static/` (ou `src/lib/assets/`) e use em: cabeçalho da landing, tela de login, topbar da gestão, área do produtor e favicon. Não redesenhe nem altere a logo; se precisar de uma versão para fundo escuro, use a mesma imagem sobre um fundo branco/claro arredondado. Se a logo não for encontrada, avise e use um placeholder com o texto "Nativa Coop".

### Direção visual
- **Clean, profissional e responsivo.** Muito espaço em branco, grid consistente (base 8px), cantos levemente arredondados (8–12px), sombras suaves e discretas, bordas finas. Nada de excesso de cores, gradientes chamativos ou elementos decorativos sem função.
- Hierarquia clara: um único botão principal por tela, títulos fortes, textos curtos.
- Inspiração de qualidade: painéis SaaS modernos (estilo Linear, Stripe Dashboard, Vercel) para a gestão, e sites institucionais de cooperativas agro para a landing.
- **Responsivo de verdade**: mobile-first, testando em 390px, 768px e 1440px. Na gestão, sidebar vira menu lateral recolhível no celular e tabelas viram cards empilhados.

### Tipografia
- Títulos: **Plus Jakarta Sans** (600–800), moderna e com personalidade, combina com agro/tecnologia.
- Corpo e interface: **Inter** (400–600), ótima legibilidade em tabelas e formulários.
- Área do produtor: mesma família, porém com corpo mínimo de 18px e altura de linha 1.6.
- Carregue via `@fontsource` (ex.: `@fontsource/plus-jakarta-sans`, `@fontsource/inter`) para não depender de CDN.

### Imagens
- Pode usar imagens da web **gratuitas para uso comercial**, de preferência do **Unsplash** ou **Pexels** (baixe e salve em `static/images/`, não faça hotlink).
- Temas que combinam com o projeto: lavoura de soja/milho, agricultor familiar no campo, mãos segurando sementes ou terra, sacos de insumo/armazém, cooperativa/galpão agrícola, paisagem do cerrado, pôr do sol na lavoura.
- Use as imagens principalmente na **landing page**, no **login** (metade da tela com foto) e no topo da **área do produtor**. Telas internas da gestão ficam sem fotos, só com ícones.
- Trate as imagens para combinar com a paleta: leve sobreposição em `#281D1E` com 40–60% de opacidade quando houver texto por cima; mantenha o mesmo estilo (fotos reais, luz natural, tons quentes e verdes).
- Crie um arquivo `CREDITOS_IMAGENS.md` listando cada imagem usada com o link e o autor.
- Nunca use fotos de pessoas famosas, marcas de outras cooperativas ou imagens com logotipos de terceiros.

---

## 3. Requisitos funcionais, casos de uso e permissões

Legenda de atores: **G** = Administrador/Gestor, **O** = Equipe Operacional/Administrativa, **A** = Agricultor Cooperado.

| RF | Caso de uso | Atores |
|---|---|---|
| **RF01 Gerenciar Cooperados** | UC01.1 Cadastrar Cooperado | G |
| | UC01.2 Editar Cooperado | G |
| | UC01.3 Consultar Cooperado | G, O, A (A vê só os próprios dados) |
| **RF02 Gerenciar Propriedades** | UC02.1 Cadastrar Propriedade | G |
| | UC02.2 Editar Propriedade | G |
| | UC02.3 Consultar Propriedade | G, O, A (só as dele) |
| **RF03 Gerenciar Capacidade Produtiva** | UC03.1 Registrar Capacidade Produtiva | G |
| | UC03.2 Editar Capacidade Produtiva | G |
| | UC03.3 Consultar Capacidade Produtiva | G, O, A (só a dele) |
| **RF04 Gerenciar Campanhas de Compras** | UC04.1 Criar Campanha | G |
| | UC04.2 Editar Campanha | G |
| | UC04.3 Consultar Campanha | G, O, A |
| **RF05 Gerenciar Pedidos de Insumos** | UC05.1 Registrar Pedido de Insumo | G (e A na área do produtor) |
| | UC05.2 Consultar Pedido de Insumo | G, O, A (só os dele) |
| | UC05.3 Editar Pedido de Insumo | G |
| **RF06 Gerenciar Compras Coletivas** | UC06.1 Consolidar Solicitações | G, O |
| | UC06.2 Consultar Solicitações Consolidadas | G, O |
| | UC06.3 Atualizar Consolidação | G, O |
| **RF06.1 Consolidar Pedidos** | UC06.1.1 Identificar Produto · UC06.1.2 Identificar Lista de Pedidos · UC06.1.3 Atualizar Lista de Pedidos | G, O |
| **RF07 Gerenciar Fornecedores** | UC07.1 Cadastrar · UC07.2 Editar · UC07.3 Consultar Fornecedor | G, O |
| **RF08 Gerenciar Recebimento de Insumos** | UC08.1 Registrar Recebimento · UC08.2 Consultar Recebimento · UC08.3 Conferir Insumos Recebidos | G, O |
| **RF09 Gerenciar Estoque** | UC09.1 Registrar Recebimento de Insumo · UC09.2 Consultar Estoque · UC09.3 Atualizar Quantidade em Estoque | G, O |
| **RF10 Gerenciar Distribuição de Insumos** | UC10.1 Registrar Distribuição · UC10.2 Registrar Quantidade Distribuída · UC10.3 Consultar Distribuição | G, O |
| **RF11 Gerenciar Produção** | UC11.1 Cadastrar Produção · UC11.2 Atualizar Produção | G |
| | UC11.3 Consultar Produção | G, O |
| **RF12 Gerenciar Catálogo** | UC12.1 Cadastrar · UC12.2 Atualizar · UC12.3 Consultar Produtos no Catálogo | G, O |
| **RF13 Gerenciar Pedidos de Comercialização** | UC13.1 Registrar Pedido do Comprador · UC13.2 Consultar Pedido · UC13.3 Atualizar Pedido | G, O |

### Regras de negócio que precisam aparecer nas telas
- **Cotas de participação**: todo cooperado tem uma quantidade de cotas. Alterar cotas exige **justificativa** (UC01.2), e o sistema registra quem alterou e quando.
- **RN09 – Liberação de entrega**: só é possível distribuir insumos se houver estoque e o pedido estiver com status **"Aprovado/Pago"** (pagamento confirmado externamente por usuário autorizado; o sistema não processa pagamento).
- **RN10 – Limite por cotas**: a quantidade máxima de insumos que um cooperado pode pedir ou receber numa campanha é **proporcional às cotas dele**. As telas de pedido (UC05.1) e de quantidade distribuída (UC10.2) devem mostrar o **limite restante** e bloquear valores acima dele.
- **RN11 – Movimentação de estoque**: toda entrada (recebimento) e saída (distribuição) gera uma **movimentação de estoque** com identificador único. A tela de estoque deve ter o histórico de movimentações.
- **Distribuição em duas etapas**: UC10.1 registra a distribuição **sem baixar estoque**; UC10.2 registra a quantidade entregue e **dá baixa no estoque uma única vez** (evitar duplicidade).
- **Pedido de comercialização** (RF13) considera a produção disponível menos as quantidades já reservadas em outros pedidos.
- Cooperado pode ser **Pessoa Física (CPF)** ou **Jurídica (CNPJ)**; validar formato e duplicidade.

### Entidades (base para os dados mock e os formulários)
Cooperado (id, tipoPessoa, nome, CPF/CNPJ, telefone, endereço, qtdCotas, status) · Propriedade (id, cooperado, nome, endereço, município, áreaTotal, tipoProdução) · CapacidadeProdutiva (id, propriedade, produto, quantidade, unidadeMedida, período) · CampanhaCompra (id, nome, dataInício, dataFim, status) · PedidoInsumo (id, cooperado, campanha, data, status, valorTotal, itens[insumo, quantidade, valorUnitário, subtotal]) · Insumo (id, nome, descrição, unidadeMedida) · ConsolidaçãoCompra (id, campanha, data, status, itens[insumo, quantidadeTotal]) · Fornecedor (id, nome, CNPJ, telefone, email) · CompraColetiva (id, consolidação, fornecedor, data, status, valorTotal) · Recebimento (id, compra, data, observação, itens[insumo, quantidadeRecebida]) · Estoque (itens[insumo, qtdDisponível, qtdMínima]) · MovimentaçãoEstoque (id, data, tipo entrada/saída, insumo, quantidade, descrição, origem) · Distribuição (id, cooperado, pedido, data, status, observação, itens[insumo, qtdPrevista, qtdDistribuída]) · Produção (id, cooperado, produto, quantidade, unidadeMedida, dataRegistro, status) · ProdutoCatálogo (id, nome, descrição, unidadeMedida, preço, status) · Comprador (id, nome, CPF/CNPJ, telefone, email) · PedidoComercialização (id, comprador, data, status, valorTotal, itens[produto, quantidade, valorUnitário, subtotal]).

Gere dados mock realistas do Tocantins (municípios como Palmas, Porto Nacional, Paraíso do Tocantins, Gurupi; produtos como soja, milho, mandioca, feijão, leite, mel; insumos como sementes, adubo NPK, calcário, defensivo, ração). Pelo menos 8 cooperados, 3 campanhas, 10 pedidos com status variados.

---

## 4. Fases de execução

### Fase 1 — Setup
- Crie o projeto SvelteKit + TS + Tailwind, configure a paleta no `tailwind.config` com os tokens da seção 2 (`branco`, `verde`, `verde-escuro`, `marrom`, `marrom-escuro` e derivados).
- Estrutura: `src/lib/components/ui` (Button, Input, Select, Card, Table, Badge, Modal, Toast, EmptyState, ConfirmDialog, FormField com mensagem de erro), `src/lib/components/layout`, `src/lib/stores`, `src/lib/mock`, `src/lib/utils` (validação de CPF/CNPJ, formatação de moeda e data).
- Crie `PROGRESSO.md` com o checklist completo.

### Fase 2 — Design system e acessibilidade
- Página `/design` mostrando a logo, as cores, tipografia, botões, campos com erro, badges de status (Aberta, Encerrada, Pendente, Aprovado/Pago, Distribuído, Cancelado), tabela e alertas.
- Instale as fontes, salve a logo e as imagens escolhidas. Barra de acessibilidade global: **A- / A / A+**, **alto contraste**, preferência salva em `localStorage`.
- Foco visível, navegação por teclado, `skip to content`.

### Fase 3 — Páginas públicas e login
- `/` **Landing page** institucional da Nativa Coop: herói com logo e chamada, o que a cooperativa faz (os 4 processos), como se tornar cooperado, números de destaque (cooperados, municípios atendidos, toneladas produzidas — mock), rodapé. Inspiração de conteúdo: site da cooperativa COMIGO.
- `/login`: CPF/CNPJ ou e-mail + senha, link "esqueci minha senha" (só visual). Para o protótipo, inclua três botões de **"Entrar como demonstração"** (Gestor, Operacional, Agricultor) que redirecionam para a área certa.
- Proteção de rotas por perfil: usuário sem permissão vê tela "Acesso não permitido".

### Fase 4 — Layout da área de gestão
- Sidebar agrupada: **Cadastros** (Cooperados, Propriedades, Capacidade Produtiva) · **Compras de Insumos** (Campanhas, Pedidos, Consolidação, Fornecedores, Compras Coletivas, Recebimento) · **Estoque e Distribuição** (Estoque, Distribuição) · **Produção e Vendas** (Produção, Catálogo, Compradores, Pedidos de Comercialização).
- Itens da sidebar e botões de ação aparecem conforme o perfil (Operacional não vê "Novo cooperado", por exemplo).
- Topbar com nome do usuário, perfil, barra de acessibilidade e sair.
- `/gestao` **Dashboard**: cards (cooperados ativos, campanhas abertas, pedidos aguardando pagamento, insumos abaixo do mínimo, distribuições pendentes), lista de últimas movimentações e alertas.

### Fase 5 — Telas da gestão (uma por caso de uso)
Para **cada RF** crie: **lista/consulta** (filtros + tabela + estado vazio "nenhum registro encontrado"), **formulário de cadastro**, **formulário de edição** (com resumo das alterações antes de confirmar quando o UC pedir) e **tela de detalhe**. Siga a ordem RF01 → RF13. Pontos de atenção:
- **UC01.1/01.2**: alternar PF/PJ muda a máscara do documento; campo de cotas; ao alterar cotas, campo obrigatório de justificativa; erros: documento inválido, duplicado, cotas inválidas.
- **UC04**: campanha com período, lista de insumos ofertados e status.
- **UC05.1**: escolher campanha aberta e cooperado, adicionar itens, ver **limite restante por cotas (RN10)** e subtotal calculado automaticamente.
- **UC06 / UC06.1**: tela de consolidação que agrupa os pedidos por insumo (UC06.1.1), mostra a lista de pedidos de cada insumo (UC06.1.2) e permite atualizar a lista (UC06.1.3), com total consolidado.
- **UC08.3**: conferência item a item (previsto x recebido) com marcação de divergência.
- **UC09**: tela de estoque com saldo, mínimo, alerta de estoque baixo e aba **Movimentações (RN11)**.
- **UC10.1 Registrar Distribuição**: selecionar cooperado, insumo e data → sistema verifica cadastro, pedido autorizado/pago e estoque → confirmar. Mensagem deixa claro que **ainda não houve baixa no estoque**.
- **UC10.2 Registrar Quantidade Distribuída**: lista de distribuições registradas, selecionar uma, informar quantidade; mostrar **estoque disponível** e **limite restante pelas cotas (RN10)**; erros: pedido não autorizado, quantidade acima do estoque, acima do limite, zero/negativa, erro ao salvar. Ao confirmar, gerar movimentação de saída e baixar estoque uma vez só (desabilitar botão após confirmar).
- **UC10.3 / UC11.3**: consulta com filtros (cooperado, insumo/produto, período).
- **UC11.1/11.2 Produção**: cooperado ativo + produto + quantidade + unidade de medida; erros: cooperado inexistente/inativo, campo vazio, quantidade inválida.
- **UC13.1**: escolher comprador, adicionar produtos do catálogo, mostrar **disponível = produção − reservado**.

### Fase 6 — Área do produtor (`/produtor`)
Mobile-first, letras grandes (mínimo 18px no corpo), botões com altura mínima de 48px, no máximo 4 opções por tela, ícone + texto, linguagem simples ("Meus pedidos" em vez de "Consultar pedido de insumo").
- **Início**: saudação com nome, cotas, botões grandes: Minhas propriedades · Minha produção/capacidade · Campanhas abertas · Fazer pedido · Meus pedidos.
- **Campanhas abertas** (UC04.3) com prazo em destaque.
- **Fazer pedido** (UC05.1) em passos (escolher campanha → escolher insumos → revisar → enviar), mostrando quanto ainda pode pedir pelas cotas.
- **Meus pedidos** (UC05.2) com status em cor + texto + ícone (não só cor).
- **Meus dados** (UC01.3), **Minhas propriedades** (UC02.3), **Capacidade produtiva** (UC03.3), somente leitura.
- Barra inferior de navegação no celular.

### Fase 7 — Estados e feedback
Em todas as telas: loading (skeleton), estado vazio, erro, sucesso (toast), confirmação antes de salvar alterações importantes, validação nos campos com a mensagem embaixo do campo.

### Fase 8 — Revisão de qualidade
- Teste todas as rotas em 1440px, 768px e 390px de largura.
- Verifique contraste e navegação por teclado.
- Confira se cada UC da tabela da seção 3 tem tela e se as mensagens de exceção estão implementadas. Liste no `PROGRESSO.md` qualquer coisa que ficou faltando.

### Fase 9 — Material para o documento
- Crie a rota `/telas` com um índice de todas as telas agrupadas por RF → UC, cada uma com link, para facilitar tirar os prints.
- Crie `TELAS.md` listando, no formato do documento do grupo:
  ```
  RF10: Gerenciar Distribuição de Insumos
  UC10.1: Registrar Distribuição — rota /gestao/distribuicao/nova
  ```
- Se possível, instale o Playwright e crie um script `npm run prints` que abre cada rota em 1440x900 (gestão) e 390x844 (produtor) e salva as capturas em `prints/RFxx_UCxx_nome.png`.

---

## 5. Critérios de pronto
- `npm run dev` roda sem erros nem warnings de acessibilidade do Svelte.
- Todos os UCs da seção 3 têm tela navegável e coerente com o texto do caso de uso.
- Permissões por perfil funcionam no login de demonstração.
- Área do produtor confortável de usar no celular por uma pessoa idosa.
- `PROGRESSO.md`, `TELAS.md` e a pasta `prints/` atualizados.

Comece pela **Fase 1**.