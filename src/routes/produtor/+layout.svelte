<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Carregar from '#lib/components/ui/Carregar.svelte';
	import Guard from '#lib/components/layout/Guard.svelte';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
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
	<div class="min-h-screen bg-marrom-claro pb-24 text-[1.125rem] leading-[1.6] md:pb-8">
		<header class="border-b border-borda bg-branco">
			<div class="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-2 px-4 py-3">
				<a href="/produtor"><img src="/logo.svg" alt="Nativa Coop – início" class="h-10 lg:h-12 w-auto" /></a>
				<div class="flex items-center gap-2">
					<AccessibilityBar />
					<button class="inline-flex min-h-11 items-center gap-1 rounded-lg border border-borda px-3 font-semibold text-marrom" onclick={() => { sair(); goto('/login'); }} aria-label="Sair do sistema"><LogOut size={18} aria-hidden="true" /><span class="hidden sm:inline">Sair</span></button>
				</div>
			</div>
			<p class="sr-only">Olá, {$usuario?.nome}</p>
		</header>
		<main class="mx-auto max-w-2xl px-4 py-6">{#key page.url.pathname}<Carregar ms={250}>{@render children()}</Carregar>{/key}</main>
		<nav aria-label="Menu do produtor" class="fixed inset-x-0 bottom-0 z-30 border-t border-borda bg-branco md:static md:mx-auto md:max-w-2xl md:border-0 md:bg-transparent">
			<ul class="grid grid-cols-4 md:gap-2 md:px-4">
				{#each itens as n}
					<li><a href={n.h} aria-current={ativo(n.h) ? 'page' : undefined}
						class="flex min-h-16 flex-col items-center justify-center gap-0.5 text-sm font-bold md:rounded-lg md:border md:border-borda md:bg-branco {ativo(n.h) ? 'text-verde-escuro' : 'text-marrom'}">
						<n.i size={26} aria-hidden="true" />{n.t}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</Guard>
