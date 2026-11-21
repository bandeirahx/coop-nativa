<script lang="ts">
	import { goto } from '$app/navigation';
	import PageHeader from '#lib/components/layout/PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { pedidosCom, compradores, catalogo, producoes } from '#lib/stores/dados.ts';
	import { disponivel } from '#lib/utils/disponibilidade.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { moeda } from '#lib/utils/formato.ts';

	let compId = $state('');
	let qtds = $state<Record<number, number | ''>>({});
	let erros = $state<Record<string, string>>({});
	let erroGeral = $state('');
	const linhas = $derived((void $producoes, void $pedidosCom,
		$catalogo.filter((p) => p.status === 'Ativo').map((p) => { const disp = disponivel(p.nome); const q = Number(qtds[p.id] || 0); return { ...p, disp, q, sub: q * p.preco }; })));
	const total = $derived(linhas.reduce((s, l) => s + l.sub, 0));

	function salvar(e: SubmitEvent) {
		e.preventDefault();
		const er: Record<string, string> = {};
		erroGeral = '';
		if (!compId) er.comp = 'Escolha o comprador.';
		for (const l of linhas) {
			if (qtds[l.id] !== undefined && qtds[l.id] !== '' && Number(qtds[l.id]) < 0) er[`q${l.id}`] = 'Quantidade inválida.';
			else if (l.q > l.disp) er[`q${l.id}`] = `Quantidade acima da produção disponível (${l.disp}).`;
		}
		if (!linhas.some((l) => l.q > 0)) erroGeral = 'Adicione ao menos um produto com quantidade maior que zero.';
		erros = er;
		if (Object.keys(er).length || erroGeral) return toast('Corrija os campos destacados.', 'erro');
		const id = pedidosCom.adicionar({ compradorId: +compId, data: new Date().toISOString().slice(0, 10), status: 'Pendente', itens: linhas.filter((l) => l.q > 0).map((l) => ({ produto: l.nome, quantidade: l.q, valorUnit: l.preco })) });
		toast('Pedido de comercialização registrado com sucesso.');
		goto(`/gestao/comercializacao/${id}`);
	}
</script>

<PageHeader titulo="Registrar pedido do comprador" uc="RF13: Gerenciar Pedidos de Comercialização · UC13.1" />
<form onsubmit={salvar} novalidate class="flex max-w-4xl flex-col gap-6">
	<Card><Select id="comp" label="Comprador" bind:value={compId} erro={erros.comp} required opcoes={$compradores.map((c) => ({ valor: c.id, texto: c.nome }))} /></Card>
	<Card titulo="Produtos do catálogo">
		{#if erroGeral}<p role="alert" class="mb-3 rounded-lg bg-erro-claro p-3 text-sm font-medium text-erro">{erroGeral}</p>{/if}
		<div class="flex flex-col gap-3">
			{#each linhas as l}
				<div class="grid items-start gap-3 rounded-lg bg-marrom-claro p-3 sm:grid-cols-[2fr_1.2fr_1fr_1fr]">
					<div><p class="font-semibold">{l.nome}</p><p class="text-sm text-marrom">{moeda(l.preco)} / {l.unidade}</p></div>
					<div class="text-sm"><p class="font-semibold text-marrom">Disponível</p><p class="font-titulo text-xl font-bold text-verde-escuro">{l.disp.toLocaleString('pt-BR')}</p><p class="text-marrom">produção − reservado</p></div>
					<div class="flex flex-col gap-1"><label for="q{l.id}" class="text-sm font-semibold text-marrom">Quantidade</label>
						<input id="q{l.id}" type="number" min="0" bind:value={qtds[l.id]} class="min-h-11 rounded-lg border bg-branco px-3 {erros[`q${l.id}`] ? 'border-erro' : 'border-borda'}" aria-invalid={!!erros[`q${l.id}`]} />
						{#if erros[`q${l.id}`]}<p role="alert" class="text-sm font-medium text-erro">{erros[`q${l.id}`]}</p>{/if}</div>
					<div class="text-sm"><p class="font-semibold text-marrom">Subtotal</p><p class="text-lg font-bold">{moeda(l.sub)}</p></div>
				</div>
			{/each}
		</div>
		<p class="mt-4 text-right font-titulo text-xl font-bold text-marrom">Total: {moeda(total)}</p>
	</Card>
	<div class="flex justify-end gap-3"><Button variante="contorno" href="/gestao/comercializacao">Cancelar</Button><Button type="submit">Registrar pedido</Button></div>
</form>
