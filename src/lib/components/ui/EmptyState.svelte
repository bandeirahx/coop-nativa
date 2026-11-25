<script lang="ts">
	import { Sprout } from 'lucide-svelte';
	let { titulo = 'Nenhum registro encontrado', texto = '' }: { titulo?: string; texto?: string } = $props();
</script>

<div class="estado-vazio">
	<Sprout size={36} class="mx-auto mb-3 text-oliva" aria-hidden="true" />
	<p class="font-titulo text-xl font-bold text-marrom">{titulo}</p>
	{#if texto}<p class="mt-2 text-marrom">{texto}</p>{/if}
</div>
