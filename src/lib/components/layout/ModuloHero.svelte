<script lang="ts">
	import type { Snippet } from 'svelte';

	type Modulo = 'cooperados' | 'compras' | 'estoque' | 'comercializacao';
	type Textura = 'madeira' | 'graos' | 'couro' | 'folhas' | 'fruta' | 'terra';

	let {
		modulo,
		titulo,
		subtitulo,
		uc,
		texturaForaDoModulo,
		acoes,
		metricas
	}: {
		modulo?: Modulo;
		titulo: string;
		subtitulo?: string;
		uc?: string;
		texturaForaDoModulo?: Textura;
		acoes?: Snippet;
		metricas?: Snippet;
	} = $props();

	const classes = $derived(
		`hero-modulo ${modulo ? `mod-${modulo}` : ''} ${texturaForaDoModulo ? 'textura' : ''} rounded-[var(--raio-painel)]`
	);
	const estilo = $derived(texturaForaDoModulo ? `--mod-image: var(--tex-${texturaForaDoModulo});` : undefined);
</script>

<section class={classes} style={estilo}>
	<div class="relative z-10 mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 sm:px-8">
		<div>
			{#if uc}<p class="mb-2 text-xs font-bold tracking-[0.18em] text-areia/85 uppercase">{uc}</p>{/if}
			<h1>{titulo}</h1>
			{#if subtitulo}<p class="mt-3 max-w-2xl text-lg text-areia/90">{subtitulo}</p>{/if}
			{#if acoes}<div class="mt-6 flex flex-wrap gap-3">{@render acoes()}</div>{/if}
		</div>
		{#if metricas}<div class="mt-auto flex flex-wrap gap-x-8 gap-y-4 border-t border-areia/25 pt-4">{@render metricas()}</div>{/if}
	</div>
</section>
