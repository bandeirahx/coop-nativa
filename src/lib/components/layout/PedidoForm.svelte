<script lang="ts">
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';
	import ModuloHero from './ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { campanhas, cooperados, pedidos } from '#lib/stores/dados.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { limiteCotas, jaPedido } from '#lib/utils/regras.ts';
	import { nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { moeda } from '#lib/utils/formato.ts';
	import type { PedidoInsumo } from '#lib/mock/tipos.ts';

	let { original }: { original?: PedidoInsumo } = $props();
	const editando = untrack(() => !!original);
	let campId = $state<number | ''>(untrack(() => original?.campanhaId ?? ''));
	let coopId = $state<number | ''>(untrack(() => original?.cooperadoId ?? ''));
	let qtds = $state<Record<number, number | ''>>(untrack(() => Object.fromEntries((original?.itens ?? []).map((i) => [i.insumoId, i.quantidade]))));
	let erros = $state<Record<string, string>>({});
	let erroGeral = $state('');

	const camp = $derived($campanhas.find((c) => c.id === Number(campId)));
	const coop = $derived($cooperados.find((c) => c.id === Number(coopId)));
	const linhas = $derived(
		camp && coop
			? camp.itens.map((i) => {
					const limite = limiteCotas(coop, camp, i.insumoId);
					const usado = jaPedido($pedidos, coop.id, camp.id, i.insumoId, original?.id);
					const restante = Math.max(0, limite - usado);
					const q = Number(qtds[i.insumoId] || 0);
					return { ...i, limite, usado, restante, q, subtotal: q * i.precoUnit };
				})
			: []
	);
	const total = $derived(linhas.reduce((s, l) => s + l.subtotal, 0));

	function enviar(e: SubmitEvent) {
		e.preventDefault();
		const er: Record<string, string> = {};
		erroGeral = '';
		if (!camp) er.camp = 'Escolha uma campanha aberta.';
		if (!coop) er.coop = 'Escolha o cooperado.';
		else if (coop.status !== 'Ativo') er.coop = 'Este cooperado está inativo e não pode fazer pedidos.';
		for (const l of linhas) {
			const bruto = qtds[l.insumoId];
			if (bruto !== undefined && bruto !== '' && Number(bruto) < 0) er[`q${l.insumoId}`] = 'Quantidade inválida.';
			else if (l.q > l.restante) er[`q${l.insumoId}`] = `Quantidade acima do limite restante por cotas (${l.restante}).`;
		}
		if (camp && coop && !linhas.some((l) => l.q > 0)) erroGeral = 'Informe a quantidade de pelo menos um insumo.';
		erros = er;
		if (Object.keys(er).length || erroGeral) return toast('Corrija os campos destacados.', 'erro');
		const itens = linhas.filter((l) => l.q > 0).map((l) => ({ insumoId: l.insumoId, quantidade: l.q, valorUnit: l.precoUnit }));
		const id = editando
			? (pedidos.alterar(original!.id, { itens }), original!.id)
			: pedidos.adicionar({ cooperadoId: coop!.id, campanhaId: camp!.id, data: new Date().toISOString().slice(0, 10), status: 'Registrado', itens });
		toast(editando ? 'Pedido atualizado com sucesso.' : 'Pedido registrado com sucesso. Aguardando confirmação de pagamento.');
		goto(`/gestao/pedidos/${id}`);
	}
</script>

<ModuloHero
	modulo="compras"
	titulo={editando ? `Editar pedido #${original?.id}` : 'Registrar pedido de insumo'}
	subtitulo="Escolha a campanha aberta, os insumos e as quantidades dentro do limite de suas cotas."
	uc="RF05: Gerenciar Pedidos de Insumos · {editando ? 'UC05.3' : 'UC05.1'}"
>
	{#snippet acoes()}{/snippet}
</ModuloHero>
<form onsubmit={enviar} novalidate class="flex max-w-4xl flex-col gap-6">
	<Card titulo="Campanha e cooperado">
		<div class="grid gap-4 sm:grid-cols-2">
			<Select id="camp" label="Campanha aberta" bind:value={campId} erro={erros.camp} required disabled={editando}
				opcoes={$campanhas.filter((c) => c.status === 'Aberta' || c.id === original?.campanhaId).map((c) => ({ valor: c.id, texto: c.nome }))} />
			<Select id="coop" label="Cooperado" bind:value={coopId} erro={erros.coop} required disabled={editando}
				opcoes={$cooperados.map((c) => ({ valor: c.id, texto: `${c.nome}${c.status === 'Inativo' ? ' (inativo)' : ''}` }))} />
		</div>
		{#if coop}<p class="mt-3 text-sm text-marrom">Cotas do cooperado: <strong>{coop.qtdCotas}</strong>. O limite de cada insumo é proporcional às cotas (RN10).</p>{/if}
	</Card>

	{#if camp && coop}
		<Card titulo="Itens do pedido">
			{#if erroGeral}<p role="alert" class="mb-3 rounded-lg bg-erro-claro p-3 text-sm font-medium text-erro">{erroGeral}</p>{/if}
			<div class="flex flex-col gap-3">
				{#each linhas as l}
					<div class="grid items-start gap-3 rounded-lg bg-marrom-claro p-3 sm:grid-cols-[2fr_1fr_1fr_1fr]">
						<div><p class="font-semibold">{nomeInsumo(l.insumoId)}</p><p class="text-sm text-marrom">{moeda(l.precoUnit)} / {unidadeInsumo(l.insumoId)}</p></div>
						<div class="text-sm"><p class="font-semibold text-marrom">Limite restante</p><p class="font-titulo text-xl font-bold text-verde-escuro">{l.restante}</p><p class="text-marrom">de {l.limite} (já pedido: {l.usado})</p></div>
						<div class="flex flex-col gap-1">
							<label for="q{l.insumoId}" class="text-sm font-semibold text-marrom">Quantidade</label>
							<input id="q{l.insumoId}" type="number" min="0" bind:value={qtds[l.insumoId]} aria-invalid={!!erros[`q${l.insumoId}`]} aria-describedby={erros[`q${l.insumoId}`] ? `e${l.insumoId}` : undefined}
								class="campo {erros[`q${l.insumoId}`] ? 'border-erro' : ''}" />
							{#if erros[`q${l.insumoId}`]}<p id="e{l.insumoId}" role="alert" class="text-sm font-medium text-erro">{erros[`q${l.insumoId}`]}</p>{/if}
						</div>
						<div class="text-sm"><p class="font-semibold text-marrom">Subtotal</p><p class="text-lg font-bold">{moeda(l.subtotal)}</p></div>
					</div>
				{/each}
			</div>
			<p class="mt-4 text-right font-titulo text-xl font-bold text-marrom">Total: {moeda(total)}</p>
		</Card>
	{/if}
	<div class="flex justify-end gap-3"><Button variante="contorno" href="/gestao/pedidos">Cancelar</Button><Button type="submit">{editando ? 'Salvar alterações' : 'Registrar pedido'}</Button></div>
</form>
