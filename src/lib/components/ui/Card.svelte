<script lang="ts">
	import type { Snippet } from 'svelte';
	let { titulo = '', textura = '', children, class: cls = '' }: {
		titulo?: string;
		textura?: 'madeira' | 'graos' | 'couro' | 'frutos' | 'folhas' | '';
		children: Snippet;
		class?: string;
	} = $props();
</script>

<section class="card-textura card-{textura || 'padrao'} border border-borda shadow-suave {cls}">
	<div class="card-conteudo p-5">
		{#if titulo}<h2 class="mb-3 text-lg font-titulo">{titulo}</h2>{/if}
		{@render children()}
	</div>
</section>
