<script lang="ts">
	import { page } from '$app/state';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { recebimentos } from '#lib/stores/dados.ts';
	import { nomeInsumo } from '#lib/utils/nomes.ts';
	import { data } from '#lib/utils/formato.ts';
	import { ArrowLeft, TriangleAlert, CircleCheck } from 'lucide-svelte';
	const r = $derived($recebimentos.find((x) => x.id === Number(page.params.id)));
</script>

{#if !r}<EmptyState titulo="Recebimento não encontrado" />{:else}
	<ModuloHero
		modulo="compras"
		titulo="Recebimento #{r.id}"
		subtitulo="Conferência item a item do recebido versus o previsto na compra coletiva."
		uc="RF08 · UC08.2 · UC08.3"
		textura="graos"
	>
		{#snippet acoes()}<Button href="/gestao/recebimento" variante="contorno"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>{/snippet}
	</ModuloHero>
	<Card class="mb-6 max-w-3xl"><p>Compra coletiva <strong>#{r.compraId}</strong> · {data(r.data)}</p>{#if r.observacao}<p class="mt-2 text-marrom">Observação: {r.observacao}</p>{/if}</Card>
	<Table colunas={['Insumo', 'Previsto', 'Recebido', 'Conferência']} cabecalhoClasses="bg-verde text-marrom-escuro">
		{#each r.itens as i}
			<tr><td data-label="Insumo">{nomeInsumo(i.insumoId)}</td><td data-label="Previsto">{i.prevista}</td><td data-label="Recebido">{i.recebida}</td>
				<td data-label="Conferência">{#if i.prevista === i.recebida}<span class="inline-flex items-center gap-1 font-semibold text-verde-escuro"><CircleCheck size={16} aria-hidden="true" />Conferido</span>{:else}<span class="inline-flex items-center gap-1 font-semibold text-aviso-texto"><TriangleAlert size={16} aria-hidden="true" />Divergência ({i.recebida - i.prevista})</span>{/if}</td></tr>
		{/each}
	</Table>
{/if}


