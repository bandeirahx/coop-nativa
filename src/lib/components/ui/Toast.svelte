<script lang="ts">
	import { toasts } from '#lib/stores/toast.ts';
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col gap-2" aria-live="polite">
	{#each $toasts as t (t.id)}
		<div role={t.tipo === 'erro' ? 'alert' : 'status'}
			class="rounded-lg px-4 py-3 text-sm font-semibold text-branco shadow-suave {t.tipo === 'erro' ? 'bg-erro' : 'bg-verde-escuro'}">{t.texto}</div>
	{/each}
</div>
