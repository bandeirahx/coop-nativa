<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		variante?: 'primario' | 'secundario' | 'acento' | 'perigo';
		grande?: boolean;
		href?: string;
		children: Snippet;
	};
	let { variante = 'primario', grande = false, href, children, class: cls = '', ...resto }: Props = $props();

	const base =
		'btn-base inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
	const tam = grande ? 'btn-grande' : 'px-4 py-2 text-base';
	const cor = $derived(
		{
			primario: 'btn-primario',
			secundario: 'btn-secundario',
			acento: 'btn-acento',
			perigo: 'btn-primario bg-erro hover:bg-erro-escuro'
		}[variante]
	);
</script>

{#if href}
	<a {href} class="{base} {tam} {cor} {cls}">{@render children()}</a>
{:else}
	<button class="{base} {tam} {cor} {cls}" {...resto}>{@render children()}</button>
{/if}
