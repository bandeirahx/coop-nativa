<script lang="ts">
	import '../lib/design-tokens.css';
	import './layout.css';
	import Toast from '#lib/components/ui/Toast.svelte';
	import '#lib/stores/acessibilidade.ts';
	import type { LayoutProps } from './$types';
	let { children }: LayoutProps = $props();
</script>

<a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-marrom-escuro focus:px-4 focus:py-2 focus:text-branco">Pular para o conteúdo</a>
<div id="conteudo" tabindex="-1">{@render children()}</div>
<Toast />
