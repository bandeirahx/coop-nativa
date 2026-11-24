<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		titulo,
		subtitulo,
		uc,
		textura, // 'madeira' | 'graos' | 'couro' | 'folhas' | 'fruta' | 'terra'
		children
	}: {
		titulo: string;
		subtitulo?: string;
		uc?: string;
		textura?: 'madeira' | 'graos' | 'couro' | 'folhas' | 'fruta' | 'terra';
		children?: Snippet;
	} = $props();

	const imagem = $derived(textura ? `var(--tex-${textura})` : 'var(--tex-terra)');
	const overlay = $derived('var(--overlay-medio)');

	// Ruído fotográfico sutil (sem arquivo binário extra): SVG de fractal noise embutido.
	const ruido =
		"url('data:image/svg+xml,%3Csvg xmlns=http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%3E%3Cfilter id=n%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.6 numOctaves=3 stitchTiles=stitch/%3E%3CfeColorMatrix type=matrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width=100%25 height=100%25 filter=url(%23n)/%3E%3C/svg%3E')";
</script>

<div class="relative isolate overflow-hidden">
	<div class="absolute inset-0 -z-10" style="background-image: {imagem}; background-size: cover; background-position: center; background-repeat: no-repeat;" aria-hidden="true"></div>
	<div class="absolute inset-0 -z-10" style="background: {overlay}, {ruido}; background-blend-mode: multiply;" aria-hidden="true"></div>

	<div class="mx-auto max-w-6xl px-4 py-16 lg:py-24 relative z-10">
		{#if uc}
			<p class="mb-3 text-sm font-semibold tracking-wider uppercase text-sobre-imagem">{uc}</p>
		{/if}
		<h1 class="text-4xl font-titulo font-bold text-branco lg:text-5xl">{titulo}</h1>
		{#if subtitulo}
			<p class="mt-4 text-lg text-sobre-imagem/90 max-w-2xl">{subtitulo}</p>
		{/if}
		{#if children}
			<div class="mt-8">{@render children()}</div>
		{/if}
	</div>
</div>
