<script lang="ts">
	import { page } from '$app/state';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import ConfirmDialog from '#lib/components/ui/ConfirmDialog.svelte';
	import { pedidosCom } from '#lib/stores/dados.ts';
	import { nomeComprador } from '#lib/utils/nomes.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { ArrowLeft, BadgeCheck, Ban } from 'lucide-svelte';
	const p = $derived($pedidosCom.find((x) => x.id === Number(page.params.id)));
	const total = $derived(p ? p.itens.reduce((s, i) => s + i.quantidade * i.valorUnit, 0) : 0);
	let aprov = $state(false), canc = $state(false);
</script>

{#if !p}<EmptyState titulo="Pedido não encontrado" />{:else}
	<ModuloHero
		modulo="comercializacao"
		titulo="Pedido de comercialização #{p.id}"
		subtitulo="Comprador, produtos do catálogo, quantidade e total de venda."
		uc="RF13 · UC13.2 · UC13.3"
	>
		{#snippet acoes()}<Button href="/gestao/comercializacao" variante="contorno"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if p.status === 'Pendente'}<Button variante="perigo" onclick={() => (canc = true)}><Ban size={16} aria-hidden="true" />Cancelar</Button><Button onclick={() => (aprov = true)}><BadgeCheck size={16} aria-hidden="true" />Aprovar pagamento</Button>{/if}{/snippet}
	</ModuloHero>
	<Card class="mb-6 max-w-3xl"><dl class="grid gap-4 sm:grid-cols-3">
		<div><dt class="text-sm font-semibold text-marrom">Comprador</dt><dd>{nomeComprador(p.compradorId)}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Data</dt><dd>{data(p.data)}</dd></div>
		<div><dt class="text-sm font-semibold text-marrom">Situação</dt><dd><Badge status={p.status} /></dd></div></dl></Card>
	<Table colunas={['Produto', 'Quantidade', 'Valor unitário', 'Subtotal']} cabecalhoClasses="bg-azul text-areia">
		{#each p.itens as i}<tr><td data-label="Produto">{i.produto}</td><td data-label="Quantidade">{i.quantidade}</td><td data-label="Valor unitário">{moeda(i.valorUnit)}</td><td data-label="Subtotal">{moeda(i.quantidade * i.valorUnit)}</td></tr>{/each}
	</Table>
	<p class="mt-3 text-right font-titulo text-xl font-bold text-marrom">Total: {moeda(total)}</p>
	<ConfirmDialog bind:aberto={aprov} titulo="Aprovar pedido?" mensagem="O pagamento é confirmado externamente. O pedido ficará Aprovado/Pago." confirmar="Aprovar" onconfirmar={() => { pedidosCom.alterar(p.id, { status: 'Aprovado/Pago' }); toast('Pedido atualizado.'); }} />
	<ConfirmDialog bind:aberto={canc} titulo="Cancelar pedido?" mensagem="As quantidades reservadas serão liberadas." confirmar="Cancelar pedido" onconfirmar={() => { pedidosCom.alterar(p.id, { status: 'Cancelado' }); toast('Pedido cancelado.'); }} />
{/if}
