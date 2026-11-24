<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { consolidacoes, fornecedores, compras } from '#lib/stores/dados.ts';
	import { agrupar, valorGrupos } from '#lib/utils/consolidacao.ts';
	import { nomeCampanha, nomeInsumo } from '#lib/utils/nomes.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { moeda } from '#lib/utils/formato.ts';
	let cons = $state(page.url.searchParams.get('consolidacao') ?? '');
	let forn = $state('');
	let erros = $state<Record<string, string>>({});
	const c = $derived($consolidacoes.find((x) => x.id === +cons));
	const grupos = $derived(c ? agrupar(c.campanhaId, c.excluidos) : []);
	function salvar(e: SubmitEvent) {
		e.preventDefault();
		erros = {};
		if (!cons) erros.cons = 'Escolha a consolidação.';
		if (!forn) erros.forn = 'Escolha o fornecedor.';
		if (Object.keys(erros).length) return toast('Corrija os campos destacados.', 'erro');
		const id = compras.adicionar({ consolidacaoId: +cons, fornecedorId: +forn, data: new Date().toISOString().slice(0, 10), status: 'Pendente', valorTotal: valorGrupos(grupos) });
		consolidacoes.alterar(+cons, { status: 'Fechada' });
		toast('Compra coletiva registrada com sucesso.');
		goto(`/gestao/compras/${id}`);
	}
</script>

<ModuloHero
	modulo="compras"
	titulo="Nova compra coletiva"
	subtitulo="Escolha a consolidação fechada e o fornecedor para registrar a compra."
	uc="RF06: Gerenciar Compras Coletivas"
	texturaForaDoModulo="graos"
>
	{#snippet acoes()}{/snippet}
</ModuloHero>
<form onsubmit={salvar} novalidate class="flex max-w-3xl flex-col gap-6">
	<Card><div class="grid gap-4 sm:grid-cols-2">
		<Select id="cons" label="Consolidação" bind:value={cons} erro={erros.cons} required opcoes={$consolidacoes.filter((x) => x.status === 'Aberta').map((x) => ({ valor: x.id, texto: `#${x.id} · ${nomeCampanha(x.campanhaId)}` }))} />
		<Select id="forn" label="Fornecedor" bind:value={forn} erro={erros.forn} required opcoes={$fornecedores.map((f) => ({ valor: f.id, texto: f.nome }))} />
	</div></Card>
	{#if grupos.length}
		<Card titulo="Itens da compra"><ul class="divide-y divide-borda text-sm">
			{#each grupos as g}<li class="flex justify-between py-2"><span>{nomeInsumo(g.insumoId)}</span><span>{g.total} × {moeda(g.precoUnit)} = <strong>{moeda(g.total * g.precoUnit)}</strong></span></li>{/each}
		</ul><p class="mt-3 text-right font-titulo text-xl font-bold text-marrom">Total: {moeda(valorGrupos(grupos))}</p></Card>
	{/if}
	<div class="flex justify-end gap-3"><Button variante="contorno" href="/gestao/compras">Cancelar</Button><Button type="submit">Registrar compra</Button></div>
</form>
