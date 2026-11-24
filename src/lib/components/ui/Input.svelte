<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import FormField from './FormField.svelte';
	type Props = HTMLInputAttributes & { label: string; id: string; erro?: string; dica?: string; value?: string | number | null };
	let { label, id, erro = '', dica = '', value = $bindable(''), required, ...resto }: Props = $props();
</script>

<FormField {label} {id} {erro} {dica} obrigatorio={!!required}>
	{#snippet children(aria)}
		<input {id} bind:value {required} {...aria} {...resto}
			class="campo-input min-h-[2.75rem] w-full rounded-lg border bg-branco px-3 text-base text-marrom-escuro placeholder:text-marrom/60 {erro ? 'erro' : 'border-borda'}" />
	{/snippet}
</FormField>
