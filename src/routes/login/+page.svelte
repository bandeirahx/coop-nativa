<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '#lib/components/ui/Button.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import { entrar, areaDoPerfil, nomesPerfil, usuariosDemo, type Perfil } from '#lib/stores/auth.ts';
	import { validarCPF, validarCNPJ } from '#lib/utils/validacao.ts';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
	import { UserCog, ClipboardList, Wheat } from 'lucide-svelte';

	let login = $state('');
	let senha = $state('');
	let erroLogin = $state('');
	let erroSenha = $state('');
	let erroGeral = $state('');

	function demo(p: Perfil) {
		entrar(p);
		goto(areaDoPerfil(p));
	}
	function enviar(e: SubmitEvent) {
		e.preventDefault();
		erroLogin = erroSenha = erroGeral = '';
		const digitos = login.replace(/\D/g, '');
		const ehEmail = login.includes('@');
		if (!login) erroLogin = 'Informe seu CPF, CNPJ ou e-mail.';
		else if (!ehEmail && !(validarCPF(login) || validarCNPJ(login))) erroLogin = 'CPF/CNPJ inválido. Verifique os números.';
		if (!senha) erroSenha = 'Informe sua senha.';
		if (erroLogin || erroSenha) return;
		erroGeral = 'Usuário ou senha incorretos. Use um dos acessos de demonstração abaixo.';
		void digitos;
	}
	const demos = [
		{ p: 'gestor' as Perfil, icone: UserCog },
		{ p: 'operacional' as Perfil, icone: ClipboardList },
		{ p: 'agricultor' as Perfil, icone: Wheat }
	];
</script>

<svelte:head><title>Entrar · Nativa Coop</title></svelte:head>

<div class="grid min-h-screen md:grid-cols-2">
	<aside class="relative hidden md:block">
		<img src="/images/hero.jpg" alt="" class="absolute inset-0 h-full w-full object-cover" />
		<div class="absolute inset-0 bg-marrom-escuro/50"></div>
		<p class="absolute bottom-10 left-10 max-w-sm font-titulo text-3xl font-bold text-branco">Juntos, plantamos mais e compramos melhor.</p>
	</aside>

	<main class="flex min-w-0 flex-col justify-center gap-6 px-6 py-10 sm:px-16">
		<div class="flex flex-wrap items-center justify-between gap-3"><a href="/"><img src="/logo.svg" alt="Nativa Coop – página inicial" class="h-14 w-auto" /></a><AccessibilityBar /></div>
		<h1 class="text-3xl">Entrar</h1>

		<form onsubmit={enviar} class="flex flex-col gap-4" novalidate>
			{#if erroGeral}<p role="alert" class="rounded-lg bg-erro-claro p-3 text-sm font-medium text-erro">{erroGeral}</p>{/if}
			<Input id="login" label="CPF, CNPJ ou e-mail" bind:value={login} erro={erroLogin} autocomplete="username" required />
			<Input id="senha" label="Senha" type="password" bind:value={senha} erro={erroSenha} autocomplete="current-password" required />
			<a href="#esqueci" onclick={(e) => { e.preventDefault(); erroGeral = 'Recuperação de senha indisponível no protótipo.'; }} class="text-sm font-semibold text-verde-escuro underline">Esqueci minha senha</a>
			<Button type="submit" grande>Entrar</Button>
		</form>

		<section aria-labelledby="demo" class="rounded-[var(--radius-card)] bg-verde-claro p-5">
			<h2 id="demo" class="mb-3 text-base">Entrar como demonstração</h2>
			<div class="flex flex-col gap-2">
				{#each demos as d}
					<Button variante="contorno" class="justify-start" onclick={() => demo(d.p)}><d.icone size={20} aria-hidden="true" />{nomesPerfil[d.p]} <span class="font-normal text-marrom">· {usuariosDemo[d.p].nome}</span></Button>
				{/each}
			</div>
		</section>
	</main>
</div>
