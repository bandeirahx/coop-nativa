import { writable } from 'svelte/store';

export type Perfil = 'gestor' | 'operacional' | 'agricultor';
export type Usuario = { nome: string; perfil: Perfil; cooperadoId?: number };

export const nomesPerfil: Record<Perfil, string> = {
	gestor: 'Administrador/Gestor',
	operacional: 'Equipe Operacional',
	agricultor: 'Agricultor Cooperado'
};

export const usuariosDemo: Record<Perfil, Usuario> = {
	gestor: { nome: 'Helena Barros', perfil: 'gestor' },
	operacional: { nome: 'Carlos Menezes', perfil: 'operacional' },
	agricultor: { nome: 'José Almeida', perfil: 'agricultor', cooperadoId: 1 }
};

export const areaDoPerfil = (p: Perfil) => (p === 'agricultor' ? '/produtor' : '/gestao');

const CHAVE = 'nativa:usuario';
function carregar(): Usuario | null {
	try {
		return JSON.parse(localStorage.getItem(CHAVE) ?? 'null');
	} catch {
		return null;
	}
}

export const usuario = writable<Usuario | null>(carregar());
usuario.subscribe((u) => {
	try {
		u ? localStorage.setItem(CHAVE, JSON.stringify(u)) : localStorage.removeItem(CHAVE);
	} catch {}
});

export const entrar = (p: Perfil) => usuario.set(usuariosDemo[p]);
export const sair = () => usuario.set(null);
