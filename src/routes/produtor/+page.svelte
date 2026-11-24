<script lang="ts">
	import { meuCoop } from '#lib/stores/produtor.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { campanhas, pedidos } from '#lib/stores/dados.ts';
	import { ClipboardList, Megaphone, MapPinned } from 'lucide-svelte';
	const abertas = $derived($campanhas.filter((c) => c.status === 'Aberta').length);
	const meus = $derived($pedidos.filter((p) => p.cooperadoId === $meuCoop?.id && p.status === 'Pendente').length);
	const botoes = $derived([
		{ h: '/produtor/pedidos', t: 'Meus pedidos', s: meus ? `${meus} aguardando pagamento` : 'Ver o que já pedi', i: ClipboardList },
		{ h: '/produtor/campanhas', t: 'Campanhas abertas', s: `${abertas} campanha(s) abertas`, i: Megaphone },
		{ h: '/produtor/propriedades', t: 'Minhas propriedades', s: 'Terras e o que posso produzir', i: MapPinned }
	]);
</script>

<svelte:head><title>Início · Nativa Coop</title></svelte:head>
<section class="relative isolate mb-6 overflow-hidden rounded-[var(--radius-card)] p-6 text-branco">
	<img src="/images/semente.jpg" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
	<div class="absolute inset-0 -z-10 bg-marrom-escuro/55"></div>
	<p class="text-lg">Bom dia,</p>
	<h1 class="!text-branco text-3xl font-extrabold">{$usuario?.nome.split(' ')[0]}!</h1>
	<p class="mt-3 inline-block rounded-lg bg-branco px-3 py-1 font-bold text-marrom">Você tem {$meuCoop?.qtdCotas} cotas</p>
</section>
<ul class="flex flex-col gap-4">
	{#each botoes as b}
		<li><a href={b.h} class="flex min-h-24 items-center gap-4 rounded-[var(--radius-card)] border-2 border-borda bg-branco p-4 shadow-suave">
			<span class="flex size-14 shrink-0 items-center justify-center rounded-full bg-verde-claro text-verde-escuro"><b.i size={30} aria-hidden="true" /></span>
			<span><span class="block text-xl font-bold">{b.t}</span><span class="block text-base text-marrom">{b.s}</span></span></a></li>
	{/each}
</ul>
<p class="mt-6 text-center text-xs text-marrom">UC05.2 · UC04.3 · UC02.3</p>
