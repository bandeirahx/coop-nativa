<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { distribuicoes } from '#lib/stores/dados.ts';
	import { nomeCoop, nomeInsumo } from '#lib/utils/nomes.ts';
	import { data } from '#lib/utils/formato.ts';
	import { ArrowLeft } from 'lucide-svelte';
	const d = $derived($distribuicoes.find((x) => x.id === Number(page.params.id)));
</script>

{#if !d}<EmptyState titulo="Distribuição não encontrada" />{:else}
	<PageHeader titulo="Distribuição #{d.id}" uc="RF10 · UC10.3">
		{#snippet acoes()}<Button href="/gestao/distribuicao" variante="secundario"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if d.status === 'Registrada'}<Button href="/gestao/distribuicao/{d.id}/quantidade">Registrar quantidade distribuída</Button>{/if}{/snippet}
	</PageHeader>
	<Card class="mb-6 max-w-3xl"><dl class="grid gap-4 sm:grid-cols-2">
		<div><dt class="text-sm font-semibold text-marrom">Cooperado</dt><dd>{nomeCoop(d.cooperadoId)}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Pedido</dt><dd><a class="text-verde-escuro underline" href="/gestao/pedidos/{d.pedidoId}">#{d.pedidoId}</a></dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Data</dt><dd>{data(d.data)}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Situação</dt><dd><Badge status={d.status} /></dd></div></dl>
		{#if d.status === 'Registrada'}<p class="mt-4 rounded-lg bg-aviso-claro p-3 text-sm text-aviso-texto">Ainda não houve baixa no estoque.</p>{/if}</Card>
	<Table colunas={['Insumo', 'Quantidade prevista', 'Quantidade distribuída']}>
		{#each d.itens as i}<tr><td data-label="Insumo">{nomeInsumo(i.insumoId)}</td><td data-label="Prevista">{i.prevista}</td><td data-label="Distribuída">{i.distribuida}</td></tr>{/each}
	</Table>
{/if}
