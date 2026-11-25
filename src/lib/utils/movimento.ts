/** Respeita prefers-reduced-motion nas transições do Svelte. */
export function duracao(ms: number): number {
	if (typeof window === 'undefined') return 0;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms;
}
