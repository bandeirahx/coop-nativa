<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import { pedidosCom, compradores } from '#lib/stores/dados.ts';
	import { nomeComprador } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
	let comp = $state(''), st = $state('');
	const lista = $derived($pedidosCom.filter((p) => (!comp || p.compradorId === +comp) && (!st || p.status === st)));
	const total = (p: any) => p.itens.reduce((s: number, i: any) => s + i.quantidade * i.valorUnit, 0);
</script>

<ModuloHero
	modulo="comercializacao"
	titulo="Pedidos de comercialização"
	subtitulo="Catálogo de produtos, compradores e pedidos de venda da produção dos cooperados."
	uc="RF13: Gerenciar Pedidos de Comercialização · UC13.2"
	textura="folhas"
>
	{#snippet acoes()}<Button href="/gestao/comercializacao/nova"><Plus size={18} aria-hidden="true" />Registrar pedido</Button>{/snippet}
</ModuloHero>
<div class="mb-4 grid gap-3 rounded-[var(--radius-card)] border border-borda bg-branco p-4 sm:grid-cols-3">
	<Select id="fc" label="Comprador" placeholder="Todos" bind:value={comp} opcoes={$compradores.map((c) => ({ valor: c.id, texto: c.nome }))} />
	<Select id="fs" label="Situação" placeholder="Todas" bind:value={st} opcoes={['Pendente', 'Aprovado/Pago', 'Cancelado'].map((s) => ({ valor: s, texto: s }))} />
</div>
<Table
	colunas={['Nº', 'Comprador', 'Data', 'Itens', 'Valor total', 'Situação', 'Ações']}
	vazia={lista.length === 0}
	cabecalhoClasses="bg-marrom text-branco"
>
	{#each lista as p}
		<tr><td data-label="Nº">#{p.id}</td><td data-label="Comprador">{nomeComprador(p.compradorId)}</td><td data-label="Data">{data(p.data)}</td><td data-label="Itens">{p.itens.map((i) => i.produto).join(', ')}</td>
			<td data-label="Valor total">{moeda(total(p))}</td><td data-label="Situação"><Badge status={p.status} /></td><td data-label="Ações"><a class="font-semibold text-verde-escuro underline" href="/gestao/comercializacao/{p.id}">Ver</a></td></tr>
	{/each}
</Table>


