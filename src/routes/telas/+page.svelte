<script lang="ts">
	import { telas } from '#lib/telas.ts';
	import { entrar, type Perfil } from '#lib/stores/auth.ts';
	import Button from '#lib/components/ui/Button.svelte';
	const grupos = Object.entries(Object.groupBy(telas, (t) => `${t.rf}: ${t.rfTitulo}`));
	const rotuloPerfil = { gestor: 'Gestor', agricultor: 'Agricultor', publico: 'Público' };
	const usar = (p: Perfil) => entrar(p);
</script>

<svelte:head><title>Índice de telas · Nativa Coop</title></svelte:head>
<main class="mx-auto max-w-4xl p-6">
	<img src="/logo.png" alt="Nativa Coop" class="mb-4 h-14 w-auto" />
	<h1 class="text-3xl">Índice de telas</h1>
	<p class="mt-1 text-marrom">Para tirar os prints do documento. Escolha o perfil e abra cada tela.</p>
	<div class="my-4 flex flex-wrap gap-2">
		<Button variante="contorno" onclick={() => usar('gestor')}>Entrar como Gestor</Button>
		<Button variante="contorno" onclick={() => usar('operacional')}>Entrar como Operacional</Button>
		<Button variante="contorno" onclick={() => usar('agricultor')}>Entrar como Agricultor</Button>
	</div>
	{#each grupos as [titulo, itens]}
		<section class="mt-8"><h2 class="mb-2 text-xl">{titulo}</h2>
			<ul class="divide-y divide-borda rounded-[var(--radius-card)] border border-borda">
				{#each itens ?? [] as t}
					<li class="flex flex-wrap items-center justify-between gap-2 p-3"><span><strong class="text-verde-escuro">{t.uc}</strong> · {t.titulo} <span class="text-xs text-marrom">({rotuloPerfil[t.perfil]})</span></span>
						<a class="font-semibold text-verde-escuro underline" href={t.rota}>{t.rota}</a></li>
				{/each}
			</ul></section>
	{/each}
</main>
