<script lang="ts">
	import type { Snippet } from 'svelte';

	type Modulo = 'cooperados' | 'compras' | 'estoque' | 'comercializacao';

	let {
		modulo,
		titulo,
		subtitulo,
		uc,
		texturaForaDoModulo, // textura alternativa quando o modulo nao define uma (ex.: header/login usam terra)
		children
	}: {
		modulo?: Modulo;
		titulo: string;
		subtitulo?: string;
		uc?: string;
		texturaForaDoModulo?: 'madeira' | 'graos' | 'couro' | 'folhas' | 'fruta' | 'terra';
		children?: Snippet;
	} = $props();

	const texturaPorModulo: Record<Modulo | undefined, string> = {
		cooperados: 'var(--tex-madeira)',
		compras: 'var(--tex-graos)',
		estoque: 'var(--tex-couro)',
		comercializacao: 'var(--tex-folhas)',
		undefined: 'var(--tex-terra)'
	};

	const overlayPorModulo: Record<Modulo | undefined, string> = {
		cooperados: 'var(--overlay-cooperados)',
		compras: 'var(--overlay-compras)',
		estoque: 'var(--overlay-estoque)',
		comercializacao: 'var(--overlay-comercializacao)',
		undefined: 'var(--overlay-login)'
	};

	const textura = $derived(texturaForaDoModulo
		? `var(--tex-${texturaForaDoModulo})`
		: texturaPorModulo[modulo] ?? 'var(--tex-terra)');
	const overlay = $derived(overlayPorModulo[modulo] ?? 'var(--overlay-login)');

	// Ruído fotográfico sutil (sem arquivo binário extra): SVG de fractal noise embutido.
	const ruido =
		"url('data:image/svg+xml,%3Csvg xmlns=http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%3E%3Cfilter id=n%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.6 numOctaves=3 stitchTiles=stitch/%3E%3CfeColorMatrix type=matrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width=100%25 height=100%25 filter=url(%23n)/%3E%3C/svg%3E')";
</script>

<div class="relative isolate overflow-hidden">
	<div class="absolute inset-0 -z-10" style="background-image: {textura}; background-size: cover; background-position: center; background-repeat: no-repeat;" aria-hidden="true"></div>
	<div class="absolute inset-0 -z-10" style="background: {overlay}, {ruido}; background-blend-mode: multiply;" aria-hidden="true"></div>

	<div class="mx-auto max-w-6xl px-4 py-16 lg:py-24 relative z-10">
		{#if uc}
			<p class="mb-3 text-sm font-semibold tracking-wider uppercase text-areia">{uc}</p>
		{/if}
		<h1 class="text-4xl font-titulo font-bold text-branco lg:text-5xl">{titulo}</h1>
		{#if subtitulo}
			<p class="mt-4 text-lg text-areia/90 max-w-2xl">{subtitulo}</p>
		{/if}
		{#if children}
			<div class="mt-8">{@render children()}</div>
		{/if}
	</div>
</div>
