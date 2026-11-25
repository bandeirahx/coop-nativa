<script lang="ts">
	import { telas } from '#lib/telas.ts';
	import { entrar, type Perfil } from '#lib/stores/auth.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	const grupos = Object.entries(Object.groupBy(telas, (t) => `${t.rf}: ${t.rfTitulo}`));
	const rotuloPerfil = { gestor: 'Gestor', agricultor: 'Agricultor', publico: 'Público' };
	const usar = (p: Perfil) => entrar(p);
</script>

<svelte:head><title>Índice de telas · Nativa Coop</title></svelte:head>
<main class="fundo-app mx-auto max-w-4xl p-4 sm:p-6">
	<div class="painel painel-conteudo">
		<Logo tamanho="h-14" fundo="areia" />
		<h1 class="mt-4 text-4xl">Índice de telas</h1>
		<p class="mt-2 text-lg text-marrom">Para tirar os prints do documento. Escolha o perfil e abra cada tela.</p>
		<div class="my-5 flex flex-wrap gap-2">
			<Button variante="contorno" onclick={() => usar('gestor')}>Entrar como Gestor</Button>
			<Button variante="contorno" onclick={() => usar('operacional')}>Entrar como Operacional</Button>
			<Button variante="contorno" onclick={() => usar('agricultor')}>Entrar como Agricultor</Button>
		</div>
		{#each grupos as [titulo, itens]}
			<section class="mt-8"><h2 class="mb-3 text-2xl">{titulo}</h2>
				<ul class="divide-y divide-borda rounded-card border border-borda">
					{#each itens ?? [] as t}
						<li class="flex flex-wrap items-center justify-between gap-2 p-3"><span><strong class="text-oliva">{t.uc}</strong> · {t.titulo} <span class="text-xs text-marrom">({rotuloPerfil[t.perfil]})</span></span>
							<a class="font-semibold text-oliva underline" href={t.rota}>{t.rota}</a></li>
					{/each}
				</ul></section>
		{/each}
	</div>
</main>
