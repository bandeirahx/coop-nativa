<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { compras, consolidacoes, recebimentos } from '#lib/stores/dados.ts';
	import { agrupar } from '#lib/utils/consolidacao.ts';
	import { movimentar } from '#lib/utils/estoque.ts';
	import { nomeFornecedor, nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { TriangleAlert, CircleCheck } from 'lucide-svelte';

	let compraId = $state(page.url.searchParams.get('compra') ?? '');
	let obs = $state('');
	let recebidas = $state<Record<number, number | ''>>({});
	let erro = $state('');
	let salvando = $state(false);
	const compra = $derived($compras.find((c) => c.id === +compraId));
	const cons = $derived($consolidacoes.find((c) => c.id === compra?.consolidacaoId));
	const previstas = $derived(cons ? agrupar(cons.campanhaId, cons.excluidos) : []);
	$effect(() => { recebidas = Object.fromEntries(previstas.map((g) => [g.insumoId, g.total])); });

	function salvar(e: SubmitEvent) {
		e.preventDefault();
		erro = '';
		if (!compra) return (erro = 'Escolha a compra coletiva a ser recebida.');
		if (previstas.some((g) => recebidas[g.insumoId] === '' || Number(recebidas[g.insumoId]) < 0)) return toast('Informe uma quantidade válida (zero ou mais) para todos os itens.', 'erro');
		salvando = true;
		const itens = previstas.map((g) => ({ insumoId: g.insumoId, prevista: g.total, recebida: Number(recebidas[g.insumoId]) }));
		const id = recebimentos.adicionar({ compraId: compra.id, data: new Date().toISOString().slice(0, 10), observacao: obs, itens });
		for (const i of itens) if (i.recebida > 0) movimentar('entrada', i.insumoId, i.recebida, `Recebimento #${id} da compra #${compra.id}`, `Compra coletiva #${compra.id}`);
		compras.alterar(compra.id, { status: 'Recebida' });
		toast('Recebimento registrado e estoque atualizado.');
		goto(`/gestao/recebimento/${id}`);
	}
</script>

<PageHeader titulo="Registrar recebimento" uc="RF08 · UC08.1 · UC08.3 (conferência) · RF09 · UC09.1" />
<form onsubmit={salvar} novalidate class="flex max-w-4xl flex-col gap-6">
	<Card><Select id="compra" label="Compra coletiva pendente" bind:value={compraId} erro={erro} required
		opcoes={$compras.filter((c) => c.status === 'Pendente').map((c) => ({ valor: c.id, texto: `#${c.id} · ${nomeFornecedor(c.fornecedorId)}` }))} /></Card>
	{#if compra}
		<Card titulo="Conferência item a item">
			<div class="flex flex-col gap-3">
				{#each previstas as g}
					{@const rec = Number(recebidas[g.insumoId] || 0)}
					<div class="grid items-center gap-3 rounded-lg bg-marrom-claro p-3 sm:grid-cols-[2fr_1fr_1fr_1.2fr]">
						<p class="font-semibold">{nomeInsumo(g.insumoId)}</p>
						<p class="text-sm"><span class="font-semibold text-marrom">Previsto</span><br />{g.total} {unidadeInsumo(g.insumoId)}</p>
						<Input id="r{g.insumoId}" label="Recebido" type="number" value={recebidas[g.insumoId] ?? ''} oninput={(e) => (recebidas[g.insumoId] = e.currentTarget.value === '' ? '' : Number(e.currentTarget.value))} />
						<p class="flex items-center gap-1 text-sm font-semibold {rec === g.total ? 'text-verde-escuro' : 'text-aviso-texto'}">
							{#if rec === g.total}<CircleCheck size={18} aria-hidden="true" />Conferido{:else}<TriangleAlert size={18} aria-hidden="true" />Divergência ({rec - g.total > 0 ? '+' : ''}{rec - g.total}){/if}</p>
					</div>
				{/each}
			</div>
			<div class="mt-4"><Input id="obs" label="Observação" bind:value={obs} dica="Descreva divergências ou avarias, se houver." /></div>
		</Card>
	{/if}
	<div class="flex justify-end gap-3"><Button variante="secundario" href="/gestao/recebimento">Cancelar</Button><Button type="submit" disabled={salvando}>Confirmar recebimento</Button></div>
</form>
