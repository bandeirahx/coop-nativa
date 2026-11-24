<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { distribuicoes, cooperados, pedidos, insumos } from '#lib/stores/dados.ts';
	import { saldo } from '#lib/utils/estoque.ts';
	import { nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { CircleCheck, CircleX, CircleAlert } from 'lucide-svelte';

	type Verif = { rotulo: string; ok: boolean; msg: string };
	let coopId = $state(''), insId = $state('');
	let dataDist = $state(new Date().toISOString().slice(0, 10));
	let erros = $state<Record<string, string>>({});
	let verificacao = $state<Verif[] | null>(null);
	let pedidoId = $state<number | null>(null);
	let prevista = $state(0);
	let registrada = $state<number | null>(null);
	// qualquer mudança nos campos invalida a verificação anterior
	$effect(() => { coopId; insId; dataDist; verificacao = null; pedidoId = null; });

	const pedidoAutorizado = $derived($pedidos.find((p) => p.id === pedidoId));

	/** Etapa 1 (UC10.1): verifica cadastro, pedido autorizado/pago e estoque. */
	function continuar(e: SubmitEvent) {
		e.preventDefault();
		const er: Record<string, string> = {};
		if (!coopId) er.coop = 'Escolha o cooperado.';
		if (!insId) er.ins = 'Escolha o insumo.';
		if (!dataDist) er.data = 'Informe a data da distribuição.';
		erros = er;
		if (Object.keys(er).length) return;

		const coop = $cooperados.find((c) => c.id === +coopId);
		const insumo = $insumos.find((i) => i.id === +insId);
		const v: Verif[] = [];
		v.push(coop
			? coop.status === 'Ativo' ? { rotulo: 'Cooperado cadastrado e ativo', ok: true, msg: coop.nome } : { rotulo: 'Cooperado cadastrado e ativo', ok: false, msg: 'Cooperado inativo: não é possível registrar distribuição.' }
			: { rotulo: 'Cooperado cadastrado', ok: false, msg: 'Cooperado não encontrado.' });
		v.push(insumo ? { rotulo: 'Insumo cadastrado', ok: true, msg: insumo.nome } : { rotulo: 'Insumo cadastrado', ok: false, msg: 'Insumo não encontrado.' });

		const doCoop = $pedidos.filter((p) => p.cooperadoId === +coopId && p.itens.some((i) => i.insumoId === +insId));
		const jaDist = (pid: number) => $distribuicoes.some((d) => d.pedidoId === pid && d.itens.some((i) => i.insumoId === +insId));
		const aprovado = doCoop.find((p) => p.status === 'Aprovado/Pago' && !jaDist(p.id));
		let item = aprovado?.itens.find((i) => i.insumoId === +insId);
		if (aprovado && item) {
			v.push({ rotulo: 'Pedido autorizado com pagamento confirmado', ok: true, msg: `Pedido #${aprovado.id} · Aprovado/Pago · ${item.quantidade} ${unidadeInsumo(item.insumoId)}` });
		} else if (doCoop.some((p) => p.status === 'Aprovado/Pago' && jaDist(p.id))) {
			v.push({ rotulo: 'Pedido autorizado com pagamento confirmado', ok: false, msg: 'Já existe distribuição registrada para este insumo no pedido aprovado do cooperado.' });
		} else if (doCoop.length) {
			v.push({ rotulo: 'Pedido autorizado com pagamento confirmado', ok: false, msg: `Pedido #${doCoop[0].id} não autorizado para entrega: situação "${doCoop[0].status}". Exige pedido Aprovado/Pago (RN09).` });
		} else {
			v.push({ rotulo: 'Pedido autorizado com pagamento confirmado', ok: false, msg: 'Este cooperado não possui pedido deste insumo.' });
		}
		if (aprovado && item) {
			const s = saldo(item.insumoId);
			v.push(s >= item.quantidade
				? { rotulo: 'Estoque disponível', ok: true, msg: `${s} em estoque (necessário ${item.quantidade})` }
				: { rotulo: 'Estoque disponível', ok: false, msg: `Estoque insuficiente de ${nomeInsumo(item.insumoId)}: disponível ${s}, necessário ${item.quantidade}.` });
		} else v.push({ rotulo: 'Estoque disponível', ok: false, msg: 'Não verificado: pedido não identificado.' });

		verificacao = v;
		pedidoId = aprovado?.id ?? null;
		prevista = item?.quantidade ?? 0;
	}

	/** Etapa 2: confirma o registro (sem baixa de estoque). */
	function confirmar() {
		if (!verificacao?.every((x) => x.ok) || !pedidoId) return;
		registrada = distribuicoes.adicionar({ cooperadoId: +coopId, pedidoId, data: dataDist, status: 'Registrada', observacao: '', itens: [{ insumoId: +insId, prevista, distribuida: 0 }] });
		toast('Distribuição registrada.');
	}
	const tudoOk = $derived(!!verificacao && verificacao.every((x) => x.ok));
</script>

<ModuloHero
	modulo="estoque"
	titulo="Registrar distribuição"
	subtitulo="Verifica cooperado, pedido autorizado e estoque antes de registrar (sem baixa de estoque)."
	uc="RF10: Gerenciar Distribuição de Insumos · UC10.1"
	texturaForaDoModulo="couro"
>
	{#snippet acoes()}{/snippet}
</ModuloHero>
{#if registrada}
	<Card class="max-w-2xl">
		<p class="flex items-start gap-2 rounded-lg bg-aviso-claro p-4 font-medium text-aviso-texto"><CircleAlert size={22} class="mt-0.5 shrink-0" aria-hidden="true" />
			<span>Distribuição #{registrada} registrada, mas <strong>ainda não houve baixa no estoque</strong>. A baixa acontece ao registrar a quantidade distribuída (UC10.2).</span></p>
		<div class="mt-5 flex flex-wrap gap-3"><Button href="/gestao/distribuicao/{registrada}/quantidade">Registrar quantidade distribuída</Button><Button variante="contorno" href="/gestao/distribuicao">Ir para a lista</Button></div>
	</Card>
{:else}
	<form onsubmit={continuar} novalidate class="flex max-w-2xl flex-col gap-6">
		<Card titulo="1. Dados da distribuição"><div class="grid gap-4 sm:grid-cols-2">
			<Select id="coop" label="Cooperado" bind:value={coopId} erro={erros.coop} required opcoes={$cooperados.map((c) => ({ valor: c.id, texto: `${c.nome}${c.status === 'Inativo' ? ' (inativo)' : ''}` }))} />
			<Select id="ins" label="Insumo" bind:value={insId} erro={erros.ins} required opcoes={$insumos.map((i) => ({ valor: i.id, texto: i.nome }))} />
			<Input id="dt" label="Data da distribuição" type="date" bind:value={dataDist} erro={erros.data} required />
		</div>
		{#if !verificacao}<div class="mt-5 flex justify-end gap-3"><Button variante="contorno" href="/gestao/distribuicao">Cancelar</Button><Button type="submit">Continuar</Button></div>{/if}</Card>
	</form>

	{#if verificacao}
		<Card titulo="2. Verificação do sistema" class="mt-6 max-w-2xl">
			<ul class="flex flex-col gap-3" aria-live="polite">
				{#each verificacao as x}
					<li class="flex items-start gap-3 rounded-lg p-3 {x.ok ? 'bg-verde-claro' : 'bg-erro-claro'}">
						{#if x.ok}<CircleCheck size={22} class="mt-0.5 shrink-0 text-verde-escuro" aria-label="Verificado" />{:else}<CircleX size={22} class="mt-0.5 shrink-0 text-erro" aria-label="Com problema" />{/if}
						<div><p class="font-semibold {x.ok ? 'text-verde-escuro' : 'text-erro'}">{x.rotulo}</p><p class="text-sm {x.ok ? 'text-marrom' : 'font-medium text-erro'}">{x.msg}</p></div>
					</li>
				{/each}
			</ul>
			{#if tudoOk && pedidoAutorizado}
				<p class="mt-4 flex items-start gap-2 rounded-lg bg-aviso-claro p-3 text-sm font-medium text-aviso-texto"><CircleAlert size={20} class="mt-0.5 shrink-0" aria-hidden="true" /><span>Nesta etapa <strong>não há baixa no estoque</strong>. A baixa só ocorre ao registrar a quantidade distribuída (UC10.2).</span></p>
			{/if}
			<div class="mt-5 flex flex-wrap justify-end gap-3">
				<Button variante="contorno" onclick={() => (verificacao = null)}>Voltar e corrigir</Button>
				{#if tudoOk}<Button onclick={confirmar}>Confirmar registro</Button>{/if}
			</div>
		</Card>
	{/if}
{/if}
