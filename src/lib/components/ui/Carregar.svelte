<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { duracao } from '#lib/utils/movimento.ts';
	let { children, ms = 350 }: { children: Snippet; ms?: number } = $props();
	let pronto = $state(false);
	onMount(() => { const t = setTimeout(() => (pronto = true), ms); return () => clearTimeout(t); });
</script>

{#if pronto}
	<div in:fade={{ duration: duracao(200) }}>{@render children()}</div>
{:else}
	<div role="status" aria-label="Carregando" class="flex flex-col items-center gap-5 py-10" in:fade={{ duration: duracao(160) }}>
		<div class="spinner" aria-hidden="true"></div>
		<div class="w-full max-w-xl">
			<div class="mb-4 h-9 w-2/5 rounded-btn bg-borda/60"></div>
			<div class="mb-3 h-24 rounded-card bg-borda/50"></div>
			{#each [1, 2, 3] as n (n)}<div class="mb-2 h-10 rounded-btn bg-borda/40"></div>{/each}
		</div>
		<span class="sr-only">Carregando…</span>
	</div>
{/if}
