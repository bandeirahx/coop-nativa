<script lang="ts">
	let { titulo = 'Nenhum registro encontrado', texto = '' }: { titulo?: string; texto?: string } = $props();
</script>

<div class="rounded-[var(--radius-card)] border border-dashed border-borda p-10 text-center">
	<p class="font-titulo text-lg font-bold text-marrom">{titulo}</p>
	{#if texto}<p class="mt-1 text-marrom">{texto}</p>{/if}
</div>
