const soDigitos = (v: string) => v.replace(/\D/g, '');

export function validarCPF(valor: string): boolean {
	const c = soDigitos(valor);
	if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
	for (const t of [9, 10]) {
		let soma = 0;
		for (let i = 0; i < t; i++) soma += +c[i] * (t + 1 - i);
		if (((soma * 10) % 11) % 10 !== +c[t]) return false;
	}
	return true;
}

export function validarCNPJ(valor: string): boolean {
	const c = soDigitos(valor);
	if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
	for (const t of [12, 13]) {
		let soma = 0;
		let peso = t - 7;
		for (let i = 0; i < t; i++) {
			soma += +c[i] * peso--;
			if (peso < 2) peso = 9;
		}
		const dv = soma % 11 < 2 ? 0 : 11 - (soma % 11);
		if (dv !== +c[t]) return false;
	}
	return true;
}

export function mascaraCPF(v: string): string {
	return soDigitos(v)
		.slice(0, 11)
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function mascaraCNPJ(v: string): string {
	return soDigitos(v)
		.slice(0, 14)
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

export function mascaraTelefone(v: string): string {
	return soDigitos(v)
		.slice(0, 11)
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}
