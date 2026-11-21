<script lang="ts">
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { compras } from '#lib/stores/dados.ts';
	import { nomeFornecedor } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
</script>

<PageHeader titulo="Compras coletivas" uc="RF06: Gerenciar Compras Coletivas">
	{#snippet acoes()}<Button href="/gestao/compras/nova"><Plus size={18} aria-hidden="true" />Nova compra coletiva</Button>{/snippet}
</PageHeader>
<Table colunas={['Nº', 'Consolidação', 'Fornecedor', 'Data', 'Valor total', 'Situação', 'Ações']} vazia={$compras.length === 0}>
	{#each $compras as c}
		<tr><td data-label="Nº">#{c.id}</td><td data-label="Consolidação">#{c.consolidacaoId}</td><td data-label="Fornecedor">{nomeFornecedor(c.fornecedorId)}</td><td data-label="Data">{data(c.data)}</td>
			<td data-label="Valor total">{moeda(c.valorTotal)}</td><td data-label="Situação"><Badge status={c.status === 'Pendente' ? 'Pendente' : 'Recebida'} /></td>
			<td data-label="Ações"><a class="font-semibold text-verde-escuro underline" href="/gestao/compras/{c.id}">Ver</a></td></tr>
	{/each}
</Table>
