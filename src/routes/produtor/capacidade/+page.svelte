<script lang="ts">
	import { capacidades, propriedades } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	const minhas = $derived($capacidades.filter((c) => $propriedades.some((p) => p.id === c.propriedadeId && p.cooperadoId === $meuCoop?.id)));
	const nomeProp = (id: number) => $propriedades.find((p) => p.id === id)?.nome ?? '';
</script>

<svelte:head><title>O que posso produzir · Nativa Coop</title></svelte:head>
<ModuloHero modulo="cooperados" titulo="O que posso produzir" subtitulo="Capacidade produtiva declarada das suas propriedades." uc="UC03.3 · somente consulta" />

{#if !minhas.length}
	<div class="mt-5"><EmptyState titulo="Nenhuma capacidade cadastrada" texto="Atualize a capacidade da sua propriedade na cooperativa." /></div>
{:else}
	<ul class="mt-5 flex flex-col gap-4">
		{#each minhas as c}
			<li class="rounded-card border-2 border-borda bg-areia p-5 shadow-suave"><h2 class="text-xl">{c.produto}</h2>
				<p class="metrica mt-2 text-oliva">{c.quantidade.toLocaleString('pt-BR')} <span class="text-lg">{c.unidade}</span></p><p class="mt-1 text-marrom">{nomeProp(c.propriedadeId)} · {c.periodo}</p></li>
		{/each}
	</ul>
{/if}
