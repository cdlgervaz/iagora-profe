/* =====================================================================
   Utilidades compartilhadas — Offline, sem dependências.
   ===================================================================== */

/* ---------- PRNG determinístico (para sorteio reproduzível) ---------- */
function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = (typeof seed === "string" ? hashStr(seed) : seed) >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  const rnd = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Sorteio dos 9 papéis para uma turma ---------- */
function temaDoNome(nome) {
  return (OFICINA.mapaTematico || []).find(x => x.nome === nome) || null;
}
function papeisAtivos() {
  const a = (typeof window !== "undefined" && window.OFICINA_CONFIG && window.OFICINA_CONFIG.papeisAtivos) || [];
  return (Array.isArray(a) && a.length) ? OFICINA.papeis.filter(p => a.includes(p.id)) : OFICINA.papeis;
}
function buildAssignment(nomes, seed) {
  const limpos = nomes.map(n => n.trim()).filter(Boolean);
  // Se todos os nomes têm tema definido (codinomes-padrão), respeita o mapa temático.
  const tem = OFICINA.mapaTematico || [];
  if (limpos.length > 0 && limpos.every(n => tem.some(x => x.nome === n))) {
    return limpos.map(n => ({ nome: n, papelId: tem.find(x => x.nome === n).papelId }));
  }
  const ids = papeisAtivos().map(p => p.id);
  const shuffled = seededShuffle(ids, seed);
  // ordena nomes de forma estável para reprodutibilidade
  const ordenados = limpos
    .map((n, i) => ({ n, i }))
    .sort((a, b) => a.n.localeCompare(b.n, "pt-BR") || a.i - b.i)
    .map(o => o.n);
  return ordenados.map((nome, i) => ({ nome, papelId: shuffled[i % shuffled.length] }));
}

/* ---------- Grupos de casa (jigsaw): cada grupo com 1 A, 1 B e 1 C ---------- */
function formarGruposCasa(mapa) {
  const porTema = { A: [], B: [], C: [] };
  mapa.forEach(m => {
    const p = papelPorId(m.papelId);
    if (p && porTema[p.tema]) porTema[p.tema].push(m);
  });
  const n = Math.max(porTema.A.length, porTema.B.length, porTema.C.length);
  const grupos = [];
  for (let i = 0; i < n; i++) {
    const g = [];
    ["A", "B", "C"].forEach(t => { if (porTema[t][i]) g.push(porTema[t][i]); });
    if (g.length) grupos.push(g);
  }
  return grupos;
}

/* ---------- Codificação do mapa na URL (compartilhar com a turma) ---------- */
function b64encode(str) {
  try { return btoa(unescape(encodeURIComponent(str))); }
  catch (e) { return btoa(str); }
}
function b64decode(str) {
  try { return decodeURIComponent(escape(atob(str))); }
  catch (e) { return atob(str); }
}
function encodeMap(mapa) { return b64encode(JSON.stringify(mapa)); }
function decodeMap(codigo) {
  try { return JSON.parse(b64decode(codigo)); } catch (e) { return null; }
}

/* ---------- Utilidades ---------- */
function getParam(nome) {
  const m = new RegExp("[?&]" + nome + "=([^&]+)").exec(location.search);
  return m ? decodeURIComponent(m[1]) : null;
}
function papelPorId(id) { return OFICINA.papeis.find(p => p.id === id); }

function salvarLocal(chave, valor) {
  try { localStorage.setItem("oficina_ia_" + chave, JSON.stringify(valor)); } catch (e) {}
}
function lerLocal(chave) {
  try { return JSON.parse(localStorage.getItem("oficina_ia_" + chave)); } catch (e) { return null; }
}
function baixarArquivo(nome, texto) {
  const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nome;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function copiarTexto(texto, botao) {
  const ok = () => {
    if (!botao) return;
    const orig = botao.textContent;
    botao.textContent = "Copiado!";
    setTimeout(() => (botao.textContent = orig), 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(ok).catch(() => fallback());
  } else fallback();
  function fallback() {
    const t = document.createElement("textarea");
    t.value = texto; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); ok(); } catch (e) {}
    t.remove();
  }
}

