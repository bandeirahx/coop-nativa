<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { distribuicoes, pedidos, cooperados, campanhas, estoque } from '#lib/stores/dados.ts';
	import { movimentar } from '#lib/utils/estoque.ts';
	import { limiteCotas } from '#lib/utils/regras.ts';
	import { nomeCoop, nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { ArrowLeft } from 'lucide-svelte';

	const d = $derived($distribuicoes.find((x) => x.id === Number(page.params.id)));
	const item = $derived(d?.itens[0]);
	const pedido = $derived($pedidos.find((p) => p.id === d?.pedidoId));
	const coop = $derived($cooperados.find((c) => c.id === d?.cooperadoId));
	const camp = $derived($campanhas.find((c) => c.id === pedido?.campanhaId));
	const disponivel = $derived($estoque.find((e) => e.insumoId === item?.insumoId)?.qtd ?? 0);
	const limite = $derived(coop && camp && item ? limiteCotas(coop, camp, item.insumoId) : 0);
	const jaEntregue = $derived(
		$distribuicoes.filter((x) => x.id !== d?.id && x.status === 'Distribuído' && x.cooperadoId === d?.cooperadoId && $pedidos.find((p) => p.id === x.pedidoId)?.campanhaId === camp?.id)
			.flatMap((x) => x.itens).filter((i) => i.insumoId === item?.insumoId).reduce((s, i) => s + i.distribuida, 0)
	);
	const restante = $derived(Math.max(0, limite - jaEntregue));

	let qtd = $state<number | ''>('');
	let erro = $state('');
	let confirmado = $state(false);

	function confirmar(e: SubmitEvent) {
		e.preventDefault();
		erro = '';
		if (!d || !item || confirmado) return;
		if (pedido?.status !== 'Aprovado/Pago') return (erro = 'Pedido não autorizado para entrega: pagamento não confirmado (RN09).');
		const q = Number(qtd);
		if (qtd === '' || !(q > 0)) return (erro = 'Quantidade inválida: informe um valor maior que zero.');
		if (q > disponivel) return (erro = `Quantidade acima do estoque disponível (${disponivel}).`);
		if (q > restante) return (erro = `Quantidade acima do limite restante por cotas (${restante}) — RN10.`);
		try {
			confirmado = true;
			const id = movimentar('saida', item.insumoId, q, `Distribuição #${d.id} ao cooperado ${nomeCoop(d.cooperadoId)}`, `Distribuição #${d.id}`);
			distribuicoes.alterar(d.id, { status: 'Distribuído', itens: [{ ...item, distribuida: q }] });
			if (pedido && q >= item.prevista) pedidos.alterar(pedido.id, { status: 'Distribuído' });
			toast(`Quantidade registrada e estoque baixado (${id}).`);
			goto('/gestao/distribuicao');
		} catch {
			confirmado = false;
			erro = 'Erro ao salvar a distribuição. Nenhuma baixa foi feita; tente novamente.';
		}
	}
</script>

{#if !d || !item}<EmptyState titulo="Distribuição não encontrada" />{:else}
	<PageHeader titulo="Registrar quantidade distribuída" uc="RF10: Gerenciar Distribuição de Insumos · UC10.2">
		{#snippet acoes()}<Button href="/gestao/distribuicao" variante="secundario"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>{/snippet}
	</PageHeader>
	{#if d.status === 'Distribuído'}
		<EmptyState titulo="Distribuição já concluída" texto="A baixa de estoque desta distribuição já foi feita e não pode ser repetida." />
	{:else}
		<form onsubmit={confirmar} novalidate class="flex max-w-3xl flex-col gap-6">
			<Card titulo="Distribuição #{d.id}">
				<dl class="grid gap-4 sm:grid-cols-2">
					<div><dt class="text-sm font-semibold text-marrom">Cooperado</dt><dd>{nomeCoop(d.cooperadoId)} · {coop?.qtdCotas} cotas</dd></div>
					<div><dt class="text-sm font-semibold text-marrom">Insumo</dt><dd>{nomeInsumo(item.insumoId)}</dd></div>
					<div><dt class="text-sm font-semibold text-marrom">Quantidade prevista</dt><dd>{item.prevista} {unidadeInsumo(item.insumoId)}</dd></div>
					<div><dt class="text-sm font-semibold text-marrom">Pedido</dt><dd>#{d.pedidoId} · {pedido?.status}</dd></div>
				</dl>
				<div class="mt-5 grid gap-3 sm:grid-cols-2">
					<div class="rounded-lg bg-verde-claro p-4"><p class="text-sm font-semibold text-marrom">Estoque disponível</p><p class="font-titulo text-3xl font-extrabold text-verde-escuro">{disponivel}</p></div>
					<div class="rounded-lg bg-verde-claro p-4"><p class="text-sm font-semibold text-marrom">Limite restante pelas cotas (RN10)</p><p class="font-titulo text-3xl font-extrabold text-verde-escuro">{restante}</p><p class="text-xs text-marrom">limite {limite} − já entregue {jaEntregue}</p></div>
				</div>
			</Card>
			<Card>
				{#if erro}<p role="alert" class="mb-4 rounded-lg bg-erro-claro p-3 text-sm font-medium text-erro">{erro}</p>{/if}
				<Input id="qtd" label="Quantidade distribuída" type="number" bind:value={qtd} required dica="A baixa no estoque será feita uma única vez ao confirmar." />
				<div class="mt-5 flex justify-end gap-3"><Button variante="secundario" href="/gestao/distribuicao">Cancelar</Button><Button type="submit" disabled={confirmado}>Confirmar distribuição</Button></div>
			</Card>
		</form>
	{/if}
{/if}
