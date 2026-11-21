<script lang="ts">
	import type { Snippet } from 'svelte';
	import { usuario, areaDoPerfil, type Perfil } from '#lib/stores/auth.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import { ShieldAlert } from 'lucide-svelte';
	let { perfis, children }: { perfis: Perfil[]; children: Snippet } = $props();
</script>

{#if $usuario && perfis.includes($usuario.perfil)}
	{@render children()}
{:else}
	<main class="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
		<ShieldAlert size={48} class="text-erro" aria-hidden="true" />
		<h1 class="text-2xl">Acesso não permitido</h1>
		<p class="text-marrom">
			{$usuario ? 'Seu perfil não tem permissão para acessar esta área.' : 'Faça login para acessar esta área.'}
		</p>
		<Button href={$usuario ? areaDoPerfil($usuario.perfil) : '/login'}>
			{$usuario ? 'Voltar para minha área' : 'Ir para o login'}
		</Button>
	</main>
{/if}
