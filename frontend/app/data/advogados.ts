export interface Advogado {
  id: string;
  nome: string;
  titulo: string;
  imagem: string;
  descricao: string;
  email: string;
  sociais: {
    linkedin?: string;
    twitter?: string;
  };
  especializacoes: string[];
}

export const advogados: Advogado[] = [
  {
    id: "clodonil-monteiro",
    nome: "Clodonil Monteiro",
    titulo: "Advogado Fundador",
    imagem: "Clodonil.svg",
    descricao: "\Com ampla experiência na prática jurídica, formado em Direito pela Universidade tal e especialista em Direito Administrativo, lidera a implementação de processos estruturados, a gestão de equipes multidisciplinares e o aprimoramento contínuo dos serviços prestados, assegurando rigor jurídico, confidencialidade e resultados consistentes na defesa dos interesses confiados ao escritório.\"",
    email: "clodonil@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Administrativo",
      "Litígios de Servidores Públicos",
      "Consultoria Jurídica",
    ],
  },
  {
    id: "edjane-lucena",
    nome: "Edjane Lucena",
    titulo: "Advogada Fundadora",
    imagem: "edjane.svg",
    descricao: "\"Especialista em casos relacionados a servidores públicos, com experiência de mais de 15 anos em litígios complexos. Dedicada a proporcionar soluções jurídicas inovadoras e eficientes.\"",
    email: "edjane@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Administrativo",
      "Aposentadoria de Servidores",
      "Progressão Funcional",
      "Representação em Juizado",
    ],
  },
  {
    id: "laura-maria",
    nome: "Laura Maria",
    titulo: "Advogada Sócia",
    imagem: "lauraBG.png",
    descricao: "\Gestora Institucional Advogada inscrita na OAB/RN nº 22.620, formada em Direito pela Faculdade Católica Santa Teresinha (FCST) em 2024, com MBA em Gestão de Vendas. Atua como Gestora Institucional, com responsabilidade direta sobre o crescimento e a sustentabilidade do escritório, conduzindo estratégias voltadas à expansão institucional, fortalecimento da marca e posicionamento no mercado. Possui atuação estratégica junto às áreas Comercial, Jurídica e Administrativa, com foco na geração de resultados e no alinhamento entre operação e crescimento. No âmbito comercial, atua no apoio ao relacionamento institucional com clientes e no fortalecimento das iniciativas de expansão, contribuindo para o alinhamento estratégico e a consistência dos resultados do escritório. Com visão analítica e direcionamento estratégico, atua na construção de uma estrutura sólida, voltada à expansão consistente e ao fortalecimento do negócio. Atua na construção de operações estruturadas, com foco em eficiência, controle e crescimento sustentável.\"",
    email: "laura@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Público",
      "Defesa de Servidores",
      "Direito Administrativo",
    ],
  },
  {
    id: "diego-medeiros",
    nome: "Diego Medeiros",
    titulo: "Advogado Sócio",
    imagem: "diegoBG.png",
    descricao: "\Advogado inscrito na OAB/RN nº 22.969 e Sócio de Serviço do Clodonil Monteiro Advocacia. Bacharel em Direito pela Universidade Federal do Rio Grande do Norte - UFRN, é especialista em Direito Público e possui formação em Gestão Pública pela Fundação Getúlio Vargas - FGV, além de graduação em andamento em Administração pela UFRN. Integra o Grupo de Pesquisa Direito Administrativo Brasileiro (UFRN/CNPq) e é membro do Grupo de Estudos e Pesquisas em Finanças Públicas e Privadas (GEPEFIP), com atuação acadêmica nas áreas de Direito Administrativo, Finanças Públicas e Antropologia, incluindo produção científica publicada. No escritório, atua na supervisão estratégica dos setores Jurídico, Financeiro, Comercial, Controladoria e Administrativo, além de exercer a função de Diretor Financeiro (CFO) interino, com foco em governança, indicadores e sustentabilidade financeira. É Supervisor do Setor Jurídico, coordenando equipe multidisciplinar e gestão do volume processual, com foco em padronização técnica, controle de prazos e eficiência na condução das demandas.\"",
    email: "diego@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Público",
      "Defesa de Servidores",
      "Direito Administrativo"   ],
  },
  {
    id: "camila-cardoso",
    nome: "Camila Cardoso",
    titulo: "Advogada",
    imagem: "camila.svg",
    descricao: "\"Advogada inscrita na OAB/PB nº 34.692. Bacharela em Direito pelo Centro de Educação Superior Reinaldo Ramos - CESREI, é especialista em Direito e Processo Previdenciário pelo Gran Centro Universitário, Pós-graduanda em Controladoria Jurídica, Legal Operations e Inteligência Artificial e também em Direito Digital pela Inove Digital Ensino No escritório, atua como Controller Jurídico Júnior, com foco no apoio ao setor jurídico e na organização dos fluxos operacionais. Desempenha funções relacionadas ao cadastro e documentação de cliente, ao controle de prazos processuais e protocolo de ações, bem como acompanhamento de indicadores de desempenho e suporte à padronização de rotinas internas, contribuindo para maior eficiência e segurança na condução das demandas.\"",
    email: "camila@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Controller Jurídica",
      "Planejamento Jurídico",
      "Defesa de Servidores Públicos",
    ],
  },
  {
    id: "yuan-victor",
    nome: "Yuan Victor",
    titulo: "Advogado",
    imagem: "yuan.svg",
    descricao: "\"Advogado inscrito na OAB/RN nº 23.183 e integrante do time de advogados do Clodonil Monteiro Advocacia. Bacharel em Direito pela Universidade Federal do Rio Grande do Norte - UFRN e especialista em Direito Público pela Legale Educacional. No escritório, atua como Advogado integrante do Setor Jurídico, responsável pelo departamento de Petição Inicial, com foco na análise estratégica do cabimento de ações, elaboração de peças iniciais, desenvolvimento de teses jurídicas inovadoras e padronização técnica das demandas, promovendo qualidade, consistência argumentativa e eficiência na condução dos processos desde a sua origem.\"",
    email: "yuan@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Público",
      "Defesa de Servidores Públicos",
      "Direito Administrativo",
    ],
  },
  {
    id: "dayara-ferreira",
    nome: "Dayara Ferreira",
    titulo: "Advogada",
    imagem: "dayara.svg",
    descricao: "\"Advogada inscrita na OAB/RN nº 23.509 e integrante do time de advogados do Clodonil Monteiro Advocacia. Bacharela em Direito pela Universidade Federal do Rio Grande do Norte - UFRN, e pós-graduada em Direito Processual Civil pela Legale Educacional. No escritório, atua como Advogada Controller no setor de Controladoria Jurídica, responsável pelo departamento de intimações, com atuação voltada à gestão e controle dos prazos processuais, análise das comunicações judiciais e organização estratégica das demandas, promovendo a padronização dos fluxos internos e assegurando celeridade, precisão e segurança na condução processual.\"",
    email: "dayara@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Processual Civil",
      "Defesa de Servidores Públicos",
    ],
  },
  {
    id: "italo-felipe",
    nome: "Ítalo Felipe",
    titulo: "Advogado",
    imagem: "italo.svg",
    descricao: "\"Advogado inscrito na OAB/RN nº 22.218 e atual colaborador do escritório Clodonil Monteiro Advocacia. Bacharel em Direito pela Universidade Federal do Rio Grande do Norte - UFRN, atualmente cursando pós-graduação (em nível de especialização) em Direito Civil e Processo Civil pela UNINASSAU. Ao longo de sua formação acadêmica, agregou experiências em instituições estaduais e municipais: Defensoria Pública do RN, Ministério Público Estadual, TJRN e Prefeitura de Cruzeta/RN. Entusiasta da educação, enxerga a advocacia como um campo interdisciplinar e pluralista, permeado pelos constantes avanços tecnológicos - contexto em que os múltiplos talentos de várias gerações se conectam, na busca de soluções criativas para demandas jurídicas oriundas das constantes mudanças legislativas, econômicas e sociais\"",
    email: "Ítalo@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Administrativo",
      "Pesquisa Jurídica",
    ],
  },
      {
    id: "jefferson-gomes",
    nome: "Jefferson Gomes",
    titulo: "Advogado",
    imagem: "Jeferson.svg",
    descricao: "\"Advogado inscrito na OAB/RN nº 23.186. Bacharel em Direito pela Universidade Federal do Rio Grande do Norte (UFRN) e especialista em Direito Processual Civil pela Legale Educacional. Atualmente, cursa duas especializações: Direito Público e Direito Civil, ambas pela Legale Educacional. No escritório, atua no Setor Jurídico, sendo responsável pela supervisão dos departamentos de Recursos e Emendas. Desempenha atividades voltadas à coordenação das equipes de ambos os departamentos, ao controle de prazos e à elaboração de estratégias para a condução processual, incluindo, de forma complementar, a análise de viabilidade de pagamento de custas processuais.\"",
    email: "jefferson@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Licença Prêmio",
      "Direitos do Servidor",
      "Processos Administrativos",
    ],
  },
  {
    id: "gustavo-arthur",
    nome: "Gustavo Arthur",
    titulo: "Advogado Pleno",
    imagem: "gustavo.svg",
    descricao: "\"Advogado inscrito na OAB/RN sob o nº 23.276, integrante do escritório Clodonil Monteiro Advocacia. Bacharel em Direito pela Universidade Federal do Rio Grande do Norte (UFRN). Conciliador Judicial certificado pelo Conselho Nacional de Justiça (CNJ), pela Escola da Magistratura do Rio Grande do Norte (ESMARN) e pelo NUPEMEC. Membro do Grupo de Pesquisa Direito e Economia do Crime (DECRIM/UFRN). No âmbito profissional, atua de forma especializada na elaboração e revisão de teses jurídicas, com aprofundamento doutrinário e jurisprudencial, voltadas à construção de argumentação consistente e tecnicamente qualificada. Realiza análise de viabilidade de demandas judiciais e administrativas, considerando aspectos probatórios, riscos processuais, probabilidade de êxito e impactos econômicos da litigância. Além disso, é responsável pela elaboração de réplicas às contestações, com atuação estratégica na impugnação específica dos argumentos defensivos, enfrentamento de preliminares e reforço dos fundamentos da petição inicial, sempre orientado pela técnica processual e pela maximização dos resultados favoráveis ao cliente.\"",
    email: "gustavo@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Licença Prêmio",
      "Direitos do Servidor",
      "Processos Administrativos",
    ],
  },
  {
    id: "Amanda-cristina",
    nome: "Amanda Cristina",
    titulo: "Advogada",
    imagem: "amanda.svg",
    descricao: "\"Advogada inscrita na OAB/RN nº 23.186. Bacharel em Direito pela Universidade Federal do Rio Grande do Norte (UFRN) e especialista em Direito Processual Civil pela Legale Educacional. Atualmente, cursa duas especializações: Direito Público e Direito Civil, ambas pela Legale Educacional. No escritório, atua no Setor Jurídico, sendo responsável pela supervisão dos departamentos de Recursos e Emendas. Desempenha atividades voltadas à coordenação das equipes de ambos os departamentos, ao controle de prazos e à elaboração de estratégias para a condução processual, incluindo, de forma complementar, a análise de viabilidade de pagamento de custas processuais.\"",
    email: "amanda@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Licença Prêmio",
      "Direitos do Servidor",
      "Processos Administrativos",
    ],
  }


];
