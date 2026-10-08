/* =====================================================================
   CONFIGURAÇÃO DA OFICINA — edite este arquivo antes de publicar.
   Sem backend obrigatório: por padrão, a aluna copia um "código de entrega"
   e cola no AVA/Moodle. Opcionalmente, defina um endpoint para receber os
   resultados automaticamente (veja instruções abaixo).
   ===================================================================== */
window.OFICINA_CONFIG = {

  /* PRINCIPAL — URL do App da Web do Google Apps Script (veja apps-script/LEIA-ME.md).
     Se preenchido, cada entrega é gravada numa PLANILHA Google e também enviada
     por e-mail (MailApp). Tem prioridade sobre o Web3Forms (que fica como reserva).
     Cole aqui a URL que termina em /exec. */
  endpoint: "",

  /* (Opcional) URL do App da Web do Google Apps Script que TRAVA cada código
     de acesso como "usado uma vez" (veja apps-script/LEIA-ME.md).
     Se ficar vazio, o site resolve o codinome localmente (sem trava). */
  claimEndpoint: "",

  /* E-mail que recebe as entregas (referência). O envio é DIRETO: a aluna NÃO
     precisa abrir o e-mail dela. */
  emailProfessor: "cgervaz@proton.me",

  /* Web3Forms — envio direto por e-mail, SEM expor o endereço na página.
     1) Acesse https://web3forms.com e informe cgervaz@proton.me.
     2) Você recebe uma "Access Key" por e-mail — cole-a abaixo entre as aspas.
     3) Repubique: ./publicar.sh iagora-profe
     Enquanto estiver vazio, o site apenas copia o código de entrega. */
  web3formsKey: "1e804ec9-43a5-4689-bf0c-15c530f67d2c",

  /* (Alternativa) endpoint genérico que receba POST JSON (Apps Script etc.).
     Se preenchido, tem prioridade sobre o Web3Forms. */
  formEndpoint: "",

  /* URL pública do site (usada nas mensagens com o link da oficina).
     Atualize se mudar o nome do repositório. */
  siteURL: "https://cdlgervaz.github.io/iagora-profe",

  /* Exibir a etapa/aba "Jigsaw" para as alunas?
     false = oculta a aba, a seção do tutorial e o botão (os arquivos continuam no site,
     bastando voltar para true para reativar). */
  mostrarJigsaw: false,

  /* Exibir no RESULTADO do autodiagnóstico (site das alunas) as seções
     "Sua trilha de desafios", "Recursos para as suas fragilidades" e o
     "Bilhete de Saída"? false = oculta (o conteúdo continua no site). */
  mostrarDetalhesResultado: false,

  /* Exibir a etapa "Exploração mediada" na trilha/aba/tutorial e no resultado?
     false = oculta (o arquivo exploracao.html continua no site). */
  mostrarExploracao: false,

  /* Desafios (papéis) ativos nesta versão de teste. Só estes são atribuídos
     às alunas. Deixe vazio ([]) para usar todos. */
  papeisAtivos: ["C1", "C2", "C3"],

  /* Exibir a Missão ("Minha missão") para as alunas? false = oculta (o arquivo
     sorteio.html continua no site; reative com true). */
  mostrarMissao: false,

  /* Exibir a etapa "Leitura" para as alunas? */
  mostrarLeitura: true,

  /* (Opcional) identificação exibida nos bilhetes de saída/feedback */
  professora: "",
  contato: ""
};
