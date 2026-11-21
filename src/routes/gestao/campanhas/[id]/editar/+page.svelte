<script lang="ts">
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import Guard from '#lib/components/layout/Guard.svelte';
	import CampanhaForm from '#lib/components/layout/CampanhaForm.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { campanhas } from '#lib/stores/dados.ts';
	const c = $derived(get(campanhas).find((x) => x.id === Number(page.params.id)));
</script>

<Guard perfis={['gestor']}>{#if c}{#key c.id}<CampanhaForm original={c} />{/key}{:else}<EmptyState titulo="Campanha não encontrada" />{/if}</Guard>
