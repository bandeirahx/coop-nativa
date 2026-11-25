<script lang="ts">
	import { page } from '$app/state';
	import { pedidos } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import StatusGrande from '#lib/components/ui/StatusGrande.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { totalPedido } from '#lib/utils/regras.ts';
	import { nomeCampanha, nomeInsumo } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { ArrowLeft } from 'lucide-svelte';
	const p = $derived($pedidos.find((x) => x.id === Number(page.params.id) && x.cooperadoId === $meuCoop?.id));
</script>

<ModuloHero modulo="compras" titulo={p ? `Pedido #${p.id}` : 'Pedido não encontrado'} subtitulo={p ? `${nomeCampanha(p.campanhaId)} · ${data(p.data)}` : undefined} uc="UC05.2" />

{#if !p}
	<div class="mt-5"><EmptyState titulo="Pedido não encontrado" texto="O endereço pode estar incorreto ou o pedido não pertence ao seu cadastro." /></div>
{:else}
	<div class="mt-5"><StatusGrande status={p.status} /></div>
	<ul class="mt-5 divide-y divide-borda rounded-card border border-borda bg-areia">
		{#each p.itens as i}<li class="flex justify-between gap-3 p-4"><span class="font-bold">{i.quantidade} × {nomeInsumo(i.insumoId)}</span><span>{moeda(i.quantidade * i.valorUnit)}</span></li>{/each}
	</ul>
	<p class="mt-4 text-right font-titulo text-3xl font-extrabold text-marrom">Total: {moeda(totalPedido(p))}</p>
{/if}
<div class="mt-6"><Button href="/produtor/pedidos" variante="contorno"><ArrowLeft size={16} aria-hidden="true" />Voltar para meus pedidos</Button></div>
