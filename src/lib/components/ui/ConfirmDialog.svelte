<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	let { aberto = $bindable(false), titulo, mensagem, confirmar = 'Confirmar', onconfirmar }: {
		aberto: boolean; titulo: string; mensagem: string; confirmar?: string; onconfirmar: () => void;
	} = $props();
</script>

<Modal bind:aberto {titulo}>
	<p class="mb-5 text-marrom">{mensagem}</p>
	<div class="flex flex-col sm:flex-row sm:justify-end gap-2">
		<Button variante="secundario" class="w-full sm:w-auto" onclick={() => (aberto = false)}>Cancelar</Button>
		<Button class="w-full sm:w-auto" onclick={() => { aberto = false; onconfirmar(); }}>{confirmar}</Button>
	</div>
</Modal>
