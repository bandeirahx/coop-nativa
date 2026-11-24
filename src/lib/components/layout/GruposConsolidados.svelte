<script lang="ts">
	import Card from '#lib/components/ui/Card.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import type { GrupoInsumo } from '#lib/utils/consolidacao.ts';
	import { nomeInsumo, unidadeInsumo, nomeCoop } from '#lib/utils/nomes.ts';
	import { moeda } from '#lib/utils/formato.ts';
	let { grupos, editavel = false, aoAlternar }: { grupos: GrupoInsumo[]; editavel?: boolean; aoAlternar?: (pedidoId: number) => void } = $props();
</script>

<div class="flex flex-col gap-4">
	{#each grupos as g}
		<Card>
			<div class="mb-3 flex flex-wrap items-baseline justify-between gap-2">
				<h3 class="text-lg">{nomeInsumo(g.insumoId)}</h3>
				<p class="text-sm text-marrom">Total consolidado: <strong class="font-titulo text-xl text-verde-escuro">{g.total} {unidadeInsumo(g.insumoId)}</strong> · {moeda(g.total * g.precoUnit)}</p>
			</div>
			<ul class="divide-y divide-borda text-sm">
				{#each g.pedidos as p}
					<li class="flex items-center justify-between gap-3 py-2 {p.excluido ? 'text-marrom line-through opacity-70' : ''}">
						<span>Pedido #{p.pedidoId} · {nomeCoop(p.cooperadoId)}</span>
						<span class="flex items-center gap-3"><strong>{p.quantidade}</strong>
							{#if editavel}<Button variante="contorno" class="!min-h-9" onclick={() => aoAlternar?.(p.pedidoId)}>{p.excluido ? 'Incluir' : 'Remover'}</Button>{/if}</span>
					</li>
				{/each}
			</ul>
		</Card>
	{/each}
</div>
