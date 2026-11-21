export const moeda = (n: number) =>
	n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const numero = (n: number) => n.toLocaleString('pt-BR');

export const data = (iso: string) => {
	const [a, m, d] = iso.slice(0, 10).split('-');
	return `${d}/${m}/${a}`;
};
