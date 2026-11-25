<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { compras } from '#lib/stores/dados.ts';
	import { nomeFornecedor } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
</script>

<svelte:head><title>Compras coletivas · Nativa Coop</title></svelte:head>

<ModuloHero
	modulo="compras"
	titulo="Compras coletivas"
	subtitulo="Consolidações e pedidos fechados com fornecedores para toda a cooperativa."
	uc="RF06: Gerenciar Compras Coletivas"
>
	{#snippet acoes()}<Button href="/gestao/compras/nova" grande><Plus size={18} aria-hidden="true" />Nova compra coletiva</Button>{/snippet}
</ModuloHero>

<Table colunas={['Nº', 'Consolidação', 'Fornecedor', 'Data', 'Valor total', 'Situação', 'Ações']} vazia={$compras.length === 0}>
	{#each $compras as c}
		<tr><td data-label="Nº">#{c.id}</td><td data-label="Consolidação">#{c.consolidacaoId}</td><td data-label="Fornecedor">{nomeFornecedor(c.fornecedorId)}</td><td data-label="Data">{data(c.data)}</td>
			<td data-label="Valor total">{moeda(c.valorTotal)}</td><td data-label="Situação"><Badge status={c.status === 'Pendente' ? 'Pendente' : 'Recebida'} /></td>
			<td data-label="Ações"><a class="font-semibold text-oliva underline" href="/gestao/compras/{c.id}">Ver</a></td></tr>
	{/each}
</Table>
