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

	/* Cor do acento por módulo */
	const corModulo = $derived({
		cooperados: 'var(--cor-modulo-cooperados)',
		compras: 'var(--cor-modulo-compras)',
		estoque: 'var(--cor-modulo-estoque)',
		comercializacao: 'var(--cor-modulo-comercializacao)'
	}[modulo] ?? 'var(--cor-base-oliva)');

	const base =
		'btn-base inline-flex items-center justify-center gap-2 rounded-btn font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed';
	const tam = grande ? 'min-h-12 px-6 text-lg' : 'min-h-10 px-4 text-base';
	const cor = $derived({
		primario: `bg-oliva text-areia hover:bg-terracota focus-visible:bg-terracota shadow-suave`,
		secundario: 'bg-cafe text-areia hover:bg-marrom-profundo shadow-suave',
		acento: `bg-${modulo ? 'terracota' : 'oliva'} text-areia hover:opacity-90 shadow-suave`,
		perigo: 'bg-erro text-areia hover:bg-erro/90 shadow-suave',
		contorno: 'border border-borda bg-areia text-marrom-profundo hover:bg-areia/50'
	}[variante]);
</script>

{#if href}
	<a {href} class="{base} {tam} {cor} {cls}" style="--cor-btn: {corModulo}">{@render children()}</a>
{:else}
	<button class="{base} {tam} {cor} {cls}" {...resto}>{@render children()}</button>
{/if}
