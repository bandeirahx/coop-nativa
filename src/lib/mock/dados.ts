import type * as T from './tipos.ts';

export const cooperados: T.Cooperado[] = [
	{ id: 1, tipoPessoa: 'PF', nome: 'José Almeida', documento: '529.982.247-25', telefone: '(63) 99211-4501', endereco: 'Rua das Palmeiras, 120, Porto Nacional - TO', qtdCotas: 10, status: 'Ativo' },
	{ id: 2, tipoPessoa: 'PF', nome: 'Maria das Dores Souza', documento: '111.444.777-35', telefone: '(63) 99877-2210', endereco: 'Chácara Boa Vista, Palmas - TO', qtdCotas: 6, status: 'Ativo' },
	{ id: 3, tipoPessoa: 'PF', nome: 'Antônio Ferreira Lima', documento: '935.411.347-80', telefone: '(63) 98134-7788', endereco: 'Setor Planalto, Gurupi - TO', qtdCotas: 15, status: 'Ativo' },
	{ id: 4, tipoPessoa: 'PJ', nome: 'Agropecuária Cerrado Vivo Ltda', documento: '11.222.333/0001-81', telefone: '(63) 3363-1020', endereco: 'Rodovia TO-050, km 12, Paraíso do Tocantins - TO', qtdCotas: 30, status: 'Ativo' },
	{ id: 5, tipoPessoa: 'PF', nome: 'Raimunda Pereira Costa', documento: '295.379.955-93', telefone: '(63) 99955-1302', endereco: 'Povoado Boa Esperança, Porto Nacional - TO', qtdCotas: 4, status: 'Ativo' },
	{ id: 6, tipoPessoa: 'PF', nome: 'Francisco Nunes Barbosa', documento: '071.480.531-96', telefone: '(63) 98402-6619', endereco: 'Fazenda Três Marias, Gurupi - TO', qtdCotas: 20, status: 'Ativo' },
	{ id: 7, tipoPessoa: 'PJ', nome: 'Mel do Jalapão Produtos Naturais ME', documento: '45.723.174/0001-10', telefone: '(63) 3215-8870', endereco: 'Av. JK, 455, Palmas - TO', qtdCotas: 8, status: 'Ativo' },
	{ id: 8, tipoPessoa: 'PF', nome: 'Luzia Carvalho Rocha', documento: '862.157.340-71', telefone: '(63) 99720-3347', endereco: 'Gleba Esperança, Paraíso do Tocantins - TO', qtdCotas: 5, status: 'Inativo' }
];

export const propriedades: T.Propriedade[] = [
	{ id: 1, cooperadoId: 1, nome: 'Sítio Esperança', endereco: 'Zona rural, km 8', municipio: 'Porto Nacional', areaTotal: 42, tipoProducao: 'Soja e milho' },
	{ id: 2, cooperadoId: 1, nome: 'Chácara Vale Verde', endereco: 'Estrada do Vale', municipio: 'Porto Nacional', areaTotal: 12, tipoProducao: 'Mandioca' },
	{ id: 3, cooperadoId: 2, nome: 'Chácara Boa Vista', endereco: 'TO-010, km 22', municipio: 'Palmas', areaTotal: 18, tipoProducao: 'Feijão e leite' },
	{ id: 4, cooperadoId: 3, nome: 'Fazenda Planalto', endereco: 'Setor Planalto', municipio: 'Gurupi', areaTotal: 160, tipoProducao: 'Soja' },
	{ id: 5, cooperadoId: 4, nome: 'Fazenda Cerrado Vivo', endereco: 'TO-050, km 12', municipio: 'Paraíso do Tocantins', areaTotal: 420, tipoProducao: 'Soja e milho' },
	{ id: 6, cooperadoId: 5, nome: 'Sítio Boa Esperança', endereco: 'Povoado Boa Esperança', municipio: 'Porto Nacional', areaTotal: 9, tipoProducao: 'Mandioca e feijão' },
	{ id: 7, cooperadoId: 6, nome: 'Fazenda Três Marias', endereco: 'BR-153, km 640', municipio: 'Gurupi', areaTotal: 250, tipoProducao: 'Milho e soja' },
	{ id: 8, cooperadoId: 7, nome: 'Apiário Jalapão', endereco: 'Região do Jalapão', municipio: 'Palmas', areaTotal: 30, tipoProducao: 'Mel' }
];

