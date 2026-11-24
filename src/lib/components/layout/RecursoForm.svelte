<script lang="ts">
	import { goto } from '$app/navigation';
	import ModuloHero from './ModuloHero.svelte';
	import Card from '#lib/components/ui/Card.svelte';
	import { moduloDe, texturaModulo } from '#lib/recursos.ts';
	import Input from '#lib/components/ui/Input.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Modal from '#lib/components/ui/Modal.svelte';
	import { toast } from '#lib/stores/toast.ts';
	import { usuario } from '#lib/stores/auth.ts';
	import { logCotas } from '#lib/stores/dados.ts';
	import { mascaraDocumento, valorLegivel, rotuloNovo, type Recurso } from '#lib/recursos.ts';
	import { mascaraTelefone } from '#lib/utils/validacao.ts';
	import { get } from 'svelte/store';
	import { untrack } from 'svelte';

	let { r, original }: { r: Recurso; original?: any } = $props();
	const editando = untrack(() => !!original);
	const modulo = $derived(moduloDe(r.slug));
	let v = $state<Record<string, any>>(untrack(() => ({ ...r.padrao(), ...(original ?? {}), justificativa: '' })));
	let erros = $state<Record<string, string>>({});
	let resumo = $state<{ rotulo: string; de: string; para: string }[]>([]);
	let confirmar = $state(false);
	let salvando = $state(false);
	const tipoDoc = $derived(r.slug === 'fornecedores' ? 'PJ' : v.tipoPessoa);
	const uc = $derived(editando ? r.uc.editar : r.uc.cadastrar);

	function aplicarMascara(chave: string, tipo: string) {
		if (tipo === 'documento') v[chave] = mascaraDocumento(String(v[chave] ?? ''), tipoDoc);
		if (tipo === 'telefone') v[chave] = mascaraTelefone(String(v[chave] ?? ''));
	}
	$effect(() => { if (r.slug === 'cooperados') { v.tipoPessoa; if (!editando || v.documento) v.documento = mascaraDocumento(String(v.documento ?? ''), v.tipoPessoa); } });

	const normalizar = (paraSalvar = false) => {
		const out: Record<string, any> = { ...v };
		for (const c of r.campos) {
			if (c.tipo === 'selectNum' || c.tipo === 'numero') out[c.chave] = out[c.chave] === '' ? '' : Number(out[c.chave]);
			if (c.tipo === 'virtual' && paraSalvar) delete out[c.chave];
		}
		return out;
	};

	function enviar(e: SubmitEvent) {
		e.preventDefault();
		erros = r.validar(normalizar(), { original, todos: get(r.store) });
		if (Object.keys(erros).length) { toast('Corrija os campos destacados.', 'erro'); return; }
		if (editando) {
			const n = normalizar(true);
			resumo = r.campos.filter((c) => c.tipo !== 'virtual' && String(n[c.chave]) !== String(original[c.chave]))
				.map((c) => ({ rotulo: c.rotulo, de: valorLegivel(c, original), para: valorLegivel(c, n) }));
			if (!resumo.length) { toast('Nenhuma alteração para salvar.', 'erro'); return; }
			confirmar = true;
		} else salvar();
	}

	function salvar() {
		salvando = true;
		try {
			const n = normalizar(true);
			let id: number;
			if (editando) {
				r.store.alterar(original.id, n);
				id = original.id;
				if (r.slug === 'cooperados' && n.qtdCotas !== original.qtdCotas)
					logCotas.adicionar({ cooperadoId: id, de: original.qtdCotas, para: n.qtdCotas, justificativa: v.justificativa, por: get(usuario)?.nome ?? '—', em: new Date().toISOString() } as any);
			} else id = r.store.adicionar(n);
			toast(editando ? `${r.singular} atualizado com sucesso.` : `${r.singular} cadastrado com sucesso.`);
			goto(`/gestao/${r.slug}/${id}`);
		} catch {
			salvando = false;
			toast('Não foi possível salvar. Tente novamente.', 'erro');
		}
	}
</script>

<ModuloHero
	modulo={modulo}
	titulo={editando ? `Editar ${r.singular.toLowerCase()}` : rotuloNovo(r)}
	subtitulo={r.singular}
	uc="{r.rf} · {uc}"
	texturaForaDoModulo={texturaModulo(modulo ?? 'cooperados')}
>
	{#snippet acoes()}{/snippet}
</ModuloHero>

<form onsubmit={enviar} novalidate>
	<Card class="max-w-3xl">
		<div class="grid gap-4 sm:grid-cols-2">
			{#each r.campos as c (c.chave)}
				{#if c.tipo === 'virtual'}
					{#if c.mostrarSe?.(v, original)}
						<div class="sm:col-span-2"><Input id="c-{c.chave}" label={c.rotulo} bind:value={v[c.chave]} erro={erros[c.chave]} dica={c.dica} required /></div>
					{/if}
				{:else if c.tipo === 'select' || c.tipo === 'selectNum'}
					<Select id="c-{c.chave}" label={c.rotulo} bind:value={v[c.chave]} opcoes={c.opcoes?.() ?? []} erro={erros[c.chave]} dica={c.dica} required={c.obrigatorio} />
				{:else}
					<Input id="c-{c.chave}" label={c.rotulo} bind:value={v[c.chave]} erro={erros[c.chave]} dica={c.dica} required={c.obrigatorio}
						type={c.tipo === 'numero' ? 'number' : c.tipo === 'data' ? 'date' : 'text'} step={c.passo}
						oninput={() => aplicarMascara(c.chave, c.tipo)} />
				{/if}
			{/each}
		</div>
		<div class="mt-6 flex flex-wrap justify-end gap-3">
			<Button variante="contorno" href="/gestao/{r.slug}">Cancelar</Button>
			<Button type="submit" disabled={salvando}>{editando ? 'Revisar alterações' : 'Salvar'}</Button>
		</div>
	</Card>
</form>

<Modal bind:aberto={confirmar} titulo="Confirmar alterações">
	<p class="mb-3 text-sm text-marrom">Confira o resumo antes de salvar:</p>
	<ul class="mb-5 flex flex-col gap-2 text-sm">
		{#each resumo as x}<li class="rounded-lg bg-marrom-claro p-2"><strong>{x.rotulo}:</strong> {x.de} → <strong>{x.para}</strong></li>{/each}
	</ul>
	<div class="flex justify-end gap-2">
		<Button variante="contorno" onclick={() => (confirmar = false)}>Voltar</Button>
		<Button disabled={salvando} onclick={() => { confirmar = false; salvar(); }}>Confirmar e salvar</Button>
	</div>
</Modal>
