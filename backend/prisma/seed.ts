import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { title } from 'process';

const prisma = new PrismaClient();

const FALLBACK_ADVOGADOS = [
  'Clodonil Monteiro',
  'Edjane Lucena',
  'Laura Maria',
  'Diego Medeiros',
  'Camila Cardoso',
  'Yuan Victor',
  'Dayara Ferreira',
  'Ítalo Felipe',
  'Gustavo Arthur',
];

const ARTICLE_THEMES = [
  'Direitos dos Servidores Publicos',
  'Aposentadoria e Beneficios',
  'Processos Administrativos',
  'Planejamento Previdenciario',
  'Revisao de Beneficios',
  'Progressao Funcional',
];

const ARTICLE_TAGS = [
  'Servidor Público',
  'Benefícios',
  'Aposentadoria',
  'Direitos',
  'Administração',
  'Legislação',
  'Tributação',
  'Processual',
];

const MAX_VARCHAR_LEN = 30000;

function fitVarchar(value: string, maxLength: number = MAX_VARCHAR_LEN): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}
const ARTICLES = [
  {
    title: 'A Relação da Petrobras com o Princípio da Supremacia do Interesse Público sobre o Privado: um Estudo sobre Fatos e Medidas que Influenciam a Vinculação',
    author: 'Diego Medeiros',
    description: fitVarchar('O presente trabalho trará discussão sobre os impactos do mercado sobre as ações da Petrobras e como tais medidas afetam ou contribuem para a efetivação do princípio da supremacia do interesse público sobre o privado. A sociedade de economia mista em questão dispõe de ações que variam entre três eixos principais que é o Grupo de Controle, onde o poder público se faz presente, os Investidores brasileiros e os Investidores não-brasileiros. Nesta perspectiva, o artigo se dispõe a analisar a influência dos investidores sobre as tomadas de decisões da Petrobras e apontar conjunturas que divergem ou convergem para a efetivação do interesse coletivo e imperativo nacional, pontos essenciais para a configuração de uma sociedade de economia mista, conforme disposto no texto constitucional em seu artigo 173. Neste segmento, por meio da pesquisa exploratória serão observados instrumentos que contribuíram no encaminhamento da Petrobras para a efetivação da supremacia do interesse público, mas também indicadores que afetaram diretamente o desempenho da S.A. na concretização do princípio do direito administrativo. Outrossim, vale ressaltar que a pesquisa não apresenta limitação a estes pontos, tendo em vista a dedicação sobre a visão do regime jurídico administrativo da S.A. e tópicos como a sua constituição histórica, organizacional e legislativa. Desse modo, fatores como os investimentos em pesquisas, desenvolvimento tecnológico e a credibilidade depositada pelo Estado nas ações pioneiras como o pré-sal, contribuem para a exercício da supremacia do interesse público tendo em vista a garantia do interesse coletivo e o imperativo nacional, em face da grande relevância da Petrobras para a economia nacional. Em contrapartida, problemáticas como os escândalos de corrupção, como exemplo cita-se a Operação Lava Jato, somados com a perca de propriedade sobre as ações pelo Grupo de Controle, estes contribuem para o exercício do setor privado sobre as diretrizes da Petrobras e, consequentemente, com a mitigação do efeito do princípio da supremacia do interesse público sobre o privado. 7 Destarte, para melhor entendimento sobre as questões que permeiam a situação atual da Petrobras e sua relação com a supremacia do interesse público, este estudo está divido em cinco tópicos centrais onde serão discutidos a abordagem doutrinária acerca do regime jurídico administrativo da Petrobras; a constituição histórica e a formação organizacional dessa sociedade de economia mista; o estudo da evolução do capital acionário e; a análise de fatores que contribuem e afetam a relação da Petrobras com a supremacia do interesse público sobre o privado. No que tange ao último tópico, para tanto, foram estudados os investimentos em Pesquisas e Desenvolvimento (P&D), a ação pioneira de extração de petróleo com uso de sondas no pré-sal, as formações de cartéis e o escândalo da Operação Lava Jato e uma análise geral acerca da perca de autonomia do Grupo de Controle com base nos relatórios da evolução do capital acionário.'),
    content: 'O presente trabalho trará discussão sobre os impactos do mercado sobre as ações da Petrobras e como tais medidas afetam ou contribuem para a efetivação do princípio da supremacia do interesse público sobre o privado. A sociedade de economia mista em questão dispõe de ações que variam entre três eixos principais que é o Grupo de Controle, onde o poder público se faz presente, os Investidores brasileiros e os Investidores não-brasileiros. Nesta perspectiva, o artigo se dispõe a analisar a influência dos investidores sobre as tomadas de decisões da Petrobras e apontar conjunturas que divergem ou convergem para a efetivação do interesse coletivo e imperativo nacional, pontos essenciais para a configuração de uma sociedade de economia mista, conforme disposto no texto constitucional em seu artigo 173. Neste segmento, por meio da pesquisa exploratória serão observados instrumentos que contribuíram no encaminhamento da Petrobras para a efetivação da supremacia do interesse público, mas também indicadores que afetaram diretamente o desempenho da S.A. na concretização do princípio do direito administrativo. Outrossim, vale ressaltar que a pesquisa não apresenta limitação a estes pontos, tendo em vista a dedicação sobre a visão do regime jurídico administrativo da S.A. e tópicos como a sua constituição histórica, organizacional e legislativa. Desse modo, fatores como os investimentos em pesquisas, desenvolvimento tecnológico e a credibilidade depositada pelo Estado nas ações pioneiras como o pré-sal, contribuem para a exercício da supremacia do interesse público tendo em vista a garantia do interesse coletivo e o imperativo nacional, em face da grande relevância da Petrobras para a economia nacional. Em contrapartida, problemáticas como os escândalos de corrupção, como exemplo cita-se a Operação Lava Jato, somados com a perca de propriedade sobre as ações pelo Grupo de Controle, estes contribuem para o exercício do setor privado sobre as diretrizes da Petrobras e, consequentemente, com a mitigação do efeito do princípio da supremacia do interesse público sobre o privado. 7 Destarte, para melhor entendimento sobre as questões que permeiam a situação atual da Petrobras e sua relação com a supremacia do interesse público, este estudo está divido em cinco tópicos centrais onde serão discutidos a abordagem doutrinária acerca do regime jurídico administrativo da Petrobras; a constituição histórica e a formação organizacional dessa sociedade de economia mista; o estudo da evolução do capital acionário e; a análise de fatores que contribuem e afetam a relação da Petrobras com a supremacia do interesse público sobre o privado. No que tange ao último tópico, para tanto, foram estudados os investimentos em Pesquisas e Desenvolvimento (P&D), a ação pioneira de extração de petróleo com uso de sondas no pré-sal, as formações de cartéis e o escândalo da Operação Lava Jato e uma análise geral acerca da perca de autonomia do Grupo de Controle com base nos relatórios da evolução do capital acionário.',
    thumbnail: fitVarchar('https://www.brasildefato.com.br/wp-content/uploads/2024/09/image_processing20200201-29235-1tmlx8w.jpg'),
    articleImage: fitVarchar('https://www.brasildefato.com.br/wp-content/uploads/2024/09/image_processing20200201-29235-1tmlx8w.jpg'),
    articleFile: fitVarchar('https://res.cloudinary.com/dlykmt2r4/image/upload/v1776421614/9562-67659174-1-PB_rnvuue.pdf'),
    published: true,
    tags: ['Petrobras', 'Investimentos', 'Setor privado'],
  },

  {
    title: "Governo Digital: o Dilema entre a Eficiência Administrativa e a Proteção de Dados",
    description: fitVarchar("A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, "),
    content: "A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.",
    author: 'Diego Medeiros',
    thumbnail: fitVarchar('https://images.jota.info/wp-content/uploads/2026/03/governodigital.jpg'),
    articleImage: fitVarchar('https://images.jota.info/wp-content/uploads/2026/03/governodigital.jpg'),
    articleFile: fitVarchar('https://res.cloudinary.com/dlykmt2r4/image/upload/v1776421971/submissao_1701042338485_n1dyxi.pdf'),
    published: true,
    tags: ['Governo Digital', 'Sistema Governamental', 'Vazamento de dados'],
  },

  {
    title: "O Princípio da Eficiência Administrativa e a Concretização do Direito Fundamental à Saúde",
    description: fitVarchar("A eficiência é caracterizada a partir do cumprimento dos fins lícitos e, por vias lícitas, delimitados pela ação."),
    content: "A eficiência é caracterizada a partir do cumprimento dos fins lícitos e, por vias lícitas, delimitados pela ação. O direito à saúde é um direito fundamental previsto no artigo 196 da Constituição Federal de 1988, que estabelece que a saúde é um direito de todos e um dever do Estado. A concretização desse direito fundamental depende da eficiência administrativa na gestão dos recursos públicos destinados à saúde, bem como na implementação de políticas públicas eficazes. A eficiência administrativa é essencial para garantir que os recursos sejam utilizados de maneira adequada, evitando desperdícios e promovendo a melhoria contínua dos serviços de saúde. Além disso, a eficiência contribui para a ampliação do acesso aos serviços de saúde, a redução das desigualdades e a promoção da equidade no sistema de saúde. Portanto, o princípio da eficiência administrativa desempenha um papel crucial na efetivação do direito fundamental à saúde, assegurando que os recursos sejam utilizados de forma responsável e que as políticas públicas sejam implementadas de maneira eficaz para atender às necessidades da população.",
    author: 'Diego Medeiros',
    thumbnail: fitVarchar('https://ieps.org.br/wp-content/uploads/2022/07/AgendaMaisSUS_IEPS-Umane-e1657036338996-1024x559.png'),
    articleImage: fitVarchar('https://ieps.org.br/wp-content/uploads/2022/07/AgendaMaisSUS_IEPS-Umane-e1657036338996-1024x559.png'),
    articleFile: fitVarchar('https://res.cloudinary.com/dlykmt2r4/image/upload/v1776422443/O_PRINC%C3%8DPIO_DA_EFICI%C3%8ANCIA_ADMINISTRATIVA_wx5oy6.pdf'),
    published: true,
    tags: ['Eficiência Administrativa', 'Direito à Saúde', 'SUS'],
  }, 
  {
    title: "O Judiciário em Políticas Públicas: uma Análise do Tema 698 do STF e suas Implicações para a Separação dos Poderes no Brasil",
    description: fitVarchar(''),
    content: "Em um sistema normativo garantista, como o adotado no Brasil, que visa proteger os direitos fundamentais e a dignidade da pessoa humana, o Estado tem a obrigação de formular e implementar políticas públicas destinadas a efetivar esses direitos. No sistema democrático que norteia o país, os poderes públicos possuem a obrigação precípua de garantir os direitos constitucionais, especialmente nas  áreas  como  saúde  e  assistência  social.  No  entanto,  a  complexidade  da  gestão  pública, caracterizada  por  restrições  orçamentárias  e  pela  falta  de  primazia  governamental,  frequentemente resulta  em  omissões  estatais  que  comprometem  a  materialização  das  garantias  constitucionais. Diante de tais omissões, reivindica-se a intervenção do Poder Judiciário, visto como última instância capaz  de  assegurar  a  concretização  dos  direitos  fundamentais.  A  busca  pelo  Judiciário  para  suprir lacunas na ação estatal não se limita à garantia imediata de direitos, mas revela uma interação mais complexa: a judicialização das políticas públicas.Essa  intervenção  do  Judiciário  em  políticas  públicas  é  um  tema  bastante  discutido  no  país, visto  que  reflete  a  expectativa  de  que  o  Judiciário  atue  como  guardião  e  intérprete  das  normas constitucionais,  corrigindo  falhas  ou  a  inércia  dos  outros  poderes.  Entretanto,  há  uma  grande discussão   na   doutrina   especializada   e   na   jurisprudência   sobre   os   limites   da   ação   estatal, considerando  que  ela  envolve  questões  de  legitimidade  e  a  separação  entre  as  funções  estatais, principalmente  no  que  diz  respeito  à  formulação  e  à  execução  de  políticas  públicas.  Além  disso, discute-se quais seriam os limites do Poder Judiciário para a efetivação de tais políticas públicas sem que haja intervenção na competência dos demais poderes. Diante de tais considerações, evidencia-se  que  a  judicialização  de  políticas  públicas  desafia  a  dinâmica  entre  os  poderes,  pois,  quando  os poderes responsáveis não as efetivam, a responsabilidade pela execução dos direitos fundamentais é transferida para o Judiciário, que pode assumir o papel ativo tradicionalmente atribuído aos demais. ",
    author: 'Yuan Victor',
    thumbnail: fitVarchar('https://www.conjur.com.br/imgs/2024/09/19/20240919stf.jpg'),
    articleImage: fitVarchar('https://www.conjur.com.br/imgs/2024/09/19/20240919stf.jpg'),
    articleFile: fitVarchar('https://res.cloudinary.com/dlykmt2r4/image/upload/v1776423294/Vista_do_O_JUDICI%C3%81RIO_EM_POL%C3%8DTICAS_P%C3%9ABLICAS__UMA_AN%C3%81LISE_DO_TEMA_698_DO_STF_E_SUAS_IMPLICA%C3%87%C3%95ES_PARA_A_SEPARA%C3%87%C3%83O_DOS_PODERES_NO_BRASIL_nnltb2.pdf'),
    published: true,
    tags: ['Intervenção ', 'Direitos Fundamentai', 'Inércia Administrativa'],
  }
]

