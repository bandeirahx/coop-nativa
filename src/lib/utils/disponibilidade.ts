import { get } from 'svelte/store';
import { producoes, pedidosCom } from '#lib/stores/dados.ts';

/** RF13: disponível = produção disponível − quantidades reservadas em outros pedidos (não cancelados). */
export function disponivel(produto: string, ignorarPedidoId?: number): number {
	const prod = get(producoes).filter((p) => p.status === 'Disponível' && p.produto.toLowerCase() === produto.toLowerCase()).reduce((s, p) => s + p.quantidade, 0);
	const reservado = get(pedidosCom).filter((p) => p.status !== 'Cancelado' && p.id !== ignorarPedidoId).flatMap((p) => p.itens).filter((i) => i.produto.toLowerCase() === produto.toLowerCase()).reduce((s, i) => s + i.quantidade, 0);
	return Math.max(0, prod - reservado);
}
