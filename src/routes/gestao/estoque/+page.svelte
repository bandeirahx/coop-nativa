<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Modal from '#lib/components/ui/Modal.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import { insumos, estoque, movimentacoes } from '#lib/stores/dados.ts';
	import { nomeInsumo, unidadeInsumo } from '#lib/utils/nomes.ts';
	import { movimentar } from '#lib/utils/estoque.ts';
	import { toast } from '#lib/stores/toast.ts';
	import { data } from '#lib/utils/formato.ts';
	import { TriangleAlert, CircleCheck, ArrowDownToLine, ArrowUpFromLine } from 'lucide-svelte';

	let aba = $state<'saldos' | 'mov'>('saldos');
	let tipoF = $state(''), insF = $state('');
	let modal = $state(false);
	let ajuste = $state({ insumoId: '' as string | number, novaQtd: '' as string | number, motivo: '' });
	let erros = $state<Record<string, string>>({});
	const movs = $derived([...$movimentacoes].reverse().filter((m) => (!tipoF || m.tipo === tipoF) && (!insF || m.insumoId === +insF)));

	function abrirAjuste(id: number, qtd: number) { ajuste = { insumoId: id, novaQtd: qtd, motivo: '' }; erros = {}; modal = true; }
	function salvarAjuste(e: SubmitEvent) {
		e.preventDefault();
		erros = {};
		const atual = $estoque.find((x) => x.insumoId === +ajuste.insumoId)?.qtd ?? 0;
		if (ajuste.novaQtd === '' || Number(ajuste.novaQtd) < 0) erros.novaQtd = 'Informe uma quantidade válida (zero ou mais).';
		if (!ajuste.motivo.trim()) erros.motivo = 'Informe o motivo do ajuste.';
		if (Object.keys(erros).length) return;
		const dif = Number(ajuste.novaQtd) - atual;
		if (dif === 0) return (erros.novaQtd = 'A quantidade informada é igual ao saldo atual.');
		movimentar(dif > 0 ? 'entrada' : 'saida', +ajuste.insumoId, Math.abs(dif), `Ajuste de inventário: ${ajuste.motivo}`, 'Ajuste manual');
		modal = false;
		toast('Quantidade em estoque atualizada.');
	}
</script>

<ModuloHero
	modulo="estoque"
	titulo="Estoque de insumos"
	subtitulo="Saldos, mínimos, alertas de estoque baixo e histórico de movimentações (RN11)."
	uc="RF09: Gerenciar Estoque · UC09.2 · UC09.3"
	texturaForaDoModulo="couro"
>
	{#snippet acoes()}{/snippet}
</ModuloHero>
<div class="mb-4 flex gap-2" role="tablist" aria-label="Estoque">
	<button role="tab" aria-selected={aba === 'saldos'} class="min-h-11 rounded-lg px-4 font-semibold {aba === 'saldos' ? 'bg-vinho text-areia' : 'bg-areia text-vinho border border-borda'}" onclick={() => (aba = 'saldos')}>Saldos</button>
	<button role="tab" aria-selected={aba === 'mov'} class="min-h-11 rounded-lg px-4 font-semibold {aba === 'mov' ? 'bg-vinho text-areia' : 'bg-areia text-vinho border border-borda'}" onclick={() => (aba = 'mov')}>Movimentações (RN11)</button>
</div>

{#if aba === 'saldos'}
	<Table colunas={['Insumo', 'Saldo', 'Mínimo', 'Situação', 'Ações']} vazia={$estoque.length === 0}>
		{#each $estoque as e}
			{@const baixo = e.qtd < e.minimo}
			<tr><td data-label="Insumo">{nomeInsumo(e.insumoId)}</td><td data-label="Saldo"><span><strong>{e.qtd}</strong> {unidadeInsumo(e.insumoId)}</span></td><td data-label="Mínimo">{e.minimo}</td>
				<td data-label="Situação">{#if baixo}<span class="inline-flex items-center gap-1 font-semibold text-aviso-texto"><TriangleAlert size={16} aria-hidden="true" />Estoque baixo</span>{:else}<span class="inline-flex items-center gap-1 font-semibold text-verde-escuro"><CircleCheck size={16} aria-hidden="true" />Adequado</span>{/if}</td>
				<td data-label="Ações"><Button variante="contorno" class="!min-h-9" onclick={() => abrirAjuste(e.insumoId, e.qtd)}>Atualizar quantidade</Button></td></tr>
		{/each}
	</Table>
	<p class="mt-3 text-xs text-marrom">Entradas ocorrem pelo recebimento de insumos (UC09.1) e saídas pela distribuição (UC10.2).</p>
{:else}
	<div class="mb-4 grid gap-3 rounded-[var(--radius-card)] border border-borda bg-areia p-4 sm:grid-cols-3">
		<Select id="mt" label="Tipo" placeholder="Todos" bind:value={tipoF} opcoes={[{ valor: 'entrada', texto: 'Entrada' }, { valor: 'saida', texto: 'Saída' }]} />
		<Select id="mi" label="Insumo" placeholder="Todos" bind:value={insF} opcoes={$insumos.map((i) => ({ valor: i.id, texto: i.nome }))} />
	</div>
	<Table
		colunas={['Identificador', 'Data', 'Tipo', 'Insumo', 'Quantidade', 'Descrição']}
		vazia={movs.length === 0}
		cabecalhoClasses="bg-vinho text-areia"
	>
		{#each movs as m}
			<tr><td data-label="Identificador" class="font-mono">{m.id}</td><td data-label="Data">{data(m.data)}</td>
				<td data-label="Tipo"><span class="inline-flex items-center gap-1 font-semibold {m.tipo === 'entrada' ? 'text-verde-escuro' : 'text-aviso-texto'}">{#if m.tipo === 'entrada'}<ArrowDownToLine size={16} aria-hidden="true" />Entrada{:else}<ArrowUpFromLine size={16} aria-hidden="true" />Saída{/if}</span></td>
				<td data-label="Insumo">{nomeInsumo(m.insumoId)}</td><td data-label="Quantidade">{m.quantidade}</td><td data-label="Descrição">{m.descricao}</td></tr>
		{/each}
	</Table>
{/if}

<Modal bind:aberto={modal} titulo="Atualizar quantidade em estoque">
	<form onsubmit={salvarAjuste} novalidate class="flex flex-col gap-4">
		<p class="text-sm text-marrom">Insumo: <strong>{nomeInsumo(+ajuste.insumoId)}</strong>. O ajuste gera uma movimentação com identificador único.</p>
		<Input id="nq" label="Nova quantidade" type="number" bind:value={ajuste.novaQtd} erro={erros.novaQtd} required />
		<Input id="mo" label="Motivo do ajuste" bind:value={ajuste.motivo} erro={erros.motivo} required />
		<div class="flex justify-end gap-2"><Button variante="contorno" onclick={() => (modal = false)}>Cancelar</Button><Button type="submit">Salvar</Button></div>
	</form>
</Modal>
