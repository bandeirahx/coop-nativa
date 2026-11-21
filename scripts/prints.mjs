// Captura prints de todas as telas (gestão 1440x900, produtor 390x844) em prints/
// Uso: npm run dev (em outro terminal) e depois npm run prints
import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'node:fs';
import { telas, nomeArquivo } from '../src/lib/telas.ts';

const base = process.env.BASE_URL ?? 'http://localhost:5173';
const usuarios = {
	gestor: { nome: 'Helena Barros', perfil: 'gestor' },
	agricultor: { nome: 'José Almeida', perfil: 'agricultor', cooperadoId: 1 }
};

/** Preenche campos: <select> usa selectOption, demais usam fill (dispara máscaras). */
async function preencher(page, campos) {
	for (const [seletor, valor] of Object.entries(campos)) {
		const el = page.locator(seletor);
		const tag = await el.evaluate((n) => n.tagName);
		if (tag === 'SELECT') await el.selectOption(String(valor));
		else await el.fill(String(valor));
	}
}
const enviar = (page) => page.click('button[type=submit]');

/** Variantes por rota: `preenchido` = formulário com dados de exemplo; `excecao` = mensagem de exceção do caso de uso. */
const variantes = {
	'/gestao/cooperados/nova': {
		preenchido: (p) => preencher(p, { '#c-nome': 'Pedro Henrique Alves', '#c-documento': '39053344705', '#c-telefone': '63991234567', '#c-endereco': 'Rua 7, Quadra 12, Gurupi - TO', '#c-qtdCotas': 8 }),
		excecao: async (p) => { await preencher(p, { '#c-nome': 'Pedro Henrique Alves', '#c-documento': '11111111111', '#c-telefone': '63991234567', '#c-endereco': 'Rua 7, Quadra 12, Gurupi - TO', '#c-qtdCotas': 8 }); await enviar(p); } // CPF inválido
	},
	'/gestao/propriedades/nova': { preenchido: (p) => preencher(p, { '#c-cooperadoId': 2, '#c-nome': 'Sítio Santa Luzia', '#c-endereco': 'Estrada Vicinal, km 5', '#c-municipio': 'Gurupi', '#c-areaTotal': 25, '#c-tipoProducao': 'Milho e feijão' }) },
	'/gestao/capacidade/nova': { preenchido: (p) => preencher(p, { '#c-propriedadeId': 3, '#c-produto': 'Feijão', '#c-quantidade': 60, '#c-unidade': 'sacas', '#c-periodo': 'Safra 2025/2026' }) },
	'/gestao/campanhas/nova': { preenchido: (p) => preencher(p, { '#nome': 'Safra 2026/2027 – Adubação', '#ini': '2026-12-01', '#fim': '2027-01-15', '#ins0': 2, '#pre0': 218, '#lim0': 6 }) },
	'/gestao/pedidos/nova': {
		preenchido: async (p) => { await preencher(p, { '#camp': 1, '#coop': 2 }); await preencher(p, { '#q1': 5, '#q2': 8 }); },
		excecao: async (p) => { await preencher(p, { '#camp': 1, '#coop': 5 }); await preencher(p, { '#q1': 999 }); await enviar(p); } // acima do limite por cotas (RN10)
	},
	'/gestao/consolidacao/nova': { preenchido: (p) => preencher(p, { '#camp': 1 }) },
	'/gestao/fornecedores/nova': { preenchido: (p) => preencher(p, { '#c-nome': 'Sementes do Planalto Ltda', '#c-cnpj': '11444777000161', '#c-telefone': '63932155500', '#c-email': 'vendas@sementesplanalto.example' }) },
	'/gestao/recebimento/nova?compra=2': { preenchido: (p) => preencher(p, { '#obs': 'Carga conferida na chegada, sem avarias.' }) },
	'/gestao/distribuicao/nova': {
		preenchido: async (p) => { await preencher(p, { '#coop': 2, '#ins': 5 }); await p.click('text=Continuar'); await p.waitForSelector('text=2. Verificação do sistema'); },
		excecao: async (p) => { await preencher(p, { '#coop': 3, '#ins': 1 }); await p.click('text=Continuar'); await p.waitForSelector('text=2. Verificação do sistema'); } // pedido não autorizado (RN09)
	},
	'/gestao/distribuicao/2/quantidade': {
		preenchido: (p) => preencher(p, { '#qtd': 12 }),
		excecao: async (p) => { await preencher(p, { '#qtd': 30 }); await p.click('text=Confirmar distribuição'); } // acima do limite pelas cotas (RN10)
	},
	'/gestao/producao/nova': {
		preenchido: (p) => preencher(p, { '#c-cooperadoId': 3, '#c-produto': 'Soja', '#c-quantidade': 300, '#c-unidade': 'sacas' }),
		excecao: async (p) => { await preencher(p, { '#c-cooperadoId': 8, '#c-produto': 'Soja', '#c-quantidade': 300, '#c-unidade': 'sacas' }); await enviar(p); } // cooperado inativo
	},
	'/gestao/catalogo/nova': { preenchido: (p) => preencher(p, { '#c-nome': 'Farinha de mandioca', '#c-descricao': 'Farinha artesanal torrada', '#c-unidade': 'kg', '#c-preco': 7.5 }) },
	'/gestao/compradores/nova': { preenchido: (p) => preencher(p, { '#c-nome': 'Feira Livre de Palmas', '#c-documento': '11444777000161', '#c-telefone': '63932100000', '#c-email': 'feira@palmas.example' }) },
	'/gestao/comercializacao/nova': { preenchido: (p) => preencher(p, { '#comp': 1, '#q1': 50 }) },
	'/produtor/pedido?campanha=1': {
		preenchido: async (p) => { for (let i = 0; i < 5; i++) await p.click('[aria-label="Aumentar Semente de soja"]'); for (let i = 0; i < 8; i++) await p.click('[aria-label="Aumentar Adubo NPK 04-14-08"]'); },
		excecao: async (p) => { for (let i = 0; i < 21; i++) await p.click('[aria-label="Aumentar Semente de soja"]'); } // acima do limite (RN10)
	}
};

