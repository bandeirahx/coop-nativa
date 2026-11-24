import { get } from 'svelte/store';
import * as d from '#lib/stores/dados.ts';
import { validarCPF, validarCNPJ, mascaraCPF, mascaraCNPJ } from '#lib/utils/validacao.ts';
import { moeda, data as fdata } from '#lib/utils/formato.ts';

export type Opcao = { valor: string | number; texto: string };
export type Campo = {
	chave: string; rotulo: string; id?: string;
	tipo: 'texto' | 'numero' | 'data' | 'select' | 'selectNum' | 'telefone' | 'documento' | 'virtual';
	obrigatorio?: boolean; opcoes?: () => Opcao[]; dica?: string; passo?: string;
	/** Campo virtual de justificativa: só aparece quando o resultado da função for verdadeiro. */
	mostrarSe?: (v: any, original: any) => boolean;
};
export type Coluna = { rotulo: string; v: (x: any) => string | number; badge?: boolean };
export type Recurso = {
	slug: string; titulo: string; singular: string; rf: string;
	uc: { cadastrar?: string; editar?: string; consultar: string };
	store: any; campos: Campo[]; colunas: Coluna[];
	filtros?: { chave: string; rotulo: string; opcoes: () => Opcao[] }[];
	periodo?: string;
	nome: (x: any) => string;
	padrao: () => Record<string, any>;
	validar: (v: any, ctx: { original?: any; todos: any[] }) => Record<string, string>;
};

const nomeCoop = (id: number) => get(d.cooperados).find((c) => c.id === id)?.nome ?? '—';
const nomeProp = (id: number) => get(d.propriedades).find((c) => c.id === id)?.nome ?? '—';
const coopOpcoes = (so?: boolean) => () =>
	get(d.cooperados).filter((c) => !so || c.status === 'Ativo').map((c) => ({ valor: c.id, texto: c.nome }));
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const vazio = (x: any) => x === '' || x === null || x === undefined;
const obrig = (v: any, campos: Campo[], e: Record<string, string>) => {
	for (const c of campos) if (c.obrigatorio && vazio(v[c.chave])) e[c.chave] = `Preencha o campo "${c.rotulo}".`;
};
const positivo = (v: any, k: string, rot: string, e: Record<string, string>) => {
	if (!vazio(v[k]) && !(Number(v[k]) > 0)) e[k] = `${rot} deve ser maior que zero.`;
};
const unidades = ['sacas', 'toneladas', 'kg', 'litros', 'unidades'].map((u) => ({ valor: u, texto: u }));
const municipios = ['Palmas', 'Porto Nacional', 'Paraíso do Tocantins', 'Gurupi', 'Araguaína'].map((u) => ({ valor: u, texto: u }));
const hoje = () => new Date().toISOString().slice(0, 10);

function criar(r: Omit<Recurso, 'validar'> & { regras?: Recurso['validar'] }): Recurso {
	return {
		...r,
		validar: (v, ctx) => {
			const e: Record<string, string> = {};
			obrig(v, r.campos, e);
			Object.assign(e, r.regras?.(v, ctx) ?? {});
			return e;
		}
	};
}

