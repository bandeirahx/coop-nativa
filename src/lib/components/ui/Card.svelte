<script lang="ts">
	import type { Snippet } from 'svelte';
	let { titulo = '', children, class: cls = '' }: { titulo?: string; children: Snippet; class?: string } = $props();
</script>

<section class="painel p-5 {cls}">
	{#if titulo}<h2 class="mb-3 text-xl">{titulo}</h2>{/if}
	{@render children()}
</section>