export const capacidades: T.Capacidade[] = [
	{ id: 1, propriedadeId: 1, produto: 'Soja', quantidade: 90, unidade: 'sacas', periodo: 'Safra 2025/2026' },
	{ id: 2, propriedadeId: 1, produto: 'Milho', quantidade: 120, unidade: 'sacas', periodo: 'Safra 2025/2026' },
	{ id: 3, propriedadeId: 2, produto: 'Mandioca', quantidade: 8, unidade: 'toneladas', periodo: 'Anual' },
	{ id: 4, propriedadeId: 3, produto: 'Feijão', quantidade: 40, unidade: 'sacas', periodo: 'Safra 2025/2026' },
	{ id: 5, propriedadeId: 3, produto: 'Leite', quantidade: 900, unidade: 'litros', periodo: 'Mensal' },
	{ id: 6, propriedadeId: 4, produto: 'Soja', quantidade: 6000, unidade: 'sacas', periodo: 'Safra 2025/2026' },
	{ id: 7, propriedadeId: 5, produto: 'Soja', quantidade: 18000, unidade: 'sacas', periodo: 'Safra 2025/2026' },
	{ id: 8, propriedadeId: 8, produto: 'Mel', quantidade: 600, unidade: 'kg', periodo: 'Anual' }
];

export const insumos: T.Insumo[] = [
	{ id: 1, nome: 'Semente de soja', descricao: 'Semente certificada, saco de 40 kg', unidade: 'saco' },
	{ id: 2, nome: 'Adubo NPK 04-14-08', descricao: 'Fertilizante, saco de 50 kg', unidade: 'saco' },
	{ id: 3, nome: 'Calcário dolomítico', descricao: 'Corretivo de solo', unidade: 'tonelada' },
	{ id: 4, nome: 'Defensivo agrícola', descricao: 'Herbicida, galão de 20 L', unidade: 'galão' },
	{ id: 5, nome: 'Ração para gado leiteiro', descricao: 'Saco de 30 kg', unidade: 'saco' },
	{ id: 6, nome: 'Semente de milho', descricao: 'Saco de 20 kg', unidade: 'saco' }
];

export const campanhas: T.Campanha[] = [
	{ id: 1, nome: 'Safra 2025/2026 – Plantio', dataInicio: '2026-10-01', dataFim: '2026-12-20', status: 'Aberta',
		itens: [{ insumoId: 1, precoUnit: 480, limitePorCota: 4 }, { insumoId: 2, precoUnit: 215, limitePorCota: 6 }, { insumoId: 3, precoUnit: 160, limitePorCota: 2 }, { insumoId: 4, precoUnit: 390, limitePorCota: 1 }] },
	{ id: 2, nome: 'Pecuária leiteira – Ração', dataInicio: '2026-11-05', dataFim: '2026-12-05', status: 'Aberta',
		itens: [{ insumoId: 5, precoUnit: 98, limitePorCota: 10 }] },
	{ id: 3, nome: 'Safrinha 2026 – Milho', dataInicio: '2026-02-01', dataFim: '2026-03-10', status: 'Encerrada',
		itens: [{ insumoId: 6, precoUnit: 310, limitePorCota: 3 }, { insumoId: 2, precoUnit: 205, limitePorCota: 5 }] }
];

