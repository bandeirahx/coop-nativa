// Gera TELAS.md a partir de src/lib/telas.ts
import { telas } from '../src/lib/telas.ts';
import { writeFileSync } from 'node:fs';

let md = '# TELAS — Nativa Coop\n\nFormato do documento do grupo (RF → UC → rota). Gerado por `npm run telas`.\n\n';
let atual = '';
for (const t of telas) {
	const cab = t.rf === 'Geral' ? 'Geral: Páginas públicas e design' : `${t.rf}: ${t.rfTitulo}`;
	if (cab !== atual) { md += `\n${cab}\n`; atual = cab; }
	md += `${t.uc}: ${t.titulo} — rota ${t.rota.split('?')[0]}\n`;
}
writeFileSync(new URL('../TELAS.md', import.meta.url), md);
console.log('TELAS.md gerado com', telas.length, 'telas');