export const recursos: Record<string, Recurso> = {
	cooperados: criar({
		slug: 'cooperados', titulo: 'Cooperados', singular: 'Cooperado', rf: 'RF01: Gerenciar Cooperados',
		uc: { cadastrar: 'UC01.1', editar: 'UC01.2', consultar: 'UC01.3' }, store: d.cooperados,
		nome: (x) => x.nome,
		campos: [
			{ chave: 'tipoPessoa', rotulo: 'Tipo de pessoa', tipo: 'select', obrigatorio: true, opcoes: () => [{ valor: 'PF', texto: 'Pessoa Física (CPF)' }, { valor: 'PJ', texto: 'Pessoa Jurídica (CNPJ)' }] },
			{ chave: 'nome', rotulo: 'Nome / Razão social', tipo: 'texto', obrigatorio: true },
			{ chave: 'documento', rotulo: 'CPF / CNPJ', tipo: 'documento', obrigatorio: true },
			{ chave: 'telefone', rotulo: 'Telefone', tipo: 'telefone', obrigatorio: true },
			{ chave: 'endereco', rotulo: 'Endereço', tipo: 'texto', obrigatorio: true },
			{ chave: 'qtdCotas', rotulo: 'Quantidade de cotas', tipo: 'numero', obrigatorio: true, dica: 'Define o limite de insumos por campanha (RN10).', passo: '1' },
			{ chave: 'justificativa', rotulo: 'Justificativa da alteração de cotas', tipo: 'virtual', mostrarSe: (v, o) => !!o && Number(v.qtdCotas) !== o.qtdCotas, dica: 'Obrigatória ao alterar as cotas. O sistema registra quem alterou e quando.' },
			{ chave: 'status', rotulo: 'Situação', tipo: 'select', obrigatorio: true, opcoes: () => [{ valor: 'Ativo', texto: 'Ativo' }, { valor: 'Inativo', texto: 'Inativo' }] }
		],
		colunas: [
			{ rotulo: 'Nome', v: (x) => x.nome }, { rotulo: 'Tipo', v: (x) => x.tipoPessoa }, { rotulo: 'CPF/CNPJ', v: (x) => x.documento },
			{ rotulo: 'Cotas', v: (x) => x.qtdCotas }, { rotulo: 'Situação', v: (x) => x.status, badge: true }
		],
		filtros: [
			{ chave: 'tipoPessoa', rotulo: 'Tipo', opcoes: () => [{ valor: 'PF', texto: 'Pessoa Física' }, { valor: 'PJ', texto: 'Pessoa Jurídica' }] },
			{ chave: 'status', rotulo: 'Situação', opcoes: () => [{ valor: 'Ativo', texto: 'Ativo' }, { valor: 'Inativo', texto: 'Inativo' }] }
		],
		padrao: () => ({ tipoPessoa: 'PF', nome: '', documento: '', telefone: '', endereco: '', qtdCotas: 1, status: 'Ativo', justificativa: '' }),
		regras: (v, { original, todos }) => {
			const e: Record<string, string> = {};
			const dig = String(v.documento).replace(/\D/g, '');
			if (v.documento) {
				const ok = v.tipoPessoa === 'PF' ? validarCPF(v.documento) : validarCNPJ(v.documento);
				if (!ok) e.documento = `${v.tipoPessoa === 'PF' ? 'CPF' : 'CNPJ'} inválido. Verifique os números digitados.`;
				else if (todos.some((c) => c.id !== original?.id && c.documento.replace(/\D/g, '') === dig)) e.documento = 'Já existe um cooperado cadastrado com este documento.';
			}
			if (!vazio(v.qtdCotas) && (!Number.isInteger(Number(v.qtdCotas)) || Number(v.qtdCotas) < 1)) e.qtdCotas = 'Quantidade de cotas inválida. Informe um número inteiro maior que zero.';
			if (original && Number(v.qtdCotas) !== original.qtdCotas && !String(v.justificativa).trim()) e.justificativa = 'Informe a justificativa para alterar as cotas.';
			return e;
		}
	}),
	propriedades: criar({
		slug: 'propriedades', titulo: 'Propriedades', singular: 'Propriedade', rf: 'RF02: Gerenciar Propriedades',
		uc: { cadastrar: 'UC02.1', editar: 'UC02.2', consultar: 'UC02.3' }, store: d.propriedades,
		nome: (x) => x.nome,
		campos: [
			{ chave: 'cooperadoId', rotulo: 'Cooperado', tipo: 'selectNum', obrigatorio: true, opcoes: coopOpcoes(true) },
			{ chave: 'nome', rotulo: 'Nome da propriedade', tipo: 'texto', obrigatorio: true },
			{ chave: 'endereco', rotulo: 'Endereço', tipo: 'texto', obrigatorio: true },
			{ chave: 'municipio', rotulo: 'Município', tipo: 'select', obrigatorio: true, opcoes: () => municipios },
			{ chave: 'areaTotal', rotulo: 'Área total (hectares)', tipo: 'numero', obrigatorio: true, passo: '0.1' },
			{ chave: 'tipoProducao', rotulo: 'Tipo de produção', tipo: 'texto', obrigatorio: true }
		],
		colunas: [
			{ rotulo: 'Propriedade', v: (x) => x.nome }, { rotulo: 'Cooperado', v: (x) => nomeCoop(x.cooperadoId) },
			{ rotulo: 'Município', v: (x) => x.municipio }, { rotulo: 'Área (ha)', v: (x) => x.areaTotal }, { rotulo: 'Produção', v: (x) => x.tipoProducao }
		],
		filtros: [{ chave: 'municipio', rotulo: 'Município', opcoes: () => municipios }, { chave: 'cooperadoId', rotulo: 'Cooperado', opcoes: coopOpcoes() }],
		padrao: () => ({ cooperadoId: '', nome: '', endereco: '', municipio: '', areaTotal: '', tipoProducao: '' }),
		regras: (v) => { const e: Record<string, string> = {}; positivo(v, 'areaTotal', 'A área total', e); return e; }
	}),
	capacidade: criar({
		slug: 'capacidade', titulo: 'Capacidade Produtiva', singular: 'Capacidade produtiva', rf: 'RF03: Gerenciar Capacidade Produtiva',
		uc: { cadastrar: 'UC03.1', editar: 'UC03.2', consultar: 'UC03.3' }, store: d.capacidades,
		nome: (x) => `${x.produto} – ${nomeProp(x.propriedadeId)}`,
		campos: [
			{ chave: 'propriedadeId', rotulo: 'Propriedade', tipo: 'selectNum', obrigatorio: true, opcoes: () => get(d.propriedades).map((p) => ({ valor: p.id, texto: `${p.nome} (${nomeCoop(p.cooperadoId)})` })) },
			{ chave: 'produto', rotulo: 'Produto', tipo: 'texto', obrigatorio: true },
			{ chave: 'quantidade', rotulo: 'Quantidade', tipo: 'numero', obrigatorio: true },
			{ chave: 'unidade', rotulo: 'Unidade de medida', tipo: 'select', obrigatorio: true, opcoes: () => unidades },
			{ chave: 'periodo', rotulo: 'Período', tipo: 'texto', obrigatorio: true, dica: 'Ex.: Safra 2025/2026, Mensal, Anual.' }
		],
		colunas: [
			{ rotulo: 'Propriedade', v: (x) => nomeProp(x.propriedadeId) }, { rotulo: 'Produto', v: (x) => x.produto },
			{ rotulo: 'Quantidade', v: (x) => `${x.quantidade.toLocaleString('pt-BR')} ${x.unidade}` }, { rotulo: 'Período', v: (x) => x.periodo }
		],
		filtros: [{ chave: 'unidade', rotulo: 'Unidade', opcoes: () => unidades }],
		padrao: () => ({ propriedadeId: '', produto: '', quantidade: '', unidade: '', periodo: '' }),
		regras: (v) => { const e: Record<string, string> = {}; positivo(v, 'quantidade', 'A quantidade', e); return e; }
	}),
	fornecedores: criar({
		slug: 'fornecedores', titulo: 'Fornecedores', singular: 'Fornecedor', rf: 'RF07: Gerenciar Fornecedores',
		uc: { cadastrar: 'UC07.1', editar: 'UC07.2', consultar: 'UC07.3' }, store: d.fornecedores,
		nome: (x) => x.nome,
		campos: [
			{ chave: 'nome', rotulo: 'Razão social', tipo: 'texto', obrigatorio: true },
			{ chave: 'cnpj', rotulo: 'CNPJ', tipo: 'documento', obrigatorio: true },
			{ chave: 'telefone', rotulo: 'Telefone', tipo: 'telefone', obrigatorio: true },
			{ chave: 'email', rotulo: 'E-mail', tipo: 'texto', obrigatorio: true }
		],
		colunas: [{ rotulo: 'Fornecedor', v: (x) => x.nome }, { rotulo: 'CNPJ', v: (x) => x.cnpj }, { rotulo: 'Telefone', v: (x) => x.telefone }, { rotulo: 'E-mail', v: (x) => x.email }],
		padrao: () => ({ nome: '', cnpj: '', telefone: '', email: '' }),
		regras: (v, { original, todos }) => {
			const e: Record<string, string> = {};
			if (v.cnpj && !validarCNPJ(v.cnpj)) e.cnpj = 'CNPJ inválido. Verifique os números digitados.';
			else if (v.cnpj && todos.some((f) => f.id !== original?.id && f.cnpj === v.cnpj)) e.cnpj = 'Já existe um fornecedor cadastrado com este CNPJ.';
			if (v.email && !emailOk(v.email)) e.email = 'E-mail inválido.';
			return e;
		}
	}),
	producao: criar({
		slug: 'producao', titulo: 'Produção', singular: 'Produção', rf: 'RF11: Gerenciar Produção',
		uc: { cadastrar: 'UC11.1', editar: 'UC11.2', consultar: 'UC11.3' }, store: d.producoes,
		nome: (x) => `${x.produto} – ${nomeCoop(x.cooperadoId)}`,
		campos: [
			{ chave: 'cooperadoId', rotulo: 'Cooperado', tipo: 'selectNum', obrigatorio: true, opcoes: coopOpcoes() },
			{ chave: 'produto', rotulo: 'Produto', tipo: 'texto', obrigatorio: true },
			{ chave: 'quantidade', rotulo: 'Quantidade', tipo: 'numero', obrigatorio: true },
			{ chave: 'unidade', rotulo: 'Unidade de medida', tipo: 'select', obrigatorio: true, opcoes: () => unidades },
			{ chave: 'dataRegistro', rotulo: 'Data do registro', tipo: 'data', obrigatorio: true },
			{ chave: 'status', rotulo: 'Situação', tipo: 'select', obrigatorio: true, opcoes: () => ['Disponível', 'Reservada', 'Vendida'].map((s) => ({ valor: s, texto: s })) }
		],
		colunas: [
			{ rotulo: 'Cooperado', v: (x) => nomeCoop(x.cooperadoId) }, { rotulo: 'Produto', v: (x) => x.produto },
			{ rotulo: 'Quantidade', v: (x) => `${x.quantidade.toLocaleString('pt-BR')} ${x.unidade}` }, { rotulo: 'Data', v: (x) => fdata(x.dataRegistro) }, { rotulo: 'Situação', v: (x) => x.status }
		],
		filtros: [{ chave: 'cooperadoId', rotulo: 'Cooperado', opcoes: coopOpcoes() }, { chave: 'status', rotulo: 'Situação', opcoes: () => ['Disponível', 'Reservada', 'Vendida'].map((s) => ({ valor: s, texto: s })) }],
		periodo: 'dataRegistro',
		padrao: () => ({ cooperadoId: '', produto: '', quantidade: '', unidade: '', dataRegistro: hoje(), status: 'Disponível' }),
		regras: (v) => {
			const e: Record<string, string> = {};
			if (!vazio(v.cooperadoId)) {
				const c = get(d.cooperados).find((x) => x.id === Number(v.cooperadoId));
				if (!c) e.cooperadoId = 'Cooperado não encontrado.';
				else if (c.status !== 'Ativo') e.cooperadoId = 'Este cooperado está inativo e não pode registrar produção.';
			}
			positivo(v, 'quantidade', 'A quantidade', e);
			return e;
		}
	}),
	catalogo: criar({
		slug: 'catalogo', titulo: 'Catálogo de Produtos', singular: 'Produto', rf: 'RF12: Gerenciar Catálogo',
		uc: { cadastrar: 'UC12.1', editar: 'UC12.2', consultar: 'UC12.3' }, store: d.catalogo,
		nome: (x) => x.nome,
		campos: [
			{ chave: 'nome', rotulo: 'Nome do produto', tipo: 'texto', obrigatorio: true },
			{ chave: 'descricao', rotulo: 'Descrição', tipo: 'texto', obrigatorio: true },
			{ chave: 'unidade', rotulo: 'Unidade de medida', tipo: 'select', obrigatorio: true, opcoes: () => unidades },
			{ chave: 'preco', rotulo: 'Preço unitário (R$)', tipo: 'numero', obrigatorio: true, passo: '0.01' },
			{ chave: 'status', rotulo: 'Situação', tipo: 'select', obrigatorio: true, opcoes: () => [{ valor: 'Ativo', texto: 'Ativo' }, { valor: 'Inativo', texto: 'Inativo' }] }
		],
		colunas: [{ rotulo: 'Produto', v: (x) => x.nome }, { rotulo: 'Unidade', v: (x) => x.unidade }, { rotulo: 'Preço', v: (x) => moeda(x.preco) }, { rotulo: 'Situação', v: (x) => x.status, badge: true }],
		filtros: [{ chave: 'status', rotulo: 'Situação', opcoes: () => [{ valor: 'Ativo', texto: 'Ativo' }, { valor: 'Inativo', texto: 'Inativo' }] }],
		padrao: () => ({ nome: '', descricao: '', unidade: '', preco: '', status: 'Ativo' }),
		regras: (v, { original, todos }) => {
			const e: Record<string, string> = {};
			positivo(v, 'preco', 'O preço', e);
			if (v.nome && todos.some((p) => p.id !== original?.id && p.nome.toLowerCase() === String(v.nome).toLowerCase())) e.nome = 'Já existe um produto com este nome no catálogo.';
			return e;
		}
	}),
	compradores: criar({
		slug: 'compradores', titulo: 'Compradores', singular: 'Comprador', rf: 'RF13: Gerenciar Pedidos de Comercialização',
		uc: { cadastrar: 'UC13.1', editar: 'UC13.3', consultar: 'UC13.2' }, store: d.compradores,
		nome: (x) => x.nome,
		campos: [
			{ chave: 'nome', rotulo: 'Nome / Razão social', tipo: 'texto', obrigatorio: true },
			{ chave: 'documento', rotulo: 'CPF / CNPJ', tipo: 'documento', obrigatorio: true },
			{ chave: 'telefone', rotulo: 'Telefone', tipo: 'telefone', obrigatorio: true },
			{ chave: 'email', rotulo: 'E-mail', tipo: 'texto', obrigatorio: true }
		],
		colunas: [{ rotulo: 'Comprador', v: (x) => x.nome }, { rotulo: 'CPF/CNPJ', v: (x) => x.documento }, { rotulo: 'Telefone', v: (x) => x.telefone }, { rotulo: 'E-mail', v: (x) => x.email }],
		padrao: () => ({ nome: '', documento: '', telefone: '', email: '' }),
		regras: (v, { original, todos }) => {
			const e: Record<string, string> = {};
			const dig = String(v.documento).replace(/\D/g, '');
			if (v.documento && !(dig.length === 11 ? validarCPF(v.documento) : dig.length === 14 && validarCNPJ(v.documento))) e.documento = 'CPF/CNPJ inválido. Verifique os números digitados.';
			else if (v.documento && todos.some((c) => c.id !== original?.id && c.documento.replace(/\D/g, '') === dig)) e.documento = 'Já existe um comprador com este documento.';
			if (v.email && !emailOk(v.email)) e.email = 'E-mail inválido.';
			return e;
		}
	})
};

