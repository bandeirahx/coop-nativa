<script lang="ts">
	import Button from '#lib/components/ui/Button.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import ConfirmDialog from '#lib/components/ui/ConfirmDialog.svelte';
	import AccessibilityBar from '#lib/components/layout/AccessibilityBar.svelte';
	import { toast } from '#lib/stores/toast.ts';
	import { CircleCheck, TriangleAlert, CircleX } from 'lucide-svelte';

	const cores = [
		['branco', '#FFFFFF', 'Fundo, cards'],
		['areia', '#F5F1E8', 'Fundo claro'],
		['marrom profundo', '#2E241B', 'Fundo escuro, texto'],
		['marrom café', '#3E2C1C', 'Secundária, navegação'],
		['verde oliva', '#4A5D23', 'Primária, botões'],
		['verde folha', '#6B8E23', 'Acento folhas'],
		['terracota', '#C4552A', 'Acento pendente'],
		['ouro', '#D9A020', 'Acento grãos'],
		['vinho', '#7A2E2E', 'Acento frutos'],
		['azul profundo', '#2E4A6B', 'Acento aprovado'],
		['erro', '#C62828', 'Erro'],
		['aviso', '#C4552A', 'Aviso']
	];
	const status = ['Aberta', 'Encerrada', 'Pendente', 'Aprovado/Pago', 'Distribuído', 'Cancelado'];
	let aberto = $state(false);
	let cpf = $state('123');
</script>

<svelte:head><title>Design System · Nativa Coop</title></svelte:head>

<main class="mx-auto flex max-w-5xl flex-col gap-8 p-6 bg-areia/60">
	<header class="flex flex-wrap items-center justify-between gap-4">
		<div class="logo-container logo-escuro">
			<img src="/logo.png" alt="Nativa Coop" class="h-14 w-auto" />
		</div>
		<AccessibilityBar />
	</header>
	<h1 class="text-3xl font-titulo">Design System</h1>

	<Card textura="madeira" titulo="Cores da Paleta">
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
			{#each cores as [nome, hex, uso]}
				<div class="text-sm">
					<div class="h-16 rounded-lg border border-borda" style="background:{hex}"></div>
					<p class="mt-1 font-semibold text-marrom-profundo">{nome}</p><p class="text-xs text-marrom">{hex}</p><p class="text-xs text-marrom/70">{uso}</p>
				</div>
			{/each}
		</div>
	</Card>

	<Card textura="folhas" titulo="Tipografia">
		<p class="font-titulo text-4xl font-extrabold text-marrom-profundo">Merriweather — títulos</p>
		<p class="mt-2 text-base">Inter — corpo e interface. Gestão de cooperativa agrícola.</p>
		<p class="mt-2 text-lg leading-relaxed">Área do produtor: corpo de 18px, linha 1.6.</p>
	</Card>

	<Card textura="madeira" titulo="Botões">
		<div class="flex flex-wrap gap-3">
			<Button>Principal</Button><Button variante="secundario">Secundário</Button>
			<Button variante="acento">Acento</Button><Button variante="perigo">Excluir</Button>
			<Button disabled>Desabilitado</Button><Button grande>Botão grande</Button>
		</div>
	</Card>

	<Card textura="graos" titulo="Campos">
		<div class="grid gap-4 sm:grid-cols-2">
			<Input id="d-nome" label="Nome" placeholder="Nome completo" required />
			<Input id="d-cpf" label="CPF" bind:value={cpf} erro="CPF inválido. Verifique os números digitados." />
			<Select id="d-mun" label="Município" opcoes={[{ valor: 'palmas', texto: 'Palmas' }, { valor: 'gurupi', texto: 'Gurupi' }]} dica="Escolha o município da propriedade." />
		</div>
	</Card>

	<Card textura="frutos" titulo="Status">
		<div class="flex flex-wrap gap-2">{#each status as s}<Badge status={s} />{/each}</div>
	</Card>

	<Card textura="couro" titulo="Tabelas">
		<Table colunas={['Cooperado', 'Município', 'Cotas', 'Status']}>
			<tr><td>Maria Souza</td><td>Palmas</td><td>12</td><td><Badge status="Aberta" /></td></tr>
			<tr><td>João Pereira</td><td>Gurupi</td><td>8</td><td><Badge status="Pendente" /></td></tr>
		</Table>
		<div class="mt-4"><Table colunas={['Cooperado', 'Município']} vazia><tr></tr></Table></div>
	</Card>

	<Card textura="madeira" titulo="Alertas e feedback">
		<div class="flex flex-col gap-3">
			<p class="flex items-center gap-2 rounded-lg bg-verde-claro p-3 font-medium text-verde-escuro"><CircleCheck size={20} aria-hidden="true" /> Cadastro salvo com sucesso.</p>
			<p class="flex items-center gap-2 rounded-lg bg-aviso-claro p-3 font-medium text-aviso-texto"><TriangleAlert size={20} aria-hidden="true" /> Estoque abaixo do mínimo.</p>
			<p class="flex items-center gap-2 rounded-lg bg-erro-claro p-3 font-medium text-erro"><CircleX size={20} aria-hidden="true" /> Quantidade acima do limite por cotas.</p>
		</div>
		<div class="mt-4 flex flex-wrap gap-3">
			<Button variante="secundario" onclick={() => toast('Salvo com sucesso!')}>Toast sucesso</Button>
			<Button variante="secundario" onclick={() => toast('Erro ao salvar.', 'erro')}>Toast erro</Button>
			<Button variante="secundario" onclick={() => (aberto = true)}>Confirmação</Button>
		</div>
	</Card>
</main>

<ConfirmDialog bind:aberto titulo="Salvar alterações?" mensagem="As alterações serão registradas com seu usuário e data." onconfirmar={() => toast('Alterações salvas.')} />
