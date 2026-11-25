<script lang="ts">
	import Button from '#lib/components/ui/Button.svelte';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { UsersRound, ShoppingBasket, Sprout, Store, Phone, Mail, MapPin } from 'lucide-svelte';

	const processos = [
		{ icone: UsersRound, titulo: 'Cadastro', texto: 'Cooperados, propriedades e capacidade produtiva sempre atualizados.', imagem: '/images/novas/cards/areia.webp' },
		{ icone: ShoppingBasket, titulo: 'Compra coletiva de insumos', texto: 'Campanhas, pedidos, compra com fornecedor, estoque e distribuição.', imagem: '/images/novas/cards/colmeia.webp' },
		{ icone: Sprout, titulo: 'Produção', texto: 'Registro da produção disponível de cada cooperado.', imagem: '/images/novas/cards/muda.webp' },
		{ icone: Store, titulo: 'Comercialização', texto: 'Catálogo de produtos e pedidos de compradores.', imagem: '/images/novas/cards/folhagem.webp' }
	];
	const numeros = [['248', 'cooperados'], ['14', 'municípios atendidos'], ['3.600 t', 'produzidas na safra']];
	const passos = ['Procure a sede da cooperativa ou fale com a equipe.', 'Apresente seus documentos e os dados da propriedade.', 'Escolha a quantidade de cotas de participação.', 'Receba seu acesso e participe das campanhas.'];
	const texturas = [
		{ arquivo: '/images/novas/cards/argila.webp', titulo: 'Argila vermelha', alt: 'Textura de solo de argila avermelhada' },
		{ arquivo: '/images/novas/cards/colmeia.webp', titulo: 'Colmeia', alt: 'Colmeia de mel em close-up, com células hexagonais' },
		{ arquivo: '/images/novas/cards/aneis-arvore.webp', titulo: 'Anéis da árvore', alt: 'Anéis de crescimento de um tronco de árvore' },
		{ arquivo: '/images/novas/cards/folhagem.webp', titulo: 'Folhagem', alt: 'Folhagem verde em close-up' },
		{ arquivo: '/images/novas/cards/folha-verde.webp', titulo: 'Veias da folha', alt: 'Veias de uma folha verde vistas de perto' },
		{ arquivo: '/images/novas/cards/landing.webp', titulo: 'Folha seca', alt: 'Veias de folha em tons de ocre e marrom' },
		{ arquivo: '/images/novas/cards/madeira-verde.webp', titulo: 'Madeira viva', alt: 'Veios e rachaduras de madeira com musgo verde' },
		{ arquivo: '/images/novas/cards/penas.webp', titulo: 'Penas', alt: 'Textura de penas de ave em azul e ferrugem' },
		{ arquivo: '/images/novas/cards/pelagem.webp', titulo: 'Pelagem', alt: 'Pelagem de felino com manchas em roseta' },
		{ arquivo: '/images/novas/cards/areia.webp', titulo: 'Areia', alt: 'Areia com sulcos formados pelo vento' }
	];
</script>

<svelte:head><title>Nativa Coop · Cooperativa agrícola do Tocantins</title></svelte:head>

<header class="header-textura sticky top-0 z-30 border-b border-areia/15 bg-marrom-profundo/85 backdrop-blur-sm"
	style="background-image: var(--overlay-fundo), var(--img-fundo); background-size: cover; background-position: center;">
	<div class="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
		<a href="/"><Logo tamanho="h-11" fundo="areia" classe="hidden md:flex" /></a>
		<div class="flex items-center gap-3"><AccessibilityBar /><Button href="/login">Entrar</Button></div>
	</div>
</header>