export const mascaraDocumento = (valor: string, tipo?: string) => {
	const dig = valor.replace(/\D/g, '');
	return tipo === 'PF' || (tipo === undefined && dig.length <= 11) ? mascaraCPF(valor) : mascaraCNPJ(valor);
};

/** Recursos que só o Gestor pode cadastrar/editar. */
export const valorLegivel = (c: Campo, x: any): string => {
	const v = x[c.chave];
	if (c.tipo === 'selectNum') return c.opcoes?.().find((o) => o.valor === v)?.texto ?? '—';
	if (c.tipo === 'data') return fdata(v);
	if (c.chave === 'preco') return moeda(v);
	return String(v ?? '—');
};

const feminino = new Set(['propriedades', 'capacidade', 'producao']);
export const rotuloNovo = (r: Recurso) => `${feminino.has(r.slug) ? 'Nova' : 'Novo'} ${r.singular.toLowerCase()}`;

export type Modulo = 'cooperados' | 'compras' | 'estoque' | 'comercializacao';

const modulosPorRecurso: Record<string, Modulo> = {
	cooperados: 'cooperados',
	propriedades: 'cooperados',
	capacidade: 'cooperados',
	fornecedores: 'compras',
	compradores: 'comercializacao',
	catalogo: 'comercializacao',
	producao: 'comercializacao'
};

export const moduloDe = (slug: string): Modulo | undefined => modulosPorRecurso[slug];

export const texturaModulo = (m: Modulo): 'madeira' | 'graos' | 'couro' | 'folhas' | 'terra' => ({
	cooperados: 'madeira',
	compras: 'graos',
	estoque: 'couro',
	comercializacao: 'folhas'
} as const)[m];
