<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { recebimentos, compras } from '#lib/stores/dados.ts';
	import { nomeFornecedor } from '#lib/utils/nomes.ts';
	import { data } from '#lib/utils/formato.ts';
	import { Plus, TriangleAlert } from 'lucide-svelte';
	const diverge = (r: any) => r.itens.some((i: any) => i.recebida !== i.prevista);
</script>

<ModuloHero
	modulo="compras"
	titulo="Recebimento de insumos"
	subtitulo="Conferência item a item do que foi entregue pelo fornecedor (previsto × recebido)."
	uc="RF08: Gerenciar Recebimento de Insumos · UC08.2"
	texturaForaDoModulo="graos"
>
	{#snippet acoes()}<Button href="/gestao/recebimento/nova"><Plus size={18} aria-hidden="true" />Registrar recebimento</Button>{/snippet}
</ModuloHero>
<Table
	colunas={['Nº', 'Compra', 'Fornecedor', 'Data', 'Conferência', 'Ações']}
	vazia={$recebimentos.length === 0}
	vazio="Nenhum recebimento registrado."
	cabecalhoClasses="bg-ouro text-marrom-profundo"
>
	{#each $recebimentos as r}
		{@const c = $compras.find((x) => x.id === r.compraId)}
		<tr><td data-label="Nº">#{r.id}</td><td data-label="Compra">#{r.compraId}</td><td data-label="Fornecedor">{c ? nomeFornecedor(c.fornecedorId) : '—'}</td><td data-label="Data">{data(r.data)}</td>
			<td data-label="Conferência">{#if diverge(r)}<span class="inline-flex items-center gap-1 font-semibold text-aviso-texto"><TriangleAlert size={16} aria-hidden="true" />Com divergência</span>{:else}<Badge status="Aprovado/Pago" />{/if}</td>
			<td data-label="Ações"><a class="font-semibold text-verde-escuro underline" href="/gestao/recebimento/{r.id}">Ver</a></td></tr>
	{/each}
</Table>
