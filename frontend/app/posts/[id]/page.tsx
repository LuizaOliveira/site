"use client";
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post, getPostById } from '@/app/lib/api';
import { Icon } from '@iconify/react';
import Link from 'next/link';

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate);
}

// Assuntos estáticos
const ASSUNTOS_ESTATICOS = [
  {
    titulo: 'Município de Jaborandi dos Guarapes lança PPP na atenção primária à saúde',
    autor: 'Assuntos',
    categoria: 'Saúde e Educação'
  },
  {
    titulo: 'Desenvolvimento, cultura e tecnologia: insegurança humanitária na era da IA',
    autor: 'Assuntos',
    categoria: 'Finanças e Serviços'
  },
  {
    titulo: 'ANS discute atualização das regras de contratos na saúde septembrar',
    autor: 'Assuntos',
    categoria: 'Saúde e Serviço'
  }
];

export default function PostPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPostById() {
      if (!idParam) {
        setPost(null);
        setIsLoading(false);
        return;
      }

      const parsedId = Number(idParam);

      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        setPost(null);
        setIsLoading(false);
        return;
      }

      const response = await getPostById(parsedId);

      if (!response.success || !response.data) {
        setPost(null);
        setIsLoading(false);
        return;
      }

      setPost(response.data);
      setIsLoading(false);
    }

    setIsLoading(true);
    loadPostById();
  }, [idParam]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-24 pb-16">
          <section className="container mx-auto px-4 md:px-8 max-w-6xl">
            <p className="text-gray-600">Carregando postagem...</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!post || !post.published) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-24 pb-16">
          <section className="container mx-auto px-4 md:px-8 max-w-5xl">
            <h3 className="text-2xl font-bold font-cabinet text-primary">Postagem não encontrada</h3>
            <p className="mt-3 text-gray-600">A postagem solicitada não existe ou não está publicada.</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const postMainImage = post.newsImage || post.thumbnail;
  const formattedDate = formatDate(post.createdAt);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pb-16">

        <section className="justify-center items-center gap-4 mb-6">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl pt-24">
            <div className="flex flex-col items-center text-center gap-4 mb-5">
              <div className="inline-block border border-gray-400 px-2 lg:px-4 py-0.5 rounded-2xl">
                <span className="text-primary text-xs uppercase">Publicações</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-cabinet text-primary max-w-4xl"
                style={{ fontWeight: 300 }}>
                {post.title}
              </h1>
              <p className="text-xs md:text-base font-light text-gray-600">
                {formattedDate ? `${formattedDate}` : ''}
              </p>
            </div>
            
            <img
              src={postMainImage}
              alt={post.title}
              className="w-full h-auto max-h-130 object-cover rounded-2xl"
            />

            <div className="mt-8">
              <p className="text-base md:text-lg leading-relaxed text-gray-800">
                {post.description}
              </p>
            </div>

            <div className="text-right mt-10">
              <a
                href={post.file || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#E86100] text-white font-medium rounded-full hover:bg-[#c55200] hover:scale-105 transition duration-300"
              >
                Baixe a postagem completa
              </a>
            </div>
          </div>
        </section>

        {/* ÚLTIMAS NOTÍCIAS / ASSUNTOS ESTÁTICOS */}
        <section className="mt-16 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 font-cabinet">Últimas Notícias</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ASSUNTOS_ESTATICOS.map((assunto, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold uppercase tracking-wide mb-2">
                    {assunto.categoria}
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-3 hover:text-primary transition-colors cursor-pointer">
                    {assunto.titulo}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {assunto.autor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
