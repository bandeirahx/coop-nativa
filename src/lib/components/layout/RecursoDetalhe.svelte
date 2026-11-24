<script lang="ts">
	import PageHeader from './PageHeader.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { usuario } from '#lib/stores/auth.ts';
	import { podeEscrever } from '#lib/nav.ts';
	import { logCotas, cooperados } from '#lib/stores/dados.ts';
	import { data } from '#lib/utils/formato.ts';
	import { valorLegivel, type Recurso } from '#lib/recursos.ts';
	import { Pencil, ArrowLeft } from 'lucide-svelte';

	let { r, id }: { r: Recurso; id: number } = $props();
	const todos = $derived(r.store);
	const x = $derived(($todos as any[]).find((i) => i.id === id));
	const historico = $derived($logCotas.filter((l) => l.cooperadoId === id).reverse());
	const escreve = $derived(podeEscrever($usuario?.perfil, r.slug));
	void cooperados;
</script>

{#if !x}
	<EmptyState titulo="Registro não encontrado" texto="O registro pode ter sido removido ou o endereço está incorreto." />
	<div class="mt-4"><Button href="/gestao/{r.slug}" variante="secundario"><ArrowLeft size={16} aria-hidden="true" />Voltar para a lista</Button></div>
{:else}
	<PageHeader titulo={r.nome(x)} uc="{r.rf} · {r.uc.consultar}">
		{#snippet acoes()}
			<Button href="/gestao/{r.slug}" variante="secundario"><ArrowLeft size={16} aria-hidden="true" />Voltar</Button>
			{#if escreve && r.uc.editar}<Button href="/gestao/{r.slug}/{x.id}/editar"><Pencil size={16} aria-hidden="true" />Editar</Button>{/if}
		{/snippet}
	</PageHeader>
	<Card titulo="Dados" class="max-w-3xl">
		<dl class="grid gap-x-6 gap-y-4 sm:grid-cols-2">
			{#each r.campos.filter((c) => c.tipo !== 'virtual') as c}
				<div><dt class="text-sm font-semibold text-marrom">{c.rotulo}</dt>
					<dd class="mt-0.5">{#if c.chave === 'status'}<Badge status={String(x.status)} />{:else}{valorLegivel(c, x)}{/if}</dd></div>
			{/each}
		</dl>
	</Card>
	{#if r.slug === 'cooperados'}
		<Card titulo="Histórico de alterações de cotas" class="mt-6 max-w-3xl">
			{#if historico.length === 0}<p class="text-sm text-marrom">Nenhuma alteração de cotas registrada.</p>
			{:else}<ul class="divide-y divide-borda text-sm">
				{#each historico as l}<li class="py-2"><strong>{l.de} → {l.para} cotas</strong> · {l.por} em {data(l.em)}<br /><span class="text-marrom">Justificativa: {l.justificativa}</span></li>{/each}
			</ul>{/if}
		</Card>
	{/if}
{/if}
