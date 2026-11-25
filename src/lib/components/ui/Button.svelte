<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		variante?: 'primario' | 'secundario' | 'acento' | 'perigo' | 'contorno';
		modulo?: 'cooperados' | 'compras' | 'estoque' | 'comercializacao';
		grande?: boolean;
		href?: string;
		children: Snippet;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		title?: string;
		'aria-label'?: string;
		id?: string;
		name?: string;
		value?: string;
	};
	let {
		variante = 'primario', modulo, grande = false, href, children,
		class: cls = '', onclick, disabled, type = 'button', title, 'aria-label': ariaLabel, id, name, value
	}: Props = $props();

	const corModulo = $derived(
		modulo
			? ({ cooperados: 'var(--cor-acento-terracota)', compras: 'var(--cor-acento-ouro)', estoque: 'var(--cor-acento-vinho)', comercializacao: 'var(--cor-acento-azul)' }[modulo])
			: 'var(--mod-accent, var(--cor-base-oliva))'
	);
	const corFundo = $derived(variante === 'secundario' ? 'var(--cor-base-cafe)' : variante === 'perigo' ? 'var(--cor-acento-vinho)' : corModulo);
	const corTexto = $derived(corFundo === 'var(--cor-acento-ouro)' ? 'var(--cor-base-marrom-profundo)' : 'var(--cor-base-areia)');
	const classes = $derived(`btn-base btn-${variante} inline-flex items-center justify-center gap-2 font-semibold ${grande ? 'min-h-12 px-7 text-lg' : 'min-h-11 px-5 text-base'} ${cls}`);
	const estilo = $derived(`--btn-bg: ${corFundo}; --btn-fg: ${corTexto};`);
</script>

{#if href}
	<a {href} {id} {title} aria-label={ariaLabel} {onclick} class={classes} style={estilo}>{@render children()}</a>
{:else}
	<button {type} {disabled} {id} {name} {value} {title} aria-label={ariaLabel} {onclick} class={classes} style={estilo}>{@render children()}</button>
{/if}
