import { writable, get } from 'svelte/store';

/** Store de lista com persistência em localStorage e ids sequenciais. */
export function tabela<T extends { id: number | string }>(chave: string, inicial: T[]) {
	let valor = inicial;
	try {
		const salvo = localStorage.getItem('nativa:' + chave);
		if (salvo) valor = JSON.parse(salvo);
	} catch {}
	const { subscribe, set, update } = writable<T[]>(valor);
	subscribe((v) => {
		try {
			localStorage.setItem('nativa:' + chave, JSON.stringify(v));
		} catch {}
	});
	return {
		subscribe,
		set,
		update,
		proximoId: () => get({ subscribe }).reduce((m, x) => Math.max(m, +String(x.id).replace(/\D/g, '') || 0), 0) + 1,
		adicionar(item: Omit<T, 'id'> & { id?: T['id'] }) {
			const id = (item.id as number) ?? this.proximoId();
			update((l) => [...l, { ...item, id } as T]);
			return id as number;
		},
		alterar(id: T['id'], parcial: Partial<T>) {
			update((l) => l.map((x) => (x.id === id ? { ...x, ...parcial } : x)));
		}
	};
}
