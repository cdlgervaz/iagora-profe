/* =====================================================================
   Bloco 1 — Tipos de IA: banco de exemplos, tipos e sorteio por grupo
   ===================================================================== */
window.TIPOS_IA = (function () {

  const TIPOS = {
    preditiva:      { nome: "Preditiva",      emoji: "📊", cor: "#2563eb", desc: "Classifica e prevê a partir de padrões nos dados." },
    generativa:     { nome: "Generativa",     emoji: "✨", cor: "#4f46e5", desc: "Cria conteúdo novo (texto, imagem, áudio, vídeo, código)." },
    agentica:       { nome: "Agêntica",       emoji: "🤖", cor: "#7c3aed", desc: "Planeja e executa ações com autonomia, usando ferramentas." },
    infraestrutura: { nome: "Infraestrutura", emoji: "🏗️", cor: "#0f766e", desc: "IA aplicada à própria infraestrutura: projetar chips, otimizar data centers, energia e redes." }
  };

  const EXEMPLOS = [
    /* --- Preditiva --- */
    { tipo: "preditiva", texto: "Score de crédito que estima o risco de uma pessoa não pagar um empréstimo.", explicacao: "Analisa dados históricos para estimar uma probabilidade — prevê/classifica." },
    { tipo: "preditiva", texto: "Filtro que decide se um e-mail é spam ou não.", explicacao: "Classifica cada mensagem em categorias com base em padrões aprendidos." },
    { tipo: "preditiva", texto: "Câmera com reconhecimento facial que identifica uma pessoa na rua.", explicacao: "Compara padrões do rosto com uma base e prevê a identidade." },
    { tipo: "preditiva", texto: "Recomendação de filmes do tipo “quem viu isto também viu”.", explicacao: "Prevê o que você pode gostar a partir de comportamentos parecidos." },
    { tipo: "preditiva", texto: "Triagem que aponta a probabilidade de uma doença a partir de exames.", explicacao: "Estima risco/classificação — apoio à decisão, não criação de conteúdo." },
    { tipo: "preditiva", texto: "Previsão de demanda para repor o estoque de uma loja.", explicacao: "Prevê quantidades futuras com base em séries de dados." },
    { tipo: "preditiva", texto: "Detecção de fraude em compras no cartão de crédito.", explicacao: "Classifica transações como suspeitas/normais a partir de padrões." },
    { tipo: "preditiva", texto: "Manutenção preditiva: prever quando uma máquina vai falhar.", explicacao: "Prevê eventos futuros (falha) a partir de sensores e histórico." },
    { tipo: "preditiva", texto: "Sistema que classifica notícias por tema automaticamente.", explicacao: "Atribui categorias a textos — tarefa de classificação." },

    /* --- Generativa --- */
    { tipo: "generativa", texto: "ChatGPT escrevendo um e-mail a partir de um pedido.", explicacao: "Produz texto novo — conteúdo original gerado." },
    { tipo: "generativa", texto: "Gerador de imagem a partir de uma descrição (“gato astronauta”).", explicacao: "Cria uma imagem nova a partir de texto." },
    { tipo: "generativa", texto: "Voz sintética que narra um texto em áudio (text-to-speech).", explicacao: "Gera áudio/voz — conteúdo novo." },
    { tipo: "generativa", texto: "Tradução automática de um parágrafo para outro idioma.", explicacao: "Gera um novo texto (tradução) — saída de conteúdo." },
    { tipo: "generativa", texto: "Copilot que completa o código enquanto você programa.", explicacao: "Cria/continua código novo — geração." },
    { tipo: "generativa", texto: "Geração de um vídeo a partir de uma descrição textual.", explicacao: "Cria vídeo — conteúdo audiovisual gerado." },
    { tipo: "generativa", texto: "Chatbot que redige uma redação escolar sobre um tema.", explicacao: "Produz texto original — geração de conteúdo." },
    { tipo: "generativa", texto: "IA que compõe uma música a partir de um prompt.", explicacao: "Cria uma faixa musical nova — geração." },
    { tipo: "generativa", texto: "IA que resume um documento longo em poucos parágrafos.", explicacao: "Gera um novo texto (resumo) — conteúdo produzido." },

    /* --- Agêntica --- */
    { tipo: "agentica", texto: "Agente que marca reuniões na agenda e envia os convites.", explicacao: "Planeja e executa ações (múltiplos passos) para cumprir um objetivo." },
    { tipo: "agentica", texto: "Assistente que pesquisa preços, adiciona ao carrinho e finaliza a compra.", explicacao: "Age em ferramentas/sites com autonomia até concluir a tarefa." },
    { tipo: "agentica", texto: "Agente que navega na web sozinho para coletar e organizar dados.", explicacao: "Executa passos no navegador de forma autônoma." },
    { tipo: "agentica", texto: "Robô que executa um fluxo entre ferramentas (organiza arquivos e responde mensagens).", explicacao: "Orquestra ações em vários sistemas — autonomia de execução." },
    { tipo: "agentica", texto: "Agente que corrige um bug e envia a alteração de código (pull request).", explicacao: "Planeja, executa (edita, testa, envia) — agente que age." },
    { tipo: "agentica", texto: "Sistema que lê os e-mails e responde automaticamente aos pedidos.", explicacao: "Toma decisões e executa respostas sozinho." },
    { tipo: "agentica", texto: "Agente que planeja uma viagem: busca voos, compara e reserva.", explicacao: "Encadeia decisões e ações para atingir a meta." },
    { tipo: "agentica", texto: "Agente que opera um computador para cumprir uma tarefa pedida.", explicacao: "Controla a máquina e executa passos de forma autônoma." },
    { tipo: "agentica", texto: "Agente que monitora contratos e dispara alertas e ações.", explicacao: "Vigia, decide e age — comportamento orientado a objetivos." },

    /* --- Infraestrutura (IA aplicada à infraestrutura da IA) --- */
    { tipo: "infraestrutura", texto: "IA que projeta o layout de chips de IA, posicionando milhões de componentes.", explicacao: "A IA atuando na infraestrutura: projetar o hardware (chips) que roda IA." },
    { tipo: "infraestrutura", texto: "IA que otimiza o resfriamento de data centers e corta o gasto de energia.", explicacao: "A IA operando a infraestrutura física (energia e refrigeração)." },
    { tipo: "infraestrutura", texto: "IA que prevê a demanda e distribui as GPUs entre as tarefas de um data center.", explicacao: "A IA gerenciando a infraestrutura de computação (escalonamento)." },
    { tipo: "infraestrutura", texto: "IA que detecta falhas e faz manutenção preditiva em servidores e redes.", explicacao: "A IA cuidando da própria infraestrutura de servidores e redes." },
    { tipo: "infraestrutura", texto: "IA que otimiza o tráfego e as rotas de rede entre data centers.", explicacao: "A IA aplicada à infraestrutura de rede que sustenta a IA." },
    { tipo: "infraestrutura", texto: "IA que descobre e projeta novos materiais para chips mais eficientes.", explicacao: "A IA na cadeia de infraestrutura: criar hardware e materiais de IA." }
  ];

  const TIPOS_IDS = Object.keys(TIPOS);

  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuf(arr, seed) { const r = mulberry32(hashStr(seed)); const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* Sorteio determinístico: mesmo seed -> mesma distribuição.
     Para cada tipo, embaralha o banco e distribui 2 exemplos por grupo (sem repetição entre grupos). */
  function atribuir(seed) {
    seed = seed || "tipos-ia-2026";
    const porTipo = {};
    TIPOS_IDS.forEach(t => { porTipo[t] = shuf(EXEMPLOS.filter(e => e.tipo === t), seed + "|" + t); });
    const out = { 1: [], 2: [], 3: [] };
    for (let g = 0; g < 3; g++) {
      TIPOS_IDS.forEach(t => { out[g + 1].push(porTipo[t][g * 2], porTipo[t][g * 2 + 1]); });
    }
    [1, 2, 3].forEach(g => { out[g] = shuf(out[g], seed + "|g" + g).map((e, i) => Object.assign({ n: i + 1 }, e)); });
    return out;
  }
  function conjunto(seed, g) { return atribuir(seed)[g] || []; }

  return { TIPOS, EXEMPLOS, TIPOS_IDS, atribuir, conjunto };
})();
