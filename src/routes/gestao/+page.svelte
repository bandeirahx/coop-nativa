<script lang="ts">
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import { cooperados, campanhas, pedidos, estoque, distribuicoes, movimentacoes, insumos } from '#lib/stores/dados.ts';
	import { data } from '#lib/utils/formato.ts';
	import { Users, Megaphone, Hourglass, TriangleAlert, PackageOpen, ArrowDownToLine, ArrowUpFromLine } from 'lucide-svelte';

	const nomeInsumo = (id: number) => $insumos.find((i) => i.id === id)?.nome ?? '—';
	const baixos = $derived($estoque.filter((e) => e.qtd < e.minimo));
	const cards = $derived([
		{ t: 'Cooperados ativos', v: $cooperados.filter((c) => c.status === 'Ativo').length, i: Users, href: '/gestao/cooperados' },
		{ t: 'Campanhas abertas', v: $campanhas.filter((c) => c.status === 'Aberta').length, i: Megaphone, href: '/gestao/campanhas' },
		{ t: 'Pedidos aguardando pagamento', v: $pedidos.filter((p) => p.status === 'Pendente').length, i: Hourglass, href: '/gestao/pedidos' },
		{ t: 'Insumos abaixo do mínimo', v: baixos.length, i: TriangleAlert, href: '/gestao/estoque' },
		{ t: 'Distribuições pendentes', v: $distribuicoes.filter((d) => d.status === 'Registrada').length, i: PackageOpen, href: '/gestao/distribuicao' }
	]);
	const ultimas = $derived([...$movimentacoes].reverse().slice(0, 6));
</script>

<PageHeader titulo="Painel" uc="Visão geral" />

<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
	{#each cards as c}
		<a href={c.href} class="rounded-[var(--radius-card)] border border-borda bg-branco p-4 shadow-suave hover:border-verde">
			<span class="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-verde-claro text-verde-escuro"><c.i size={20} aria-hidden="true" /></span>
			<p class="font-titulo text-3xl font-extrabold text-marrom">{c.v}</p>
			<p class="text-sm text-marrom">{c.t}</p>
		</a>
	{/each}
</div>

<div class="mt-6 grid gap-6 lg:grid-cols-2">
	<Card titulo="Últimas movimentações de estoque">
		<ul class="divide-y divide-borda">
			{#each ultimas as m}
				<li class="flex items-center gap-3 py-2.5 text-sm">
					{#if m.tipo === 'entrada'}<ArrowDownToLine size={18} class="text-verde-escuro" aria-label="Entrada" />{:else}<ArrowUpFromLine size={18} class="text-aviso-texto" aria-label="Saída" />{/if}
					<div class="flex-1"><p class="font-medium">{nomeInsumo(m.insumoId)} · {m.quantidade}</p><p class="text-marrom">{m.descricao}</p></div>
					<span class="text-marrom">{data(m.data)}</span>
				</li>
			{/each}
		</ul>
	</Card>
	<Card titulo="Alertas">
		<ul class="flex flex-col gap-3">
			{#each baixos as e}
				<li class="flex items-start gap-2 rounded-lg bg-aviso-claro p-3 text-sm font-medium text-aviso-texto"><TriangleAlert size={18} class="mt-0.5 shrink-0" aria-hidden="true" />Estoque baixo: {nomeInsumo(e.insumoId)} ({e.qtd} de mínimo {e.minimo}).</li>
			{/each}
			{#each $pedidos.filter((p) => p.status === 'Pendente').slice(0, 3) as p}
				<li class="flex items-center justify-between rounded-lg bg-marrom-claro p-3 text-sm"><span>Pedido #{p.id} aguardando confirmação de pagamento</span><Badge status={p.status} /></li>
			{/each}
		</ul>
	</Card>
</div>
