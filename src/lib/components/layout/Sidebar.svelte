<script lang="ts">
	import { page } from '$app/state';
	import { grupos, itemDashboard } from '#lib/nav.ts';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { usuario, nomesPerfil, sair } from '#lib/stores/auth.ts';
	import { goto } from '$app/navigation';
	import { LogOut } from 'lucide-svelte';
	let { aoNavegar = () => {} }: { aoNavegar?: () => void } = $props();
	const ativo = (href: string) => (href === '/gestao' ? page.url.pathname === href : page.url.pathname.startsWith(href));
	const link = (href: string) =>
		`flex min-h-11 items-center gap-3 rounded-btn px-3 text-sm font-medium transition-all ${ativo(href) ? 'link-ativo shadow-suave' : 'text-areia/80 hover:bg-areia/10 hover:text-areia'}`;
</script>

<nav aria-label="Menu principal" class="sidebar flex min-h-full flex-col gap-3 p-4">
	<div class="mb-6">
		<Logo tamanho="h-11" fundo="areia" />
	</div>
	<a href={itemDashboard.href} class={link(itemDashboard.href)} onclick={aoNavegar} aria-current={ativo(itemDashboard.href) ? 'page' : undefined}>
		<itemDashboard.icone size={20} aria-hidden="true" /><span class="font-titulo">{itemDashboard.rotulo}</span>
	</a>
	{#each grupos as g}
		<div>
			<p class="mb-2 px-3 text-xs font-bold tracking-wider text-ouro uppercase">{g.titulo}</p>
			<ul class="flex flex-col gap-1">
				{#each g.itens as i}
					<li><a href={i.href} class={link(i.href)} onclick={aoNavegar} aria-current={ativo(i.href) ? 'page' : undefined}><i.icone size={18} aria-hidden="true" /><span>{i.rotulo}</span></a></li>
				{/each}
			</ul>
		</div>
	{/each}
	<div class="mt-auto border-t border-areia/20 pt-4">
		<div class="flex items-center gap-3 rounded-btn bg-areia/10 p-3">
			<span class="grid size-9 shrink-0 place-items-center rounded-full bg-oliva font-titulo font-bold text-areia" aria-hidden="true">
				{$usuario?.nome?.charAt(0)?.toUpperCase() ?? 'U'}
			</span>
			<div class="min-w-0 flex-1 leading-tight">
				<p class="truncate text-sm font-semibold text-areia">{$usuario?.nome ?? 'Visitante'}</p>
				<p class="truncate text-xs text-areia/75">{$usuario ? nomesPerfil[$usuario.perfil] : ''}</p>
			</div>
			<button class="rounded-btn p-1.5 text-areia/80 hover:bg-areia/10 hover:text-areia" onclick={() => { sair(); goto('/login'); }} aria-label="Sair do sistema">
				<LogOut size={17} aria-hidden="true" />
			</button>
		</div>
	</div>
</nav>
