<script lang="ts">
	import type { Snippet } from 'svelte';
	let { titulo = '', children, class: cls = '' }: { titulo?: string; children: Snippet; class?: string } = $props();
</script>

<section class="rounded-[var(--radius-card)] border border-borda bg-areia p-5 shadow-suave {cls}">
	{#if titulo}<h2 class="mb-3 text-lg">{titulo}</h2>{/if}
	{@render children()}
</section>
