<script lang="ts">
	import type { Snippet } from 'svelte';
	let { tamanho = 'h-10', fundo = 'areia', classe = '' }: { tamanho?: string; fundo?: 'areia' | 'marrom' | 'transparente'; classe?: string } = $props();
</script>

{#if fundo === 'areia'}
	<div class="logo-selo areia {classe}">
		<img src="/logo.png" alt="Nativa Coop" class="{tamanho} w-auto mix-blend-multiply" />
	</div>
{:else if fundo === 'marrom'}
	<div class="logo-selo marrom {classe}">
		<img src="/logo.png" alt="Nativa Coop" class="{tamanho} w-auto mix-blend-screen" />
	</div>
{:else}
	<img src="/logo.png" alt="Nativa Coop" class="{tamanho} w-auto {classe}" />
{/if}
