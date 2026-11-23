<script lang="ts">
	import { goto } from '$app/navigation';
	import { usuario, sair, nomesPerfil } from '#lib/stores/auth.ts';
	import AccessibilityBar from './AccessibilityBar.svelte';
	import { Menu, LogOut } from 'lucide-svelte';
	let { aoAbrirMenu }: { aoAbrirMenu: () => void } = $props();
	const sairAgora = () => { sair(); goto('/login'); };
</script>

<header class="flex h-16 items-center justify-between gap-3 border-b border-borda bg-branco px-3 lg:px-4">
	<div class="flex items-center gap-2 lg:pl-1">
		<button class="rounded-lg border border-borda p-2 lg:hidden" onclick={aoAbrirMenu} aria-label="Abrir menu"><Menu size={22} aria-hidden="true" /></button>
		<img src="/logo.png" alt="Nativa Coop" class="h-10 w-auto hidden md:flex" />
	</div>
	<div class="flex items-center gap-2">
		<AccessibilityBar />
		<div class="hidden text-right leading-tight sm:block">
			<p class="text-sm font-semibold text-marrom">{$usuario?.nome}</p>
			<p class="text-xs text-marrom">{$usuario ? nomesPerfil[$usuario.perfil] : ''}</p>
		</div>
		<button class="inline-flex min-h-10 items-center gap-2 rounded-lg border border-borda px-3 text-sm font-semibold text-marrom hover:bg-marrom-claro" onclick={sairAgora}><LogOut size={16} aria-hidden="true" /><span class="hidden sm:inline">Sair</span></button>
	</div>
</header>
