<script lang="ts">
	import { pedidos } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import StatusGrande from '#lib/components/ui/StatusGrande.svelte';
	import { totalPedido } from '#lib/utils/regras.ts';
	import { nomeCampanha } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	const meus = $derived($pedidos.filter((p) => p.cooperadoId === $meuCoop?.id).reverse());
</script>

<svelte:head><title>Meus pedidos · Nativa Coop</title></svelte:head>
<h1 class="mb-1 text-3xl">Meus pedidos</h1><p class="mb-5 text-xs text-marrom">UC05.2</p>
{#if !meus.length}<p class="rounded-lg bg-branco p-6 text-center">Você ainda não fez nenhum pedido.</p>{/if}
<ul class="flex flex-col gap-4">
	{#each meus as p}
		<li><a href="/produtor/pedidos/{p.id}" class="block rounded-[var(--radius-card)] border border-borda bg-branco p-5 shadow-suave hover:border-verde">
			<p class="text-xl font-bold">Pedido #{p.id}</p><p class="text-marrom">{nomeCampanha(p.campanhaId)} · {data(p.data)}</p>
			<p class="my-2 font-titulo text-2xl font-extrabold">{moeda(totalPedido(p))}</p><StatusGrande status={p.status} /></a></li>
	{/each}
</ul>
