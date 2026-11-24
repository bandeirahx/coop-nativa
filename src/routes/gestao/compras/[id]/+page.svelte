<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { compras, consolidacoes } from '#lib/stores/dados.ts';
	import { agrupar } from '#lib/utils/consolidacao.ts';
	import { nomeFornecedor, nomeInsumo, nomeCampanha } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { ArrowLeft, PackageCheck } from 'lucide-svelte';
	const c = $derived($compras.find((x) => x.id === Number(page.params.id)));
	const cons = $derived($consolidacoes.find((x) => x.id === c?.consolidacaoId));
	const grupos = $derived(cons ? agrupar(cons.campanhaId, cons.excluidos) : []);
</script>

{#if !c}<EmptyState titulo="Compra não encontrada" />{:else}
	<PageHeader titulo="Compra coletiva #{c.id}" uc="RF06: Gerenciar Compras Coletivas">
		{#snippet acoes()}<Button href="/gestao/compras" variante="secundario"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if c.status === 'Pendente'}<Button href="/gestao/recebimento/nova?compra={c.id}"><PackageCheck size={16} aria-hidden="true" />Registrar recebimento</Button>{/if}{/snippet}
	</PageHeader>
	<Card class="mb-6 max-w-3xl"><dl class="grid gap-4 sm:grid-cols-2">
		<div><dt class="text-sm font-semibold text-marrom">Fornecedor</dt><dd>{nomeFornecedor(c.fornecedorId)}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Campanha</dt><dd>{cons ? nomeCampanha(cons.campanhaId) : '—'}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Data</dt><dd>{data(c.data)}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Situação</dt><dd><Badge status={c.status === 'Pendente' ? 'Pendente' : 'Recebida'} /></dd></div></dl></Card>
	<Table colunas={['Insumo', 'Quantidade', 'Valor unitário', 'Subtotal']}>
		{#each grupos as g}<tr><td data-label="Insumo">{nomeInsumo(g.insumoId)}</td><td data-label="Quantidade">{g.total}</td><td data-label="Valor unitário">{moeda(g.precoUnit)}</td><td data-label="Subtotal">{moeda(g.total * g.precoUnit)}</td></tr>{/each}
	</Table>
	<p class="mt-3 text-right font-titulo text-xl font-bold text-marrom">Total: {moeda(c.valorTotal)}</p>
{/if}
