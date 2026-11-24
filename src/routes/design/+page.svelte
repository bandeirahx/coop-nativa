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
		['branco', '#FFFFFF', 'Fundo, cards'], ['verde', '#4F9808', 'Marca, botões'],
		['verde-escuro', '#3F7A06', 'Texto verde, hover'], ['marrom', '#4E3A3F', 'Títulos, sidebar'],
		['marrom-escuro', '#281D1E', 'Texto do corpo'], ['verde-claro', '#F3F8EC', 'Fundo de seção'],
		['marrom-claro', '#F5F2F2', 'Linhas alternadas'], ['borda', '#E7E2E3', 'Bordas'],
		['erro', '#C62828', 'Erro'], ['aviso', '#B26A00', 'Aviso']
	];
	const status = ['Aberta', 'Encerrada', 'Pendente', 'Aprovado/Pago', 'Distribuído', 'Cancelado'];
	let aberto = $state(false);
	let cpf = $state('123');
</script>

<svelte:head><title>Design System · Nativa Coop</title></svelte:head>

<main class="mx-auto flex max-w-5xl flex-col gap-8 p-6">
	<header class="flex flex-wrap items-center justify-between gap-4">
		<img src="/logo.svg" alt="Nativa Coop" class="h-14 w-auto" />
		<AccessibilityBar />
	</header>
	<h1 class="text-3xl">Design System</h1>

	<Card titulo="Cores">
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
			{#each cores as [nome, hex, uso]}
				<div class="text-sm">
					<div class="h-14 rounded-lg border border-borda" style="background:{hex}"></div>
					<p class="mt-1 font-semibold">{nome}</p><p>{hex}</p><p class="text-marrom">{uso}</p>
				</div>
			{/each}
		</div>
	</Card>

	<Card titulo="Tipografia">
		<p class="font-titulo text-4xl font-extrabold text-marrom">Plus Jakarta Sans — títulos</p>
		<p class="mt-2 text-base">Inter — corpo e interface. Gestão de cooperativa agrícola.</p>
		<p class="mt-2 text-lg leading-relaxed">Área do produtor: corpo de 18px, linha 1.6.</p>
	</Card>

	<Card titulo="Botões">
		<div class="flex flex-wrap gap-3">
			<Button>Principal</Button><Button variante="secundario">Secundário</Button>
			<Button variante="contorno">Contorno</Button><Button variante="perigo">Excluir</Button>
			<Button disabled>Desabilitado</Button><Button grande>Botão grande</Button>
		</div>
	</Card>

	<Card titulo="Campos">
		<div class="grid gap-4 sm:grid-cols-2">
			<Input id="d-nome" label="Nome" placeholder="Nome completo" required />
			<Input id="d-cpf" label="CPF" bind:value={cpf} erro="CPF inválido. Verifique os números digitados." />
			<Select id="d-mun" label="Município" opcoes={[{ valor: 'palmas', texto: 'Palmas' }, { valor: 'gurupi', texto: 'Gurupi' }]} dica="Escolha o município da propriedade." />
		</div>
	</Card>

	<Card titulo="Status">
		<div class="flex flex-wrap gap-2">{#each status as s}<Badge status={s} />{/each}</div>
	</Card>

	<Card titulo="Tabela">
		<Table colunas={['Cooperado', 'Município', 'Cotas', 'Status']}>
			<tr><td>Maria Souza</td><td>Palmas</td><td>12</td><td><Badge status="Aberta" /></td></tr>
			<tr><td>João Pereira</td><td>Gurupi</td><td>8</td><td><Badge status="Pendente" /></td></tr>
		</Table>
		<div class="mt-4"><Table colunas={['Cooperado', 'Município']} vazia><tr></tr></Table></div>
	</Card>

	<Card titulo="Alertas e feedback">
		<div class="flex flex-col gap-3">
			<p class="flex items-center gap-2 rounded-lg bg-verde-claro p-3 font-medium text-verde-escuro"><CircleCheck size={20} aria-hidden="true" /> Cadastro salvo com sucesso.</p>
			<p class="flex items-center gap-2 rounded-lg bg-aviso-claro p-3 font-medium text-aviso-texto"><TriangleAlert size={20} aria-hidden="true" /> Estoque abaixo do mínimo.</p>
			<p class="flex items-center gap-2 rounded-lg bg-erro-claro p-3 font-medium text-erro"><CircleX size={20} aria-hidden="true" /> Quantidade acima do limite por cotas.</p>
		</div>
		<div class="mt-4 flex flex-wrap gap-3">
			<Button variante="contorno" onclick={() => toast('Salvo com sucesso!')}>Toast sucesso</Button>
			<Button variante="contorno" onclick={() => toast('Erro ao salvar.', 'erro')}>Toast erro</Button>
			<Button variante="secundario" onclick={() => (aberto = true)}>Confirmação</Button>
		</div>
	</Card>
</main>

<ConfirmDialog bind:aberto titulo="Salvar alterações?" mensagem="As alterações serão registradas com seu usuário e data." onconfirmar={() => toast('Alterações salvas.')} />
