<script lang="ts">
	import type { Snippet } from 'svelte';
	let { titulo, uc = '', acoes, modulo }: { titulo: string; uc?: string; acoes?: Snippet; modulo?: 'cooperados' | 'compras' | 'estoque' | 'comercializacao' } = $props();
</script>

<svelte:head><title>{titulo} · Nativa Coop</title></svelte:head>
<div class="mb-6 flex flex-wrap items-end justify-between gap-3 {modulo ? `mod-${modulo}` : ''}">
	<div class="relative z-10 border-l-[6px] border-[var(--mod-accent,var(--cor-base-oliva))] pl-4">
		{#if uc}<p class="text-xs font-bold tracking-wider text-mod uppercase">{uc}</p>{/if}
		<h1 class="text-3xl font-titulo font-bold text-marrom-profundo">{titulo}</h1>
	</div>
	{#if acoes}<div class="flex flex-wrap gap-2">{@render acoes()}</div>{/if}
</div>
