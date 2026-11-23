# TELAS — Nativa Coop

Formato do documento do grupo (RF → UC → rota). Gerado por `npm run telas`.


Geral: Páginas públicas e design
—: Landing page — rota /
—: Login — rota /login
—: Design system — rota /design
—: Painel de gestão — rota /gestao
—: Início do produtor — rota /produtor

RF01: Gerenciar Cooperados
UC01.1: Cadastrar Cooperado — rota /gestao/cooperados/nova
UC01.2: Editar Cooperado — rota /gestao/cooperados/1/editar
UC01.3: Consultar Cooperado — rota /gestao/cooperados
UC01.3: Detalhe do Cooperado — rota /gestao/cooperados/1
UC01.3: Meus dados (produtor) — rota /produtor/dados

RF02: Gerenciar Propriedades
UC02.1: Cadastrar Propriedade — rota /gestao/propriedades/nova
UC02.2: Editar Propriedade — rota /gestao/propriedades/1/editar
UC02.3: Consultar Propriedade — rota /gestao/propriedades
UC02.3: Detalhe da Propriedade — rota /gestao/propriedades/1
UC02.3: Minhas propriedades (produtor) — rota /produtor/propriedades

RF03: Gerenciar Capacidade Produtiva
UC03.1: Registrar Capacidade Produtiva — rota /gestao/capacidade/nova
UC03.2: Editar Capacidade Produtiva — rota /gestao/capacidade/1/editar
UC03.3: Consultar Capacidade Produtiva — rota /gestao/capacidade
UC03.3: Capacidade produtiva (produtor) — rota /produtor/capacidade

RF04: Gerenciar Campanhas de Compras
UC04.1: Criar Campanha — rota /gestao/campanhas/nova
UC04.2: Editar Campanha — rota /gestao/campanhas/1/editar
UC04.3: Consultar Campanha — rota /gestao/campanhas
UC04.3: Detalhe da Campanha — rota /gestao/campanhas/1
UC04.3: Campanhas abertas (produtor) — rota /produtor/campanhas

RF05: Gerenciar Pedidos de Insumos
UC05.1: Registrar Pedido de Insumo — rota /gestao/pedidos/nova
UC05.2: Consultar Pedido de Insumo — rota /gestao/pedidos
UC05.2: Detalhe do Pedido — rota /gestao/pedidos/3
UC05.2: Meus pedidos (produtor) — rota /produtor/pedidos
UC05.3: Editar Pedido de Insumo — rota /gestao/pedidos/3/editar

RF06: Gerenciar Compras Coletivas
UC06.1: Consolidar Solicitações — rota /gestao/consolidacao/nova
UC06.2: Consultar Solicitações Consolidadas — rota /gestao/consolidacao
UC06.3: Atualizar Consolidação — rota /gestao/consolidacao/2
UC06.1.1: Identificar Produto / Lista de Pedidos (RF06.1) — rota /gestao/consolidacao/2
—: Compras coletivas — rota /gestao/compras
—: Nova compra coletiva — rota /gestao/compras/nova

RF07: Gerenciar Fornecedores
UC07.1: Cadastrar Fornecedor — rota /gestao/fornecedores/nova
UC07.2: Editar Fornecedor — rota /gestao/fornecedores/1/editar
UC07.3: Consultar Fornecedor — rota /gestao/fornecedores

RF08: Gerenciar Recebimento de Insumos
UC08.1: Registrar Recebimento — rota /gestao/recebimento/nova
UC08.2: Consultar Recebimento — rota /gestao/recebimento
UC08.3: Conferir Insumos Recebidos — rota /gestao/recebimento/1

RF09: Gerenciar Estoque
UC09.1: Registrar Recebimento de Insumo (entrada no estoque) — rota /gestao/recebimento/nova
UC09.2: Consultar Estoque — rota /gestao/estoque
UC09.3: Atualizar Quantidade em Estoque — rota /gestao/estoque

RF10: Gerenciar Distribuição de Insumos
UC10.1: Registrar Distribuição — rota /gestao/distribuicao/nova
UC10.2: Registrar Quantidade Distribuída — rota /gestao/distribuicao/2/quantidade
UC10.3: Consultar Distribuição — rota /gestao/distribuicao

RF11: Gerenciar Produção
UC11.1: Cadastrar Produção — rota /gestao/producao/nova
UC11.2: Atualizar Produção — rota /gestao/producao/1/editar
UC11.3: Consultar Produção — rota /gestao/producao

RF12: Gerenciar Catálogo
UC12.1: Cadastrar Produto no Catálogo — rota /gestao/catalogo/nova
UC12.2: Atualizar Produto no Catálogo — rota /gestao/catalogo/1/editar
UC12.3: Consultar Produtos no Catálogo — rota /gestao/catalogo

RF13: Gerenciar Pedidos de Comercialização
UC13.1: Registrar Pedido do Comprador — rota /gestao/comercializacao/nova
UC13.2: Consultar Pedido — rota /gestao/comercializacao
UC13.3: Atualizar Pedido — rota /gestao/comercializacao/2
—: Compradores — rota /gestao/compradores