<main class="fundo-app">
	<section class="hero-modulo relative isolate overflow-hidden rounded-none mod-cooperados"
		style="--mod-image: url('/images/novas/heroes/landing.webp'); --mod-overlay-a: color-mix(in srgb, var(--cor-base-oliva) 74%, transparent); --mod-overlay-b: color-mix(in srgb, var(--cor-base-marrom-profundo) 72%, transparent);">
		<div class="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-32">
			<p class="mb-4 text-sm font-bold tracking-[0.18em] text-areia/85 uppercase">Cooperativa agrícola · Tocantins</p>
			<h1 class="max-w-3xl !text-[clamp(3rem,5vw,3.75rem)] !text-areia">Juntos, plantamos mais e compramos melhor.</h1>
			<p class="mt-5 max-w-xl text-lg text-areia/90">A Nativa Coop reúne produtores para comprar insumos em conjunto, organizar a produção e vender com mais força.</p>
			<div class="mt-9 flex flex-wrap gap-3">
				<Button href="/login" grande modulo="cooperados">Acessar o sistema</Button>
				<Button href="#como-participar" variante="contorno" grande>Quero ser cooperado</Button>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-16" aria-labelledby="oque">
		<h2 id="oque" class="text-3xl text-areia">O que a cooperativa faz</h2>
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each processos as p}
				<article class="card-foto compacto min-h-[220px] p-5 text-areia" style="--mod-card: url('{p.imagem}'); --mod-overlay-a: color-mix(in srgb, var(--cor-base-marrom-profundo) 74%, transparent); --mod-overlay-b: color-mix(in srgb, var(--cor-base-cafe) 72%, transparent);">
					<div class="card-foto-foto" aria-hidden="true"></div>
					<span class="relative z-10 inline-flex size-12 items-center justify-center rounded-btn bg-areia/15"><p.icone size={26} aria-hidden="true" /></span>
					<div class="relative z-10">
						<h3 class="text-xl !text-areia">{p.titulo}</h3>
						<p class="mt-2 text-sm text-areia/90">{p.texto}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="py-14" aria-label="Números da cooperativa">
		<div class="painel mx-auto max-w-6xl p-8">
			<dl class="grid gap-8 text-center sm:grid-cols-3">
				{#each numeros as [n, t]}
					<div><dt class="sr-only">{t}</dt><dd class="metrica text-oliva">{n}</dd><dd class="mt-2 font-medium text-marrom">{t}</dd></div>
				{/each}
			</dl>
		</div>
	</section>

	<section id="texturas" class="mx-auto max-w-6xl px-4 py-16" aria-labelledby="texturas-titulo">
		<h2 id="texturas-titulo" class="text-3xl text-areia">Texturas da nossa terra</h2>
		<p class="mt-3 max-w-2xl text-lg text-areia/90">Olhares próximos da natureza que inspiram a identidade da cooperativa: solo, folhas, madeira, colmeia e os detalhes do campo.</p>
		<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
			{#each texturas as t}
				<figure class="card-foto compacto relative isolate aspect-[4/3] min-w-0" style="--mod-card: url('{t.arquivo}'); --mod-overlay-a: color-mix(in srgb, var(--cor-base-marrom-profundo) 74%, transparent); --mod-overlay-b: color-mix(in srgb, var(--cor-base-cafe) 72%, transparent);">
					<div class="card-foto-foto" aria-hidden="true"></div>
					<img src={t.arquivo} alt={t.alt} class="absolute inset-0 -z-10 h-full w-full object-cover" loading="lazy" />
					<figcaption class="relative z-10 mt-auto bg-marrom-profundo/85 px-3 py-2 text-sm font-semibold text-areia">{t.titulo}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<section id="como-participar" class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2" aria-labelledby="como">
		<div class="card-foto compacto aspect-[4/3] min-w-0" style="--mod-card: url('/images/novas/cards/muda.webp'); --mod-overlay-a: color-mix(in srgb, var(--cor-base-oliva) 74%, transparent); --mod-overlay-b: color-mix(in srgb, var(--cor-base-marrom-profundo) 72%, transparent);">
			<div class="card-foto-foto" aria-hidden="true"></div>
			<img src="/images/novas/cards/muda.webp" alt="Muda verde nascendo da terra escura" class="absolute inset-0 -z-10 h-full w-full object-cover" loading="lazy" />
		</div>
		<div class="painel p-7">
			<h2 id="como" class="text-3xl">Como se tornar cooperado</h2>
			<ol class="mt-6 flex flex-col gap-4">
				{#each passos as p, i}
					<li class="flex gap-4"><span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-oliva font-titulo font-bold text-areia">{i + 1}</span><span class="pt-1">{p}</span></li>
				{/each}
			</ol>
		</div>
	</section>
</main>

<footer class="text-areia" style="background: var(--cor-base-marrom-profundo);">
	<div class="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
		<div><Logo tamanho="h-12" fundo="areia" /><p class="mt-3 text-sm">Cooperativa agrícola do Tocantins.</p></div>
		<ul class="flex flex-col gap-2 text-sm">
			<li class="flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> Palmas – TO</li>
			<li class="flex items-center gap-2"><Phone size={16} aria-hidden="true" /> (63) 3000-0000</li>
			<li class="flex items-center gap-2"><Mail size={16} aria-hidden="true" /> contato@nativacoop.example</li>
		</ul>
		<p class="text-sm md:text-right">Protótipo acadêmico · dados fictícios</p>
	</div>
</footer>
