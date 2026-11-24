<script lang="ts">
	import { page } from '$app/state';
	import { grupos, itemDashboard } from '#lib/nav.ts';
	let { aoNavegar = () => {} }: { aoNavegar?: () => void } = $props();
	const ativo = (href: string) => (href === '/gestao' ? page.url.pathname === href : page.url.pathname.startsWith(href));
	const link = (href: string) =>
		`flex min-h-11 items-center gap-3 rounded-btn px-3 text-sm font-medium transition-all ${ativo(href) ? 'bg-oliva text-areia shadow-suave' : 'text-marrom-profundo hover:bg-areia hover:text-terracota'}`;
</script>

<nav aria-label="Menu principal" class="flex flex-col gap-3 p-4 textura-fundo textura-madeira overlay-cooperados text-areia">
	<div class="logo-container mb-6">
		<img src="/logo.png" alt="Nativa Coop" class="h-10 w-auto" />
	</div>
	<a href={itemDashboard.href} class={link(itemDashboard.href)} onclick={aoNavegar} aria-current={ativo(itemDashboard.href) ? 'page' : undefined}><itemDashboard.icone size={20} aria-hidden="true" /><span class="font-titulo">{itemDashboard.rotulo}</span></a>
	{#each grupos as g}
		<div>
			<p class="mb-2 px-2 text-xs font-semibold tracking-wide text-terracota/80 uppercase">{g.titulo}</p>
			<ul class="flex flex-col gap-1">
				{#each g.itens as i}
					<li><a href={i.href} class={link(i.href)} onclick={aoNavegar} aria-current={ativo(i.href) ? 'page' : undefined}><i.icone size={18} aria-hidden="true" /><span>{i.rotulo}</span></a></li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
