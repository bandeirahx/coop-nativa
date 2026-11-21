<script lang="ts">
	import { goto } from '$app/navigation';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import GruposConsolidados from '#lib/components/layout/GruposConsolidados.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { campanhas, consolidacoes, pedidos } from '#lib/stores/dados.ts';
	import { agrupar, valorGrupos } from '#lib/utils/consolidacao.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { moeda } from '#lib/utils/formato.ts';
	let campId = $state('');
	let excluidos = $state<number[]>([]);
	let erro = $state('');
	const grupos = $derived(campId ? agrupar(+campId, excluidos) : []);
	$effect(() => { campId; excluidos = []; erro = ''; });
	const alternar = (id: number) => (excluidos = excluidos.includes(id) ? excluidos.filter((x) => x !== id) : [...excluidos, id]);
	function consolidar() {
		if (!campId) return (erro = 'Escolha a campanha que será consolidada.');
		void $pedidos;
		if (!grupos.length) return (erro = 'Não há pedidos para consolidar nesta campanha.');
		if (!grupos.some((g) => g.total > 0)) return (erro = 'Todos os pedidos foram removidos. Inclua ao menos um pedido.');
		const id = consolidacoes.adicionar({ campanhaId: +campId, data: new Date().toISOString().slice(0, 10), status: 'Aberta', excluidos });
		toast('Solicitações consolidadas com sucesso.');
		goto(`/gestao/consolidacao/${id}`);
	}
</script>

<PageHeader titulo="Consolidar solicitações" uc="RF06 · UC06.1 · UC06.1.1 · UC06.1.2 · UC06.1.3" />
<Card class="mb-6 max-w-xl"><Select id="camp" label="Campanha" bind:value={campId} opcoes={$campanhas.map((c) => ({ valor: c.id, texto: c.nome }))} erro={erro} required /></Card>
{#if campId && grupos.length}
	<GruposConsolidados {grupos} editavel aoAlternar={alternar} />
	<div class="mt-4 flex flex-wrap items-center justify-between gap-3"><p class="font-titulo text-xl font-bold text-marrom">Valor estimado: {moeda(valorGrupos(grupos))}</p>
		<Button onclick={consolidar}>Consolidar</Button></div>
{:else if campId}
	<p role="alert" class="rounded-lg bg-aviso-claro p-4 font-medium text-aviso-texto">Não há pedidos para consolidar nesta campanha.</p>
{/if}
