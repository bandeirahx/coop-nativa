<script lang="ts">
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import RecursoForm from '#lib/components/layout/RecursoForm.svelte';
	import Guard from '#lib/components/layout/Guard.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { recursos } from '#lib/recursos.ts';
	import { podeEscrever } from '#lib/nav.ts';
	const r = $derived(recursos[page.params.recurso ?? '']);
	const original = $derived(r ? (get(r.store) as any[]).find((i) => i.id === Number(page.params.id)) : undefined);
	const perfis = $derived(r && podeEscrever('operacional', r.slug) ? (['gestor', 'operacional'] as const) : (['gestor'] as const));
</script>

{#if r && original}<Guard perfis={[...perfis]}>{#key page.params.id}<RecursoForm {r} {original} />{/key}</Guard>{:else}<EmptyState titulo="Registro não encontrado" />{/if}
