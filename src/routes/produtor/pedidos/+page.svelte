<script lang="ts">
	import { pedidos } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import StatusGrande from '#lib/components/ui/StatusGrande.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { totalPedido } from '#lib/utils/regras.ts';
	import { nomeCampanha } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	const meus = $derived($pedidos.filter((p) => p.cooperadoId === $meuCoop?.id).reverse());
</script>

<svelte:head><title>Meus pedidos · Nativa Coop</title></svelte:head>
<ModuloHero modulo="compras" titulo="Meus pedidos" subtitulo="Acompanhe o que você solicitou à cooperativa." uc="UC05.2" />

{#if !meus.length}
	<div class="mt-5"><EmptyState titulo="Você ainda não fez nenhum pedido" texto="Solicite insumos ao gestor durante uma campanha aberta." /></div>
{:else}
	<ul class="mt-5 flex flex-col gap-4">
		{#each meus as p}
			<li><a href="/produtor/pedidos/{p.id}" class="block rounded-card border-2 border-borda bg-areia p-5 shadow-suave transition-all hover:-translate-y-1 hover:border-ouro hover:shadow-media">
				<p class="font-titulo text-xl font-bold">Pedido #{p.id}</p><p class="text-marrom">{nomeCampanha(p.campanhaId)} · {data(p.data)}</p>
				<p class="my-2 font-titulo text-2xl font-extrabold">{moeda(totalPedido(p))}</p><StatusGrande status={p.status} /></a></li>
		{/each}
	</ul>
{/if}
