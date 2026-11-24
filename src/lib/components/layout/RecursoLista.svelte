<script lang="ts">
	import ModuloHero from './ModuloHero.svelte';
	import Table from '#lib/components/ui/Table.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import { usuario } from '#lib/stores/auth.ts';
	import { podeEscrever } from '#lib/nav.ts';
	import { rotuloNovo, type Recurso, moduloDe, texturaModulo } from '#lib/recursos.ts';
	import { untrack } from 'svelte';
	import { Plus, Eye } from 'lucide-svelte';

	let { r }: { r: Recurso } = $props();
	const modulo = $derived(moduloDe(r.slug));
	const itens = $derived(r.store);

	const cabecalhoModulo = $derived(modulo ? ({
		cooperados: 'bg-terracota text-areia',
		compras: 'bg-ouro text-marrom-profundo',
		estoque: 'bg-vinho text-areia',
		comercializacao: 'bg-azul text-areia'
	}[modulo]) : '');
	let busca = $state('');
	let filtros = $state<Record<string, string>>(untrack(() => Object.fromEntries((r.filtros ?? []).map((f) => [f.chave, '']))));
	let de = $state('');
	let ate = $state('');

	const lista = $derived(
		($itens as any[]).filter((x) => {
			if (busca && !r.colunas.some((c) => String(c.v(x)).toLowerCase().includes(busca.toLowerCase()))) return false;
			for (const [k, v] of Object.entries(filtros)) if (v && String(x[k]) !== v) return false;
			if (r.periodo && de && x[r.periodo] < de) return false;
			if (r.periodo && ate && x[r.periodo] > ate) return false;
			return true;
		})
	);
	const escreve = $derived(podeEscrever($usuario?.perfil, r.slug));
	const limpar = () => { busca = ''; filtros = Object.fromEntries((r.filtros ?? []).map((f) => [f.chave, ''])); de = ate = ''; };
</script>

<ModuloHero
	modulo={modulo}
	titulo={r.titulo}
	subtitulo={r.singular}
	uc="{r.rf} · {r.uc.consultar}"
	texturaForaDoModulo={texturaModulo(modulo ?? 'cooperados')}
>
	{#snippet acoes()}{#if escreve && r.uc.cadastrar}<Button href="/gestao/{r.slug}/nova"><Plus size={18} aria-hidden="true" />{rotuloNovo(r)}</Button>{/if}{/snippet}
</ModuloHero>

<div class="mb-4 grid gap-3 rounded-[var(--radius-card)] border border-borda bg-areia p-4 sm:grid-cols-2 lg:grid-cols-4">
	<Input id="busca" label="Buscar" placeholder="Digite para buscar" bind:value={busca} />
	{#each r.filtros ?? [] as f}
		<Select id="f-{f.chave}" label={f.rotulo} placeholder="Todos" opcoes={f.opcoes()} bind:value={filtros[f.chave]} />
	{/each}
	{#if r.periodo}
		<Input id="de" label="Período – de" type="date" bind:value={de} />
		<Input id="ate" label="Período – até" type="date" bind:value={ate} />
	{/if}
	<div class="flex items-end"><Button variante="contorno" onclick={limpar}>Limpar filtros</Button></div>
</div>

<Table
	colunas={[...r.colunas.map((c) => c.rotulo), 'Ações']}
	vazia={lista.length === 0}
	vazio="Nenhum registro encontrado."
	cabecalhoClasses={cabecalhoModulo}
>
	{#each lista as x (x.id)}
		<tr>
			{#each r.colunas as c}
				<td data-label={c.rotulo}>{#if c.badge}<Badge status={String(c.v(x))} />{:else}{c.v(x)}{/if}</td>
			{/each}
			<td data-label="Ações"><a href="/gestao/{r.slug}/{x.id}" class="inline-flex items-center gap-1 font-semibold text-verde-escuro underline"><Eye size={16} aria-hidden="true" />Ver<span class="sr-only"> {r.nome(x)}</span></a></td>
		</tr>
	{/each}
</Table>
<p class="mt-3 text-xs text-marrom">{lista.length} registro(s)</p>
