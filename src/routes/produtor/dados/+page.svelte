<script lang="ts">
	import { meuCoop } from '#lib/stores/produtor.ts';
	import ModuloHero from '#lib/components/layout/ModuloHero.svelte';
	import { MapPinned, Wheat, ChevronRight } from 'lucide-svelte';
	const linhas = $derived($meuCoop ? [['Nome', $meuCoop.nome], [$meuCoop.tipoPessoa === 'PF' ? 'CPF' : 'CNPJ', $meuCoop.documento], ['Telefone', $meuCoop.telefone], ['Endereço', $meuCoop.endereco], ['Cotas', String($meuCoop.qtdCotas)], ['Situação', $meuCoop.status]] : []);
</script>

<svelte:head><title>Meus dados · Nativa Coop</title></svelte:head>
<ModuloHero modulo="cooperados" titulo="Meus dados" subtitulo="Informações cadastradas na cooperativa." uc="UC01.3 · somente consulta" />

<dl class="mt-5 divide-y divide-borda rounded-card border border-borda bg-areia">
	{#each linhas as [r, v]}<div class="p-4"><dt class="text-sm font-bold text-marrom">{r}</dt><dd class="text-xl">{v}</dd></div>{/each}
</dl>
<p class="mt-4 rounded-btn bg-verde-claro p-3 text-base text-oliva">Para alterar seus dados, procure a cooperativa.</p>
<ul class="mt-5 flex flex-col gap-3">
	<li><a href="/produtor/propriedades" class="flex min-h-16 items-center justify-between rounded-card border-2 border-borda bg-areia p-4 font-bold transition-colors hover:border-oliva"><span class="flex items-center gap-3"><MapPinned aria-hidden="true" />Minhas propriedades</span><ChevronRight aria-hidden="true" /></a></li>
	<li><a href="/produtor/capacidade" class="flex min-h-16 items-center justify-between rounded-card border-2 border-borda bg-areia p-4 font-bold transition-colors hover:border-oliva"><span class="flex items-center gap-3"><Wheat aria-hidden="true" />O que posso produzir</span><ChevronRight aria-hidden="true" /></a></li>
</ul>
