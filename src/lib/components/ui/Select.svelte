<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import FormField from './FormField.svelte';
	type Props = HTMLSelectAttributes & {
		label: string; id: string; erro?: string; dica?: string; value?: string | number;
		opcoes: { valor: string | number; texto: string }[]; placeholder?: string;
	};
	let { label, id, erro = '', dica = '', value = $bindable(''), opcoes, placeholder = 'Selecione', required, ...resto }: Props = $props();
</script>

<FormField {label} {id} {erro} {dica} obrigatorio={!!required}>
	{#snippet children(aria)}
		<select {id} bind:value {required} {...aria} {...resto}
			class="campo-select min-h-[2.75rem] w-full rounded-lg border bg-branco px-3 text-base text-marrom-escuro {erro ? 'erro' : 'border-borda'}">
			<option value="">{placeholder}</option>
			{#each opcoes as o}<option value={o.valor}>{o.texto}</option>{/each}
		</select>
	{/snippet}
</FormField>
