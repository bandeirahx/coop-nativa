export type Tela = { rf: string; rfTitulo: string; uc: string; titulo: string; rota: string; perfil: 'gestor' | 'agricultor' | 'publico' };

const G = 'gestor' as const;
const A = 'agricultor' as const;
const P = 'publico' as const;
const rf = (cod: string, titulo: string, itens: [string, string, string, Tela['perfil']?][]): Tela[] =>
	itens.map(([uc, t, rota, perfil]) => ({ rf: cod, rfTitulo: titulo, uc, titulo: t, rota, perfil: perfil ?? G }));

export const telas: Tela[] = [
	...rf('Geral', 'Páginas públicas e design', [
		['—', 'Landing page', '/', P], ['—', 'Login', '/login', P], ['—', 'Design system', '/design', P], ['—', 'Painel de gestão', '/gestao'], ['—', 'Início do produtor', '/produtor', A]]),
	...rf('RF01', 'Gerenciar Cooperados', [
		['UC01.1', 'Cadastrar Cooperado', '/gestao/cooperados/nova'], ['UC01.2', 'Editar Cooperado', '/gestao/cooperados/1/editar'],
		['UC01.3', 'Consultar Cooperado', '/gestao/cooperados'], ['UC01.3', 'Detalhe do Cooperado', '/gestao/cooperados/1'], ['UC01.3', 'Meus dados (produtor)', '/produtor/dados', A]]),
	...rf('RF02', 'Gerenciar Propriedades', [
		['UC02.1', 'Cadastrar Propriedade', '/gestao/propriedades/nova'], ['UC02.2', 'Editar Propriedade', '/gestao/propriedades/1/editar'],
		['UC02.3', 'Consultar Propriedade', '/gestao/propriedades'], ['UC02.3', 'Detalhe da Propriedade', '/gestao/propriedades/1'], ['UC02.3', 'Minhas propriedades (produtor)', '/produtor/propriedades', A]]),
	...rf('RF03', 'Gerenciar Capacidade Produtiva', [
		['UC03.1', 'Registrar Capacidade Produtiva', '/gestao/capacidade/nova'], ['UC03.2', 'Editar Capacidade Produtiva', '/gestao/capacidade/1/editar'],
		['UC03.3', 'Consultar Capacidade Produtiva', '/gestao/capacidade'], ['UC03.3', 'Capacidade produtiva (produtor)', '/produtor/capacidade', A]]),
	...rf('RF04', 'Gerenciar Campanhas de Compras', [
		['UC04.1', 'Criar Campanha', '/gestao/campanhas/nova'], ['UC04.2', 'Editar Campanha', '/gestao/campanhas/1/editar'],
		['UC04.3', 'Consultar Campanha', '/gestao/campanhas'], ['UC04.3', 'Detalhe da Campanha', '/gestao/campanhas/1'], ['UC04.3', 'Campanhas abertas (produtor)', '/produtor/campanhas', A]]),
	...rf('RF05', 'Gerenciar Pedidos de Insumos', [
		['UC05.1', 'Registrar Pedido de Insumo', '/gestao/pedidos/nova'],
		['UC05.2', 'Consultar Pedido de Insumo', '/gestao/pedidos'], ['UC05.2', 'Detalhe do Pedido', '/gestao/pedidos/3'], ['UC05.2', 'Meus pedidos (produtor)', '/produtor/pedidos', A],
		['UC05.3', 'Editar Pedido de Insumo', '/gestao/pedidos/3/editar']]),
	...rf('RF06', 'Gerenciar Compras Coletivas', [
		['UC06.1', 'Consolidar Solicitações', '/gestao/consolidacao/nova'], ['UC06.2', 'Consultar Solicitações Consolidadas', '/gestao/consolidacao'],
		['UC06.3', 'Atualizar Consolidação', '/gestao/consolidacao/2'], ['UC06.1.1', 'Identificar Produto / Lista de Pedidos (RF06.1)', '/gestao/consolidacao/2'],
		['—', 'Compras coletivas', '/gestao/compras'], ['—', 'Nova compra coletiva', '/gestao/compras/nova']]),
	...rf('RF07', 'Gerenciar Fornecedores', [
		['UC07.1', 'Cadastrar Fornecedor', '/gestao/fornecedores/nova'], ['UC07.2', 'Editar Fornecedor', '/gestao/fornecedores/1/editar'], ['UC07.3', 'Consultar Fornecedor', '/gestao/fornecedores']]),
	...rf('RF08', 'Gerenciar Recebimento de Insumos', [
		['UC08.1', 'Registrar Recebimento', '/gestao/recebimento/nova?compra=2'], ['UC08.2', 'Consultar Recebimento', '/gestao/recebimento'],
		['UC08.3', 'Conferir Insumos Recebidos', '/gestao/recebimento/1']]),
	...rf('RF09', 'Gerenciar Estoque', [
		['UC09.1', 'Registrar Recebimento de Insumo (entrada no estoque)', '/gestao/recebimento/nova?compra=2'], ['UC09.2', 'Consultar Estoque', '/gestao/estoque'], ['UC09.3', 'Atualizar Quantidade em Estoque', '/gestao/estoque']]),
	...rf('RF10', 'Gerenciar Distribuição de Insumos', [
		['UC10.1', 'Registrar Distribuição', '/gestao/distribuicao/nova'], ['UC10.2', 'Registrar Quantidade Distribuída', '/gestao/distribuicao/2/quantidade'],
		['UC10.3', 'Consultar Distribuição', '/gestao/distribuicao']]),
	...rf('RF11', 'Gerenciar Produção', [
		['UC11.1', 'Cadastrar Produção', '/gestao/producao/nova'], ['UC11.2', 'Atualizar Produção', '/gestao/producao/1/editar'], ['UC11.3', 'Consultar Produção', '/gestao/producao']]),
	...rf('RF12', 'Gerenciar Catálogo', [
		['UC12.1', 'Cadastrar Produto no Catálogo', '/gestao/catalogo/nova'], ['UC12.2', 'Atualizar Produto no Catálogo', '/gestao/catalogo/1/editar'], ['UC12.3', 'Consultar Produtos no Catálogo', '/gestao/catalogo']]),
	...rf('RF13', 'Gerenciar Pedidos de Comercialização', [
		['UC13.1', 'Registrar Pedido do Comprador', '/gestao/comercializacao/nova'], ['UC13.2', 'Consultar Pedido', '/gestao/comercializacao'],
		['UC13.3', 'Atualizar Pedido', '/gestao/comercializacao/2'], ['—', 'Compradores', '/gestao/compradores']])
];

export const nomeArquivo = (t: Tela) =>
	`${t.rf}_${t.uc}_${t.titulo}`.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9.]+/g, '-').replace(/-+$/, '') + '.png';
