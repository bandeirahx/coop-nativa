<script lang="ts">
	import { page } from '$app/state';
	import RecursoLista from '#lib/components/layout/RecursoLista.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { recursos } from '#lib/recursos.ts';
	const r = $derived(recursos[page.params.recurso ?? '']);
</script>

{#if r}{#key r.slug}<RecursoLista {r} />{/key}{:else}<EmptyState titulo="Página não encontrada" />{/if}
