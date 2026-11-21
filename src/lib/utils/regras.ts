import type { Cooperado, Campanha, PedidoInsumo } from '#lib/mock/tipos.ts';

export const totalPedido = (p: PedidoInsumo) => p.itens.reduce((s, i) => s + i.quantidade * i.valorUnit, 0);

/** RN10: limite do cooperado para um insumo numa campanha = cotas × limite por cota. */
export function limiteCotas(coop: Cooperado, camp: Campanha, insumoId: number): number {
	const item = camp.itens.find((i) => i.insumoId === insumoId);
	return item ? coop.qtdCotas * item.limitePorCota : 0;
}

/** Quanto o cooperado já pediu (pedidos não cancelados) de um insumo numa campanha. */
export function jaPedido(pedidos: PedidoInsumo[], coopId: number, campId: number, insumoId: number, ignorarId?: number) {
	return pedidos
		.filter((p) => p.cooperadoId === coopId && p.campanhaId === campId && p.status !== 'Cancelado' && p.id !== ignorarId)
		.flatMap((p) => p.itens)
		.filter((i) => i.insumoId === insumoId)
		.reduce((s, i) => s + i.quantidade, 0);
}
