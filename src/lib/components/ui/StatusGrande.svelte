<script lang="ts">
	let { status }: { status: string } = $props();
	const classe = $derived({
		'Aberta': 'badge-verde',
		'Pendente': 'badge-terracota',
		'Aprovado/Pago': 'badge-azul',
		'Distribuído': 'badge-verde',
		'Cancelado': 'badge-vinho',
		'Encerrada': 'badge-vinho'
	}[status] || 'badge-areia');
</script>

<span class="badge {classe} uppercase text-xs">{status}</span>
