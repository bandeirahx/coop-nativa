<script lang="ts">
	import { propriedades } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	const minhas = $derived($propriedades.filter((p) => p.cooperadoId === $meuCoop?.id));
</script>

<svelte:head><title>Minhas propriedades · Nativa Coop</title></svelte:head>
<h1 class="mb-1 text-3xl">Minhas propriedades</h1><p class="mb-5 text-xs text-marrom">UC02.3 · somente consulta</p>
{#if !minhas.length}<p class="rounded-lg bg-branco p-6 text-center">Nenhuma propriedade cadastrada.</p>{/if}
<ul class="flex flex-col gap-4">
	{#each minhas as p}
		<li class="rounded-[var(--radius-card)] border border-borda bg-branco p-5 shadow-suave"><h2 class="text-xl">{p.nome}</h2>
			<p class="text-marrom">{p.municipio} · {p.areaTotal} hectares</p><p class="mt-1">Produção: <strong>{p.tipoProducao}</strong></p><p class="text-marrom">{p.endereco}</p></li>
	{/each}
</ul>
<a href="/produtor/capacidade" class="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-oliva px-6 text-xl font-bold text-branco">Ver o que posso produzir</a>
