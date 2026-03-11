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
    descricao: "\"Com sólida trajetória no exercício da advocacia, lidera a implementação de processos estruturados, a gestão de equipes multidisciplinares e o aprimoramento contínuo dos serviços prestados, assegurando rigor jurídico, confidencialidade e resultados consistentes na defesa dos interesses confiados ao escritório.\"",
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
    descricao: "\"Profissional com foco em estratégias jurídicas eficientes e atuação humanizada. Comprometida com a excelência no atendimento e na resolução de demandas.\"",
    email: "laura@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Previdenciário",
      "Benefícios Sociais",
      "Consultoria de Pessoal",
      "Ações Civis",
    ],
  },
  {
    id: "diego-medeiros",
    nome: "Diego Medeiros",
    titulo: "Advogado Sócio",
    imagem: "diegoBG.png",
    descricao: "\"Especializado em direito administrativo e representação de servidores públicos em processos administrativos e judiciais. Dedicado à busca de soluções criativas e efetivas.\"",
    email: "diego@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Processo Administrativo",
      "Defesa de Servidores",
      "Ações Administrativas",
      "Recursos Jurídicos",
    ],
  },
  {
    id: "camila-cardoso",
    nome: "Camila Cardoso",
    titulo: "Advogada",
    imagem: "camila.svg",
    descricao: "\"Com mais de 20 anos de experiência, atua em casos de alta complexidade. Especializada em representação estratégica e consultoria empresarial para servidores públicos.\"",
    email: "camila@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Administrativo",
      "Planejamento Jurídico",
      "Consultoria Estratégica",
    ],
  },
  {
    id: "yuan-victor",
    nome: "Yuan Victor",
    titulo: "Advogado",
    imagem: "yuan.svg",
    descricao: "\"Especialista em direito previdenciário de servidores públicos. Dedicada a orientar e defender os direitos de nossos clientes com eficiência e transparência.\"",
    email: "yuan@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Previdenciário",
      "Aposentadoria",
      "Revisão de Benefícios",
    ],
  },
  {
    id: "dayara-ferreira",
    nome: "Dayara Ferreira",
    titulo: "Advogada",
    imagem: "dayara.svg",
    descricao: "\"Atua em litígios trabalhistas e administrativos. Comprometida com a resolução rápida e eficaz das demandas de nossos clientes.\"",
    email: "dayara@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Litígios Trabalhistas",
      "Defesa Administrativa",
      "Recursos Especiais",
    ],
  },
  {
    id: "italo-felipe",
    nome: "Ítalo Felipe",
    titulo: "Advogado",
    imagem: "italo.svg",
    descricao: "\"Jovem profissional com foco em atendimento de qualidade e desenvolvimento de competências. Apaixonado por justiça e direitos sociais.\"",
    email: "Ítalo@cmajus.com.br",
    sociais: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    especializacoes: [
      "Direito Administrativo",
      "Consultoria Inicial",
      "Pesquisa Jurídica",
    ],
  },
  
  {
    id: "gustavo-arthur",
    nome: "Gustavo Arthur",
    titulo: "Advogado Pleno",
    imagem: "gustavo.svg",
    descricao: "\"Profissional experiente em representação de servidores em licenças prêmio e demandas administrativas complexas. Dedicado ao sucesso dos clientes.\"",
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
];
