<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import GruposConsolidados from '#lib/components/layout/GruposConsolidados.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { consolidacoes, pedidos } from '#lib/stores/dados.ts';
	import { agrupar, valorGrupos } from '#lib/utils/consolidacao.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { nomeCampanha } from '#lib/utils/nomes.ts';
	import { moeda, data } from '#lib/utils/formato.ts';
	import { ArrowLeft, ShoppingCart } from 'lucide-svelte';
	const c = $derived($consolidacoes.find((x) => x.id === Number(page.params.id)));
	const grupos = $derived((void $pedidos, c ? agrupar(c.campanhaId, c.excluidos) : []));
	function alternar(pid: number) {
		if (!c) return;
		const novo = c.excluidos.includes(pid) ? c.excluidos.filter((x) => x !== pid) : [...c.excluidos, pid];
		const g = agrupar(c.campanhaId, novo);
		if (!g.some((x) => x.total > 0)) return toast('A consolidação precisa ter ao menos um pedido.', 'erro');
		consolidacoes.alterar(c.id, { excluidos: novo });
		toast('Lista de pedidos atualizada.');
	}
</script>

{#if !c}<EmptyState titulo="Consolidação não encontrada" />{:else}
	<PageHeader titulo="Consolidação #{c.id} · {nomeCampanha(c.campanhaId)}" uc="RF06 · UC06.2 · UC06.3">
		{#snippet acoes()}<Button href="/gestao/consolidacao" variante="secundario"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if c.status === 'Aberta'}<Button href="/gestao/compras/nova?consolidacao={c.id}"><ShoppingCart size={16} aria-hidden="true" />Gerar compra coletiva</Button>{/if}{/snippet}
	</PageHeader>
	<p class="mb-4 flex items-center gap-3 text-sm">Data: {data(c.data)} <Badge status={c.status} /></p>
	<GruposConsolidados {grupos} editavel={c.status === 'Aberta'} aoAlternar={alternar} />
	<p class="mt-4 text-right font-titulo text-xl font-bold text-marrom">Valor estimado: {moeda(valorGrupos(grupos))}</p>
{/if}
