<script lang="ts">
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import { cooperados, campanhas, pedidos, estoque, distribuicoes, movimentacoes, insumos } from '#lib/stores/dados.ts';
	import { data } from '#lib/utils/formato.ts';
	import { nomeInsumo } from '#lib/utils/nomes.ts';
	import { Users, Megaphone, Hourglass, TriangleAlert, PackageOpen, ArrowDownToLine, ArrowUpFromLine, ArrowUpRight } from 'lucide-svelte';

	const nomeInsumoLocal = (id: number) => $insumos.find((i) => i.id === id)?.nome ?? '—';
	void nomeInsumo;
	const baixos = $derived($estoque.filter((e) => e.qtd < e.minimo));
	const cards = $derived([
		{ t: 'Cooperados ativos', s: 'Pessoas que fazem a cooperativa acontecer', v: $cooperados.filter((c) => c.status === 'Ativo').length, i: Users, href: '/gestao/cooperados', imagem: '/images/novas/cards/cooperados.webp', modulo: 'cooperados' },
		{ t: 'Campanhas abertas', s: 'Compras coletivas em andamento', v: $campanhas.filter((c) => c.status === 'Aberta').length, i: Megaphone, href: '/gestao/campanhas', imagem: '/images/novas/cards/compras.webp', modulo: 'compras' },
		{ t: 'Pedidos aguardando pagamento', s: 'Acompanhe e confirme os recebimentos', v: $pedidos.filter((p) => p.status === 'Pendente').length, i: Hourglass, href: '/gestao/pedidos', imagem: '/images/novas/cards/areia.webp', modulo: 'compras' },
		{ t: 'Insumos abaixo do mínimo', s: 'Reponha antes que falte no campo', v: baixos.length, i: TriangleAlert, href: '/gestao/estoque', imagem: '/images/novas/cards/estoque.webp', modulo: 'estoque' },
		{ t: 'Distribuições pendentes', s: 'Entregas registradas e a confirmar', v: $distribuicoes.filter((d) => d.status === 'Registrada').length, i: PackageOpen, href: '/gestao/distribuicao', imagem: '/images/novas/cards/comercializacao.webp', modulo: 'comercializacao' }
	]);
	const ultimas = $derived([...$movimentacoes].reverse().slice(0, 6));
</script>

<PageHeader titulo="Painel" uc="Visão geral da cooperativa" />

<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
	{#each cards as c}
		<a href={c.href} class="card-foto p-5 text-areia mod-{c.modulo}" style="--mod-card: url('{c.imagem}');">
			<div class="card-foto-foto" aria-hidden="true"></div>
			<div class="relative z-10 flex items-start justify-between">
				<span class="inline-flex size-11 items-center justify-center rounded-btn bg-areia/15"><c.i size={22} aria-hidden="true" /></span>
				<ArrowUpRight size={22} aria-hidden="true" />
			</div>
			<div class="relative z-10">
				<p class="metrica !text-5xl">{c.v}</p>
				<h2 class="mt-2 text-xl !text-areia">{c.t}</h2>
				<p class="mt-1 text-sm text-areia/85">{c.s}</p>
			</div>
		</a>
	{/each}
</div>

<div class="mt-6 grid gap-6 lg:grid-cols-2">
	<Card titulo="Últimas movimentações de estoque">
		<ul class="divide-y divide-borda">
			{#each ultimas as m}
				<li class="flex items-center gap-3 py-2.5 text-sm">
					{#if m.tipo === 'entrada'}<ArrowDownToLine size={18} class="text-oliva" aria-label="Entrada" />{:else}<ArrowUpFromLine size={18} class="text-aviso" aria-label="Saída" />{/if}
					<div class="flex-1"><p class="font-medium">{nomeInsumoLocal(m.insumoId)} · {m.quantidade}</p><p class="text-marrom">{m.descricao}</p></div>
					<span class="text-marrom">{data(m.data)}</span>
				</li>
			{/each}
		</ul>
	</Card>
	<Card titulo="Alertas">
		<ul class="flex flex-col gap-3">
			{#each baixos as e}
				<li class="flex items-start gap-2 rounded-btn bg-aviso-claro p-3 text-sm font-medium text-aviso-texto"><TriangleAlert size={18} class="mt-0.5 shrink-0" aria-hidden="true" />Estoque baixo: {nomeInsumoLocal(e.insumoId)} ({e.qtd} de mínimo {e.minimo}).</li>
			{/each}
			{#each $pedidos.filter((p) => p.status === 'Pendente').slice(0, 3) as p}
				<li class="flex items-center justify-between rounded-btn bg-marrom-claro p-3 text-sm"><span>Pedido #{p.id} aguardando confirmação de pagamento</span><Badge status={p.status} /></li>
			{/each}
		</ul>
	</Card>
</div>
