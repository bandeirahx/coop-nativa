<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import { distribuicoes, cooperados, insumos } from '#lib/stores/dados.ts';
	import { nomeCoop, nomeInsumo } from '#lib/utils/nomes.ts';
	import { data } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
	let coop = $state(''), ins = $state(''), st = $state(''), de = $state(''), ate = $state('');
	const lista = $derived($distribuicoes.filter((d) => (!coop || d.cooperadoId === +coop) && (!ins || d.itens.some((i) => i.insumoId === +ins)) && (!st || d.status === st) && (!de || d.data >= de) && (!ate || d.data <= ate)));
</script>

<ModuloHero
	modulo="estoque"
	titulo="Distribuição de insumos"
	subtitulo="Entrega de insumos aos cooperados conforme pedido autorizado e estoque disponível."
	uc="RF10: Gerenciar Distribuição de Insumos · UC10.3"
	texturaForaDoModulo="couro"
>
	{#snippet acoes()}<Button href="/gestao/distribuicao/nova"><Plus size={18} aria-hidden="true" />Registrar distribuição</Button>{/snippet}
</ModuloHero>
<div class="mb-4 grid gap-3 rounded-[var(--radius-card)] border border-borda bg-areia p-4 sm:grid-cols-2 lg:grid-cols-5">
	<Select id="fc" label="Cooperado" placeholder="Todos" bind:value={coop} opcoes={$cooperados.map((c) => ({ valor: c.id, texto: c.nome }))} />
	<Select id="fi" label="Insumo" placeholder="Todos" bind:value={ins} opcoes={$insumos.map((i) => ({ valor: i.id, texto: i.nome }))} />
	<Select id="fs" label="Situação" placeholder="Todas" bind:value={st} opcoes={[{ valor: 'Registrada', texto: 'Registrada (aguardando entrega)' }, { valor: 'Distribuído', texto: 'Distribuído' }]} />
	<Input id="de" label="Período – de" type="date" bind:value={de} />
	<Input id="ate" label="Período – até" type="date" bind:value={ate} />
</div>
<Table
	colunas={['Nº', 'Cooperado', 'Insumo', 'Pedido', 'Data', 'Prevista / Entregue', 'Situação', 'Ações']}
	vazia={lista.length === 0}
	vazio="Nenhuma distribuição encontrada para os filtros informados."
	cabecalhoClasses="bg-vinho text-areia"
>
	{#each lista as d}
		<tr><td data-label="Nº">#{d.id}</td><td data-label="Cooperado">{nomeCoop(d.cooperadoId)}</td><td data-label="Insumo">{d.itens.map((i) => nomeInsumo(i.insumoId)).join(', ')}</td><td data-label="Pedido">#{d.pedidoId}</td><td data-label="Data">{data(d.data)}</td>
			<td data-label="Prevista / Entregue">{d.itens.map((i) => `${i.prevista} / ${i.distribuida}`).join(', ')}</td><td data-label="Situação"><Badge status={d.status} /></td>
			<td data-label="Ações"><span class="flex flex-wrap gap-3"><a class="font-semibold text-verde-escuro underline" href="/gestao/distribuicao/{d.id}">Ver</a>
				{#if d.status === 'Registrada'}<a class="font-semibold text-verde-escuro underline" href="/gestao/distribuicao/{d.id}/quantidade">Registrar quantidade</a>{/if}</span></td></tr>
	{/each}
</Table>
