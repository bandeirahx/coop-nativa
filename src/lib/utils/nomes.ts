import { get } from 'svelte/store';
import { cooperados, insumos, campanhas, fornecedores, compradores } from '#lib/stores/dados.ts';

export const nomeCoop = (id: number) => get(cooperados).find((c) => c.id === id)?.nome ?? '—';
export const nomeInsumo = (id: number) => get(insumos).find((c) => c.id === id)?.nome ?? '—';
export const unidadeInsumo = (id: number) => get(insumos).find((c) => c.id === id)?.unidade ?? '';
export const nomeCampanha = (id: number) => get(campanhas).find((c) => c.id === id)?.nome ?? '—';
export const nomeFornecedor = (id: number) => get(fornecedores).find((c) => c.id === id)?.nome ?? '—';
export const nomeComprador = (id: number) => get(compradores).find((c) => c.id === id)?.nome ?? '—';
