<script lang="ts">
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import Guard from '#lib/components/layout/Guard.svelte';
	import PedidoForm from '#lib/components/layout/PedidoForm.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { pedidos } from '#lib/stores/dados.ts';
	const p = $derived(get(pedidos).find((x) => x.id === Number(page.params.id)));
</script>

<Guard perfis={['gestor']}>
	{#if p && p.status === 'Pendente'}{#key p.id}<PedidoForm original={p} />{/key}
	{:else if p}<EmptyState titulo="Pedido não pode ser editado" texto="Somente pedidos pendentes podem ser alterados." />
	{:else}<EmptyState titulo="Pedido não encontrado" />{/if}
</Guard>
