<script lang="ts">
	import type { Snippet } from 'svelte';
	let { label, id, erro = '', dica = '', obrigatorio = false, children }: {
		label: string; id: string; erro?: string; dica?: string; obrigatorio?: boolean;
		children: Snippet<[{ 'aria-describedby': string | undefined; 'aria-invalid': boolean }]>;
	} = $props();
	const desc = $derived(erro ? `${id}-erro` : dica ? `${id}-dica` : undefined);
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="text-sm font-semibold text-marrom">
		{label}{#if obrigatorio}<span class="text-erro" aria-hidden="true"> *</span>{/if}
	</label>
	{@render children({ 'aria-describedby': desc, 'aria-invalid': !!erro })}
	{#if erro}<p id="{id}-erro" role="alert" class="text-sm font-medium text-erro">{erro}</p>
	{:else if dica}<p id="{id}-dica" class="text-sm text-marrom">{dica}</p>{/if}
</div>
