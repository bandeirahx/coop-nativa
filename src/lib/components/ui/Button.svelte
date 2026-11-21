<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		variante?: 'primario' | 'secundario' | 'contorno' | 'perigo';
		grande?: boolean;
		href?: string;
		children: Snippet;
	};
	let { variante = 'primario', grande = false, href, children, class: cls = '', ...resto }: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
	const tam = $derived(grande ? 'min-h-14 px-6 text-[1.25rem]' : 'min-h-11 px-4 text-[1.17rem]');
	const cor = $derived(
		{
			primario: 'bg-verde text-branco hover:bg-verde-escuro focus-visible:bg-verde-escuro',
			secundario: 'bg-marrom text-branco hover:bg-marrom-escuro',
			contorno: 'border border-borda bg-branco text-marrom hover:bg-marrom-claro',
			perigo: 'bg-erro text-branco hover:opacity-90'
		}[variante]
	);
</script>

{#if href}
	<a {href} class="{base} {tam} {cor} {cls}">{@render children()}</a>
{:else}
	<button class="{base} {tam} {cor} {cls}" {...resto}>{@render children()}</button>
{/if}
