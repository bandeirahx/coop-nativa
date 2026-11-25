<script lang="ts">
	import { meuCoop } from '#lib/stores/produtor.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { campanhas, pedidos } from '#lib/stores/dados.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import { ClipboardList, Megaphone, MapPinned, ArrowUpRight } from 'lucide-svelte';
	const abertas = $derived($campanhas.filter((c) => c.status === 'Aberta').length);
	const meus = $derived($pedidos.filter((p) => p.cooperadoId === $meuCoop?.id && p.status === 'Pendente').length);
	const botoes = $derived([
		{ h: '/produtor/pedidos', t: 'Meus pedidos', s: meus ? `${meus} aguardando pagamento` : 'Ver o que já pedi', i: ClipboardList, img: '/images/novas/cards/colmeia.webp' },
		{ h: '/produtor/campanhas', t: 'Campanhas abertas', s: `${abertas} campanha(s) abertas`, i: Megaphone, img: '/images/novas/cards/landing.webp' },
		{ h: '/produtor/propriedades', t: 'Minhas propriedades', s: 'Terras e o que posso produzir', i: MapPinned, img: '/images/novas/cards/muda.webp' }
	]);
</script>

<svelte:head><title>Início · Nativa Coop</title></svelte:head>
<ModuloHero
	modulo="cooperados"
	titulo="Olá, {$usuario?.nome.split(' ')[0]}!"
	subtitulo="Acompanhe suas cotas, campanhas e pedidos de insumos."
	uc="Área do produtor · UC05.2 · UC04.3 · UC02.3"
/>

<p class="my-5 inline-block rounded-btn bg-oliva px-4 py-2 font-titulo text-lg font-bold text-areia">Você tem {$meuCoop?.qtdCotas} cotas</p>

<ul class="flex flex-col gap-4">
	{#each botoes as b}
		<li><a href={b.h} class="card-foto compacto flex min-h-24 items-center gap-4 p-4 text-areia" style="--mod-card: url('{b.img}'); --mod-overlay-a: color-mix(in srgb, var(--cor-base-marrom-profundo) 74%, transparent); --mod-overlay-b: color-mix(in srgb, var(--cor-base-cafe) 72%, transparent);">
			<div class="card-foto-foto" aria-hidden="true"></div>
			<span class="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-areia/15"><b.i size={30} aria-hidden="true" /></span>
			<span class="relative z-10 flex-1"><span class="block font-titulo text-xl font-bold">{b.t}</span><span class="block text-sm text-areia/85">{b.s}</span></span>
			<ArrowUpRight size={22} aria-hidden="true" />
		</a></li>
	{/each}
</ul>
