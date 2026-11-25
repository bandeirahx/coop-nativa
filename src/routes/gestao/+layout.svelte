<script lang="ts">
	import Guard from '#lib/components/layout/Guard.svelte';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';
	import Carregar from '#lib/components/ui/Carregar.svelte';
	import { page } from '$app/state';
	import Topbar from '#lib/components/layout/Topbar.svelte';
	import { moduloDe, type Modulo } from '#lib/recursos.ts';
	let { children } = $props();
	let menu = $state(false);

	const porRota: Record<string, Modulo> = {
		cooperados: 'cooperados', propriedades: 'cooperados', capacidade: 'cooperados',
		campanhas: 'compras', pedidos: 'compras', consolidacao: 'compras', fornecedores: 'compras',
		compras: 'compras', recebimento: 'compras',
		estoque: 'estoque', distribuicao: 'estoque',
		producao: 'comercializacao', catalogo: 'comercializacao', compradores: 'comercializacao',
		comercializacao: 'comercializacao'
	};
	const modulo = $derived(moduloDe(page.url.pathname.split('/')[2] ?? '') ?? porRota[page.url.pathname.split('/')[2] ?? '']);
	const classeModulo = $derived(modulo ? `mod-${modulo}` : '');
</script>

<Guard perfis={['gestor', 'operacional']}>
	<div class="fundo-app min-h-screen lg:grid lg:grid-cols-[16rem_1fr] {classeModulo}">
		<aside class="fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto transition-transform duration-200 lg:static lg:translate-x-0 {menu ? 'translate-x-0' : '-translate-x-full'}">
			<Sidebar aoNavegar={() => (menu = false)} />
		</aside>
		{#if menu}<button class="fixed inset-0 z-30 bg-marrom-profundo/70 lg:hidden" aria-label="Fechar menu" onclick={() => (menu = false)}></button>{/if}
		<div class="flex min-w-0 flex-col">
			<Topbar aoAbrirMenu={() => (menu = true)} />
			<main class="flex-1 p-3 sm:p-5">
				<div class="painel painel-conteudo">{#key page.url.pathname}<Carregar>{@render children()}</Carregar>{/key}</div>
			</main>
		</div>
	</div>
</Guard>
