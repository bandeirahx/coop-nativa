<script lang="ts">
	import { page } from '$app/state';
	import { campanhas, pedidos } from '#lib/stores/dados.ts';
	import { meuCoop } from '#lib/stores/produtor.ts';
	import { limiteCotas, jaPedido } from '#lib/utils/regras.ts';
	import { nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { moeda } from '#lib/utils/formato.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { Minus, Plus, CircleCheck, ArrowLeft } from 'lucide-svelte';

	const inicial = page.url.searchParams.get('campanha');
	let passo = $state(inicial ? 2 : 1);
	let campId = $state<number | null>(inicial ? +inicial : null);
	let qtds = $state<Record<number, number>>({});
	let erro = $state('');
	let enviado = $state(false);
	const camp = $derived($campanhas.find((c) => c.id === campId));
	const linhas = $derived(camp && $meuCoop ? camp.itens.map((i) => {
		const limite = limiteCotas($meuCoop, camp, i.insumoId);
		const restante = Math.max(0, limite - jaPedido($pedidos, $meuCoop.id, camp.id, i.insumoId));
		return { ...i, restante, q: qtds[i.insumoId] ?? 0 };
	}) : []);
	const escolhidos = $derived(linhas.filter((l) => l.q > 0));
	const total = $derived(escolhidos.reduce((s, l) => s + l.q * l.precoUnit, 0));
	const nomesPassos = ['Campanha', 'Insumos', 'Revisar', 'Enviar'];

	function mudar(id: number, delta: number, max: number) {
		const novo = (qtds[id] ?? 0) + delta;
		if (novo > max) { erro = `Você só pode pedir mais ${max} deste insumo (limite das suas cotas).`; return; }
		erro = '';
		qtds[id] = Math.max(0, novo);
	}
	function avancar() {
		erro = '';
		if (passo === 1 && !camp) return (erro = 'Escolha uma campanha para continuar.');
		if (passo === 2 && !escolhidos.length) return (erro = 'Escolha a quantidade de pelo menos um insumo.');
		passo++;
	}
	function enviar() {
		if (!camp || !$meuCoop) return;
		for (const l of escolhidos) if (l.q > l.restante) return (erro = 'Quantidade acima do seu limite. Volte e ajuste.');
		pedidos.adicionar({ cooperadoId: $meuCoop.id, campanhaId: camp.id, data: new Date().toISOString().slice(0, 10), status: 'Pendente', itens: escolhidos.map((l) => ({ insumoId: l.insumoId, quantidade: l.q, valorUnit: l.precoUnit })) });
		toast('Pedido enviado com sucesso!');
		enviado = true;
	}
</script>

<svelte:head><title>Fazer pedido · Nativa Coop</title></svelte:head>
{#if enviado}
	<div class="rounded-[var(--radius-card)] border-2 border-verde bg-branco p-8 text-center">
		<CircleCheck size={64} class="mx-auto text-verde-escuro" aria-hidden="true" />
		<h1 class="mt-3 text-3xl">Pedido enviado!</h1>
		<p class="mt-2 text-marrom">Agora é só aguardar a confirmação do pagamento pela cooperativa.</p>
		<a href="/produtor/pedidos" class="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-verde px-6 text-xl font-bold text-branco">Ver meus pedidos</a>
	</div>
{:else}
	<h1 class="mb-1 text-3xl">Fazer pedido</h1>
	<p class="mb-4 text-marrom"><strong>Passo {passo} de 4:</strong> {nomesPassos[passo - 1]} <span class="text-xs">· UC05.1</span></p>
	<div class="mb-5 flex gap-1" aria-hidden="true">{#each nomesPassos as _, i}<span class="h-2 flex-1 rounded-full {i < passo ? 'bg-verde' : 'bg-borda'}"></span>{/each}</div>

	{#if erro}<p role="alert" class="mb-4 rounded-lg bg-erro-claro p-4 font-bold text-erro">{erro}</p>{/if}

	{#if passo === 1}
		<fieldset class="flex flex-col gap-3"><legend class="mb-2 text-xl font-bold">Escolha a campanha</legend>
			{#each $campanhas.filter((c) => c.status === 'Aberta') as c}
				<label class="flex min-h-16 cursor-pointer items-center gap-3 rounded-[var(--radius-card)] border-2 bg-branco p-4 {campId === c.id ? 'border-verde' : 'border-borda'}">
					<input type="radio" name="camp" class="size-6 accent-[#4F9808]" checked={campId === c.id} onchange={() => (campId = c.id)} /><span class="font-bold">{c.nome}</span></label>
			{/each}</fieldset>
	{:else if passo === 2}
		<h2 class="mb-1 text-xl">{camp?.nome}</h2>
		<ul class="flex flex-col gap-4">
			{#each linhas as l}
				<li class="rounded-[var(--radius-card)] border border-borda bg-branco p-4">
					<p class="text-xl font-bold">{nomeInsumo(l.insumoId)}</p>
					<p class="text-marrom">{moeda(l.precoUnit)} por {unidadeInsumo(l.insumoId)}</p>
					<p class="my-2 rounded-lg bg-verde-claro p-2 font-bold text-verde-escuro">Você ainda pode pedir: {l.restante - l.q}</p>
					<div class="flex items-center justify-between gap-3">
						<button class="flex size-14 items-center justify-center rounded-full border-2 border-marrom text-marrom" aria-label="Diminuir {nomeInsumo(l.insumoId)}" onclick={() => mudar(l.insumoId, -1, l.restante)}><Minus size={28} aria-hidden="true" /></button>
						<output class="font-titulo text-4xl font-extrabold" aria-live="polite">{l.q}</output>
						<button class="flex size-14 items-center justify-center rounded-full bg-verde text-branco" aria-label="Aumentar {nomeInsumo(l.insumoId)}" onclick={() => mudar(l.insumoId, 1, l.restante)}><Plus size={28} aria-hidden="true" /></button>
					</div></li>
			{/each}
		</ul>
	{:else if passo === 3}
		<h2 class="mb-3 text-xl">Confira seu pedido</h2>
		<ul class="divide-y divide-borda rounded-[var(--radius-card)] border border-borda bg-branco">
			{#each escolhidos as l}<li class="flex items-center justify-between gap-3 p-4"><span class="font-bold">{l.q} × {nomeInsumo(l.insumoId)}</span><span>{moeda(l.q * l.precoUnit)}</span></li>{/each}
		</ul>
		<p class="mt-4 text-right font-titulo text-3xl font-extrabold text-marrom">Total: {moeda(total)}</p>
	{:else}
		<div class="rounded-[var(--radius-card)] border border-borda bg-branco p-5"><p class="text-xl font-bold">Tudo certo para enviar?</p>
			<p class="mt-2 text-marrom">Total de <strong>{moeda(total)}</strong>. O pagamento será confirmado pela cooperativa.</p></div>
	{/if}

	<div class="mt-6 flex flex-col gap-3">
		{#if passo < 4}<button class="min-h-14 rounded-lg bg-verde px-6 text-xl font-bold text-branco hover:bg-verde-escuro" onclick={avancar}>Continuar</button>
		{:else}<button class="min-h-14 rounded-lg bg-verde px-6 text-xl font-bold text-branco hover:bg-verde-escuro" onclick={enviar}>Enviar pedido</button>{/if}
		{#if passo > 1}<button class="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border-2 border-borda bg-branco px-6 text-lg font-bold text-marrom" onclick={() => { erro = ''; passo--; }}><ArrowLeft size={22} aria-hidden="true" />Voltar</button>{/if}
	</div>
{/if}
