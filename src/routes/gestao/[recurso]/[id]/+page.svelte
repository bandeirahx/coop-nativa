<script lang="ts">
	import { page } from '$app/state';
	import RecursoDetalhe from '#lib/components/layout/RecursoDetalhe.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { recursos } from '#lib/recursos.ts';
	const r = $derived(recursos[page.params.recurso ?? '']);
</script>

{#if r}{#key page.params.id}<RecursoDetalhe {r} id={Number(page.params.id)} />{/key}{:else}<EmptyState titulo="Página não encontrada" />{/if}
