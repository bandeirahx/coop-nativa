<script lang="ts">
	import { meuCoop } from '#lib/stores/produtor.ts';
	import { MapPinned, Wheat, ChevronRight } from 'lucide-svelte';
	const linhas = $derived($meuCoop ? [['Nome', $meuCoop.nome], [$meuCoop.tipoPessoa === 'PF' ? 'CPF' : 'CNPJ', $meuCoop.documento], ['Telefone', $meuCoop.telefone], ['Endereço', $meuCoop.endereco], ['Cotas', String($meuCoop.qtdCotas)], ['Situação', $meuCoop.status]] : []);
</script>

<svelte:head><title>Meus dados · Nativa Coop</title></svelte:head>
<h1 class="mb-1 text-3xl">Meus dados</h1><p class="mb-5 text-xs text-marrom">UC01.3 · somente consulta</p>
<dl class="divide-y divide-borda rounded-[var(--radius-card)] border border-borda bg-branco">
	{#each linhas as [r, v]}<div class="p-4"><dt class="text-base font-bold text-marrom">{r}</dt><dd class="text-xl">{v}</dd></div>{/each}
</dl>
<p class="mt-4 rounded-lg bg-verde-claro p-3 text-base">Para alterar seus dados, procure a cooperativa.</p>
<ul class="mt-5 flex flex-col gap-3">
	<li><a href="/produtor/propriedades" class="flex min-h-16 items-center justify-between rounded-[var(--radius-card)] border-2 border-borda bg-branco p-4 font-bold"><span class="flex items-center gap-3"><MapPinned aria-hidden="true" />Minhas propriedades</span><ChevronRight aria-hidden="true" /></a></li>
	<li><a href="/produtor/capacidade" class="flex min-h-16 items-center justify-between rounded-[var(--radius-card)] border-2 border-borda bg-branco p-4 font-bold"><span class="flex items-center gap-3"><Wheat aria-hidden="true" />O que posso produzir</span><ChevronRight aria-hidden="true" /></a></li>
</ul>
