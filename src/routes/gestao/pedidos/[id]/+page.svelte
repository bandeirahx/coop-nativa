<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import ConfirmDialog from '#lib/components/ui/ConfirmDialog.svelte';
	import { pedidos } from '#lib/stores/dados.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { totalPedido } from '#lib/utils/regras.ts';
	import { nomeCoop, nomeCampanha, nomeInsumo } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { ArrowLeft, Pencil, BadgeCheck, Ban } from 'lucide-svelte';
	const p = $derived($pedidos.find((x) => x.id === Number(page.params.id)));
	let confPag = $state(false), confCan = $state(false);
	const gestor = $derived($usuario?.perfil === 'gestor');
</script>

{#if !p}<EmptyState titulo="Pedido não encontrado" />{:else}
	<PageHeader titulo="Pedido #{p.id}" uc="RF05: Gerenciar Pedidos de Insumos · UC05.2">
		{#snippet acoes()}<Button href="/gestao/pedidos" variante="contorno"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if gestor && p.status === 'Pendente'}
				<Button href="/gestao/pedidos/{p.id}/editar" variante="contorno"><Pencil size={16} aria-hidden="true" />Editar</Button>
				<Button variante="perigo" onclick={() => (confCan = true)}><Ban size={16} aria-hidden="true" />Cancelar pedido</Button>
				<Button onclick={() => (confPag = true)}><BadgeCheck size={16} aria-hidden="true" />Confirmar pagamento</Button>
			{/if}{/snippet}
	</PageHeader>
	<Card titulo="Dados" class="mb-6 max-w-3xl">
		<dl class="grid gap-4 sm:grid-cols-2">
			<div><dt class="text-sm font-semibold text-marrom">Cooperado</dt><dd>{nomeCoop(p.cooperadoId)}</dd></div>
			<div><dt class="text-sm font-semibold text-marrom">Campanha</dt><dd>{nomeCampanha(p.campanhaId)}</dd></div>
			<div><dt class="text-sm font-semibold text-marrom">Data</dt><dd>{data(p.data)}</dd></div>
			<div><dt class="text-sm font-semibold text-marrom">Situação</dt><dd><Badge status={p.status} /></dd></div>
		</dl>
		{#if p.status === 'Pendente'}<p class="mt-4 rounded-lg bg-aviso-claro p-3 text-sm text-aviso-texto">O pagamento é confirmado externamente; o sistema não processa pagamentos. A distribuição só é liberada com status "Aprovado/Pago" (RN09).</p>{/if}
	</Card>
	<Table colunas={['Insumo', 'Quantidade', 'Valor unitário', 'Subtotal']}>
		{#each p.itens as i}<tr><td data-label="Insumo">{nomeInsumo(i.insumoId)}</td><td data-label="Quantidade">{i.quantidade}</td><td data-label="Valor unitário">{moeda(i.valorUnit)}</td><td data-label="Subtotal">{moeda(i.quantidade * i.valorUnit)}</td></tr>{/each}
	</Table>
	<p class="mt-3 text-right font-titulo text-xl font-bold text-marrom">Total: {moeda(totalPedido(p))}</p>
	<ConfirmDialog bind:aberto={confPag} titulo="Confirmar pagamento?" mensagem="O pedido passará para Aprovado/Pago e poderá ser distribuído." confirmar="Confirmar pagamento" onconfirmar={() => { pedidos.alterar(p.id, { status: 'Aprovado/Pago' }); toast('Pagamento confirmado. Pedido aprovado.'); }} />
	<ConfirmDialog bind:aberto={confCan} titulo="Cancelar pedido?" mensagem="Essa ação não pode ser desfeita." confirmar="Cancelar pedido" onconfirmar={() => { pedidos.alterar(p.id, { status: 'Cancelado' }); toast('Pedido cancelado.'); }} />
{/if}
