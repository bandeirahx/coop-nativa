<script lang="ts">
	import Button from '#lib/components/ui/Button.svelte';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
	import { UsersRound, ShoppingBasket, Sprout, Store, Phone, Mail, MapPin } from 'lucide-svelte';

	const processos = [
		{ icone: UsersRound, titulo: 'Cadastro', texto: 'Cooperados, propriedades e capacidade produtiva sempre atualizados.' },
		{ icone: ShoppingBasket, titulo: 'Compra coletiva de insumos', texto: 'Campanhas, pedidos, compra com fornecedor, estoque e distribuição.' },
		{ icone: Sprout, titulo: 'Produção', texto: 'Registro da produção disponível de cada cooperado.' },
		{ icone: Store, titulo: 'Comercialização', texto: 'Catálogo de produtos e pedidos de compradores.' }
	];
	const numeros = [['248', 'cooperados'], ['14', 'municípios atendidos'], ['3.600 t', 'produzidas na safra']];
	const passos = ['Procure a sede da cooperativa ou fale com a equipe.', 'Apresente seus documentos e os dados da propriedade.', 'Escolha a quantidade de cotas de participação.', 'Receba seu acesso e participe das campanhas.'];
</script>

<svelte:head><title>Nativa Coop · Cooperativa agrícola do Tocantins</title></svelte:head>

<header class="sticky top-0 z-30 border-b border-borda bg-branco/95 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
		<img src="/logo.png" alt="Nativa Coop" class="h-12 w-auto" />
		<div class="flex items-center gap-3"><div class="hidden md:block"><AccessibilityBar /></div><Button href="/login">Entrar</Button></div>
	</div>
</header>

<main>
	<section class="relative isolate overflow-hidden">
		<img src="/images/hero.jpg" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
		<div class="absolute inset-0 -z-10 bg-marrom-escuro/60"></div>
		<div class="mx-auto max-w-6xl px-4 py-24 text-branco md:py-36">
			<p class="mb-3 font-semibold text-branco">Cooperativa agrícola · Tocantins</p>
			<h1 class="max-w-2xl text-4xl font-extrabold !text-branco md:text-5xl">Juntos, plantamos mais e compramos melhor.</h1>
			<p class="mt-4 max-w-xl text-lg">A Nativa Coop reúne produtores para comprar insumos em conjunto, organizar a produção e vender com mais força.</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button href="/login" grande>Acessar o sistema</Button>
				<Button href="#como-participar" variante="contorno" grande>Quero ser cooperado</Button>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-16" aria-labelledby="oque">
		<h2 id="oque" class="text-3xl">O que a cooperativa faz</h2>
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each processos as p}
				<article class="rounded-[var(--radius-card)] border border-borda p-6 shadow-suave">
					<span class="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-verde-claro text-verde-escuro"><p.icone size={26} aria-hidden="true" /></span>
					<h3 class="text-lg">{p.titulo}</h3><p class="mt-1 text-marrom">{p.texto}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="bg-verde-claro py-14" aria-label="Números da cooperativa">
		<dl class="mx-auto grid max-w-6xl gap-8 px-4 text-center sm:grid-cols-3">
			{#each numeros as [n, t]}
				<div><dt class="sr-only">{t}</dt><dd class="font-titulo text-5xl font-extrabold text-verde-escuro">{n}</dd><dd class="mt-1 font-medium text-marrom">{t}</dd></div>
			{/each}
		</dl>
	</section>

	<section id="como-participar" class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2" aria-labelledby="como">
		<img src="/images/semente.jpg" alt="Muda verde nascendo da terra escura" class="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover" />
		<div>
			<h2 id="como" class="text-3xl">Como se tornar cooperado</h2>
			<ol class="mt-6 flex flex-col gap-4">
				{#each passos as p, i}
					<li class="flex gap-4"><span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-verde font-bold text-branco">{i + 1}</span><span class="pt-1">{p}</span></li>
				{/each}
			</ol>
		</div>
	</section>
</main>

<footer class="bg-marrom-escuro text-branco">
	<div class="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
		<div><img src="/logo.png" alt="Nativa Coop" class="h-12 w-auto rounded-lg bg-branco px-3" /><p class="mt-3 text-sm">Cooperativa agrícola do Tocantins.</p></div>
		<ul class="flex flex-col gap-2 text-sm">
			<li class="flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> Palmas – TO</li>
			<li class="flex items-center gap-2"><Phone size={16} aria-hidden="true" /> (63) 3000-0000</li>
			<li class="flex items-center gap-2"><Mail size={16} aria-hidden="true" /> contato@nativacoop.example</li>
		</ul>
		<p class="text-sm md:text-right">Protótipo acadêmico · dados fictícios</p>
	</div>
</footer>
