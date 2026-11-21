<script lang="ts">
	export type Status = 'Aberta' | 'Encerrada' | 'Pendente' | 'Aprovado/Pago' | 'Distribuído' | 'Cancelado';
	let { status }: { status: Status | string } = $props();
	const estilos: Record<string, string> = {
		Aberta: 'bg-verde-claro text-verde-escuro border-verde',
		Encerrada: 'bg-marrom-claro text-marrom border-borda',
		Pendente: 'bg-aviso-claro text-aviso-texto border-aviso',
		'Aprovado/Pago': 'bg-verde-claro text-verde-escuro border-verde',
		Distribuído: 'bg-marrom text-branco border-marrom',
		Cancelado: 'bg-erro-claro text-erro border-erro',
		Ativo: 'bg-verde-claro text-verde-escuro border-verde',
		Inativo: 'bg-marrom-claro text-marrom border-borda',
		Disponível: 'bg-verde-claro text-verde-escuro border-verde',
		Reservada: 'bg-aviso-claro text-aviso-texto border-aviso',
		Registrada: 'bg-aviso-claro text-aviso-texto border-aviso',
		Recebida: 'bg-verde-claro text-verde-escuro border-verde',
		Fechada: 'bg-marrom-claro text-marrom border-borda'
	};
</script>

<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold {estilos[status] ?? estilos.Encerrada}">{status}</span>
