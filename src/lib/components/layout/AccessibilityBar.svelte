<script lang="ts">
	import { prefs, mudarFonte, alternarContraste } from '#lib/stores/acessibilidade.ts';
	import { Contrast } from 'lucide-svelte';
	const btn = 'min-h-9 min-w-9 rounded-md border border-borda bg-branco px-2 text-sm font-bold text-marrom hover:bg-marrom-claro';
</script>

<div class="flex items-center gap-1" role="group" aria-label="Acessibilidade">
	<button class={btn} onclick={() => mudarFonte(-1)} aria-label="Diminuir tamanho da fonte">A-</button>
	<button class={btn} onclick={() => mudarFonte(0)} aria-label="Tamanho padrão da fonte">A</button>
	<button class={btn} onclick={() => mudarFonte(1)} aria-label="Aumentar tamanho da fonte">A+</button>
	<button class="{btn} inline-flex items-center justify-center gap-1" onclick={alternarContraste}
		aria-pressed={$prefs.altoContraste} aria-label="Alto contraste">
		<Contrast size={16} aria-hidden="true" /><span class="hidden sm:inline">Contraste</span>
	</button>
</div>
