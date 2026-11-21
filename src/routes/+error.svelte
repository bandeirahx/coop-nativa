<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/ui/Button.svelte';
	import { TriangleAlert } from 'lucide-svelte';
</script>

<main class="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
	<TriangleAlert size={48} class="text-aviso-texto" aria-hidden="true" />
	<h1 class="text-2xl">{page.status === 404 ? 'Página não encontrada' : 'Algo deu errado'}</h1>
	<p class="text-marrom">{page.status === 404 ? 'O endereço pode estar incorreto ou a página foi movida.' : 'Não foi possível concluir a ação. Tente novamente em instantes.'}</p>
	<Button href="/">Voltar ao início</Button>
</main>
