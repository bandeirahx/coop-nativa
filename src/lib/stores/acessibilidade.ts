import { writable } from 'svelte/store';

type Prefs = { escala: number; altoContraste: boolean };
const CHAVE = 'nativa:acessibilidade';
const ESCALAS = [0.875, 1, 1.125, 1.25, 1.5];

function carregar(): Prefs {
	try {
		return { escala: 1, altoContraste: false, ...JSON.parse(localStorage.getItem(CHAVE) ?? '{}') };
	} catch {
		return { escala: 1, altoContraste: false };
	}
}

export const prefs = writable<Prefs>(carregar());

prefs.subscribe((p) => {
	if (typeof document === 'undefined') return;
	document.documentElement.style.setProperty('--escala-fonte', String(p.escala));
	document.documentElement.classList.toggle('alto-contraste', p.altoContraste);
	try {
		localStorage.setItem(CHAVE, JSON.stringify(p));
	} catch {}
});

export function mudarFonte(passo: -1 | 0 | 1) {
	prefs.update((p) => {
		const i = ESCALAS.indexOf(p.escala);
		const novo = passo === 0 ? 1 : ESCALAS[Math.min(ESCALAS.length - 1, Math.max(0, i + passo))];
		return { ...p, escala: novo };
	});
}
export const alternarContraste = () => prefs.update((p) => ({ ...p, altoContraste: !p.altoContraste }));
