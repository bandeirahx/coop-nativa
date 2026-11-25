<script lang="ts">
	import { Clock, BadgeCheck, PackageCheck, Ban, DoorOpen, DoorClosed } from 'lucide-svelte';
	let { status }: { status: string } = $props();
	const mapa: Record<string, { i: any; t: string; c: string }> = {
		Pendente: { i: Clock, t: 'Aguardando pagamento', c: 'badge badge-ouro' },
		'Aprovado/Pago': { i: BadgeCheck, t: 'Aprovado e pago', c: 'badge badge-folha' },
		Distribuído: { i: PackageCheck, t: 'Entregue', c: 'badge badge-azul' },
		Cancelado: { i: Ban, t: 'Cancelado', c: 'badge badge-vinho' },
		Aberta: { i: DoorOpen, t: 'Aberta', c: 'badge badge-folha' },
		Encerrada: { i: DoorClosed, t: 'Encerrada', c: 'badge badge-neutro' }
	};
	const m = $derived(mapa[status] ?? mapa.Pendente);
</script>

<span class="{m.c} gap-2 px-3 py-1.5 text-sm"><m.i size={18} aria-hidden="true" />{m.t}</span>
