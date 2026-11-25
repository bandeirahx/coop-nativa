<script lang="ts">
	export type Status = 'Aberta' | 'Encerrada' | 'Pendente' | 'Aprovado/Pago' | 'Distribuído' | 'Cancelado';
	let { status }: { status: Status | string } = $props();
	const estilos: Record<string, string> = {
		Aberta: 'badge badge-folha',
		Encerrada: 'badge badge-neutro',
		Pendente: 'badge badge-ouro',
		'Aprovado/Pago': 'badge badge-folha',
		Distribuído: 'badge badge-azul',
		Cancelado: 'badge badge-vinho',
		Ativo: 'badge badge-folha',
		Inativo: 'badge badge-neutro',
		Disponível: 'badge badge-folha',
		Reservada: 'badge badge-ouro',
		Registrada: 'badge badge-ouro',
		Recebida: 'badge badge-folha',
		Fechada: 'badge badge-neutro'
	};
</script>

<span class={estilos[status] ?? estilos.Encerrada}>{status}</span>
