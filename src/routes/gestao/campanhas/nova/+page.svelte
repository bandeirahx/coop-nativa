<script lang="ts">
	import Guard from '#lib/components/layout/Guard.svelte';
	import CampanhaForm from '#lib/components/layout/CampanhaForm.svelte';
</script>

<Guard perfis={['gestor']}><CampanhaForm /></Guard>
