<script lang="ts">
	import type { Snippet } from 'svelte';
	let { aberto = $bindable(false), titulo, children }: { aberto: boolean; titulo: string; children: Snippet } = $props();
	let dlg: HTMLDialogElement;
	$effect(() => {
		if (aberto && !dlg.open) dlg.showModal();
		if (!aberto && dlg.open) dlg.close();
	});
</script>

<dialog bind:this={dlg} onclose={() => (aberto = false)} aria-labelledby="modal-titulo"
	class="m-auto w-[min(32rem,92vw)] rounded-[var(--radius-card)] border border-borda p-6 shadow-suave backdrop:bg-marrom-escuro/50">
	<h2 id="modal-titulo" class="mb-3 text-xl">{titulo}</h2>
	{@render children()}
</dialog>
