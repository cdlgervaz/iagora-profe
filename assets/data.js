/* =====================================================================
   OFICINA IA NO CONTEXTO BRASILEIRO — base de dados do site de pré-atividade
   Funciona offline (file://) e em hospedagem estática. Sem backend.
   ===================================================================== */

const OFICINA = {
  titulo: "IA no Contexto Brasileiro",
  subtitulo: "Pré-atividade — missões, autodiagnóstico e jigsaw",
  seedPadrao: "IA2026",

  /* -----------------------------------------------------------------
     CODINOMES PADRÃO — mulheres na tecnologia (diversas, Sul global)
     Enquanto não houver nomes reais, use estes codinomes: atribua um a
     cada participante e o site já mostra a missão correspondente.
     ----------------------------------------------------------------- */
  turmaPadrao: [
    "Ada Lovelace",
    "Hedy Lamarr",
    "Katherine Johnson",
    "Joy Buolamwini",
    "Nina da Hora",
    "Silvana Bahia",
    'Veronyka "Travahacker" Gimenes',
    "Mariéme Jamme",
    "Danielle Boyer"
  ],
  personalidades: [
    { nome: "Ada Lovelace", bio: "Inglaterra, séc. XIX — matemática, escreveu o primeiro algoritmo para a Máquina Analítica." },
    { nome: "Hedy Lamarr", bio: "Áustria/EUA (1914–2000) — atriz e inventora, co-criadora do salto de frequência (base do Wi-Fi)." },
    { nome: "Katherine Johnson", bio: "EUA (1918–2020) — matemática negra da NASA, calculou trajetórias espaciais." },
    { nome: "Joy Buolamwini", bio: "Gana/EUA — cientista da computação, fundadora da Algorithmic Justice League e autora do estudo Gender Shades (viés racial e de gênero no reconhecimento facial)." },
    { nome: "Nina da Hora", bio: "Brasil — cientista da computação e hacker, pesquisa racismo algorítmico." },
    { nome: "Silvana Bahia", bio: "Brasil — pesquisadora e ativista, cofundadora do PretaLab/Olabi, inclusão de mulheres negras na tecnologia." },
    { nome: 'Veronyka "Travahacker" Gimenes', bio: "Brasil — hacker e ativista, cofundadora da Código Não Binário; atua em IA, soberania digital e autonomia tecnológica." },
    { nome: "Mariéme Jamme", bio: "Senegal/Reino Unido — empreendedora, fundadora do IAMTHEMOB e do movimento 'I Am the Code'." },
    { nome: "Danielle Boyer", bio: "EUA (Ojibwe) — inventora e roboticista indígena, fundadora da The STEAM Connection." }
  ],

  /* Mapa temático: cada codinome recebe a missão que dialoga com sua história.
     Usado como padrão quando os codinomes-padrão estão na lista. */
  /* Mapa temático (versão de teste: apenas os desafios C, 3 por desafio).
     Cada codinome recebe um dos desafios C1/C2/C3. */
  mapaTematico: [
    { nome: "Ada Lovelace", papelId: "C1" },
    { nome: "Hedy Lamarr", papelId: "C1" },
    { nome: "Katherine Johnson", papelId: "C1" },
    { nome: "Joy Buolamwini", papelId: "C2" },
    { nome: "Nina da Hora", papelId: "C2" },
    { nome: "Silvana Bahia", papelId: "C2" },
    { nome: "Danielle Boyer", papelId: "C3" },
    { nome: "Mariéme Jamme", papelId: "C3" },
    { nome: 'Veronyka "Travahacker" Gimenes', papelId: "C3" }
  ],

  /* Preferência de missão por dimensão — usada para atribuir o codinome
     a partir do resultado do autodiagnóstico (a aluna recebe a missão que
     dialoga com a sua prioridade). A atribuição garante codinomes únicos. */
  afinidade: {
    M1: ["C1", "A2", "B2"],   // Ensino e Aprendizagem com Tecnologias
    M2: ["C2", "B1", "B2"],   // Cidadania Digital
    M3: ["A1", "C3", "B3"],   // Desenvolvimento Profissional
    U1: ["B3", "C3", "A2"],   // Mentalidade centrada no ser humano
    U2: ["B1", "C2", "B2"],   // Ética da IA
    U3: ["A1", "A2", "A3"],   // Fundamentos e aplicações
    U4: ["C1", "B2", "A2"],   // Pedagogia de IA
    U5: ["A1", "C3", "B2"]    // IA para o desenvolvimento profissional
  },

  /* Links para a aluna REALIZAR cada missão (ferramentas e fontes). */
  linksAtividade: {
    A1: [["Abrir a IA (DuckDuckGo)", "https://duck.ai"], ["Verificar uma data/artigo (Google Acadêmico)", "https://scholar.google.com"]],
    A2: [["Abrir a IA (DuckDuckGo)", "https://duck.ai"], ["Marco de IA para professores (UNESCO)", "https://unesdoc.unesco.org/ark:/48223/pf0000394280_por"]],
    A3: [["Abrir a IA (DuckDuckGo)", "https://duck.ai"], ["Dados e ambiente (IBGE)", "https://www.ibge.gov.br"]],
    B1: [["Abrir a IA (DuckDuckGo)", "https://duck.ai"], ["Buscar estudos de viés (SciELO)", "https://www.scielo.br"]],
    B2: [
      ["Sem cadastro: DuckDuckGo AI Chat", "https://duck.ai"],
      ["Sem cadastro: Qwen Chat (aberto)", "https://chat.qwen.ai/"],
      ["Código aberto: DeepSeek", "https://chat.deepseek.com/"],
      ["Big tech: Gemini", "https://gemini.google.com/"],
      ["Big tech: ChatGPT", "https://chatgpt.com/"],
      ["Big tech: Copilot", "https://copilot.microsoft.com/"],
      ["Verificar referências (SciELO)", "https://www.scielo.br"]
    ],
    B3: [["Abrir a IA (DuckDuckGo)", "https://duck.ai"], ["Buscar 'ghost work' (Google Acadêmico)", "https://scholar.google.com"]],
    C1: [["Duck.ai", "https://duck.ai/"], ["chatAI", "https://chatai.org/pt"]],
    C2: [["Duck.ai", "https://duck.ai/"], ["chatAI", "https://chatai.org/pt"]],
    C3: [["TybyrIA / Código Não Binário", "https://codigonaobinario.org/"], ["Tradução aberta (LibreTranslate)", "https://libretranslate.com/"], ["Marco de IA para professores (UNESCO)", "https://unesdoc.unesco.org/ark:/48223/pf0000394280_por"]]
  },

  /* Link do documento-base de cada papel (o "Documento para ler antes"). */
  docLinks: {
    A1: ["História da IA (Wikipédia)", "https://pt.wikipedia.org/wiki/Hist%C3%B3ria_da_intelig%C3%AAncia_artificial"],
    A2: ["Marco de IA para professores (UNESCO)", "https://unesdoc.unesco.org/ark:/48223/pf0000394280_por"],
    A3: ["Estudos sobre energia/água da IA (Google Acadêmico)", "https://scholar.google.com/scholar?q=energy+water+consumption+AI+data+centers"],
    B1: ["Gender Shades — Buolamwini & Gebru (2018)", "https://proceedings.mlr.press/v81/buolamwini18a.html"],
    B2: ["Guia de IA generativa na educação (UNESCO, 2023)", "https://unesdoc.unesco.org/ark:/48223/pf0000390241"],
    B3: ["'Ghost work' e colonialismo de dados (Google Acadêmico)", "https://scholar.google.com/scholar?q=ghost+work+Gray+Suri+data+colonialism"],
    C1: ["Inteligência Artificial na Educação Básica", "https://www.gov.br/mec/pt-br/referencial-de-ia-na-educacao"],
    C2: ["Referencial de IA na Educação", "https://www.gov.br/mec/pt-br/referencial-de-ia-na-educacao/referencial-ia-na-educacao"],
    C3: ["Código Não Binário", "https://codigonaobinario.org/"]
  },

  /* Recursos de apoio por dimensão (aparecem em QR Code no resultado do
     autodiagnóstico, ligados às fragilidades identificadas). */
  recursos: {
    M1: { txt: "Matriz de Saberes Digitais Docentes (MEC, 2024).", url: "https://www.gov.br/mec/pt-br/escolas-conectadas/arquivos/saberes-digitais.pdf" },
    M2: { txt: "ANPD — proteção de dados e cidadania digital (LGPD).", url: "https://www.gov.br/anpd/pt-br" },
    M3: { txt: "Formação continuada e cursos na AVAMEC (MEC).", url: "https://avamec.mec.gov.br/#/autodiagnostico" },
    U1: { txt: "Marco de competências em IA para professores (UNESCO, 2024).", url: "https://unesdoc.unesco.org/ark:/48223/pf0000394280_por" },
    U2: { txt: "Código Não Binário — ética, soberania digital e TybyrIA.", url: "https://codigonaobinario.org/" },
    U3: { txt: "Fundamentos e aplicações — Marco de IA para professores (UNESCO).", url: "https://unesdoc.unesco.org/ark:/48223/pf0000394280_por" },
    U4: { txt: "Referencial de IA na Educação (MEC).", url: "https://www.gov.br/mec/pt-br/referencial-de-ia-na-educacao" },
    U5: { txt: "Formação continuada e cursos na AVAMEC (MEC).", url: "https://avamec.mec.gov.br/#/autodiagnostico" }
  },

  /* -----------------------------------------------------------------
     EXPLORAÇÃO MEDIADA — tarefa prévia personalizada por nível + interesse
     ----------------------------------------------------------------- */
  interesses: [
    { id: "ling", nome: "Línguas e Humanidades", contexto: "textos, literatura, história, redação, interpretação",
      assunto: "um tema de línguas/humanidades (ex.: leitura na escola, uma obra, um período histórico)",
      artefato: "um trecho de texto, notícia, poema ou documento histórico",
      fonte: "SciELO, Biblioteca Nacional ou acervo em domínio público",
      exemplo: "Peça a análise de um trecho e confronte com a crítica especializada." },
    { id: "cie", nome: "Ciências da Natureza e Saúde", contexto: "artigos, dados experimentais, saúde, biologia, química, física",
      assunto: "um conceito das ciências/saúde (ex.: vacinação, fotossíntese, um exame)",
      artefato: "um artigo, notícia científica ou conjunto de dados",
      fonte: "SciELO, PubMed ou portal de periódicos (CAPES)",
      exemplo: "Peça a explicação de um conceito e verifique em um artigo científico." },
    { id: "mat", nome: "Matemática, Dados e Tecnologias", contexto: "resolução de problemas, estatística, programação, análise de dados",
      assunto: "um problema, uma análise estatística ou um trecho de código",
      artefato: "um problema, uma planilha ou um conjunto de dados",
      fonte: "IBGE, Base dos Dados ou uma calculadora/planilha",
      exemplo: "Peça a resolução de um problema e confira passo a passo." },
    { id: "edu", nome: "Educação, Didática e Avaliação", contexto: "planos de aula, avaliação, feedback, metodologias",
      assunto: "uma estratégia de ensino, avaliação ou feedback",
      artefato: "um plano de aula, um item de prova ou um roteiro de atividade",
      fonte: "MEC/BNCC, MEC (Referencial de IA) ou artigos de educação",
      exemplo: "Peça um plano de aula e critique o que falta para ser 'seu'." },
    { id: "inc", nome: "Inclusão e Acessibilidade", contexto: "adaptação de materiais, tecnologias assistivas, desenho universal",
      assunto: "uma barreira de aprendizagem ou de acesso",
      artefato: "um material didático a adaptar (texto, imagem, aula)",
      fonte: "MEC, diretrizes de acessibilidade (desenho universal)",
      exemplo: "Peça a adaptação de um material e avalie a acessibilidade." },
    { id: "art", nome: "Artes, Cultura e Patrimônio", contexto: "criação, imagens, música, patrimônio, curadoria",
      assunto: "um tema de artes/cultura (ex.: um movimento, uma obra, patrimônio local)",
      artefato: "uma obra, roteiro, imagem ou proposta criativa",
      fonte: "Domínio Público, museus ou acervos culturais",
      exemplo: "Peça um roteiro/descrição criativa e analise estereótipos." },
    { id: "pes", nome: "Pesquisa acadêmica e metodologia", contexto: "revisão de literatura, escrita, metodologia, referências",
      assunto: "um recorte da sua pesquisa (pergunta, método ou referencial)",
      artefato: "um artigo, uma referência ou um trecho da sua revisão",
      fonte: "SciELO, Google Acadêmico ou Portal de Periódicos (CAPES)",
      exemplo: "Peça referências sobre seu tema e verifique se existem." }
  ],
  exploracoesNivel: {
    adquirir: {
      titulo: "Primeiro contato mediado",
      objetivo: "Fazer um primeiro contato crítico com a IA, aplicado a um caso real do seu tema, com verificação.",
      ferramenta: "DuckDuckGo AI Chat (sem login, no navegador)",
      base: "Base: UNESCO (2024), atividade contextual 'Desmistificar a IA' e 'Destacar os riscos'.",
      antes: [
        "SEM IA, escreva em 3 linhas o que você já sabe e onde acha que a IA falha em [[assunto]].",
        "Escolha [[artefato]] — um caso real seu.",
        "Defina UMA pergunta que você quer responder."
      ],
      durante: [
        "Peça à IA uma explicação simples sobre [[assunto]].",
        "Peça um exemplo aplicado a [[artefato]].",
        "Peça uma fonte ou referência concreta (autor, ano).",
        "Peça o contrário: um argumento que critique a própria resposta.",
        "Copie o prompt e a resposta de cada passo no seu Diário de Bordo."
      ],
      depois: [
        "Escolha UMA afirmação e verifique em fonte independente ([[fonte]]).",
        "Marque 1 erro, omissão ou exagero.",
        "Escreva sua decisão: usaria? como? o que mudaria?"
      ],
      perguntas: [
        "O que te surpreendeu? Em que momento você confiou — e por quê?",
        "O que você fez que a IA não faria sozinha?"
      ],
      produto: "FICHA (1 página): o caso de partida, 1 acerto, 1 erro verificado (com a fonte) e 1 decisão.",
      criterios: ["Usei um caso real do meu tema", "Verifiquei em fonte independente", "Registrei o prompt e a resposta"]
    },
    aprofundar: {
      titulo: "Exploração com critério",
      objetivo: "Resolver um problema real do seu tema com a IA, comparando ferramentas, verificando e mantendo autoria.",
      ferramenta: "DuckDuckGo AI Chat + uma segunda ferramenta aberta/brasileira (ex.: Sabiá) para comparar",
      base: "Base: UNESCO (2024), 'Adoção de perspectiva em dilemas éticos' e 'Percepções sobre pressupostos das ferramentas'; MEC, saber 'Uso Crítico'.",
      antes: [
        "Escolha um problema real em [[assunto]] (ex.: planejar, revisar, analisar, avaliar algo).",
        "Escreva 3 critérios de um bom resultado (o que o tornaria útil e confiável)."
      ],
      durante: [
        "Enquadre o prompt com contexto, público e objetivo, usando [[artefato]].",
        "Gere a 1ª versão; depois peça uma variação.",
        "Faça a mesma pergunta em outra ferramenta (ex.: Sabiá) e compare.",
        "Procure viés, generalizações e estereótipos.",
        "Verifique as afirmações em [[fonte]].",
        "Reescreva com a sua voz (autoria)."
      ],
      depois: [
        "Monte uma matriz: critério × resultado × confiança (alta/média/baixa).",
        "Anote onde a IA ajudou e onde empurrou para o genérico.",
        "Decida o que delegar em parte e justifique."
      ],
      perguntas: [
        "Onde a IA foi realmente útil e onde só pareceu fluente?",
        "Que parte da tarefa você não delegaria de jeito nenhum?"
      ],
      produto: "MINI-RELATO (1 página): prompt final, antes/depois, verificação (com a fonte) e decisão justificada.",
      criterios: ["Apliquei a um problema real", "Comparei 2 ferramentas", "Verifiquei e reescrevi com autoria"]
    },
    criar: {
      titulo: "Criação, soberania e autoria",
      objetivo: "Co-criar um artefato do seu tema, documentando o fluxo dos dados, os riscos e as salvaguardas.",
      ferramenta: "DuckDuckGo AI Chat + uma alternativa aberta/brasileira (ex.: Sabiá) — tudo no navegador, sem instalar",
      base: "Base: UNESCO (2024), 'IA centrada no ser humano' e 'Determinação humana'; MEC, 'Uso Responsável' e 'Análise de dados'.",
      antes: [
        "Defina o artefato a criar em [[assunto]] (ex.: material, roteiro, análise) e seus critérios.",
        "Mapeie o fluxo de dados: o que sairia da sua máquina e para onde."
      ],
      durante: [
        "Co-crie o artefato iterando com a IA, a partir de [[artefato]].",
        "Teste com um colega e registre o feedback.",
        "Compare usando uma alternativa aberta/brasileira (ex.: Sabiá).",
        "Documente cada decisão e correção."
      ],
      depois: [
        "Avalie o artefato contra os critérios definidos.",
        "Registre o uso (ferramenta, verificação, autoria).",
        "Proponha 1 princípio ou política de uso soberano."
      ],
      perguntas: [
        "O que do artefato é irredutivelmente seu?",
        "O que você mudaria para reduzir a dependência de big techs?"
      ],
      produto: "ARTEFATO + registro de uso (ferramenta, verificação, autoria) + 1 princípio proposto.",
      criterios: ["Criei algo original do meu tema", "Documentei verificação e autoria", "Propús uma medida de soberania"]
    }
  },

  links: {
    autodiagnosticoMEC: "https://avamec.mec.gov.br/#/autodiagnostico",
    referencialMEC: "https://www.gov.br/mec/pt-br/referencial-de-ia-na-educacao",
    matrizSaberesMEC: "https://www.gov.br/mec/pt-br/escolas-conectadas/arquivos/saberes-digitais.pdf",
    marcoUNESCO: "https://unesdoc.unesco.org/ark:/48223/pf0000394280_por",
    codigoNaoBinario: "https://codigonaobinario.org/",
    tybyria: "https://codigonaobinario.org/produtos/",
    unesco: "https://www.unesco.org/pt/artificial-intelligence",
    lgpd: "https://www.gov.br/anpd/pt-br",
    scielo: "https://www.scielo.br/",
    dominioPublico: "https://www.dominiopublico.gov.br/",
    planalto: "https://www.planalto.gov.br/"
  },

  /* -----------------------------------------------------------------
     9 PAPÉIS (JIGSAW) — 3 temas x 3
     Cada papel = 1 documento + 1 IA diferente + 1 missão de exploração
     ----------------------------------------------------------------- */
  papeis: [
    /* ============ TEMA A — ORIGENS, TIPOS E INFRAESTRUTURA ============ */
    {
      id: "A1",
      tema: "A",
      temaNome: "IA: origens, tipos e infraestrutura",
      titulo: "A linha do tempo e o hype",
      doc: "Linha do tempo da IA: Turing (1950), Dartmouth (1956), ELIZA (1966), Weizenbaum (1976), invernos da IA, Deep Blue (1997), AlexNet (2012), Transformer (2017), ChatGPT (2022).",
      docFonte: "Turing (1950); Weizenbaum, Computer Power and Human Reason (1976); verbetes de história da IA.",
      ia: "DuckDuckGo AI Chat — modelo Llama",
      missao: [
        "Peça à IA uma linha do tempo da história da IA, com datas.",
        "Marque 1 fato que você conhece e 1 afirmação que parece EXAGERO (hype).",
        "Verifique UMA data em fonte independente (SciELO, enciclopédia ou artigo).",
        "Anote onde a IA errou, omitiu ou exagerou."
      ],
      pergunta: "Por que a história da IA tem ciclos de euforia e 'inverno'? O que isso ensina sobre as promessas de hoje?",
      produto: "LINHA DO TEMPO corrigida (com a data verificada e a fonte) + 1 exagero desmontado.",
      base: "Base: UNESCO (2024) — 'Desmistificar a IA'.",
      criterios: ["Verifiquei 1 data em fonte independente", "Identifiquei 1 exagero (hype)", "Registrei a fonte corrigida"],
      dica: "Se o modelo travar, use a linha do tempo do conteúdo teórico (arquivo 03) e faça a verificação das datas."
    },
    {
      id: "A2",
      tema: "A",
      temaNome: "IA: origens, tipos e infraestrutura",
      titulo: "Os quatro andares da IA",
      doc: "Tipos de IA: preditiva (prevê/classifica), generativa (cria conteúdo), agêntica (planeja e age) e infraestrutura (chips, nuvem, dados, energia, água, minérios).",
      docFonte: "Conteúdo teórico da oficina (arquivo 03).",
      ia: "DuckDuckGo AI Chat — experimente dois modelos e compare (ex.: Llama e Mistral)",
      missao: [
        "No DuckDuckGo AI Chat, troque entre dois modelos (ex.: Llama e Mistral) e note as diferenças.",
        "Dê 4 exemplos do seu cotidiano, um por tipo: preditiva, generativa, agêntica, infraestrutura.",
        "Peça à IA para classificar seus exemplos e compare com a sua classificação.",
        "Responda: onde está a 'inteligência' — no modelo, nos dados ou na infraestrutura?"
      ],
      pergunta: "Onde está a inteligência: no modelo, nos dados ou na infraestrutura?",
      produto: "TABELA com 4 exemplos, o tipo e a sua classificação crítica.",
      base: "Base: MEC (2024) — saber 'Análise de dados'; UNESCO (2024) — 'Fundamentos e aplicações'.",
      criterios: ["Dei 1 exemplo de cada tipo", "Comparei 2 modelos", "Justifiquei onde está a 'inteligência'"],
      dica: "Se a ferramenta falhar, use as fichas de fallback (saídas pré-gravadas) e discuta com o conteúdo teórico do arquivo 03."
    },
    {
      id: "A3",
      tema: "A",
      temaNome: "IA: origens, tipos e infraestrutura",
      titulo: "A nuvem tem peso",
      doc: "Infraestrutura da IA: data centers, consumo de energia e água para resfriamento, mineração de lítio/cobalto, lixo eletrônico e concentração em poucas empresas.",
      docFonte: "Textos jornalísticos e relatórios sobre pegada ambiental da IA (verifique as fontes).",
      ia: "DuckDuckGo AI Chat — modelo Mistral",
      missao: [
        "Pergunte à IA quanta água/energia consome uma resposta dela.",
        "Desconfie do número exato e confronte com 1 fonte independente (reportagem/relatório).",
        "Estime a ordem de grandeza para 10 prompts seus.",
        "Escreva 2 frases sobre quando o custo ambiental NÃO compensa."
      ],
      pergunta: "Qual o custo ambiental de uma resposta que eu poderia ter resolvido sem IA?",
      produto: "FICHA 'conta da nuvem': número, fonte e regra de uso.",
      base: "Base: UNESCO (2024) — 'sustentabilidade' e 'IA centrada no ser humano'.",
      criterios: ["Trouxe 1 fonte independente", "Pensei em ordem de grandeza", "Escrevi 1 regra de uso"],
      dica: "Números de consumo variam muito; o objetivo é pensar em ordem de grandeza, não em precisão falsa."
    },

    /* ================ TEMA B — DESAFIOS CRÍTICOS ================ */
    {
      id: "B1",
      tema: "B",
      temaNome: "Desafios críticos",
      titulo: "Quem está no espelho? (viés)",
      doc: "Viés algorítmico: dados de treino refletem e amplificam desigualdades de raça, gênero, classe e região. Casos de reconhecimento facial com erro no Brasil.",
      docFonte: "Buolamwini & Gebru, Gender Shades (2018); reportagens sobre reconhecimento facial no Brasil.",
      ia: "DuckDuckGo AI Chat — modelo GPT-4o mini",
      missao: [
        "Peça à IA uma estória/descrição curta sobre uma profissão ou grupo (ex.: 'uma família nordestina').",
        "Circule adjetivos e marcadores de raça, classe, gênero e região.",
        "Peça de novo exigindo retrato não estereotipado, com agência e diversidade.",
        "Compare o antes e o depois e nomeie o viés encontrado."
      ],
      pergunta: "Quem aparece como 'normal' e quem aparece como 'problema'? O viés vem do modelo, dos dados ou de nós?",
      produto: "ANTES e DEPOIS com os marcadores circulados + 1 frase sobre o viés.",
      base: "Base: UNESCO (2024) — 'não discriminação' e 'Adoção de perspectiva'; Buolamwini & Gebru (2018).",
      criterios: ["Identifiquei marcadores de viés", "Intervi no prompt", "Comparei antes/depois"],
      dica: "Não reproduza conteúdo ofensivo: o objetivo é diagnosticar o viés, não reforçá-lo."
    },
    {
      id: "B2",
      tema: "B",
      temaNome: "Desafios críticos",
      titulo: "A resposta convincente e falsa (alucinação)",
      doc: "Alucinação e caixa preta: o modelo estima a palavra provável, não 'sabe' fatos; gera citações, leis e referências inexistentes de forma fluente e opaca.",
      docFonte: "Conteúdo teórico da oficina (arquivo 03).",
      ia: "Compare 3 IAs: (1) sem cadastro — DuckDuckGo AI Chat e Qwen Chat; (2) big tech — Gemini, ChatGPT ou Copilot; (3) código aberto — DeepSeek.",
      missao: [
        "Escolha 3 IAs, uma de cada categoria (sem cadastro / big tech / código aberto).",
        "Peça a MESMA referência acadêmica nas três (autor, ano, título).",
        "Aprofunde: peça DOI, página e revista.",
        "VERIFIQUE no Google Acadêmico/SciELO se a referência existe em cada caso.",
        "Registre a 'certidão de alucinação' apontando em qual IA o erro apareceu."
      ],
      pergunta: "Por que a resposta falsa parecia tão convincente — e por que as IAs diferem?",
      produto: "CERTIDÃO DE ALUCINAÇÃO: 3 IAs comparadas, o que era falso (por IA) e a fonte correta.",
      base: "Base: UNESCO (2023) — verificação; MEC (2024) — 'Uso Crítico'.",
      criterios: ["Comparei 3 IAs de categorias diferentes", "Verifiquei a referência", "Informei a fonte correta"],
      dica: "Algumas IAs de big tech (Gemini, ChatGPT, Copilot) podem pedir conta; as sem cadastro (DuckDuckGo, Qwen) não. Compare as duas realidades."
    },
    {
      id: "B3",
      tema: "B",
      temaNome: "Desafios críticos",
      titulo: "Quem trabalha para a IA funcionar?",
      doc: "Precarização e colonialismo de dados: trabalho de anotação, moderação de conteúdo e 'ghost work' — invisível, mal pago e terceirizado no Sul global.",
      docFonte: "Gray & Suri, Ghost Work (2019); Couldry & Mejias, colonialismo de dados (2019).",
      ia: "DuckDuckGo AI Chat — modelo Mistral (diferente do usado no papel A2)",
      missao: [
        "Pergunte à IA 'quem treina e modera os sistemas de IA e onde estão essas pessoas?'.",
        "Compare com Gray & Suri (ghost work) e com o colonialismo de dados.",
        "Liste 3 perguntas para fazer antes de assinar um serviço de IA.",
        "Discuta: a IA é neutra sobre o próprio trabalho?"
      ],
      pergunta: "Quem paga o custo humano da IA — e sob quais condições de trabalho?",
      produto: "LISTA de 3 perguntas de 'due diligence' + 3 linhas de reflexão.",
      base: "Base: UNESCO (2024) — 'ética' e 'sustentabilidade'; Gray & Suri (2019); Couldry & Mejias (2019).",
      criterios: ["Relacionei com 'ghost work'", "Escrevi 3 perguntas", "Refleti sobre a neutralidade"],
      dica: "A IA pode não conhecer essas fontes; a comparação com a leitura é o ponto principal."
    },

    /* ============ TEMA C — MARCOS, SOBERANIA E BRASIL ============ */
    {
      id: "C1",
      tema: "C",
      temaNome: "Documentos orientadores",
      titulo: "Construindo referências: IA na Educação Básica",
      doc: "Para esta missão, consulte um documento orientador do Ministério da Educação sobre o uso de IA na Educação: Inteligência Artificial na Educação Básica (https://www.gov.br/mec/pt-br/escolas-conectadas/arquivos/ia-basica.pdf).",
      docFonte: "https://www.gov.br/mec/pt-br/escolas-conectadas/arquivos/ia-basica.pdf",
      ia: "Use recursos de IA que você já conhece. Para explorar outros modelos: Duck.ai (https://duck.ai/) e chatAI (https://chatai.org/pt).",
      missao: [
        "Localize no documento 3 princípios que deveriam orientar o uso de IA.",
        "Peça à IA um resumo de um trecho e confira se é fiel ao documento.",
        "Use o mesmo prompt em outro modelo de IA e compare as respostas.",
        "Explore a multimodalidade: verifique quais outras modalidades esses modelos permitem gerar (ex.: áudio, vídeo, imagem).",
        "Escolha um aspecto ou pergunta sobre o documento e peça ao(s) modelo(s) que gere(m) um novo texto.",
        "Analise o resultado, as limitações (uso de tokens/créditos, verificabilidade) e as possibilidades de uso.",
        "Proponha uma atividade ou uso das ferramentas de IA que você explorou e que acredita ser possível integrar no seu dia a dia."
      ],
      pergunta: "Segundo os documentos orientadores, de que forma a IA entra na Educação Básica brasileira?",
      produto: "Escreva uma síntese com suas observações e/ou compartilhe em um documento de texto o resultado da sua atividade.",
      base: "MEC — Inteligência Artificial na Educação Básica.",
      criterios: [
        "Analisei o documento antes de fazer uso de IA",
        "Explorei mais de um modelo de IA",
        "Explorei a multimodalidade da(s) ferramenta(s) de IA analisada(s)",
        "Chequei os resultados gerados pela IA",
        "Pensei em um exemplo de uso no meu cotidiano"
      ],
      dica: "A ferramenta chatAI não preserva o histórico da conversa ao alternar os modelos. Caso deseje utilizá-la, copie a resposta antes de trocar o modelo."
    },
    {
      id: "C2",
      tema: "C",
      temaNome: "Documentos orientadores",
      titulo: "Referencial para desenvolvimento e uso de IA na Educação",
      doc: "Para esta missão, consulte um documento orientador do Ministério da Educação sobre o uso de IA na Educação: Referencial para desenvolvimento e uso responsáveis de Inteligência Artificial na Educação (https://www.gov.br/mec/pt-br/referencial-de-ia-na-educacao/referencial-ia-na-educacao).",
      docFonte: "https://www.gov.br/mec/pt-br/referencial-de-ia-na-educacao/referencial-ia-na-educacao",
      ia: "Use recursos de IA que você já conhece. Para explorar outros modelos: Duck.ai (https://duck.ai/) e chatAI (https://chatai.org/pt).",
      missao: [
        "Localize no documento 3 princípios que deveriam orientar o uso de IA.",
        "Peça à IA um resumo de um trecho e confira se é fiel ao documento.",
        "Use o mesmo prompt em outro modelo de IA e compare as respostas.",
        "Explore a multimodalidade: verifique quais outras modalidades esses modelos permitem gerar (ex.: áudio, vídeo, imagem).",
        "Escolha um aspecto ou pergunta sobre o documento e peça ao(s) modelo(s) que gere(m) um novo texto.",
        "Analise o resultado, as limitações (uso de tokens/créditos, verificabilidade) e as possibilidades de uso.",
        "Proponha uma atividade ou uso das ferramentas de IA que você explorou e que acredita ser possível integrar no seu dia a dia."
      ],
      pergunta: "Segundo os documentos orientadores, de que forma a IA entra na Educação Básica brasileira?",
      produto: "Escreva uma síntese com suas observações e/ou compartilhe em um documento de texto o resultado da sua atividade.",
      base: "MEC — Referencial de IA na Educação.",
      criterios: [
        "Analisei o documento antes de fazer uso de IA",
        "Explorei mais de um modelo de IA",
        "Explorei a multimodalidade da(s) ferramenta(s) de IA analisada(s)",
        "Chequei os resultados gerados pela IA",
        "Pensei em um exemplo de uso no meu cotidiano"
      ],
      dica: "A ferramenta chatAI não preserva o histórico da conversa ao alternar os modelos. Caso deseje utilizá-la, copie a resposta antes de trocar o modelo."
    },
    {
      id: "C3",
      tema: "C",
      temaNome: "Documentos orientadores",
      titulo: "Soberania e o que é nosso",
      doc: "Soberania digital: PBIA (Plano Brasileiro de IA), software livre, dados abertos e a Código Não Binário — organização brasileira que criou a TybyrIA, IA aberta de combate ao ódio anti-LGBTQIA+.",
      docFonte: "MCTI/PBIA; codigonaobinario.org; Núcleo Digital.",
      ia: "TybyrIA (Código Não Binário) ou LibreTranslate (tradução aberta)",
      missao: [
        "Explore a Código Não Binário e a TybyrIA: o que as torna 'soberanas'?",
        "Desenhe o fluxo dos dados: máquina → domínio → país/empresa → quem usa.",
        "Compare com uma alternativa aberta/brasileira (ex.: Sabiá): o que muda no fluxo?",
        "Proponha uma alternativa aberta/brasileira para uma tarefa sua."
      ],
      pergunta: "Quanta soberania eu tenho sobre o que digito? Como migrar para alternativas abertas?",
      produto: "DIAGRAMA do fluxo de dados + 1 alternativa soberana proposta.",
      base: "Base: UNESCO (2024) — 'determinação humana'; PBIA; Código Não Binário.",
      criterios: ["Desenhei o fluxo dos dados", "Comparei com alternativa aberta", "Propús 1 alternativa soberana"],
      dica: "A TybyrIA pode não ter demo pública no dia; use a leitura do site e o LibreTranslate como prática."
    }
  ],

  /* -----------------------------------------------------------------
     AUTODIAGNÓSTICO DE SABERES EM IA (inspirado no autodiagnóstico do MEC)
     ----------------------------------------------------------------- */
  quiz: {
    escala: [
      { v: 0, label: "Não tenho a menor ideia" },
      { v: 1, label: "Não sei" },
      { v: 2, label: "Mais ou menos" },
      { v: 3, label: "Consigo me virar" },
      { v: 4, label: "Sim! Sei e muito bem" }
    ],
    blocos: [
      { id: "MEC", nome: "Saberes Digitais Docentes (MEC)",
        fonte: "Matriz de Saberes Digitais Docentes — MEC (2024)",
        desc: "Três dimensões e 10 saberes docentes, com descritores de Compreensão e Prática. A IA aparece de modo transversal (análise de dados, prática inclusiva e inovação)." },
      { id: "UNESCO", nome: "Uso de IA na Educação (UNESCO)",
        fonte: "Marco referencial de competências em IA para professores — UNESCO (2024)",
        desc: "Cinco dimensões de competência em IA, em três níveis de progressão." }
    ],
    dimensoes: [
      { id: "M1", bloco: "MEC", nome: "Ensino e Aprendizagem com Tecnologias Digitais", cor: "#2563eb",
        desc: "Integração das tecnologias digitais às estratégias de ensino e aprendizagem, à produção/criação de conteúdos, à geração e gestão de dados e às práticas inclusivas. Saberes: Prática Pedagógica, Curadoria e Criação, Análise de dados, Prática Inclusiva." },
      { id: "M2", bloco: "MEC", nome: "Cidadania Digital", cor: "#0891b2",
        desc: "Responsabilidades e comportamentos éticos no uso de tecnologias e na convivência digital, e consciência dos impactos do uso excessivo na saúde mental e no bem-estar. Saberes: Uso Responsável, Uso Seguro, Uso Crítico." },
      { id: "M3", bloco: "MEC", nome: "Desenvolvimento Profissional", cor: "#6366f1",
        desc: "Adoção de recursos, tecnologias digitais e ambientes virtuais para formação contínua e inovação; comunidades de aprendizagem; uso de recursos digitais para organização e planejamento. Saberes: Formação Continuada, Comunicação e Colaboração, Gestão com recursos digitais." },
      { id: "U1", bloco: "UNESCO", nome: "Mentalidade centrada no ser humano", cor: "#9333ea",
        desc: "Usar a IA como meio, preservando autonomia, inclusão, bem-estar e sustentabilidade." },
      { id: "U2", bloco: "UNESCO", nome: "Ética da IA", cor: "#db2777",
        desc: "Transparência, responsabilidade, justiça, privacidade e mitigação de vieses e riscos." },
      { id: "U3", bloco: "UNESCO", nome: "Fundamentos e aplicações da IA", cor: "#ea580c",
        desc: "O que a IA faz, como funciona, seus tipos, capacidades e limites." },
      { id: "U4", bloco: "UNESCO", nome: "Pedagogia com IA", cor: "#e11d48",
        desc: "Integrar a IA ao ensino, à aprendizagem e à avaliação com intenção pedagógica." },
      { id: "U5", bloco: "UNESCO", nome: "IA para o desenvolvimento profissional", cor: "#0e7490",
        desc: "Usar a IA para a própria formação, colaboração e inovação, com autoria e critério." }
    ],
    itens: [
      { id: 1, d: "M1", saber: "SD 1.1 Prática Pedagógica", t: "Sei identificar e incorporar, com intencionalidade pedagógica, tecnologias digitais às estratégias de ensino, avaliação e experiências de aprendizagem." },
      { id: 2, d: "M1", saber: "SD 1.2 Curadoria e Criação", t: "Sei pesquisar, remixar, adaptar, criar e compartilhar conteúdos digitais para o planejamento e a aprendizagem." },
      { id: 3, d: "M1", saber: "SD 1.3 Análise de dados", t: "Sei analisar e interpretar dados (avaliações, gênero, raça etc.) para replanejar minhas ações pedagógicas." },
      { id: 4, d: "M1", saber: "SD 1.4 Prática Inclusiva", t: "Sei identificar tecnologias assistivas e desenhar estratégias e conteúdos acessíveis para a participação plena de todos." },
      { id: 5, d: "M2", saber: "SD 2.1 Uso Responsável", t: "Conheço e promovo aspectos legais e éticos (direitos autorais e de imagem, convivência) e o equilíbrio entre o tempo on-line e off-line." },
      { id: 6, d: "M2", saber: "SD 2.2 Uso Seguro", t: "Conheço estratégias e a legislação/documentos norteadores relacionados à proteção de dispositivos, dados, privacidade e identificação de ameaças on-line." },
      { id: 7, d: "M2", saber: "SD 2.3 Uso Crítico", t: "Sei avaliar a credibilidade e a confiabilidade de informações e desenvolver o pensamento crítico na interpretação de conteúdos." },
      { id: 8, d: "M3", saber: "SD 3.1 Formação Continuada", t: "Uso recursos e fontes digitais para a minha formação continuada e para a inovação pedagógica." },
      { id: 9, d: "M3", saber: "SD 3.2 Comunicação e Colaboração", t: "Participo de comunidades, ambientes virtuais e redes para colaborar e compartilhar conhecimentos e práticas." },
      { id: 10, d: "M3", saber: "SD 3.3 Gestão com recursos digitais", t: "Crio e uso ferramentas digitais para organizar, otimizar e planejar minha prática e tarefas administrativas." },

      { id: 11, d: "U1", saber: "UNESCO — Mentalidade centrada no ser humano", t: "Uso a IA como meio para fins educacionais, preservando o protagonismo e a autonomia humana." },
      { id: 12, d: "U1", saber: "UNESCO — Mentalidade centrada no ser humano", t: "Considero inclusão, bem-estar e sustentabilidade ao decidir usar IA." },
      { id: 13, d: "U2", saber: "UNESCO — Ética da IA", t: "Conheço e aplico princípios éticos de IA e a responsabilidade humana nas decisões." },
      { id: 14, d: "U2", saber: "UNESCO — Ética da IA", t: "Protejo dados, privacidade e direitos autorais e reconheço vieses e riscos, agindo para mitigá-los." },
      { id: 15, d: "U3", saber: "UNESCO — Fundamentos e aplicações", t: "Entendo como a IA funciona, conheço seus tipos, capacidades e entendo seus limites e desafios." },
      { id: 16, d: "U3", saber: "UNESCO — Fundamentos e aplicações", t: "Sei avaliar e verificar criticamente os resultados (saídas) de IA (alucinação, confiabilidade)." },
      { id: 17, d: "U4", saber: "UNESCO — Pedagogia de IA", t: "Sei integrar a IA ao ensino, à aprendizagem e à avaliação com um objetivo pedagógico claro." },
      { id: 18, d: "U4", saber: "UNESCO — Pedagogia de IA", t: "Sei orientar estudantes no uso crítico e responsável da IA." },
      { id: 19, d: "U5", saber: "UNESCO — Desenvolvimento profissional", t: "Uso IA para a minha formação e para colaborar e inovar, mantendo a autoria." },
      { id: 20, d: "U5", saber: "UNESCO — Desenvolvimento profissional", t: "Sei escolher quando NÃO usar IA e justificar minha decisão." }
    ],
    niveis: [
      { max: 20, nome: "Iniciante", cor: "#93c5fd", desc: "Tem pouco ou nenhum contato com IA na prática docente ou na pesquisa; precisa de apoio e de repertório para começar a usar com intenção." },
      { max: 40, nome: "Familiarização", cor: "#60a5fa", desc: "Conhece o básico e já experimentou; precisa de estímulo e de critérios para aplicar a IA de forma intencional e segura." },
      { max: 60, nome: "Adaptação", cor: "#3b82f6", desc: "Usa a IA com apoio e começa a adaptar; o foco agora é verificar, evitar vieses e manter a autoria." },
      { max: 80, nome: "Integração", cor: "#2563eb", desc: "Integra a IA com autonomia e critério em situações reais; aprofunde ética, avaliação e personalização." },
      { max: 100, nome: "Liderança", cor: "#1d4ed8", desc: "Domina, cria e orienta colegas; foque em soberania digital, políticas de uso e inovação responsável." }
    ],
    desafios: {
      M1: {
        adquirir: "Escolha uma aula sua e liste 3 momentos em que uma tecnologia digital ajudaria — e 1 em que atrapalharia. Justifique.",
        aprofundar: "Redesenhe uma atividade integrando um recurso digital, com critério de inclusão e um dado de acompanhamento.",
        criar: "Monte um banco de recursos digitais comentados para sua área, indicando quando usar e quando não usar."
      },
      M2: {
        adquirir: "Faça um cartaz de 'convivência digital' para sua turma com 5 combinados éticos e de segurança.",
        aprofundar: "Analise uma situação de conflito online (anonimizada) e proponha uma mediação formativa.",
        criar: "Crie um protocolo de cidadania digital e bem-estar (tempo de tela, privacidade) para a instituição."
      },
      M3: {
        adquirir: "Mapeie 3 fontes de formação (cursos/comunidades) e escolha uma para começar.",
        aprofundar: "Participe de uma comunidade ou evento e traga 1 prática para adaptar ao seu contexto.",
        criar: "Documente e compartilhe uma prática inovadora sua (relato ou mini-oficina entre pares)."
      },
      U1: {
        adquirir: "Reescreva uma tarefa sua deixando claro o papel da IA e o protagonismo humano.",
        aprofundar: "Compare uma atividade com e sem IA e decida, com critérios, qual preserva mais a autonomia.",
        criar: "Proponha um princípio institucional de 'IA centrada no ser humano' com 3 indicadores de prática."
      },
      U2: {
        adquirir: "Aplique o Protocolo de Uso Seguro a um prompt que você costuma usar e corrija o que for necessário.",
        aprofundar: "Faça uma avaliação de viés de uma saída de IA e proponha uma intervenção no prompt.",
        criar: "Elabore uma política de uso ético de IA para sua disciplina/laboratório, com LGPD e autoria."
      },
      U3: {
        adquirir: "Explique, em 5 linhas para um colega, o que a IA faz e por que pode errar (alucinação).",
        aprofundar: "Verifique 3 afirmações de uma IA em fontes independentes e registre o que era falso.",
        criar: "Organize um checklist de verificação para o seu campo e ensine a turma a usá-lo."
      },
      U4: {
        adquirir: "Planeje uma atividade de 20 min com IA e um objetivo de aprendizagem explícito.",
        aprofundar: "Use IA para apoiar avaliação formativa (ex.: feedback) e revise criticamente o que ela produz.",
        criar: "Desenhe uma sequência didática em que a IA é mediadora e os estudantes avaliam suas saídas."
      },
      U5: {
        adquirir: "Use uma IA para organizar sua revisão de literatura — e anote o que conferiu.",
        aprofundar: "Crie um fluxo pessoal de estudo/pesquisa com IA, declarando o uso e mantendo a autoria.",
        criar: "Facilite uma oficina curta para colegas sobre uso crítico de IA na sua área."
      }
    },
    /* Catálogo geral de desafios organizado POR NÍVEL (para a exploração mediada) */
    desafiosNivel: {
      adquirir: [
        { saber: "U3", t: "Explique, em 5 linhas, o que a IA faz e por que pode errar (alucinação)." },
        { saber: "M2", t: "Faça um cartaz de convivência digital (5 combinados éticos e de segurança) para sua turma." },
        { saber: "M1", t: "Liste 3 momentos em que a tecnologia digital ajuda uma aula sua — e 1 em que atrapalha." },
        { saber: "M3", t: "Mapeie 3 fontes de formação (cursos/comunidades) e escolha uma para começar." },
        { saber: "U1", t: "Reescreva uma tarefa sua deixando claro o papel da IA e o protagonismo humano." }
      ],
      aprofundar: [
        { saber: "M1", t: "Redesenhe uma atividade integrando um recurso digital, com critério de inclusão e um dado de acompanhamento." },
        { saber: "U2", t: "Faça uma avaliação de viés de uma saída de IA e proponha uma intervenção no prompt." },
        { saber: "U3", t: "Verifique 3 afirmações de uma IA em fontes independentes e registre o que era falso." },
        { saber: "U4", t: "Use IA para apoiar avaliação formativa (feedback) e revise criticamente o que ela produz." },
        { saber: "M3", t: "Participe de uma comunidade ou evento e traga 1 prática para adaptar ao seu contexto." }
      ],
      criar: [
        { saber: "M1", t: "Monte um banco de recursos digitais comentados para sua área, indicando quando usar e não usar." },
        { saber: "U2", t: "Elabore uma política de uso ético de IA para sua disciplina/laboratório, com LGPD e autoria." },
        { saber: "U4", t: "Desenhe uma sequência didática em que a IA é mediadora e os estudantes avaliam suas saídas." },
        { saber: "U5", t: "Facilite uma oficina curta para colegas sobre uso crítico de IA na sua área." },
        { saber: "M2", t: "Crie um protocolo de cidadania digital e bem-estar para a instituição." }
      ]
    },
    recomendacoes: {
      M1: "Bloco 4 e missões A2/A3.",
      M2: "Cidadania Digital (arquivo 05) e missão B1 (viés).",
      M3: "Jigsaw e comunidades — missão C1 (Referencial do MEC).",
      U1: "Critério 'não delegar o cognitivo' (arquivo 03, seção 6).",
      U2: "Missões B1 (viés) e B2 (verificação).",
      U3: "Missão A1 (linha do tempo) e E1 (alucinação).",
      U4: "Missão C1 (Referencial do MEC) e E4 (volumes).",
      U5: "Missão C3 (soberania) e assumir a autoria."
    }
  },

  /* -----------------------------------------------------------------
     MISSÕES DE EXPLORAÇÃO AVULSAS (gamificação / aquecimento)
     Para quem só quer "sortear uma missão" sem entrar no jigsaw.
     ----------------------------------------------------------------- */
  missoesAvulsas: [
    "Pesquise um número que a IA te deu e ache a fonte oficial que o confirma (ou desmente).",
    "Peça à IA para escrever sobre a sua cidade e circule tudo que estiver genérico ou errado.",
    "Gere a mesma pergunta em 2 ferramentas diferentes e aponte onde elas divergem.",
    "Peça um plano de aula e critique: o que falta para ser 'seu'?",
    "Peça uma referência acadêmica e verifique se ela existe.",
    "Peça uma imagem sobre 'educação brasileira' e analise os estereótipos.",
    "Traduza um trecho com IA aberta e compare com a tradução humana.",
    "Peça a definição de 'soberania digital' e confronte com a PBIA.",
    "Descreva um problema seu e peça 3 soluções; avalie os riscos de cada uma."
  ]
};

if (typeof window !== "undefined") { window.OFICINA = OFICINA; }