/* ---------- Trilha guiada (gamificação) ---------- */
const TRILHA_TODAS = [
  { id: "inicio", href: "index.html", nome: "Início" },
  { id: "sondagem", href: "sondagem.html", nome: "Sondagem inicial" },
  { id: "diagnostico", href: "autodiagnostico.html", nome: "Autodiagnóstico" },
  { id: "leitura", href: "leitura.html", nome: "Leitura" },
  { id: "exploracao", href: "exploracao.html", nome: "Exploração mediada" },
  { id: "missao", href: "sorteio.html", nome: "Minha missão" },
  { id: "jigsaw", href: "jigsaw.html", nome: "Jigsaw" }
];
const _cfg = (typeof window !== "undefined" && window.OFICINA_CONFIG) || {};
const TRILHA = TRILHA_TODAS.filter(t =>
  (t.id !== "sondagem" || _cfg.mostrarSondagem !== false) &&
  (t.id !== "leitura" || _cfg.mostrarLeitura !== false) &&
  (t.id !== "jigsaw" || _cfg.mostrarJigsaw !== false) &&
  (t.id !== "exploracao" || _cfg.mostrarExploracao !== false) &&
  (t.id !== "missao" || _cfg.mostrarMissao !== false));
function progresso() { const p = lerLocal("progresso_v2"); return Array.isArray(p) ? p : []; }
function indiceEtapa(id) { return TRILHA.findIndex(t => t.id === id); }
function tudoLiberado() { return progresso().length >= TRILHA.length; }
function etapaLiberada(id) {
  if (tudoLiberado()) return true;
  const max = Math.max(-1, ...progresso().map(indiceEtapa));
  return indiceEtapa(id) <= max + 1;
}
function etapaAtual() {
  const max = Math.max(-1, ...progresso().map(indiceEtapa));
  return TRILHA[Math.min(max + 1, TRILHA.length - 1)];
}
function proximaEtapa(id) { return TRILHA[Math.min(indiceEtapa(id) + 1, TRILHA.length - 1)]; }
function concluirEtapa(id) {
  const p = progresso();
  if (!p.includes(id)) { p.push(id); salvarLocal("progresso_v2", p); }
  if (p.length >= TRILHA.length) salvarLocal("progresso_v2", TRILHA.map(t => t.id));
  renderTrilha();
}
function reiniciarTrilha() { salvarLocal("progresso_v2", []); renderTrilha(); }

