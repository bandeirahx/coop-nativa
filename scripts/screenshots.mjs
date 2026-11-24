// Captura screenshots de verificacao visual (desktop 1440px, mobile 390px) em docs/screenshots/
// Uso: servindo o app em http://localhost:5173 e depois node scripts/screenshots.mjs
import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'node:fs';
import { telas } from '../src/lib/telas.ts';

const base = process.env.BASE_URL ?? 'http://localhost:5173';
const usuarios = {
	gestor: { nome: 'Helena Barros', perfil: 'gestor' },
	agricultor: { nome: 'José Almeida', perfil: 'agricultor', cooperadoId: 1 },
	operacional: { nome: 'Carlos Lima', perfil: 'operacional' }
};

async function preencher(page, campos) {
	for (const [seletor, valor] of Object.entries(campos)) {
		const el = page.locator(seletor);
		const tag = await el.evaluate((n) => n.tagName);
		if (tag === 'SELECT') await el.selectOption(String(valor));
		else await el.fill(String(valor));
	}
}
const enviar = (page) => page.click('button[type=submit]');

const variantes = {
	'/gestao/cooperados/nova': {
		preenchido: (p) => preencher(p, { '#c-nome': 'Pedro Henrique Alves', '#c-documento': '39053344705', '#c-telefone': '63991234567', '#c-endereco': 'Rua 7, Quadra 12, Gurupi - TO', '#c-qtdCotas': 8 }),
		excecao: async (p) => { await preencher(p, { '#c-nome': 'Pedro Henrique Alves', '#c-documento': '11111111111', '#c-telefone': '63991234567', '#c-endereco': 'Rua 7, Quadra 12, Gurupi - TO', '#c-qtdCotas': 8 }); await enviar(p); }
	},
	'/gestao/pedidos/nova': {
		preenchido: async (p) => { await preencher(p, { '#camp': 1, '#coop': 2 }); await preencher(p, { '#q1': 5, '#q2': 8 }); },
		excecao: async (p) => { await preencher(p, { '#camp': 1, '#coop': 5 }); await preencher(p, { '#q1': 999 }); await enviar(p); }
	},
	'/gestao/distribuicao/nova': {
		preenchido: async (p) => { await preencher(p, { '#coop': 2, '#ins': 5 }); await p.click('text=Continuar'); await p.waitForSelector('text=2. Verificação do sistema'); },
		excecao: async (p) => { await preencher(p, { '#coop': 3, '#ins': 1 }); await p.click('text=Continuar'); await p.waitForSelector('text=2. Verificação do sistema'); }
	},
	'/gestao/distribuicao/2/quantidade': {
		preenchido: (p) => preencher(p, { '#qtd': 12 }),
		excecao: async (p) => { await preencher(p, { '#qtd': 30 }); await p.click('text=Confirmar distribuição'); }
	}
};

rmSync('docs/screenshots', { recursive: true, force: true });
mkdirSync('docs/screenshots', { recursive: true });
const browser = await chromium.launch({ args: ['--lang=pt-BR'] });

const perfilDeRota = (rota) => rota.startsWith('/produtor') ? 'agricultor' : 'gestor';

async function capturar(t, sufixo, acao) {
	const mobile = t.perfil === 'agricultor';
	const ctx = await browser.newContext({
		viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
		locale: 'pt-BR',
		timezoneId: 'America/Araguaina'
	});
	const perf = perfilDeRota(t.rota);
	if (usuarios[perf]) await ctx.addInitScript((u) => localStorage.setItem('nativa:usuario', JSON.stringify(u)), usuarios[perf]);
	const page = await ctx.newPage();
	await page.goto(base + t.rota);
	await page.waitForTimeout(900);
	await page.addStyleTag({ content: 'nav[aria-label="Menu do produtor"]{position:static !important}' });
	if (acao) { await acao(page); await page.waitForTimeout(400); }
	await page.evaluate(() => document.querySelectorAll('input[type=date]').forEach((el) => { if (el.value) { const [a, m, d] = el.value.split('-'); el.type = 'text'; el.value = `${d}/${m}/${a}`; } }));
	const cheia = mobile || !!acao || t.rota === '/' || t.rota === '/design';
	const nome = `${t.rf}_${t.uc}_${t.titulo}`.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9.]+/g, '-').replace(/-+$/, '') + (sufixo ? `-${sufixo}` : '') + '.png';
	await page.screenshot({ path: `docs/screenshots/${nome}`, fullPage: cheia });
	await ctx.close();
	console.log('✔', nome);
}

for (const t of telas) {
	await capturar(t, '', null);
	const v = variantes[t.rota];
	if (v?.preenchido) await capturar(t, 'preenchido', v.preenchido);
	if (v?.excecao) await capturar(t, 'excecao', v.excecao);
}
await browser.close();
console.log('Concluido em docs/screenshots/');