rmSync('prints', { recursive: true, force: true });
mkdirSync('prints', { recursive: true });
const browser = await chromium.launch({ args: ['--lang=pt-BR'] });

async function capturar(t, sufixo, acao) {
	const mobile = t.perfil === 'agricultor';
	const ctx = await browser.newContext({
		viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
		locale: 'pt-BR',
		timezoneId: 'America/Araguaina'
	});
	if (usuarios[t.perfil]) await ctx.addInitScript((u) => localStorage.setItem('nativa:usuario', JSON.stringify(u)), usuarios[t.perfil]);
	const page = await ctx.newPage();
	await page.goto(base + t.rota);
	await page.waitForTimeout(900);
	// barra inferior fixa do produtor sairia no meio da captura de página inteira
	await page.addStyleTag({ content: 'nav[aria-label="Menu do produtor"]{position:static !important}' });
	if (acao) { await acao(page); await page.waitForTimeout(400); }
	// o Chromium headless mostra <input type=date> como mm/dd/aaaa; exibe como dd/mm/aaaa só na captura
	await page.evaluate(() => document.querySelectorAll('input[type=date]').forEach((el) => { if (el.value) { const [a, m, d] = el.value.split('-'); el.type = 'text'; el.value = `${d}/${m}/${a}`; } }));
	const cheia = mobile || !!acao || t.rota === '/' || t.rota === '/design';
	const nome = nomeArquivo(t).replace('.png', sufixo + '.png');
	await page.screenshot({ path: `prints/${nome}`, fullPage: cheia });
	await ctx.close();
	console.log('✔', nome);
}

for (const t of telas) {
	await capturar(t, '', null);
	const v = variantes[t.rota];
	if (v?.preenchido) await capturar(t, '-preenchido', v.preenchido);
	if (v?.excecao) await capturar(t, '-excecao', v.excecao);
}
await browser.close();
