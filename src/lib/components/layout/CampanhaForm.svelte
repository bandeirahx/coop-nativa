<script lang="ts">
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';
	import ModuloHero from './ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { campanhas, insumos } from '#lib/stores/dados.ts';
	import { toast } from '#lib/stores/toast.ts';
	import type { Campanha } from '#lib/mock/tipos.ts';
	import { Plus, Trash2 } from 'lucide-svelte';

	let { original }: { original?: Campanha } = $props();
	const editando = untrack(() => !!original);
	let v = $state(untrack(() => original ? structuredClone($state.snapshot(original)) : { nome: '', dataInicio: '', dataFim: '', status: 'Aberta', itens: [{ insumoId: '' as any, precoUnit: '' as any, limitePorCota: '' as any }] }));
	let erros = $state<Record<string, string>>({});
	const opcoesInsumo = $derived($insumos.map((i) => ({ valor: i.id, texto: `${i.nome} (${i.unidade})` })));

	function enviar(e: SubmitEvent) {
		e.preventDefault();
		const er: Record<string, string> = {};
		if (!v.nome.trim()) er.nome = 'Preencha o campo "Nome da campanha".';
		if (!v.dataInicio) er.dataInicio = 'Informe a data de início.';
		if (!v.dataFim) er.dataFim = 'Informe a data de término.';
		else if (v.dataInicio && v.dataFim < v.dataInicio) er.dataFim = 'A data de término não pode ser anterior ao início.';
		if (!v.itens.length) er.itens = 'Adicione ao menos um insumo à campanha.';
		v.itens.forEach((i, n) => {
			if (!i.insumoId) er[`i${n}`] = 'Escolha o insumo.';
			else if (v.itens.findIndex((o) => Number(o.insumoId) === Number(i.insumoId)) !== n) er[`i${n}`] = 'Este insumo já foi adicionado.';
			if (!(Number(i.precoUnit) > 0)) er[`p${n}`] = 'Preço deve ser maior que zero.';
			if (!(Number(i.limitePorCota) > 0)) er[`l${n}`] = 'Limite deve ser maior que zero.';
		});
		erros = er;
		if (Object.keys(er).length) return toast('Corrija os campos destacados.', 'erro');
		const dados: any = { ...v, itens: v.itens.map((i) => ({ insumoId: Number(i.insumoId), precoUnit: Number(i.precoUnit), limitePorCota: Number(i.limitePorCota) })) };
		const id = editando ? (campanhas.alterar(original!.id, dados), original!.id) : campanhas.adicionar(dados as any);
		toast(editando ? 'Campanha atualizada com sucesso.' : 'Campanha criada com sucesso.');
		goto(`/gestao/campanhas/${id}`);
	}
</script>

<ModuloHero
	modulo="compras"
	titulo={editando ? 'Editar campanha' : 'Nova campanha'}
	subtitulo="Nome, período, insumos ofertados e limite por cota (RN10)."
	uc="RF04: Gerenciar Campanhas de Compras · {editando ? 'UC04.2' : 'UC04.1'}"
>
	{#snippet acoes()}{/snippet}
</ModuloHero>
<form onsubmit={enviar} novalidate class="flex max-w-4xl flex-col gap-6">
	<Card titulo="Dados da campanha">
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2"><Input id="nome" label="Nome da campanha" bind:value={v.nome} erro={erros.nome} required /></div>
			<Input id="ini" label="Data de início" type="date" bind:value={v.dataInicio} erro={erros.dataInicio} required />
			<Input id="fim" label="Data de término" type="date" bind:value={v.dataFim} erro={erros.dataFim} required />
			<Select id="st" label="Situação" bind:value={v.status} opcoes={[{ valor: 'Aberta', texto: 'Aberta' }, { valor: 'Encerrada', texto: 'Encerrada' }]} />
		</div>
	</Card>
	<Card titulo="Insumos ofertados">
		{#if erros.itens}<p role="alert" class="mb-3 text-sm font-medium text-erro">{erros.itens}</p>{/if}
		<div class="flex flex-col gap-4">
			{#each v.itens as item, n}
				<div class="grid items-start gap-3 rounded-lg bg-marrom-claro p-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
					<Select id="ins{n}" label="Insumo" bind:value={item.insumoId} opcoes={opcoesInsumo} erro={erros[`i${n}`]} />
					<Input id="pre{n}" label="Preço unitário (R$)" type="number" step="0.01" bind:value={item.precoUnit} erro={erros[`p${n}`]} />
					<Input id="lim{n}" label="Limite por cota" type="number" bind:value={item.limitePorCota} erro={erros[`l${n}`]} dica="RN10" />
					<div class="sm:pt-7"><Button variante="contorno" onclick={() => v.itens.splice(n, 1)} aria-label="Remover insumo {n + 1}"><Trash2 size={18} aria-hidden="true" /></Button></div>
				</div>
			{/each}
		</div>
		<div class="mt-4"><Button variante="contorno" onclick={() => v.itens.push({ insumoId: '' as any, precoUnit: '' as any, limitePorCota: '' as any })}><Plus size={16} aria-hidden="true" />Adicionar insumo</Button></div>
	</Card>
	<div class="flex justify-end gap-3"><Button variante="contorno" href="/gestao/campanhas">Cancelar</Button><Button type="submit">Salvar campanha</Button></div>
</form>
