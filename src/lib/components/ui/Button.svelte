<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		variante?: 'primario' | 'secundario' | 'acento' | 'perigo' | 'contorno';
		modulo?: 'cooperados' | 'compras' | 'estoque' | 'comercializacao';
		grande?: boolean;
		href?: string;
		children: Snippet;
	};
	let { variante = 'primario', modulo, grande = false, href, children, class: cls = '', ...resto }: Props = $props();

	const base =
		'btn-base inline-flex items-center justify-center gap-2 rounded-btn font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed';
	const tam = grande ? 'min-h-12 px-6 text-lg' : 'min-h-10 px-4 text-base';
	const cor = {
		primario: `bg-verde text-branco hover:bg-verde-escuro focus-visible:bg-verde-escuro shadow-suave`,
		secundario: 'bg-marrom text-branco hover:bg-marrom-escuro shadow-suave',
		contorno: 'border border-borda bg-branco text-marrom hover:bg-marrom-claro',
		perigo: 'bg-erro text-branco hover:bg-erro/90 shadow-suave'
	}[variante];
</script>

{#if href}
	<a {href} class="{base} {tam} {cor} {cls}">{@render children()}</a>
{:else}
	<button class="{base} {tam} {cor} {cls}" {...resto}>{@render children()}</button>
{/if}