/* Emblema original por codinome (sem uso de imagens de terceiros) */
function emblemaSVG(nome, size) {
  size = size || 74;
  const ini = (String(nome).match(/[A-Za-zÀ-ÿ]/g) || []).slice(0, 2).join("").toUpperCase() || "?";
  const cores = ["#4f46e5", "#7c3aed", "#0e7490", "#2563eb", "#c026d3", "#ea580c", "#e11d48", "#0891b2", "#6366f1"];
  const cor = cores[hashStr(String(nome)) % cores.length];
  const gid = "g" + (hashStr(String(nome)) % 99999);
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="Emblema de ${nome}">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${cor}"/><stop offset="1" stop-color="#312e81"/></linearGradient></defs>
    <circle cx="50" cy="50" r="48" fill="url(#${gid})"/>
    <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-dasharray="2 3.5"/>
    <polygon points="50,7 55,13 48,13" fill="rgba(255,255,255,.7)" transform="translate(0,-2)"/>
    <text x="50" y="51" text-anchor="middle" dominant-baseline="central" font-family="system-ui, sans-serif" font-weight="800" font-size="33" fill="#fff">${ini}</text>
  </svg>`;
}

/* Widget flutuante da trilha */
function renderTrilha() {
  let el = document.getElementById("trilhaWidget");
  if (!el) {
    el = document.createElement("div");
    el.id = "trilhaWidget";
    el.className = "trilha-widget sem-print";
    document.body.appendChild(el);
  }
  const p = progresso();
  const concluidas = TRILHA.filter(t => p.includes(t.id)).length;
  el.innerHTML = `
    <div class="trilha-cab">Trilha <span>${concluidas}/${TRILHA.length}</span>
      <button class="trilha-toggle" title="Mostrar/ocultar">–</button></div>
    <ol class="trilha-lista">
      ${TRILHA.map(t => {
        const ok = p.includes(t.id), at = !ok && etapaLiberada(t.id);
        return `<li class="trilha-step ${ok ? "ok" : at ? "atual" : "travada"}">
          <span class="dot"></span><a href="${etapaLiberada(t.id) ? t.href : "#"}">${t.nome}</a></li>`;
      }).join("")}
    </ol>
    <div class="trilha-rodape"><button class="trilha-reset">Reiniciar trilha</button></div>`;
  const tg = el.querySelector(".trilha-toggle");
  tg.onclick = () => { el.classList.toggle("recolhida"); tg.textContent = el.classList.contains("recolhida") ? "+" : "–"; };
  const rst = el.querySelector(".trilha-reset");
  if (rst) rst.onclick = () => { reiniciarTrilha(); location.href = "index.html"; };
}

/* Bloqueia a página se a etapa ainda não foi liberada */
function gateEtapa(id) {
  if (etapaLiberada(id)) return true;
  const main = document.querySelector("main");
  const atual = etapaAtual();
  if (main) {
    main.innerHTML = `<div class="card gate">
      <h2>Etapa bloqueada</h2>
      <p>Para chegar a <strong>${TRILHA[indiceEtapa(id)].nome}</strong>, conclua a trilha na ordem.
      Isso garante que você aproveite cada etapa — e depois você poderá navegar livremente.</p>
      <p>Sua etapa atual é: <strong>${atual.nome}</strong>.</p>
      <a class="btn verde" href="${atual.href}">Continuar a trilha</a>
    </div>`;
  }
  const nav = document.getElementById("nav");
  if (nav) renderNav("");
  return false;
}

/* ---------- Navegação comum (com bloqueio progressivo) ---------- */
function renderNav(ativo) {
  const el = document.getElementById("nav");
  if (!el) return;
  el.innerHTML = TRILHA.map(t => {
    const liberada = etapaLiberada(t.id);
    const cls = t.nome === ativo ? " class=\"ativo\"" : "";
    if (!liberada) return `<span class="bloqueado" title="Conclua a etapa anterior">${t.nome}</span>`;
    return `<a href="${t.href}"${cls}>${t.nome}</a>`;
  }).join("");
}

/* ---------- Tutor (assistente tipo "Clippy") ---------- */
const Tutor = (function () {
  let el, bolha, txt, dicas = [], i = 0;
  function montar() {
    if (el) return;
    el = document.createElement("div");
    el.className = "tutor sem-print";
    el.innerHTML = `
      <div class="tutor-bolha">
        <button class="tutor-x" title="Fechar">×</button>
        <p class="tutor-txt"></p>
        <div class="tutor-acoes"><button class="tutor-next">Próxima dica</button></div>
      </div>
      <div class="tutor-boneco" title="Assistente da oficina">
        <svg viewBox="0 0 60 84" width="46" height="64" aria-hidden="true">
          <path d="M20 14 q0 -9 9 -9 h8 q9 0 9 9 v50 q0 14 -13 14 h-1 q-13 0 -13 -14 V24 q0 -6 6 -6 q6 0 6 6 v34 q0 5 -5 5 q-5 0 -5 -5 V30"
            fill="none" stroke="#cbd5e1" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="28" cy="34" r="3" fill="#334155"/><circle cx="38" cy="34" r="3" fill="#334155"/>
          <path d="M28 44 q5 5 10 0" fill="none" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>`;
    document.body.appendChild(el);
    bolha = el.querySelector(".tutor-bolha");
    txt = el.querySelector(".tutor-txt");
    el.querySelector(".tutor-x").onclick = () => el.classList.add("oculto");
    el.querySelector(".tutor-next").onclick = proxima;
  }
  function falar(t) { montar(); el.classList.remove("oculto"); txt.innerHTML = t; }
  function definir(lista) { dicas = lista || []; i = 0; }
  function proxima() { if (!dicas.length) return; i = (i + 1) % dicas.length; txt.innerHTML = dicas[i]; }
  return { falar, definir, proxima, montar };
})();

/* ---------- Entrega de resultados ---------- */

/* ---------- Cartão de papel (missão) ---------- */
function renderPapel(papel, destino) {
  const el = typeof destino === "string" ? document.getElementById(destino) : destino;
  if (!el || !papel) return;
  const cc = { A: "tema-a", B: "tema-b", C: "tema-c" }[papel.tema] || "";
  el.innerHTML = `
    <article class="missao ${cc}">
      <header>
        <span class="badge-papel">Papel ${papel.id}</span>
        <h3>${papel.titulo}</h3>
        <p class="tema">${papel.temaNome}</p>
      </header>
      <section><h4>1. Documento-base para estudar</h4><p>${papel.doc}</p>
        <p class="fonte"><strong>Fonte:</strong> ${papel.docFonte}</p>
        ${(OFICINA.docLinks && OFICINA.docLinks[papel.id]) ? `<p><a class="btn ghost" target="_blank" rel="noopener" href="${OFICINA.docLinks[papel.id][1]}">Abrir: ${OFICINA.docLinks[papel.id][0]}</a></p>` : ""}</section>
      <section><h4>2. Ferramenta de IA e links para fazer a atividade</h4><p>${papel.ia}</p>
        ${(OFICINA.linksAtividade && OFICINA.linksAtividade[papel.id]) ? `<p>${OFICINA.linksAtividade[papel.id].map(l => `<a class="btn ghost" target="_blank" rel="noopener" href="${l[1]}">${l[0]}</a>`).join(" ")}</p>` : ""}
        ${(() => { const inter = lerLocal("interessesSel"); return (inter && inter.length) ? `<p class="ajuda"><strong>Conecte com os seus interesses:</strong> ${inter.join(", ")} — como esta missão aparece na sua área?</p>` : ""; })()}
      </section>
      <section><h4>3. Missão de exploração (passo a passo)</h4>
        <ol>${papel.missao.map(m => `<li>${m}</li>`).join("")}</ol>
        ${papel.base ? `<p class="fonte" style="margin-top:.4rem">${papel.base}</p>` : ""}</section>
      <section class="duas">
        <div><h4>4. Pergunta crítica</h4><p>${papel.pergunta}</p></div>
        <div><h4>5. Produto para trazer</h4><p>${papel.produto}</p>
          ${(papel.criterios && papel.criterios.length) ? `<p class="fonte"><strong>Critérios de checagem:</strong> ${papel.criterios.map(c => "• " + c).join(" ")}</p>` : ""}</div>
      </section>
      <p class="dica"><strong>Dica/plano B:</strong> ${papel.dica}</p>
    </article>`;
}

/* ---------- Mapa padrão (codinomes) e tabela de codinomes ---------- */
function mapaPadrao() {
  if (OFICINA.mapaTematico && OFICINA.mapaTematico.length) return OFICINA.mapaTematico;
  if (!OFICINA.mapaPadrao && OFICINA.turmaPadrao) {
    OFICINA.mapaPadrao = buildAssignment(OFICINA.turmaPadrao, OFICINA.seedPadrao);
  }
  return OFICINA.mapaPadrao;
}
function listaCodinomes() {
  const mapa = mapaPadrao() || [];
  return mapa.map(m => {
    const p = papelPorId(m.papelId);
    const bio = (OFICINA.personalidades.find(x => x.nome === m.nome) || {}).bio || "";
    return { codinome: m.nome, papelId: m.papelId, titulo: p ? p.titulo : "", bio };
  });
}
function renderCodinomes(destino) {
  const el = typeof destino === "string" ? document.getElementById(destino) : destino;
  if (!el) return;
  const linhas = listaCodinomes().map(c =>
    `<tr><td><strong>${c.codinome}</strong><br><small>${c.bio}</small></td><td>${c.papelId} — ${c.titulo}</td></tr>`
  ).join("");
  el.innerHTML = `<table class="tabela">
    <tr><th>Codinome (mulher na tecnologia)</th><th>Missão sorteada</th></tr>${linhas}</table>`;
}

/* ---------- Códigos de acesso (codinome único por aluna) ---------- */
const COD_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sem I,L,O,0,1 (evita confusão)
function normalizarCodigo(code) {
  return String(code || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function codigoValido(c) {
  if (!/^OF[A-Z0-9]{6}$/.test(c)) return false;
  const base = c.slice(0, 7), check = c[7];
  return COD_CHARS[hashStr(base) % COD_CHARS.length] === check;
}
function codinomePorCodigo(code) {
  const c = normalizarCodigo(code);
  if (!codigoValido(c)) return null;
  const lista = OFICINA.turmaPadrao || [];
  if (!lista.length) return null;
  return lista[hashStr(c) % lista.length];
}
function papelDoCodinome(nome) {
  const m = (OFICINA.mapaTematico || []).find(x => x.nome === nome);
  return m ? m.papelId : null;
}
function gerarCodigoParaCodinome(nome, usados) {
  const lista = OFICINA.turmaPadrao || [];
  const alvo = lista.indexOf(nome);
  if (alvo < 0) return null;
  usados = usados || new Set();
  for (let t = 0; t < 500000; t++) {
    let base = "OF";
    for (let i = 0; i < 5; i++) base += COD_CHARS[Math.floor(Math.random() * COD_CHARS.length)];
    const c = base + COD_CHARS[hashStr(base) % COD_CHARS.length];
    if (usados.has(c)) continue;
    if (hashStr(c) % lista.length === alvo) { usados.add(c); return c; }
  }
  return null;
}

/* ---------- Resgate ("claim") do codinome, com backend opcional ---------- */
function claimCodinome(codigo, nome, callback) {
  const cfg = (typeof window !== "undefined" && window.OFICINA_CONFIG) || {};
  const cod = codinomePorCodigo(codigo);
  if (!cod) { callback({ ok: false, motivo: "Código inválido (formato ou dígito de verificação)." }); return; }
  const papelId = papelDoCodinome(cod);
  if (!cfg.claimEndpoint) { callback({ ok: true, codinome: cod, papelId, local: true }); return; }

  const cbn = "oiaClaim_" + Date.now();
  window[cbn] = function (res) {
    try { delete window[cbn]; } catch (e) {}
    if (!res) res = { ok: false, motivo: "Sem resposta do servidor." };
    if (res.ok) { res.codinome = res.codinome || cod; res.papelId = res.papelId || papelId; }
    callback(res);
  };
  const sep = cfg.claimEndpoint.indexOf("?") >= 0 ? "&" : "?";
  const url = cfg.claimEndpoint + sep +
    "action=claim&codigo=" + encodeURIComponent(codigo) +
    "&nome=" + encodeURIComponent(nome || "") +
    "&codinome=" + encodeURIComponent(cod) +
    "&papelId=" + encodeURIComponent(papelId || "") +
    "&callback=" + cbn;
  const s = document.createElement("script");
  s.src = url;
  s.onerror = function () { callback({ ok: false, motivo: "Falha ao contatar o servidor." }); };
  document.body.appendChild(s);
  setTimeout(function () { try { s.remove(); } catch (e) {} }, 10000);
}

/* ---------- QR Code (figura) ---------- */
function qrImg(url, size) {
  size = size || 150;
  const src = "https://api.qrserver.com/v1/create-qr-code/?size=" + size + "x" + size +
    "&margin=8&data=" + encodeURIComponent(url);
  return `<a href="${url}" target="_blank" rel="noopener" title="Abrir: ${url}">` +
    `<img class="qr" src="${src}" width="${size}" height="${size}" alt="QR Code para ${url}" loading="lazy" ` +
    `style="border:1px solid #e2e8f0;border-radius:10px;background:#fff;padding:6px"></a>`;
}

/* ---------- Entrega de resultados ---------- */
function codigoDeEntrega(payload) {
  return "OIA1:" + b64encode(JSON.stringify(payload));
}
function decodificarEntrega(codigo) {
  try {
    const s = String(codigo).trim().replace(/^OIA1:/, "").replace(/\s+/g, "");
    return JSON.parse(b64decode(s));
  } catch (e) { return null; }
}
function payloadTexto(payload) {
  const L = [];
  L.push("IAgora, profe?! — entrega de pré-atividade");
  L.push("Tipo: " + (payload.tipo || ""));
  L.push("Nome: " + (payload.nome || ""));
  if (payload.perfil) L.push("Perfil geral: " + payload.perfil + (payload.geral != null ? " (" + payload.geral + "%)" : ""));
  if (payload.pct) L.push("Por dimensão: " + Object.keys(payload.pct).map(k => k + "=" + payload.pct[k] + "%").join(", "));
  if (payload.prioridades) L.push("Prioridades: " + [].concat(payload.prioridades).join(", "));
  if (payload.nivelNome) L.push("Nível da exploração: " + payload.nivelNome);
  if (payload.interesses) L.push("Interesses: " + [].concat(payload.interesses).join(", "));
  if (payload.desafios) L.push("Desafios: " + [].concat(payload.desafios).join(" | "));
  if (payload.papelId) L.push("Missão (jigsaw): " + payload.papelId + (payload.titulo ? " — " + payload.titulo : ""));
  if (payload.produto) L.push("Resumo do produto: " + payload.produto);
  if (payload.bases) L.push("Bases: " + payload.bases);
  L.push("");
  L.push("Data: " + (payload.ts || new Date().toISOString()));
  L.push("Código de entrega: " + codigoDeEntrega(payload));
  return L.join("\n");
}

function enviarResultado(payload, botao) {
  const cfg = (typeof window !== "undefined" && window.OFICINA_CONFIG) || {};
  const codigo = codigoDeEntrega(payload);
  const sinal = (txt) => { if (botao) { const o = botao.textContent; botao.textContent = txt || "Enviado!"; setTimeout(() => (botao.textContent = o), 2200); } };

  const assunto = "IAgora, profe?! — entrega de " + (payload.nome || "participante") + " (" + (payload.tipo || "") + ")";
  const base = {
    nome: payload.nome || "",
    tipo: payload.tipo || "",
    resumo: payload.resumo || payloadTexto(payload),
    codigo: codigo
  };
  const falhar = () => {
    copiarTexto(codigo, botao);
    alert("Não foi possível enviar automaticamente. O código de entrega foi copiado — cole no AVA.");
  };
  const viaWeb3 = () => {
    if (!cfg.web3formsKey) { falhar(); return; }
    const corpo = Object.assign({ access_key: cfg.web3formsKey, subject: assunto, from_name: "IAgora, profe?!" }, base);
    fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(corpo)
    }).then(r => r.json())
      .then(j => { if (j && j.success) sinal(); else falhar(); })
      .catch(falhar);
  };

  /* 1) Endpoint (Apps Script): grava na Planilha e envia e-mail (MailApp) */
  const destino = cfg.endpoint || cfg.formEndpoint;
  if (destino) {
    const corpo = Object.assign({ _subject: assunto, _template: "table", _captcha: "false" }, base);
    fetch(destino, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(corpo)
    }).then(r => (r.ok ? r.text() : Promise.reject()))
      .then(() => sinal())
      .catch(() => {
        fetch(destino, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(corpo)
        }).then(() => sinal()).catch(viaWeb3);
      });
    return codigo;
  }

  /* 2) Web3Forms: envio direto por e-mail */
  if (cfg.web3formsKey) { viaWeb3(); return codigo; }

  /* 3) Sem backend: copia o código */
  copiarTexto(codigo, botao);
  alert("Código de entrega copiado! Cole no ambiente da turma (Moodle/AVA) para a professora.\n\nVocê também pode baixar o bilhete de saída na tela.");
  return codigo;
}

if (typeof window !== "undefined") {
  window.OficinaUtil = { papeisAtivos, hashStr, mulberry32, seededShuffle, buildAssignment, formarGruposCasa, encodeMap, decodeMap, getParam, papelPorId, salvarLocal, lerLocal, baixarArquivo, copiarTexto, renderNav, renderPapel, mapaPadrao, listaCodinomes, renderCodinomes, codigoDeEntrega, decodificarEntrega, enviarResultado, b64encode, b64decode, normalizarCodigo, codigoValido, codinomePorCodigo, papelDoCodinome, gerarCodigoParaCodinome, claimCodinome, TRILHA, progresso, indiceEtapa, etapaLiberada, etapaAtual, proximaEtapa, tudoLiberado, concluirEtapa, reiniciarTrilha, renderTrilha, gateEtapa, emblemaSVG, qrImg, Tutor };
  mapaPadrao();
  renderTrilha();
}
