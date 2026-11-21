import { get } from 'svelte/store';
import { pedidos, campanhas } from '#lib/stores/dados.ts';

export type GrupoInsumo = { insumoId: number; total: number; precoUnit: number; pedidos: { pedidoId: number; cooperadoId: number; quantidade: number; excluido: boolean }[] };

/** UC06.1.1 e UC06.1.2: agrupa os pedidos não cancelados da campanha por insumo. */
export function agrupar(campanhaId: number, excluidos: number[]): GrupoInsumo[] {
	const camp = get(campanhas).find((c) => c.id === campanhaId);
	const mapa = new Map<number, GrupoInsumo>();
	for (const p of get(pedidos).filter((p) => p.campanhaId === campanhaId && p.status !== 'Cancelado'))
		for (const i of p.itens) {
			const g = mapa.get(i.insumoId) ?? { insumoId: i.insumoId, total: 0, precoUnit: camp?.itens.find((x) => x.insumoId === i.insumoId)?.precoUnit ?? i.valorUnit, pedidos: [] };
			const excluido = excluidos.includes(p.id);
			if (!excluido) g.total += i.quantidade;
			g.pedidos.push({ pedidoId: p.id, cooperadoId: p.cooperadoId, quantidade: i.quantidade, excluido });
			mapa.set(i.insumoId, g);
		}
	return [...mapa.values()];
}
export const valorGrupos = (g: GrupoInsumo[]) => g.reduce((s, x) => s + x.total * x.precoUnit, 0);