function getArticleCountPerAuthor(index: number): number {
  // Keep a deterministic range between 4 and 6 per author.
  return 4 + (index % 3);
}

function getAdvogadoNamesFromFrontendFile(): string[] {
  const advogadosPath = path.resolve(__dirname, '../../frontend/app/data/advogados.ts');

  try {
    const fileContent = fs.readFileSync(advogadosPath, 'utf8');
    const names = Array.from(fileContent.matchAll(/nome:\s*"([^"]+)"/g)).map((match) =>
      match[1].trim(),
    );

    if (names.length > 0) {
      return names;
    }

    console.warn('⚠️ Nenhum nome encontrado no arquivo de advogados. Usando fallback.');
    return FALLBACK_ADVOGADOS;
  } catch {
    console.warn('⚠️ Nao foi possivel ler frontend/app/data/advogados.ts. Usando fallback.');
    return FALLBACK_ADVOGADOS;
  }
}

function buildArticleSeeds(authors: string[]) {
  const articles: Array<{
    published: boolean;
    thumbnail: string;
    title: string;
    author: string;
    articleImage: string;
    articleFile: string;
    description: string;
    content: string;
    tags: string[];
  }> = [];

  authors.forEach((autor) => {
    const authorArticles = ARTICLES.filter(article => article.author === autor);
    authorArticles.forEach(article => {
      articles.push(article);
    });
  });

return articles;
}
    //     'A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.';
    //   const content =
    //     'A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.';

    //       articles.push({
    //         published: true,
    //         thumbnail: `https://picsum.photos/seed/article-thumb-${globalIndex}/1200/630`,
    //         title: "A RELAÇÃO DA PETROBRAS COM O PRINCÍPIO DA SUPREMACIA DO INTERESSE PÚBLICO SOBRE O PRIVADO: UM ESTUDO SOBRE FATOS E MEDIDAS QUE INFLUENCIAM A VINCULAÇÃO",
    //         author: autor,
    //         articleImage: `https://picsum.photos/seed/article-image-${globalIndex}/1600/900`,
    //         articleFile: `https://example.com/artigos/${globalIndex}.pdf`,
    //         description: fitVarchar(description),
    //         content: fitVarchar(content),
    //         tags: generateRandomTags(),
    //       });
  // }
