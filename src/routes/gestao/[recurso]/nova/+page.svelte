<script lang="ts">
	import { page } from '$app/state';
	import RecursoForm from '#lib/components/layout/RecursoForm.svelte';
	import Guard from '#lib/components/layout/Guard.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { recursos } from '#lib/recursos.ts';
	import { podeEscrever } from '#lib/nav.ts';
	const r = $derived(recursos[page.params.recurso ?? '']);
	const perfis = $derived(r && podeEscrever('operacional', r.slug) ? (['gestor', 'operacional'] as const) : (['gestor'] as const));
</script>

{#if r}<Guard perfis={[...perfis]}>{#key r.slug}<RecursoForm {r} />{/key}</Guard>{:else}<EmptyState titulo="Página não encontrada" />{/if}
