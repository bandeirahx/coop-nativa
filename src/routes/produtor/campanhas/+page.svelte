<script lang="ts">
	import { campanhas } from '#lib/stores/dados.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import StatusGrande from '#lib/components/ui/StatusGrande.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { nomeInsumo } from '#lib/utils/nomes.ts';
	import { data } from '#lib/utils/formato.ts';
	import { CalendarClock } from 'lucide-svelte';
	const hojeMs = new Date('2026-11-17').getTime();
	const dias = (fim: string) => Math.ceil((new Date(fim).getTime() - hojeMs) / 86400000);
	const abertas = $derived($campanhas.filter((c) => c.status === 'Aberta'));
</script>

<svelte:head><title>Campanhas abertas · Nativa Coop</title></svelte:head>
<ModuloHero modulo="compras" titulo="Campanhas abertas" subtitulo="Solicite insumos ao gestor, que registrará o pedido em seu nome." uc="UC04.3 · UC05.1" />

{#if !abertas.length}
	<div class="mt-5"><EmptyState titulo="Nenhuma campanha aberta" texto="Volte em breve ou fale com a cooperativa." /></div>
{:else}
	<ul class="mt-5 flex flex-col gap-4">
		{#each abertas as c}
			<li class="rounded-card border-2 border-borda bg-areia p-5 shadow-suave">
				<div class="mb-2 flex items-start justify-between gap-2"><h2 class="text-xl">{c.nome}</h2><StatusGrande status={c.status} /></div>
				<p class="mb-3 flex items-center gap-2 rounded-btn bg-aviso-claro p-3 font-bold text-aviso-texto"><CalendarClock size={24} aria-hidden="true" />Pedidos até {data(c.dataFim)} ({dias(c.dataFim)} dias)</p>
				<p class="mb-3 text-marrom">Insumos: {c.itens.map((i) => nomeInsumo(i.insumoId)).join(', ')}</p>
				<p class="text-sm text-marrom">Solicite este insumo ao Administrador/Gestor, que registrará o pedido em seu nome.</p>
			</li>
		{/each}
	</ul>
{/if}
