<script lang="ts">
	import Guard from '#lib/components/layout/Guard.svelte';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';
	import Carregar from '#lib/components/ui/Carregar.svelte';
	import { page } from '$app/state';
	import Topbar from '#lib/components/layout/Topbar.svelte';
	let { children } = $props();
	let menu = $state(false);
</script>

<Guard perfis={['gestor', 'operacional']}>
	<div class="min-h-screen bg-areia lg:grid lg:grid-cols-[16rem_1fr]">
		<aside class="fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto transition-transform lg:static lg:translate-x-0 {menu ? 'translate-x-0' : '-translate-x-full'}">
			<Sidebar aoNavegar={() => (menu = false)} />
		</aside>
		{#if menu}<button class="fixed inset-0 z-30 bg-marrom-profundo/60 lg:hidden" aria-label="Fechar menu" onclick={() => (menu = false)}></button>{/if}
		<div class="flex min-w-0 flex-col">
			<Topbar aoAbrirMenu={() => (menu = true)} />
			<main class="flex-1 p-4 sm:p-6">{#key page.url.pathname}<Carregar>{@render children()}</Carregar>{/key}</main>
		</div>
	</div>
</Guard>
