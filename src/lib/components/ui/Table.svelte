<script lang="ts">
	import type { Snippet } from 'svelte';
	let { colunas, vazio = 'Nenhum registro encontrado.', vazia = false, children, cabecalhoClasses = '' }: {
		colunas: string[]; vazio?: string; vazia?: boolean; children: Snippet; cabecalhoClasses?: string;
	} = $props();
</script>

<div class="tabela-painel">
	<table class="resp">
		<thead class={cabecalhoClasses}>
			<tr>{#each colunas as c}<th scope="col" class="px-4 py-3 font-semibold">{c}</th>{/each}</tr>
		</thead>
		<tbody>
			{#if vazia}
				<tr><td colspan={colunas.length} class="!py-10 text-center text-marrom">{vazio}</td></tr>
			{:else}{@render children()}{/if}
		</tbody>
	</table>
</div>
