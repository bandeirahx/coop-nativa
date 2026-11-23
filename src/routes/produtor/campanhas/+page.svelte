<script lang="ts">
	import { campanhas } from '#lib/stores/dados.ts';
	import StatusGrande from '#lib/components/ui/StatusGrande.svelte';
	import { nomeInsumo } from '#lib/utils/nomes.ts';
	import { data } from '#lib/utils/formato.ts';
	import { CalendarClock } from 'lucide-svelte';
	const hojeMs = new Date('2026-11-17').getTime();
	const dias = (fim: string) => Math.ceil((new Date(fim).getTime() - hojeMs) / 86400000);
	const abertas = $derived($campanhas.filter((c) => c.status === 'Aberta'));
</script>

<svelte:head><title>Campanhas abertas · Nativa Coop</title></svelte:head>
<h1 class="mb-1 text-3xl">Campanhas abertas</h1>
<p class="mb-5 text-marrom">Campanhas disponíveis para consulta. Solicite os insumos ao Administrador/Gestor, que registrará o pedido em seu nome. <span class="text-xs">UC04.3</span></p>
{#if !abertas.length}<p class="rounded-lg bg-branco p-6 text-center">Nenhuma campanha aberta no momento.</p>{/if}
<ul class="flex flex-col gap-4">
	{#each abertas as c}
		<li class="rounded-[var(--radius-card)] border border-borda bg-branco p-5 shadow-suave">
			<div class="mb-2 flex items-start justify-between gap-2"><h2 class="text-xl">{c.nome}</h2><StatusGrande status={c.status} /></div>
			<p class="mb-3 flex items-center gap-2 rounded-lg bg-aviso-claro p-3 font-bold text-aviso-texto"><CalendarClock size={24} aria-hidden="true" />Pedidos até {data(c.dataFim)} ({dias(c.dataFim)} dias)</p>
			<p class="mb-4 text-marrom">Insumos: {c.itens.map((i) => nomeInsumo(i.insumoId)).join(', ')}</p>
			<p class="text-sm text-marrom">Solicite este insumo ao Administrador/Gestor, que registrará o pedido em seu nome (UC05.1).</p>
		</li>
	{/each}
</ul>
