<script lang="ts">
	import { goto } from '$app/navigation';
	import { usuario, sair, nomesPerfil } from '#lib/stores/auth.ts';
	import AccessibilityBar from './AccessibilityBar.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { Menu, LogOut } from 'lucide-svelte';
	let { aoAbrirMenu }: { aoAbrirMenu: () => void } = $props();
	const sairAgora = () => { sair(); goto('/login'); };
</script>

<header class="flex h-16 items-center justify-between gap-3 border-b border-borda bg-marrom-profundo/80 px-3 lg:px-4 text-areia header-textura textura-terra overlay-login backdrop-blur-sm">
	<div class="flex items-center gap-2 lg:pl-1 relative z-10">
		<button class="rounded-btn border border-borda/30 p-2 lg:hidden" onclick={aoAbrirMenu} aria-label="Abrir menu"><Menu size={22} aria-hidden="true" /></button>
		<div class="logo-container logo-escuro">
			<Logo tamanho="h-9" fundo="areia" />
		</div>
	</div>
	<div class="flex items-center gap-2 relative z-10">
		<AccessibilityBar />
		<div class="hidden text-right leading-tight sm:block">
			<p class="text-sm font-semibold text-areia">{$usuario?.nome}</p>
			<p class="text-xs text-areia/90">{$usuario ? nomesPerfil[$usuario.perfil] : ''}</p>
		</div>
		<button class="inline-flex min-h-10 items-center gap-2 rounded-btn border border-borda/30 px-3 text-sm font-semibold text-areia hover:bg-areia/10" onclick={sairAgora}><LogOut size={16} aria-hidden="true" /><span class="hidden sm:inline">Sair</span></button>
	</div>
</header>
