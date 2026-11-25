<script lang="ts">
	import { propriedades } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	const minhas = $derived($propriedades.filter((p) => p.cooperadoId === $meuCoop?.id));
</script>

<svelte:head><title>Minhas propriedades · Nativa Coop</title></svelte:head>
<ModuloHero modulo="cooperados" titulo="Minhas propriedades" subtitulo="Terras e produção vinculadas ao seu cadastro." uc="UC02.3 · somente consulta" />

{#if !minhas.length}
	<div class="mt-5"><EmptyState titulo="Nenhuma propriedade cadastrada" texto="Procure a cooperativa para atualizar seu cadastro." /></div>
{:else}
	<ul class="mt-5 flex flex-col gap-4">
		{#each minhas as p}
			<li class="rounded-card border-2 border-borda bg-areia p-5 shadow-suave">
				<div class="flex items-start justify-between gap-3"><h2 class="text-xl">{p.nome}</h2><ArrowUpRight size={20} aria-hidden="true" /></div>
				<p class="text-marrom">{p.municipio} · {p.areaTotal} hectares</p><p class="mt-1">Produção: <strong>{p.tipoProducao}</strong></p><p class="text-marrom">{p.endereco}</p>
			</li>
		{/each}
	</ul>
{/if}
<a href="/produtor/capacidade" class="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-btn bg-oliva px-6 font-titulo text-lg font-bold text-areia transition-colors hover:bg-cafe">Ver o que posso produzir</a>
