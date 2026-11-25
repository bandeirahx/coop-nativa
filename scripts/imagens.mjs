/**
 * Gera as variantes WebP usadas na interface a partir das 10 fotografias
 * fornecidas pelo usuário. Nenhuma imagem externa é baixada.
 *
 *   heroes/  -> 1920px de largura, qualidade 78 (fundos de hero)
 *   cards/   ->  800px de largura, qualidade 78 (cards e texturas)
 *
 * Uso: node scripts/imagens.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..', 'static', 'images', 'novas');
const origem = path.join(raiz, 'raw');

const usos = [
	['cooperados', 'argila.jpg'],
	['compras', 'colmeia.jpg'],
	['estoque', 'aneis-arvore.jpg'],
	['comercializacao', 'folhagem.jpg'],
	['login', 'madeira-verde.jpg'],
	['landing', 'veias-folha.jpg'],
	['fundo', 'madeira-verde.jpg'],
	['muda', 'folha-verde.jpg'],
	['penas', 'penas.jpg'],
	['pelagem', 'pelagem.jpg'],
	['areia', 'areia.jpg'],
	['colmeia', 'colmeia.jpg'],
	['argila', 'argila.jpg'],
	['aneis-arvore', 'aneis-arvore.jpg'],
	['folhagem', 'folhagem.jpg'],
	['madeira-verde', 'madeira-verde.jpg'],
	['veias-folha', 'veias-folha.jpg'],
	['folha-verde', 'folha-verde.jpg']
];

for (const destino of ['heroes', 'cards']) await mkdir(path.join(raiz, destino), { recursive: true });

for (const [nome, arquivo] of usos) {
	const base = sharp(path.join(origem, arquivo)).rotate();
	const hero = path.join(raiz, 'heroes', `${nome}.webp`);
	const card = path.join(raiz, 'cards', `${nome}.webp`);
	await base.clone().resize({ width: 1920, withoutEnlargement: false }).webp({ quality: 78 }).toFile(hero);
	await base.clone().resize({ width: 800, withoutEnlargement: false }).webp({ quality: 78 }).toFile(card);
	console.log(`${arquivo} -> heroes/${nome}.webp (1920px) + cards/${nome}.webp (800px)`);
}

// Selo do logo: remove transparência excessiva sem alterar o original.
await sharp(path.resolve(raiz, '..', '..', 'logo.png'))
	.trim({ background: '#00000000', threshold: 4 })
	.png()
	.toFile(path.join(raiz, 'logo-selo.png'));
console.log('logo.png -> logo-selo.png (recortado)');
