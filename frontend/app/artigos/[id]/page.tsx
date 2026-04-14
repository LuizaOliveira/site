"use client";
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import { advogados } from '@/app/data/advogados';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Article, getArticleById } from '@/app/lib/api';

function getAdvogadoByName(name: string) {
  const normalizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return (
    advogados.find((advogado) => {
      const normalizedAdvogadoName = advogado.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return normalizedAdvogadoName === normalizedName;
    }) ?? null
  );
}

function formatArticleDate(date: string): string {
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

export default function ArticlePage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticleById() {
      if (!idParam) {
        setArticle(null);
        setIsLoading(false);
        return;
      }

      const parsedId = Number(idParam);

      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        setArticle(null);
        setIsLoading(false);
        return;
      }

      const response = await getArticleById(parsedId);

      if (!response.success || !response.data) {
        setArticle(null);
        setIsLoading(false);
        return;
      }

      setArticle(response.data);
      setIsLoading(false);
    }

    setIsLoading(true);
    loadArticleById();
  }, [idParam]);

  const advogado = useMemo(() => {
    if (!article?.author) {
      return null;
    }

    return getAdvogadoByName(article.author);
  }, [article?.author]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-24 pb-16">
          <section className="container mx-auto px-4 md:px-8 max-w-4xl">
            <p className="text-gray-600">Carregando artigo...</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!article || !article.published) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-24 pb-16">
          <section className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h1 className="text-2xl font-bold text-primary">Artigo nao encontrado</h1>
            <p className="mt-3 text-gray-600">O artigo solicitado nao existe ou nao esta publicado.</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const articleMainImage = article.articleImage || article.thumbnail;
  const formattedDate = formatArticleDate(article.createdAt);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-8 max-w-4xl">
          <img
            src={articleMainImage}
            alt={article.title}
            className="w-full h-auto max-h-105 object-cover rounded-2xl"
          />

          <h1 className="mt-8 text-3xl md:text-4xl font-bold text-primary">
            {article.title}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            {advogado && (
              <div className={`group relative w-10 aspect-square overflow-hidden rounded-full bg-secondary cursor-default`}>
                <Image src={`/${advogado.imagem}`} alt={article.author} fill className='object-cover object-[50%_15%]'/>
              </div>
            )}
            <p className="text-lg md:text-base text-gray-600">
              {article.author} {formattedDate ? `• ${formattedDate}` : ''}
            </p>
          </div>

          <article className="mt-8 text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">
            {article.content}
          </article>
          <div className='text-right mt-10'>
            <a
              href={article.articleFile || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#E86100] text-white font-medium rounded-full hover:bg-[#c55200] hover:scale-105 transition duration-300"
            >
              Baixe o artigo completo
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
