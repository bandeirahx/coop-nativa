import type { Perfil } from '#lib/stores/auth.ts';
import { Users, MapPinned, Wheat, Megaphone, ClipboardList, Layers, Truck, ShoppingCart, PackageCheck, Warehouse, PackageOpen, Sprout, BookOpen, Handshake, Receipt, LayoutDashboard } from 'lucide-svelte';

/** Recursos em que só o Gestor pode cadastrar/editar (conforme tabela RF × atores). */
const soGestor = new Set(['cooperados', 'propriedades', 'capacidade', 'campanhas', 'pedidos', 'producao']);
export const podeEscrever = (perfil: Perfil | undefined, recurso: string) =>
	perfil === 'gestor' || (perfil === 'operacional' && !soGestor.has(recurso));

export const grupos = [
	{ titulo: 'Cadastros', itens: [
		{ rotulo: 'Cooperados', href: '/gestao/cooperados', icone: Users },
		{ rotulo: 'Propriedades', href: '/gestao/propriedades', icone: MapPinned },
		{ rotulo: 'Capacidade Produtiva', href: '/gestao/capacidade', icone: Wheat }] },
	{ titulo: 'Compras de Insumos', itens: [
		{ rotulo: 'Campanhas', href: '/gestao/campanhas', icone: Megaphone },
		{ rotulo: 'Pedidos', href: '/gestao/pedidos', icone: ClipboardList },
		{ rotulo: 'Consolidação', href: '/gestao/consolidacao', icone: Layers },
		{ rotulo: 'Fornecedores', href: '/gestao/fornecedores', icone: Truck },
		{ rotulo: 'Compras Coletivas', href: '/gestao/compras', icone: ShoppingCart },
		{ rotulo: 'Recebimento', href: '/gestao/recebimento', icone: PackageCheck }] },
	{ titulo: 'Estoque e Distribuição', itens: [
		{ rotulo: 'Estoque', href: '/gestao/estoque', icone: Warehouse },
		{ rotulo: 'Distribuição', href: '/gestao/distribuicao', icone: PackageOpen }] },
	{ titulo: 'Produção e Vendas', itens: [
		{ rotulo: 'Produção', href: '/gestao/producao', icone: Sprout },
		{ rotulo: 'Catálogo', href: '/gestao/catalogo', icone: BookOpen },
		{ rotulo: 'Compradores', href: '/gestao/compradores', icone: Handshake },
		{ rotulo: 'Pedidos de Comercialização', href: '/gestao/comercializacao', icone: Receipt }] }
];
export const itemDashboard = { rotulo: 'Painel', href: '/gestao', icone: LayoutDashboard };
