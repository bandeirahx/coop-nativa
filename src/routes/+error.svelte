<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/ui/Button.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { TriangleAlert } from 'lucide-svelte';
</script>

<svelte:head><title>{page.status === 404 ? 'Página não encontrada' : 'Erro'} · Nativa Coop</title></svelte:head>

<main class="fundo-app flex min-h-screen items-center justify-center p-6">
	<div class="painel painel-conteudo flex max-w-md flex-col items-center gap-4 p-8 text-center">
		<Logo tamanho="h-12" fundo="areia" />
		<TriangleAlert size={48} class="text-aviso" aria-hidden="true" />
		<h1 class="text-3xl">{page.status === 404 ? 'Página não encontrada' : 'Algo deu errado'}</h1>
		<p class="text-marrom">{page.status === 404 ? 'O endereço pode estar incorreto ou a página foi movida.' : 'Não foi possível concluir a ação. Tente novamente em instantes.'}</p>
		<Button href="/">Voltar ao início</Button>
	</div>
</main>