export const pedidos: T.PedidoInsumo[] = [
	{ id: 1, cooperadoId: 1, campanhaId: 1, data: '2026-10-05', status: 'Aprovado/Pago', itens: [{ insumoId: 1, quantidade: 20, valorUnit: 480 }, { insumoId: 2, quantidade: 30, valorUnit: 215 }] },
	{ id: 2, cooperadoId: 2, campanhaId: 1, data: '2026-10-06', status: 'Aprovado/Pago', itens: [{ insumoId: 1, quantidade: 12, valorUnit: 480 }] },
	{ id: 3, cooperadoId: 3, campanhaId: 1, data: '2026-10-08', status: 'Pendente', itens: [{ insumoId: 1, quantidade: 50, valorUnit: 480 }, { insumoId: 3, quantidade: 20, valorUnit: 160 }] },
	{ id: 4, cooperadoId: 4, campanhaId: 1, data: '2026-10-09', status: 'Aprovado/Pago', itens: [{ insumoId: 2, quantidade: 150, valorUnit: 215 }, { insumoId: 4, quantidade: 20, valorUnit: 390 }] },
	{ id: 5, cooperadoId: 5, campanhaId: 1, data: '2026-10-12', status: 'Pendente', itens: [{ insumoId: 2, quantidade: 15, valorUnit: 215 }] },
	{ id: 6, cooperadoId: 6, campanhaId: 1, data: '2026-10-14', status: 'Cancelado', itens: [{ insumoId: 1, quantidade: 40, valorUnit: 480 }] },
	{ id: 7, cooperadoId: 2, campanhaId: 2, data: '2026-11-07', status: 'Aprovado/Pago', itens: [{ insumoId: 5, quantidade: 40, valorUnit: 98 }] },
	{ id: 8, cooperadoId: 3, campanhaId: 2, data: '2026-11-08', status: 'Pendente', itens: [{ insumoId: 5, quantidade: 100, valorUnit: 98 }] },
	{ id: 9, cooperadoId: 1, campanhaId: 3, data: '2026-02-10', status: 'Distribuído', itens: [{ insumoId: 6, quantidade: 25, valorUnit: 310 }] },
	{ id: 10, cooperadoId: 6, campanhaId: 3, data: '2026-02-12', status: 'Distribuído', itens: [{ insumoId: 6, quantidade: 55, valorUnit: 310 }, { insumoId: 2, quantidade: 80, valorUnit: 205 }] }
];

export const consolidacoes: T.Consolidacao[] = [
	{ id: 1, campanhaId: 1, data: '2026-10-15', status: 'Fechada', excluidos: [] },
	{ id: 2, campanhaId: 2, data: '2026-11-10', status: 'Aberta', excluidos: [] }
];

export const fornecedores: T.Fornecedor[] = [
	{ id: 1, nome: 'AgroInsumos Tocantins S.A.', cnpj: '12.345.678/0001-95', telefone: '(63) 3214-5500', email: 'vendas@agroinsumos.example' },
	{ id: 2, nome: 'Fertilizantes do Cerrado Ltda', cnpj: '98.765.432/0001-98', telefone: '(62) 3322-1090', email: 'contato@fertcerrado.example' },
	{ id: 3, nome: 'NutriGado Rações', cnpj: '55.444.333/0001-00', telefone: '(63) 3361-7712', email: 'comercial@nutrigado.example' }
];

export const compras: T.CompraColetiva[] = [
	{ id: 1, consolidacaoId: 1, fornecedorId: 1, data: '2026-10-20', status: 'Recebida', valorTotal: 74850 },
	{ id: 2, consolidacaoId: 2, fornecedorId: 3, data: '2026-11-12', status: 'Pendente', valorTotal: 13720 }
];

export const recebimentos: T.Recebimento[] = [
	{ id: 1, compraId: 1, data: '2026-10-22', observacao: '5 sacos de adubo avariados no transporte.', itens: [{ insumoId: 1, prevista: 100, recebida: 100 }, { insumoId: 2, prevista: 90, recebida: 85 }] }
];

export const estoque: T.EstoqueItem[] = [
	{ insumoId: 1, qtd: 60, minimo: 40 }, { insumoId: 2, qtd: 35, minimo: 50 }, { insumoId: 3, qtd: 18, minimo: 10 },
	{ insumoId: 4, qtd: 12, minimo: 15 }, { insumoId: 5, qtd: 140, minimo: 60 }, { insumoId: 6, qtd: 30, minimo: 20 }
];

export const movimentacoes: T.Movimentacao[] = [
	{ id: 'MOV-0001', data: '2026-10-22', tipo: 'entrada', insumoId: 1, quantidade: 100, descricao: 'Recebimento da compra #1', origem: 'Compra coletiva #1' },
	{ id: 'MOV-0002', data: '2026-10-22', tipo: 'entrada', insumoId: 2, quantidade: 85, descricao: 'Recebimento da compra #1', origem: 'Compra coletiva #1' },
	{ id: 'MOV-0003', data: '2026-10-25', tipo: 'saida', insumoId: 1, quantidade: 40, descricao: 'Distribuição ao cooperado José Almeida', origem: 'Distribuição #1' },
	{ id: 'MOV-0004', data: '2026-10-26', tipo: 'saida', insumoId: 2, quantidade: 50, descricao: 'Distribuição ao cooperado Francisco Nunes', origem: 'Distribuição #2' }
];