//
    // for (let i = 1; i <= total; i += 1) {
    //   const globalIndex = articles.length + 1;
    //   const theme = ARTICLE_THEMES[(authorIndex + i) % ARTICLE_THEMES.length];
    //   const description =
    //     'A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.';
    //   const content =
    //     'A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.';

    //   articles.push({
    //     published: true,
    //     thumbnail: `https://picsum.photos/seed/article-thumb-${globalIndex}/1200/630`,
    //     title: fitVarchar(`${theme}: Guia Pratico ${i}`),
    //     author: autor,
    //     articleImage: `https://picsum.photos/seed/article-image-${globalIndex}/1600/900`,
    //     articleFile: `https://example.com/artigos/${globalIndex}.pdf`,
    //     description: fitVarchar(description),
    //     content: fitVarchar(content),
    //     tags: generateRandomTags(),
    //   });
    // }
  // });

// return articles;
// }

function generateRandomTags(): string[] {
  const tagCount = 2 + Math.floor(Math.random() * 2); // 2 ou 3 tags
  const selectedTags = [];
  const tagIndices = new Set<number>();

  while (selectedTags.length < tagCount) {
    const randomIndex = Math.floor(Math.random() * ARTICLE_TAGS.length);
    if (!tagIndices.has(randomIndex)) {
      tagIndices.add(randomIndex);
      selectedTags.push(ARTICLE_TAGS[randomIndex]);
    }
  }

  return selectedTags;
}

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Hash da senha "12345"
  const hashedPassword = await bcrypt.hash('12345', 10);

  // Criar usuário administrador
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cma.com' },
    update: {},
    create: {
      email: 'admin@cma.com',
      name: 'Administrador',
      password: hashedPassword,
    },
  });

  console.log('✅ Usuário administrador criado:');
  console.log('   Email:', admin.email);
  console.log('   Senha: 12345');
  console.log('   Nome:', admin.name);
  console.log('');

  // Criar posts de teste
  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'CLODONEWS #1 - Últimas Notícias',
      thumbnail: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_001_thumb.jpg',
      file: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_001_fjx1fj.pdf',
      newsImage: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_001_news.jpg',
      description: 'Boletim informativo com as últimas notícias sobre as atividades da empresa e mercado.',
      published: true,
      pageCount: 12,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'CLODONEWS #2 - Atualização de Produtos',
      thumbnail: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_002_thumb.jpg',
      file: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_002.pdf',
      newsImage: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_002_news.jpg',
      description: 'Informações sobre novos produtos e atualizações de serviços.',
      published: true,
      pageCount: 8,
    },
  });

  const post3 = await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'CLODONEWS #3 - Relatório Trimestral',
      thumbnail: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_003_thumb.jpg',
      file: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_003.pdf',
      newsImage: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_003_news.jpg',
      description: 'Relatório de desempenho do terceiro trimestre com indicadores de crescimento.',
      published: false,
      pageCount: 15,
    },
  });

  console.log('✅ Posts de teste criados:');
  console.log('   Post 1:', post1.title);
  console.log('   Post 2:', post2.title);
  console.log('   Post 3:', post3.title);

  const advogadoNames = getAdvogadoNamesFromFrontendFile();
  const articleSeeds = buildArticleSeeds(advogadoNames);

  // Remover artigos e tags antigas
  await prisma.article.deleteMany();

  // Criar artigos com tags (conectando ou criando tags conforme necessário)
  for (const articleData of articleSeeds) {
    const { tags, ...articleFields } = articleData;

    await prisma.article.create({
      data: {
        ...articleFields,
        tags: {
          connectOrCreate: tags.map(tagName => ({
            where: { name: tagName },
            create: { name: tagName }
          }))
        }
      },
      include: { tags: true }
    });
  }

  console.log('✅ Artigos de advogados criados:');
  console.log('   Total:', articleSeeds.length);
  console.log('   Autores:', advogadoNames.length);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
