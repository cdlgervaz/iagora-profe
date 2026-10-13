/* =====================================================================
   Atividade "Limitações no uso da IA" — dados e utilidades compartilhadas
   ===================================================================== */
window.LIA = (function () {

  const CASOS = [
    {
      id: "itapecerica",
      num: 1,
      titulo: "Itapecerica da Serra (SP, 2026)",
      foco: "Viés e representação",
      resumo: "Uma atividade distribuída a alunos do 3º ano da rede municipal trazia a " +
        "ilustração de um menino negro dentro de uma lixeira reciclável. A Prefeitura confirmou " +
        "que a imagem foi gerada por IA e integrava um material pedagógico de 25 páginas; " +
        "abriu apuração após a repercussão.",
      fonte: "G1 · TV Brasil (EBC) · Terra · Metrópoles (set./2026)",
      links: [
        ["G1", "https://g1.globo.com/sp/sao-paulo/noticia/2026/09/26/ilustracao-em-atividade-escolar-mostra-menino-negro-dentro-de-lixeira-material-foi-distribuido-na-rede-publica-de-itapecerica-da-serra.ghtml"],
        ["TV Brasil (EBC)", "https://tvbrasil.ebc.com.br/reporter-brasil-tarde/2026/09/ilustracao-em-material-didatico-mostra-menino-negro-em-lixeira"]
      ]
    },
    {
      id: "elefante",
      num: 2,
      titulo: "Plataforma de leitura — Elefante Letrado (São Paulo, 2026)",
      foco: "Dados pessoais e privacidade",
      resumo: "A plataforma “Elefante Letrado” usa IA para avaliar a fluência leitora de " +
        "crianças e grava a voz dos estudantes. Famílias relataram não ter sido consultadas; " +
        "vereadoras pediram a anulação do convênio e o Ministério Público solicitou " +
        "esclarecimentos sobre consentimento e tratamento dos dados de voz (LGPD).",
      fonte: "Núcleo Jornalismo · Metrópoles (set.–out./2026)",
      links: [
        ["Núcleo Jornalismo", "https://nucleo.jor.br/reportagem/2026/09/14/elefante-letrado-escolas-sp/"],
        ["Metrópoles", "https://www.metropoles.com/sao-paulo/mpsp-pede-esclarecimentos-sobre-programa-de-educacao-do-governo-que-usa-ia"]
      ]
    },
    {
      id: "cariacica",
      num: 3,
      titulo: "Projeção de profissões com IA (Cariacica, ES, 2025)",
      foco: "Representação e imagens de crianças",
      resumo: "Na EMEF Arthur da Costa e Silva, em Cariacica (ES), a professora Thais Moral usou " +
        "IA para transformar a imagem dos estudantes e mostrar como eles seriam no futuro, na " +
        "profissão que sonham (disciplina “Pequenos Exploradores”). Cada criança escreveu o que " +
        "gostaria de ser quando crescer e viu a própria imagem gerada por IA.",
      fonte: "G1 ES · TV Gazeta (set./2025)",
      links: [
        ["G1 ES", "https://g1.globo.com/es/espirito-santo/educacao/noticia/2025/09/02/video-professora-usa-inteligencia-artificial-para-projetar-sonhos-de-carreira-de-alunos-no-es.ghtml"]
      ]
    },
    {
      id: "outro",
      num: 4,
      titulo: "Outro caso (opcional)",
      foco: "Livre",
      resumo: "Traga outra notícia recente (Brasil ou América Latina) que mostre uma limitação " +
        "no uso de IA. Escreva o nome/site da fonte no campo abaixo.",
      fonte: "",
      links: []
    }
  ];

  const PERGUNTAS = [
    { id: "revela", t: "O que a notícia revela?" },
    { id: "limitacao", t: "Qual limitação da IA?" },
    { id: "afetados", t: "Quem foi afetado?" },
    { id: "salvaguarda", t: "Que princípio ou salvaguarda você adotaria?" }
  ];

  const TIPOS = [
    "Viés / representação",
    "Alucinação",
    "Dados / consentimento",
    "Trabalho / custo humano",
    "Ambiente / infraestrutura",
    "Concentração / soberania"
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, c => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]
    ));
  }

  function casoPorId(id) { return CASOS.find(c => c.id === id) || null; }

  function buildResumo(p) {
    const L = ["LIMITAÇÕES NO USO DA IA — ficha da turma", "Nome: " + (p.nome || ""), ""];
    CASOS.forEach(c => {
      const r = (p.casos && p.casos[c.id]) || {};
      const tem = r.revela || r.limitacao || r.afetados || r.salvaguarda || r.fonte;
      if (!tem) return;
      L.push("[" + c.titulo + "]");
      PERGUNTAS.forEach(q => L.push(q.t + " " + (r[q.id] || "-")));
      if (r.fonte) L.push("Fonte: " + r.fonte);
      L.push("");
    });
    if (p.tipos && p.tipos.length) L.push("Tipos de limitação: " + p.tipos.join(", "));
    if (p.criterio) L.push("Critério coletivo: " + p.criterio);
    return L.join("\n");
  }

  function studentCard(p, proj, filtroCaso) {
    const dt = p.ts ? new Date(p.ts).toLocaleString("pt-BR") : "";
    let secoes = "";
    CASOS.forEach(c => {
      if (filtroCaso && filtroCaso !== c.id) return;
      const r = (p.casos && p.casos[c.id]) || {};
      const tem = r.revela || r.limitacao || r.afetados || r.salvaguarda || r.fonte;
      if (!tem) return;
      const linhas = PERGUNTAS.map(q =>
        `<div class="lia-q"><span class="lia-perg">${esc(q.t)}</span><span class="lia-resp">${esc(r[q.id]) || "—"}</span></div>`
      ).join("");
      secoes += `<section class="lia-caso"><h4>${esc(c.titulo)} <span class="lia-foco">${esc(c.foco)}</span></h4>${linhas}` +
        (r.fonte ? `<p class="lia-fonte">Fonte: ${esc(r.fonte)}</p>` : "") + `</section>`;
    });
    const tipos = (p.tipos && p.tipos.length) ? `<p class="lia-tipos"><strong>Tipos:</strong> ${p.tipos.map(esc).join(" · ")}</p>` : "";
    const crit = p.criterio ? `<p class="lia-crit"><strong>Critério coletivo:</strong> ${esc(p.criterio)}</p>` : "";
    return `<article class="lia-card${proj ? " proj" : ""}">
      <header><strong>${esc(p.nome) || "Sem nome"}</strong><small>${esc(dt)}</small></header>
      ${secoes}${tipos}${crit}
    </article>`;
  }

  function extrairCodigos(texto) {
    const out = [];
    const re = /(?:LIA1:|OIA1:)[A-Za-z0-9+/=_-]+/g;
    let m;
    while ((m = re.exec(String(texto || "")))) out.push(m[0]);
    return out;
  }

  return { CASOS, PERGUNTAS, TIPOS, esc, casoPorId, buildResumo, studentCard, extrairCodigos };
})();
