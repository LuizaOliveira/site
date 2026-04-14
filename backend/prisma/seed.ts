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

const MAX_VARCHAR_LEN = 191;

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
  }> = [];

  authors.forEach((autor, authorIndex) => {
    const total = getArticleCountPerAuthor(authorIndex);

    for (let i = 1; i <= total; i += 1) {
      const globalIndex = articles.length + 1;
      const theme = ARTICLE_THEMES[(authorIndex + i) % ARTICLE_THEMES.length];
      const description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      const content =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

      articles.push({
        published: true,
        thumbnail: `https://picsum.photos/seed/article-thumb-${globalIndex}/1200/630`,
        title: fitVarchar(`${theme}: Guia Pratico ${i}`),
        author: autor,
        articleImage: `https://picsum.photos/seed/article-image-${globalIndex}/1600/900`,
        articleFile: `https://example.com/artigos/${globalIndex}.pdf`,
        description: fitVarchar(description),
        content: fitVarchar(content),
      });
    }
  });

  return articles;
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

  await prisma.article.deleteMany();
  await prisma.article.createMany({
    data: articleSeeds,
  });

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
