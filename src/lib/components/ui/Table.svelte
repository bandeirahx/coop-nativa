<script lang="ts">
	import type { Snippet } from 'svelte';
	let { colunas, vazio = 'Nenhum registro encontrado.', vazia = false, children }: {
		colunas: string[]; vazio?: string; vazia?: boolean; children: Snippet;
	} = $props();
</script>

<div class="tabela-wrap">
	<table class="resp w-full text-left text-sm">
		<thead class="bg-marrom-profundo text-branco">
			<tr>{#each colunas as c}<th scope="col" class="px-4 py-3 font-semibold uppercase text-xs tracking-wide">{c}</th>{/each}</tr>
		</thead>
		<tbody class="[&>tr:nth-child(even)]:bg-areia/40 [&>tr]:border-t [&>tr]:border-borda [&_td]:px-4 [&_td]:py-3">
			{#if vazia}
				<tr><td colspan={colunas.length} class="!py-10 text-center text-marrom">{vazio}</td></tr>
			{:else}{@render children()}{/if}
		</tbody>
	</table>
</div>
