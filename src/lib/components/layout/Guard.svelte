<script lang="ts">
	import type { Snippet } from 'svelte';
	import { usuario, areaDoPerfil, type Perfil } from '#lib/stores/auth.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { ShieldAlert } from 'lucide-svelte';
	let { perfis, children }: { perfis: Perfil[]; children: Snippet } = $props();
</script>

<svelte:head>
	{#if !$usuario || !perfis.includes($usuario.perfil)}
		<title>Acesso não permitido · Nativa Coop</title>
	{/if}
</svelte:head>

{#if $usuario && perfis.includes($usuario.perfil)}
	{@render children()}
{:else}
	<main class="fundo-app flex min-h-screen items-center justify-center p-6 text-center">
		<div class="painel painel-conteudo flex max-w-md flex-col items-center gap-4 p-8">
			<Logo tamanho="h-12" fundo="areia" />
			<ShieldAlert size={48} class="text-erro" aria-hidden="true" />
			<h1 class="text-3xl">Acesso não permitido</h1>
			<p class="text-marrom">
				{$usuario ? 'Seu perfil não tem permissão para acessar esta área.' : 'Faça login para acessar esta área.'}
			</p>
			<Button href={$usuario ? areaDoPerfil($usuario.perfil) : '/login'}>
				{$usuario ? 'Voltar para minha área' : 'Ir para o login'}
			</Button>
		</div>
	</main>
{/if}
