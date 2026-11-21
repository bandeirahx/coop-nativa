<script lang="ts">
	import { capacidades, propriedades } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	const minhas = $derived($capacidades.filter((c) => $propriedades.some((p) => p.id === c.propriedadeId && p.cooperadoId === $meuCoop?.id)));
	const nomeProp = (id: number) => $propriedades.find((p) => p.id === id)?.nome ?? '';
</script>

<svelte:head><title>O que posso produzir · Nativa Coop</title></svelte:head>
<h1 class="mb-1 text-3xl">O que posso produzir</h1><p class="mb-5 text-xs text-marrom">UC03.3 · capacidade produtiva · somente consulta</p>
{#if !minhas.length}<p class="rounded-lg bg-branco p-6 text-center">Nenhuma capacidade cadastrada.</p>{/if}
<ul class="flex flex-col gap-4">
	{#each minhas as c}
		<li class="rounded-[var(--radius-card)] border border-borda bg-branco p-5 shadow-suave"><h2 class="text-xl">{c.produto}</h2>
			<p class="font-titulo text-3xl font-extrabold text-verde-escuro">{c.quantidade.toLocaleString('pt-BR')} {c.unidade}</p><p class="text-marrom">{nomeProp(c.propriedadeId)} · {c.periodo}</p></li>
	{/each}
</ul>
