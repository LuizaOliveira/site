import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

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

  authors.forEach((autor, authorIndex) => {
    const total = getArticleCountPerAuthor(authorIndex);

    for (let i = 1; i <= total; i += 1) {
      const globalIndex = articles.length + 1;
      const theme = ARTICLE_THEMES[(authorIndex + i) % ARTICLE_THEMES.length];
      const description =
        'A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.';
      const content =
        'A globalização e a era digital trouxeram questões que envolvem o compartilhamento de dados. Nesse cenário, através da Lei Geral de Proteção de Dados, o legislador se preocupou como trato das informações pessoais de forma que elas pudessem ser disponibilizadas de maneirasegura e eficaz, respeitando os princípios constitucionais asseguradores dos direitos do indivíduo, tanto na esfera pública quanto na privada. Não obstante, a Lei nº 14.129/2021, por meio do Governo Digital, surge para desburocratizar os sistemas que armazenam e propagam tais dados com o intuito de tornar a Administração Pública mais eficiente. Dessa maneira, surge o impasse pois não se sabe os limites do Governo Digital quanto ao devido tratamento dos dados sensíveis dos cidadãos, fato este que vem ocasionando grandes escândalos midiáticos. Sendo assim, a presente pesquisa busca identificar qual o limite de atuação governamental nos dados da população e até que ponto pode ser estruturada a partir da ideia de eficiência administrativa e não de violação de informações. Sendo assim, emerge a necessidade de analisar o dilema entre a eficiência administrativa e a proteção de dados, através do estudo de pesquisas descritiva, motivada em razão da bibliografia vasta e recente acerca de ambos os institutos jurídicos abordados no presente trabalho; exploratória, conduzidas pelo acesso à matérias e relatórios técnicos de violações de dados do sistema governamental brasileito, sob o enfoque qualitativo e baseada no método hipotético-dedutivo. Desse modo, para tanto, os objetivos traçados foram: I) promover a discussão teórica e conceitual acerca da proteção de dados e o projeto “Governo Digital”; II) analisar os limites ético-morais e legislativos nas ações do governo para alcançar a eficiência administrativa sem que haja a violação de dados sensíveis e; III) discutir matérias e relatórios de vazamentos de dados do sistema de informações integrado e virtual do governo brasileiro.';

      articles.push({
        published: true,
        thumbnail: `https://picsum.photos/seed/article-thumb-${globalIndex}/1200/630`,
        title: fitVarchar(`${theme}: Guia Pratico ${i}`),
        author: autor,
        articleImage: `https://picsum.photos/seed/article-image-${globalIndex}/1600/900`,
        articleFile: `https://example.com/artigos/${globalIndex}.pdf`,
        description: fitVarchar(description),
        content: fitVarchar(content),
        tags: generateRandomTags(),
      });
    }
  });

  return articles;
}

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
