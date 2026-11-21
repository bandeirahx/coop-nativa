<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { campanhas } from '#lib/stores/dados.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { ArrowLeft, Pencil } from 'lucide-svelte';
	const c = $derived($campanhas.find((x) => x.id === Number(page.params.id)));
</script>

{#if !c}<EmptyState titulo="Campanha não encontrada" />{:else}
	<PageHeader titulo={c.nome} uc="RF04: Gerenciar Campanhas de Compras · UC04.3">
		{#snippet acoes()}<Button href="/gestao/campanhas" variante="contorno"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if $usuario?.perfil === 'gestor'}<Button href="/gestao/campanhas/{c.id}/editar"><Pencil size={16} aria-hidden="true" />Editar</Button>{/if}{/snippet}
	</PageHeader>
	<Card titulo="Dados" class="mb-6 max-w-3xl">
		<dl class="grid gap-4 sm:grid-cols-3">
			<div><dt class="text-sm font-semibold text-marrom">Início</dt><dd>{data(c.dataInicio)}</dd></div>
			<div><dt class="text-sm font-semibold text-marrom">Término</dt><dd>{data(c.dataFim)}</dd></div>
			<div><dt class="text-sm font-semibold text-marrom">Situação</dt><dd><Badge status={c.status} /></dd></div>
		</dl>
	</Card>
	<h2 class="mb-3 text-lg">Insumos ofertados</h2>
	<Table colunas={['Insumo', 'Unidade', 'Preço unitário', 'Limite por cota (RN10)']}>
		{#each c.itens as i}<tr><td data-label="Insumo">{nomeInsumo(i.insumoId)}</td><td data-label="Unidade">{unidadeInsumo(i.insumoId)}</td><td data-label="Preço">{moeda(i.precoUnit)}</td><td data-label="Limite por cota">{i.limitePorCota}</td></tr>{/each}
	</Table>
{/if}
