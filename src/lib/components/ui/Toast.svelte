<script lang="ts">
	import { fly } from 'svelte/transition';
	import { duracao } from '#lib/utils/movimento.ts';
	import { CircleCheck, CircleAlert } from 'lucide-svelte';
	import { toasts } from '#lib/stores/toast.ts';
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col gap-2" aria-live="polite">
	{#each $toasts as t (t.id)}
		<div role={t.tipo === 'erro' ? 'alert' : 'status'}
			transition:fly={{ x: 20, duration: duracao(220) }}
			class="flex items-center gap-2 rounded-btn px-4 py-3 text-sm font-semibold text-areia shadow-media {t.tipo === 'erro' ? 'bg-erro' : 'bg-verde-escuro'}">
			{#if t.tipo === 'erro'}<CircleAlert size={18} aria-hidden="true" />{:else}<CircleCheck size={18} aria-hidden="true" />{/if}
			{t.texto}
		</div>
	{/each}
</div>
