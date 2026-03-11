const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePosts() {
  try {
    const posts = await prisma.post.findMany();
    console.log('Posts encontrados:', posts.length);
    
    for (const post of posts) {
      if (!post.pageCount || post.pageCount === 0) {
        await prisma.post.update({
          where: { id: post.id },
          data: { pageCount: 2 }
        });
        console.log(`✅ Post ${post.id} atualizado com pageCount=2`);
      } else {
        console.log(`ℹ️  Post ${post.id} já tem pageCount=${post.pageCount}`);
      }
    }
    
    console.log('\n✅ Todos os posts foram atualizados!');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePosts();
