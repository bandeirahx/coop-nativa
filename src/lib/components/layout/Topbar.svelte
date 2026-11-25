<script lang="ts">
	import { goto } from '$app/navigation';
	import { usuario, sair, nomesPerfil } from '#lib/stores/auth.ts';
	import AccessibilityBar from './AccessibilityBar.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { Menu, LogOut } from 'lucide-svelte';
	let { aoAbrirMenu }: { aoAbrirMenu: () => void } = $props();
	const sairAgora = () => { sair(); goto('/login'); };
</script>

<header class="header-textura flex h-16 items-center justify-between gap-3 border-b border-areia/15 bg-marrom-profundo/85 px-3 text-areia backdrop-blur-sm lg:px-4"
	style="background-image: var(--overlay-fundo), var(--img-fundo); background-size: cover; background-position: center;">
	<div class="relative z-10 flex items-center gap-2 lg:pl-1">
		<button class="rounded-btn border border-areia/25 p-2 transition-colors hover:bg-areia/10" onclick={aoAbrirMenu} aria-label="Abrir menu"><Menu size={22} aria-hidden="true" /></button>
		<Logo tamanho="h-9" fundo="areia" />
	</div>
	<div class="relative z-10 flex items-center gap-2">
		<AccessibilityBar />
		<div class="hidden text-right leading-tight sm:block">
			<p class="text-sm font-semibold text-areia">{$usuario?.nome}</p>
			<p class="text-xs text-areia/80">{$usuario ? nomesPerfil[$usuario.perfil] : ''}</p>
		</div>
		<button class="inline-flex min-h-10 items-center gap-2 rounded-btn border border-areia/25 px-3 text-sm font-semibold text-areia transition-colors hover:bg-areia/10" onclick={sairAgora}>
			<LogOut size={16} aria-hidden="true" /><span class="hidden sm:inline">Sair</span>
		</button>
	</div>
</header>