export const distribuicoes: T.Distribuicao[] = [
	{ id: 1, cooperadoId: 1, pedidoId: 1, data: '2026-10-25', status: 'Distribuído', observacao: '', itens: [{ insumoId: 1, prevista: 20, distribuida: 20 }] },
	{ id: 2, cooperadoId: 2, pedidoId: 2, data: '2026-11-10', status: 'Registrada', observacao: '', itens: [{ insumoId: 1, prevista: 12, distribuida: 0 }] },
	{ id: 3, cooperadoId: 4, pedidoId: 4, data: '2026-11-12', status: 'Registrada', observacao: 'Retirada no galpão', itens: [{ insumoId: 2, prevista: 150, distribuida: 0 }] }
];

export const producoes: T.Producao[] = [
	{ id: 1, cooperadoId: 1, produto: 'Soja', quantidade: 90, unidade: 'sacas', dataRegistro: '2026-10-01', status: 'Disponível' },
	{ id: 2, cooperadoId: 2, produto: 'Feijão', quantidade: 40, unidade: 'sacas', dataRegistro: '2026-10-03', status: 'Disponível' },
	{ id: 3, cooperadoId: 2, produto: 'Leite', quantidade: 900, unidade: 'litros', dataRegistro: '2026-11-01', status: 'Disponível' },
	{ id: 4, cooperadoId: 3, produto: 'Soja', quantidade: 5000, unidade: 'sacas', dataRegistro: '2026-10-10', status: 'Disponível' },
	{ id: 5, cooperadoId: 5, produto: 'Mandioca', quantidade: 6, unidade: 'toneladas', dataRegistro: '2026-10-15', status: 'Disponível' },
	{ id: 6, cooperadoId: 7, produto: 'Mel', quantidade: 500, unidade: 'kg', dataRegistro: '2026-10-20', status: 'Disponível' },
	{ id: 7, cooperadoId: 6, produto: 'Milho', quantidade: 2500, unidade: 'sacas', dataRegistro: '2026-10-22', status: 'Disponível' }
];

export const catalogo: T.ProdutoCatalogo[] = [
	{ id: 1, nome: 'Soja', descricao: 'Soja em grão, safra atual', unidade: 'sacas', preco: 132, status: 'Ativo' },
	{ id: 2, nome: 'Milho', descricao: 'Milho em grão', unidade: 'sacas', preco: 58, status: 'Ativo' },
	{ id: 3, nome: 'Feijão', descricao: 'Feijão carioca', unidade: 'sacas', preco: 290, status: 'Ativo' },
	{ id: 4, nome: 'Mandioca', descricao: 'Mandioca in natura', unidade: 'toneladas', preco: 900, status: 'Ativo' },
	{ id: 5, nome: 'Leite', descricao: 'Leite cru resfriado', unidade: 'litros', preco: 2.4, status: 'Ativo' },
	{ id: 6, nome: 'Mel', descricao: 'Mel silvestre do Jalapão', unidade: 'kg', preco: 38, status: 'Ativo' }
];

export const compradores: T.Comprador[] = [
	{ id: 1, nome: 'Mercado Bom Preço Ltda', documento: '33.000.167/0001-01', telefone: '(63) 3215-1100', email: 'compras@bompreco.example' },
	{ id: 2, nome: 'Laticínios Vale do Tocantins', documento: '27.865.757/0001-02', telefone: '(63) 3361-2020', email: 'suprimentos@laticinios.example' },
	{ id: 3, nome: 'Restaurante Sabor do Cerrado', documento: '390.533.447-05', telefone: '(63) 99100-2030', email: 'chef@saborcerrado.example' }
];

export const pedidosCom: T.PedidoCom[] = [
	{ id: 1, compradorId: 1, data: '2026-11-02', status: 'Aprovado/Pago', itens: [{ produto: 'Feijão', quantidade: 20, valorUnit: 290 }] },
	{ id: 2, compradorId: 2, data: '2026-11-05', status: 'Pendente', itens: [{ produto: 'Leite', quantidade: 500, valorUnit: 2.4 }] },
	{ id: 3, compradorId: 3, data: '2026-11-09', status: 'Pendente', itens: [{ produto: 'Mel', quantidade: 60, valorUnit: 38 }] }
];
