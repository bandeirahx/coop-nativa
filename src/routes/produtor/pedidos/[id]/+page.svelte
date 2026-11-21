<script lang="ts">
	import { page } from '$app/state';
	import { pedidos } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import StatusGrande from '#lib/components/ui/StatusGrande.svelte';
	import { totalPedido } from '#lib/utils/regras.ts';
	import { nomeCampanha, nomeInsumo } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { ArrowLeft } from 'lucide-svelte';
	const p = $derived($pedidos.find((x) => x.id === Number(page.params.id) && x.cooperadoId === $meuCoop?.id));
</script>

<a href="/produtor/pedidos" class="mb-4 inline-flex min-h-12 items-center gap-2 font-bold text-verde-escuro"><ArrowLeft size={22} aria-hidden="true" />Voltar</a>
{#if !p}<p class="rounded-lg bg-branco p-6 text-center">Pedido não encontrado.</p>{:else}
	<h1 class="text-3xl">Pedido #{p.id}</h1>
	<p class="mb-3 text-marrom">{nomeCampanha(p.campanhaId)} · {data(p.data)}</p><StatusGrande status={p.status} />
	<ul class="mt-5 divide-y divide-borda rounded-[var(--radius-card)] border border-borda bg-branco">
		{#each p.itens as i}<li class="flex justify-between gap-3 p-4"><span class="font-bold">{i.quantidade} × {nomeInsumo(i.insumoId)}</span><span>{moeda(i.quantidade * i.valorUnit)}</span></li>{/each}
	</ul>
	<p class="mt-4 text-right font-titulo text-3xl font-extrabold">Total: {moeda(totalPedido(p))}</p>
{/if}
