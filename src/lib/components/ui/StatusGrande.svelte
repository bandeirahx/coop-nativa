<script lang="ts">
	import { Clock, BadgeCheck, PackageCheck, Ban, DoorOpen, DoorClosed } from 'lucide-svelte';
	let { status }: { status: string } = $props();
	const mapa: Record<string, { i: any; t: string; c: string }> = {
		Pendente: { i: Clock, t: 'Aguardando pagamento', c: 'bg-aviso-claro text-aviso-texto border-aviso' },
		'Aprovado/Pago': { i: BadgeCheck, t: 'Aprovado e pago', c: 'bg-verde-claro text-verde-escuro border-verde' },
		Distribuído: { i: PackageCheck, t: 'Entregue', c: 'bg-marrom text-branco border-marrom' },
		Cancelado: { i: Ban, t: 'Cancelado', c: 'bg-erro-claro text-erro border-erro' },
		Aberta: { i: DoorOpen, t: 'Aberta', c: 'bg-verde-claro text-verde-escuro border-verde' },
		Encerrada: { i: DoorClosed, t: 'Encerrada', c: 'bg-marrom-claro text-marrom border-borda' }
	};
	const m = $derived(mapa[status] ?? mapa.Pendente);
</script>

<span class="inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 font-bold {m.c}"><m.i size={20} aria-hidden="true" />{m.t}</span>
