<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { duracao } from '#lib/utils/movimento.ts';
	import { X } from 'lucide-svelte';

	let { aberto = $bindable(false), titulo, children }: { aberto: boolean; titulo: string; children: Snippet } = $props();
	let dlg = $state<HTMLDialogElement>();

	$effect(() => {
		if (aberto && dlg && !dlg.open) dlg.showModal();
	});

	function fechar() {
		if (dlg?.open) dlg.close();
		else aberto = false;
	}
</script>

{#if aberto}
	<dialog
		bind:this={dlg}
		onclose={() => (aberto = false)}
		onclick={(e) => { if (e.target === dlg) fechar(); }}
		onkeydown={(e) => { if (e.key === 'Escape') fechar(); }}
		aria-labelledby="modal-titulo"
		class="modal-painel"
		transition:fly={{ y: 18, duration: duracao(220) }}
	>
		<button class="absolute top-4 right-4 rounded-btn p-1 text-cafe hover:bg-cafe/10" onclick={fechar} aria-label="Fechar janela">
			<X size={20} aria-hidden="true" />
		</button>
		<h2 id="modal-titulo" class="mb-4 pr-8 text-2xl">{titulo}</h2>
		{@render children()}
	</dialog>
{/if}
