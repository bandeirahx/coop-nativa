<script lang="ts">
	let { status = 'Aberta', children }: { status?: string; children?: string } = $props();
	const classe = $derived({
		'Aberta': 'badge-verde',
		'Pendente': 'badge-terracota',
		'Aprovado/Pago': 'badge-azul',
		'Distribuído': 'badge-verde',
		'Cancelado': 'badge-vinho',
		'Encerrada': 'badge-vinho'
	}[status] || 'badge-areia');
</script>

<span class="badge {classe}">{children ?? status}</span>
