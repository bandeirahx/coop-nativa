<script lang="ts">
	import Guard from '#lib/components/layout/Guard.svelte';
	import PedidoForm from '#lib/components/layout/PedidoForm.svelte';
</script>

<Guard perfis={['gestor']}><PedidoForm /></Guard>
