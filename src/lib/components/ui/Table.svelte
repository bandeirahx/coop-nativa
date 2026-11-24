<script lang="ts">
	import type { Snippet } from 'svelte';
	let { colunas, vazio = 'Nenhum registro encontrado.', vazia = false, children, cabecalhoClasses = '' }: {
		colunas: string[]; vazio?: string; vazia?: boolean; children: Snippet; cabecalhoClasses?: string;
	} = $props();
</script>

<div class="overflow-x-auto rounded-[var(--radius-card)] border border-borda">
	<table class="resp w-full text-left text-sm">
		<thead class="bg-marrom-claro text-marrom {cabecalhoClasses}">
			<tr>{#each colunas as c}<th scope="col" class="px-4 py-3 font-semibold">{c}</th>{/each}</tr>
		</thead>
		<tbody class="[&>tr:nth-child(even)]:bg-marrom-claro/50 [&>tr]:border-t [&>tr]:border-borda [&_td]:px-4 [&_td]:py-3">
			{#if vazia}
				<tr><td colspan={colunas.length} class="!py-10 text-center text-marrom">{vazio}</td></tr>
			{:else}{@render children()}{/if}
		</tbody>
	</table>
</div>
