<script lang="ts">
	import type { Snippet } from 'svelte';
	let { tamanho = 'h-10', fundo = 'branco', classe = '' } = $props<{ tamanho?: string; fundo?: 'branco' | 'marrom' | 'transparente'; classe?: string }>();
</script>

{#if fundo === 'branco'}
	<div class="logo-selo branco {classe}">
		<img src="/logo.png" alt="Nativa Coop" class="{tamanho} w-auto mix-blend-multiply" />
	</div>
{:else if fundo === 'marrom'}
	<div class="logo-selo marrom {classe}">
		<img src="/logo.png" alt="Nativa Coop" class="{tamanho} w-auto mix-blend-screen" />
	</div>
{:else}
	<img src="/logo.png" alt="Nativa Coop" class="{tamanho} w-auto {classe}" />
{/if}
