<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Carregar from '#lib/components/ui/Carregar.svelte';
	import Guard from '#lib/components/layout/Guard.svelte';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { sair, usuario } from '#lib/stores/auth.ts';
	import { House, ClipboardList, Megaphone, UserRound, LogOut } from 'lucide-svelte';
	let { children } = $props();
	const itens = [
		{ h: '/produtor', t: 'Início', i: House }, { h: '/produtor/pedidos', t: 'Meus pedidos', i: ClipboardList },
		{ h: '/produtor/campanhas', t: 'Campanhas', i: Megaphone }, { h: '/produtor/dados', t: 'Meus dados', i: UserRound }
	];
	const ativo = (h: string) => (h === '/produtor' ? page.url.pathname === h : page.url.pathname.startsWith(h));
</script>

<Guard perfis={['agricultor']}>
	<div class="fundo-app min-h-screen pb-24 text-[1.125rem] leading-[1.6] md:pb-8">
		<header class="header-textura border-b border-areia/15 bg-marrom-profundo/85 backdrop-blur-sm"
			style="background-image: var(--overlay-fundo), var(--img-fundo); background-size: cover; background-position: center;">
			<div class="relative z-10 mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-2 px-4 py-3">
				<a href="/produtor"><Logo tamanho="h-10" fundo="areia" /></a>
				<div class="flex items-center gap-2">
					<AccessibilityBar />
					<button class="inline-flex min-h-11 items-center gap-1 rounded-btn border border-areia/25 px-3 font-bold text-areia transition-colors hover:bg-areia/10" onclick={() => { sair(); goto('/login'); }} aria-label="Sair do sistema">
						<LogOut size={18} aria-hidden="true" /><span class="hidden sm:inline">Sair</span>
					</button>
				</div>
			</div>
			<p class="sr-only">Olá, {$usuario?.nome}</p>
		</header>
		<main class="painel painel-conteudo mx-auto max-w-2xl my-4">
			{#key page.url.pathname}<Carregar ms={250}>{@render children()}</Carregar>{/key}
		</main>
		<nav aria-label="Menu do produtor" class="fixed inset-x-0 bottom-0 z-30 border-t border-borda bg-areia/95 md:static md:mx-auto md:my-4 md:max-w-2xl md:rounded-card md:border">
			<ul class="grid grid-cols-4 md:gap-2 md:p-2">
				{#each itens as n}
					<li><a href={n.h} aria-current={ativo(n.h) ? 'page' : undefined}
						class="flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-btn text-sm font-bold transition-colors {ativo(n.h) ? 'bg-oliva text-areia' : 'text-marrom-profundo hover:bg-cafe/10'}">
						<n.i size={26} aria-hidden="true" />{n.t}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</Guard>
