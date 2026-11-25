<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '#lib/components/ui/Button.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import { entrar, areaDoPerfil, nomesPerfil, usuariosDemo, type Perfil } from '#lib/stores/auth.ts';
	import { validarCPF, validarCNPJ } from '#lib/utils/validacao.ts';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
	import { UserCog, ClipboardList, Wheat, ArrowLeft } from 'lucide-svelte';

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

<div class="fundo-app grid min-h-screen md:grid-cols-2">
	<aside class="hero-modulo relative hidden overflow-hidden rounded-none md:flex md:flex-col md:justify-between mod-cooperados p-10 lg:p-14"
		style="--mod-image: url('/images/novas/heroes/login.webp'); --mod-overlay-a: color-mix(in srgb, var(--cor-base-marrom-profundo) 74%, transparent); --mod-overlay-b: color-mix(in srgb, var(--cor-base-cafe) 72%, transparent);">
		<div class="relative z-10"><Logo tamanho="h-14" fundo="areia" /></div>
		<div class="relative z-10 max-w-lg">
			<p class="mb-3 text-xs font-bold tracking-[0.2em] text-areia/80 uppercase">Do campo para a cooperativa</p>
			<p class="font-titulo text-4xl leading-tight font-extrabold text-areia lg:text-5xl">Juntos, plantamos mais e compramos melhor.</p>
			<p class="mt-5 text-lg text-areia/90">Pessoas, insumos, produção e vendas organizados em um só lugar.</p>
		</div>
	</aside>

	<main class="flex min-w-0 flex-col justify-center gap-6 p-4 sm:p-8 lg:px-16">
		<div class="painel painel-conteudo mx-auto w-full max-w-lg">
			<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
				<div class="md:hidden"><Logo tamanho="h-11" fundo="areia" /></div>
				<div class="hidden md:block"><AccessibilityBar /></div>
				<div class="md:hidden"><AccessibilityBar /></div>
			</div>
			<h1 class="text-3xl text-marrom-profundo">Entrar</h1>
			<p class="mt-2 text-marrom">Use seu CPF, CNPJ ou e-mail cadastrado na cooperativa.</p>

			<form onsubmit={enviar} class="mt-6 flex flex-col gap-4" novalidate>
				{#if erroGeral}
					<p role="alert" class="rounded-btn border border-erro bg-erro-claro p-3 text-sm font-semibold text-erro">{erroGeral}</p>
				{/if}
				<Input id="login" label="CPF, CNPJ ou e-mail" bind:value={login} erro={erroLogin} autocomplete="username" required />
				<Input id="senha" label="Senha" type="password" bind:value={senha} erro={erroSenha} autocomplete="current-password" required />
				<a href="#esqueci" onclick={(e) => { e.preventDefault(); erroGeral = 'Recuperação de senha indisponível no protótipo.'; }} class="text-sm font-semibold text-oliva underline">Esqueci minha senha</a>
				<Button type="submit" grande modulo="cooperados" class="w-full">Entrar</Button>
			</form>

			<section aria-labelledby="demo" class="mt-7 border-t border-borda pt-6">
				<h2 id="demo" class="mb-3 text-lg font-titulo font-bold text-marrom-profundo">Entrar como demonstração</h2>
				<div class="flex flex-col gap-2">
					{#each demos as d}
						<Button variante="contorno" class="justify-start" onclick={() => demo(d.p)}>
							<d.icone size={20} aria-hidden="true" />{nomesPerfil[d.p]} <span class="font-normal text-marrom-profundo">· {usuariosDemo[d.p].nome}</span>
						</Button>
					{/each}
				</div>
			</section>

			<a href="/" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-marrom"><ArrowLeft size={16} aria-hidden="true" />Voltar para o início</a>
		</div>
	</main>
</div>
