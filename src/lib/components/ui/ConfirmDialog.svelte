<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	let { aberto = $bindable(false), titulo, mensagem, confirmar = 'Confirmar', onconfirmar }: {
		aberto: boolean; titulo: string; mensagem: string; confirmar?: string; onconfirmar: () => void;
	} = $props();
</script>

<Modal bind:aberto {titulo}>
	<p class="mb-5 text-marrom">{mensagem}</p>
	<div class="flex justify-end gap-2">
		<Button variante="contorno" onclick={() => (aberto = false)}>Cancelar</Button>
		<Button onclick={() => { aberto = false; onconfirmar(); }}>{confirmar}</Button>
	</div>
</Modal>
