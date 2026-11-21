import { writable } from 'svelte/store';

export type ToastMsg = { id: number; texto: string; tipo: 'sucesso' | 'erro' };
export const toasts = writable<ToastMsg[]>([]);
let seq = 0;

export function toast(texto: string, tipo: ToastMsg['tipo'] = 'sucesso') {
	const id = ++seq;
	toasts.update((l) => [...l, { id, texto, tipo }]);
	setTimeout(() => toasts.update((l) => l.filter((t) => t.id !== id)), 4000);
}
