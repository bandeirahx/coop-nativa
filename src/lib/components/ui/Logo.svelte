<script lang="ts">
	let { tamanho = 'h-10', fundo = 'areia', classe = '' }: { tamanho?: string; fundo?: 'areia' | 'marrom' | 'transparente'; classe?: string } = $props();
</script>

{#if fundo === 'areia'}
	<div class="logo-selo areia {classe}">
		<img src="/images/novas/logo-selo.png" alt="Nativa Coop" class="{tamanho} w-auto mix-blend-multiply" />
	</div>
{:else if fundo === 'marrom'}
	<div class="logo-selo marrom {classe}">
		<img src="/images/novas/logo-selo.png" alt="Nativa Coop" class="{tamanho} w-auto mix-blend-screen" />
	</div>
{:else}
	<div class="{classe}">
		<img src="/images/novas/logo-selo.png" alt="Nativa Coop" class="{tamanho} w-auto" />
	</div>
{/if}
