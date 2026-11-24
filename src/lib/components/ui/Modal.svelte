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
	class="dialog-base m-auto w-[min(32rem,92vw)] p-6 backdrop:bg-marrom-profundo/40">
	<div class="dialog-conteudo p-6">
		<h2 id="modal-titulo" class="mb-3 text-xl font-titulo">{titulo}</h2>
		{@render children()}
	</div>
</dialog>
