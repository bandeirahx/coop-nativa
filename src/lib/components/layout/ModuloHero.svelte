<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		cooperados, campanhas, pedidos, compras, estoque, distribuicoes, pedidosCom
	} from '#lib/stores/dados.ts';

	type Modulo = 'cooperados' | 'compras' | 'estoque' | 'comercializacao';

	let {
		modulo,
		titulo,
		subtitulo,
		uc,
		acoes,
		metricas
	}: {
		modulo?: Modulo;
		titulo: string;
		subtitulo?: string;
		uc?: string;
		acoes?: Snippet;
		metricas?: Snippet;
	} = $props();

	const classes = $derived(`hero-modulo ${modulo ? `mod-${modulo}` : ''} rounded-[var(--raio-painel)]`);

	/* Métricas reais do módulo, exibidas quando a tela não fornece suas próprias. */
	const total = $derived(
		modulo === 'cooperados' ? $cooperados.length
			: modulo === 'compras' ? $campanhas.length + $pedidos.length + $compras.length
			: modulo === 'estoque' ? $estoque.length + $distribuicoes.length
			: modulo === 'comercializacao' ? $pedidosCom.length : 0
	);
	const andamento = $derived(
		modulo === 'cooperados' ? $cooperados.filter((c) => c.status === 'Ativo').length
			: modulo === 'compras' ? $campanhas.filter((c) => c.status === 'Aberta').length
			: modulo === 'estoque' ? $distribuicoes.filter((d) => d.status === 'Registrada').length
			: modulo === 'comercializacao' ? $pedidosCom.filter((p) => p.status === 'Aprovado/Pago').length : 0
	);
	const atencao = $derived(
		modulo === 'cooperados' ? $cooperados.filter((c) => c.status === 'Inativo').length
			: modulo === 'compras' ? $pedidos.filter((p) => p.status === 'Pendente').length
			: modulo === 'estoque' ? $estoque.filter((e) => e.qtd < e.minimo).length
			: modulo === 'comercializacao' ? $pedidosCom.filter((p) => p.status === 'Pendente').length : 0
	);
</script>

<svelte:head><title>{titulo} · Nativa Coop</title></svelte:head>

<section class={classes}>
	<div class="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:px-8">
		<div>
			{#if uc}<p class="mb-1 text-xs font-bold tracking-[0.18em] text-areia/85 uppercase">{uc}</p>{/if}
			<h1>{titulo}</h1>
			{#if subtitulo}<p class="mt-2 max-w-2xl text-base text-areia/90">{subtitulo}</p>{/if}
			{#if acoes}<div class="mt-3 flex flex-wrap gap-3">{@render acoes()}</div>{/if}
		</div>
		{#if metricas}
			<div class="mt-auto flex flex-wrap gap-x-8 gap-y-3 border-t border-areia/25 pt-3">{@render metricas()}</div>
		{:else if modulo}
			<div class="mt-auto flex flex-wrap gap-x-8 gap-y-3 border-t border-areia/25 pt-3">
				<div><p class="metrica">{total}</p><p class="text-xs font-semibold tracking-wide text-areia/80 uppercase">no módulo</p></div>
				<div><p class="metrica">{andamento}</p><p class="text-xs font-semibold tracking-wide text-areia/80 uppercase">em andamento</p></div>
				<div><p class="metrica">{atencao}</p><p class="text-xs font-semibold tracking-wide text-areia/80 uppercase">requer atenção</p></div>
			</div>
		{/if}
	</div>
</section>
