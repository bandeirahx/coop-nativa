<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import { pedidos, campanhas, cooperados } from '#lib/stores/dados.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { totalPedido } from '#lib/utils/regras.ts';
	import { nomeCoop, nomeCampanha } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
	let camp = $state(''), coop = $state(''), st = $state('');
	const lista = $derived($pedidos.filter((p) => (!camp || p.campanhaId === +camp) && (!coop || p.cooperadoId === +coop) && (!st || p.status === st)));
</script>

<ModuloHero
	modulo="compras"
	titulo="Pedidos de insumos"
	subtitulo="Pedidos dos cooperados por campanha, valores e situação de pagamento."
	uc="RF05: Gerenciar Pedidos de Insumos · UC05.2"
>
	{#snippet acoes()}{#if $usuario?.perfil === 'gestor'}<Button href="/gestao/pedidos/nova"><Plus size={18} aria-hidden="true" />Registrar pedido</Button>{/if}{/snippet}
</ModuloHero>
<div class="mb-4 grid gap-3 rounded-[var(--radius-card)] border border-borda bg-areia p-4 sm:grid-cols-3">
	<Select id="fc" label="Campanha" placeholder="Todas" bind:value={camp} opcoes={$campanhas.map((c) => ({ valor: c.id, texto: c.nome }))} />
	<Select id="fo" label="Cooperado" placeholder="Todos" bind:value={coop} opcoes={$cooperados.map((c) => ({ valor: c.id, texto: c.nome }))} />
	<Select id="fs" label="Situação" placeholder="Todas" bind:value={st} opcoes={['Pendente', 'Aprovado/Pago', 'Distribuído', 'Cancelado'].map((s) => ({ valor: s, texto: s }))} />
</div>
<Table
	colunas={['Nº', 'Cooperado', 'Campanha', 'Data', 'Valor total', 'Situação', 'Ações']}
	vazia={lista.length === 0}
	cabecalhoClasses="bg-ouro text-marrom-profundo"
>
	{#each lista as p}
		<tr><td data-label="Nº">#{p.id}</td><td data-label="Cooperado">{nomeCoop(p.cooperadoId)}</td><td data-label="Campanha">{nomeCampanha(p.campanhaId)}</td><td data-label="Data">{data(p.data)}</td>
			<td data-label="Valor total">{moeda(totalPedido(p))}</td><td data-label="Situação"><Badge status={p.status} /></td>
			<td data-label="Ações"><a class="font-semibold text-verde-escuro underline" href="/gestao/pedidos/{p.id}">Ver</a></td></tr>
	{/each}
</Table>
