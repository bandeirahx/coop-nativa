import { derived } from 'svelte/store';
import { usuario } from './auth.ts';
import { cooperados } from './dados.ts';

export const meuCoop = derived([usuario, cooperados], ([$u, $c]) => $c.find((c) => c.id === $u?.cooperadoId));
