import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
