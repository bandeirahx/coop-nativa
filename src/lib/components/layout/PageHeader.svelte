<script lang="ts">
	import type { Snippet } from 'svelte';
	let { titulo, uc = '', acoes }: { titulo: string; uc?: string; acoes?: Snippet } = $props();
</script>

<svelte:head><title>{titulo} · Nativa Coop</title></svelte:head>
<div class="mb-6 flex flex-wrap items-end justify-between gap-3">
	<div class="relative z-10">
		{#if uc}<p class="text-xs font-semibold text-verde-oliva">{uc}</p>{/if}
		<h1 class="text-2xl font-titulo">{titulo}</h1>
	</div>
	{#if acoes}<div class="flex flex-wrap gap-2">{@render acoes()}</div>{/if}
</div>
