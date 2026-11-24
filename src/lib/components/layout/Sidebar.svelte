<script lang="ts">
	import { page } from '$app/state';
	import { grupos, itemDashboard } from '#lib/nav.ts';
	let { aoNavegar = () => {} }: { aoNavegar?: () => void } = $props();
	const ativo = (href: string) => (href === '/gestao' ? page.url.pathname === href : page.url.pathname.startsWith(href));
	const link = (href: string) =>
		`flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium ${ativo(href) ? 'bg-verde-oliva text-branco' : 'text-marrom-profundo hover:bg-marrom-claro'}`;
</script>

<nav aria-label="Menu principal" class="flex flex-col gap-5 p-4 sidebar-textura text-branco">
	<img src="/logo.png" alt="Nativa Coop" class="lg:hidden h-8 w-auto mb-4" />
	<a href={itemDashboard.href} class={link(itemDashboard.href)} onclick={aoNavegar} aria-current={ativo(itemDashboard.href) ? 'page' : undefined}><itemDashboard.icone size={18} aria-hidden="true" />{itemDashboard.rotulo}</a>
	{#each grupos as g}
		<div>
			<p class="mb-1 px-3 text-xs font-semibold tracking-wide text-areia/80 uppercase">{g.titulo}</p>
			<ul class="flex flex-col gap-0.5">
				{#each g.itens as i}
					<li><a href={i.href} class={link(i.href)} onclick={aoNavegar} aria-current={ativo(i.href) ? 'page' : undefined}><i.icone size={18} aria-hidden="true" />{i.rotulo}</a></li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
