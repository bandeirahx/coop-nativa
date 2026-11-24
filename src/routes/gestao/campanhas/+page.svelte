<script lang="ts">
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import { campanhas } from '#lib/stores/dados.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { podeEscrever } from '#lib/nav.ts';
	import { data } from '#lib/utils/formato.ts';
	import { Plus } from 'lucide-svelte';
	let status = $state('');
	const lista = $derived($campanhas.filter((c) => !status || c.status === status));
</script>

<ModuloHero
	modulo="compras"
	titulo="Campanhas de compras"
	subtitulo="Campanhas de compra coletiva de insumos, prazos e insumos ofertados."
	uc="RF04: Gerenciar Campanhas de Compras · UC04.3"
	textura="graos"
>
	{#snippet acoes()}{#if podeEscrever($usuario?.perfil, 'campanhas')}<Button href="/gestao/campanhas/nova"><Plus size={18} aria-hidden="true" />Nova campanha</Button>{/if}{/snippet}
</ModuloHero>
<div class="mb-4 max-w-xs rounded-[var(--radius-card)] border border-borda bg-branco p-4"><Select id="fs" label="Situação" placeholder="Todas" bind:value={status} opcoes={[{ valor: 'Aberta', texto: 'Aberta' }, { valor: 'Encerrada', texto: 'Encerrada' }]} /></div>
<Table
	colunas={['Campanha', 'Início', 'Término', 'Insumos', 'Situação', 'Ações']}
	vazia={lista.length === 0}
	cabecalhoClasses="bg-verde text-marrom-escuro"
>
	{#each lista as c}
		<tr><td data-label="Campanha">{c.nome}</td><td data-label="Início">{data(c.dataInicio)}</td><td data-label="Término">{data(c.dataFim)}</td><td data-label="Insumos">{c.itens.length}</td>
			<td data-label="Situação"><Badge status={c.status} /></td><td data-label="Ações"><a class="font-semibold text-verde-escuro underline" href="/gestao/campanhas/{c.id}">Ver</a></td></tr>
	{/each}
</Table>


