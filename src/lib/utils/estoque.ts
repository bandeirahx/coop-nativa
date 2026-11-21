import { get } from 'svelte/store';
import { estoque, movimentacoes } from '#lib/stores/dados.ts';

const novoIdMov = () => 'MOV-' + String(get(movimentacoes).length + 1).padStart(4, '0');

/** RN11: toda entrada/saída gera movimentação com identificador único e atualiza o saldo. */
export function movimentar(tipo: 'entrada' | 'saida', insumoId: number, quantidade: number, descricao: string, origem: string) {
	const id = novoIdMov();
	movimentacoes.adicionar({ id, data: new Date().toISOString().slice(0, 10), tipo, insumoId, quantidade, descricao, origem });
	const atual = get(estoque).find((e) => e.insumoId === insumoId);
	const delta = tipo === 'entrada' ? quantidade : -quantidade;
	if (atual) estoque.alterar(insumoId, { qtd: atual.qtd + delta });
	else estoque.adicionar({ id: insumoId, insumoId, qtd: delta, minimo: 0 } as any);
	return id;
}
export const saldo = (insumoId: number) => get(estoque).find((e) => e.insumoId === insumoId)?.qtd ?? 0;
