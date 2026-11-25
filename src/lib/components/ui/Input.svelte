<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import FormField from './FormField.svelte';
	type Props = HTMLInputAttributes & { label: string; id: string; erro?: string; dica?: string; value?: string | number | null };
	let { label, id, erro = '', dica = '', value = $bindable(''), required, class: cls = '', ...resto }: Props = $props();
</script>

<FormField {label} {id} {erro} {dica} obrigatorio={!!required}>
	{#snippet children(aria)}
		<input {id} bind:value {required} {...aria} {...resto} class="campo {cls}" />
	{/snippet}
</FormField>
