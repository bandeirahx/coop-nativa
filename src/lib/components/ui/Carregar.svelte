<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	let { children, ms = 350 }: { children: Snippet; ms?: number } = $props();
	let pronto = $state(false);
	onMount(() => { const t = setTimeout(() => (pronto = true), ms); return () => clearTimeout(t); });
</script>

{#if pronto}
	{@render children()}
{:else}
	<div role="status" aria-label="Carregando" class="animate-pulse">
		<div class="mb-6 h-8 w-64 rounded-lg bg-borda"></div>
		<div class="mb-4 h-24 rounded-[var(--radius-card)] bg-borda/70"></div>
		{#each [1, 2, 3, 4] as n (n)}<div class="mb-3 h-12 rounded-lg bg-borda/50"></div>{/each}
		<span class="sr-only">Carregando…</span>
	</div>
{/if}
