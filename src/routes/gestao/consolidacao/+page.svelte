<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { consolidacoes } from '#lib/stores/dados.ts';
	import { agrupar, valorGrupos } from '#lib/utils/consolidacao.ts';
	import { nomeCampanha } from '#lib/utils/nomes.ts';
	import { data, moeda } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
</script>

<ModuloHero
	modulo="compras"
	titulo="Consolidação de pedidos"
	subtitulo="Agrupa solicitações por insumo, define quantidades e gera a compra coletiva com o fornecedor."
	uc="RF06: Gerenciar Compras Coletivas · UC06.2"
>
	{#snippet acoes()}<Button href="/gestao/consolidacao/nova"><Plus size={18} aria-hidden="true" />Consolidar solicitações</Button>{/snippet}
</ModuloHero>
<Table
	colunas={['Nº', 'Campanha', 'Data', 'Insumos', 'Valor estimado', 'Situação', 'Ações']}
	vazia={$consolidacoes.length === 0}
	cabecalhoClasses="bg-ouro text-marrom-profundo"
>
	{#each $consolidacoes as c}
		{@const g = agrupar(c.campanhaId, c.excluidos)}
		<tr><td data-label="Nº">#{c.id}</td><td data-label="Campanha">{nomeCampanha(c.campanhaId)}</td><td data-label="Data">{data(c.data)}</td><td data-label="Insumos">{g.length}</td>
			<td data-label="Valor estimado">{moeda(valorGrupos(g))}</td><td data-label="Situação"><Badge status={c.status} /></td>
			<td data-label="Ações"><a class="font-semibold text-verde-escuro underline" href="/gestao/consolidacao/{c.id}">Ver</a></td></tr>
	{/each}
</Table>
