"use client";
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import { advogados } from '@/app/data/advogados';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Article, getArticleById, getArticles } from '@/app/lib/api';
import { Icon } from '@iconify/react';

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
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

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

      // Carregar artigos relacionados
      const articlesResponse = await getArticles();
      if (articlesResponse.success && articlesResponse.data) {
        const filtered = articlesResponse.data
          .filter((a) => a.id !== parsedId && a.published)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        setRelatedArticles(filtered);
      }

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
          <section className="container mx-auto px-4 md:px-8 max-w-6xl">
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
          <section className="container mx-auto px-4 md:px-8 max-w-5xl">
            <h3 className="text-2xl font-bold font-cabinet text-primary">Artigo nao encontrado</h3>
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

      <main className="min-h-screen bg-white pb-16">
        {/* MAIN CONTENT */}
        <section className="pt-24 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            {/* Breadcrumb */}
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Artigos | Publicações</p>

            {/* Title */}
            <h1 className="text-xl md:text-3xl font-cabinet font-light text-primary mb-4 leading-tight max-w-3xl">
              {article.title}
            </h1>

            {/* Date */}
            <p className="text-sm text-gray-500 mb-8">
              {formattedDate}
            </p>

            {/* Main Image */}
            <img
              src={articleMainImage}
              alt={article.title}
              className="w-full max-h-96 rounded-xl object-cover mb-8"
            />

            {/* Assuntos */}
            <div className="mb-6 pb-6 border-b border-gray-200 ">
              <p className="text-sm text-gray-600 font-light mb-3">Assuntos:</p>

              {article.tags && article.tags.length > 0 ? (
                <div className="flex items-center gap-4 flex-wrap">
                  {article.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="bg-[#FFEFEF] text-primary hover:bg-secondary hover:text-white p-1.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                    >
                      <div className="flex items-center gap-3">
                        <p className="text-[0.625rem] text-[#592315] group-hover:text-white">
                          {tag.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Nenhuma tag atribuída</p>
              )}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
              {advogado && (
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-200 shrink-0">
                  <Image src={`/${advogado.imagem}`} alt={article.author} fill className='object-cover object-[50%_15%]' />
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-gray-600">Autor/a</p>
                <p className="text-sm font-medium text-gray-800">{article.author}</p>
              </div>
            </div>

            {/* Introduction Title */}
            <h2 className="text-lg font-bold text-gray-800 mb-4">Introdução</h2>

            {/* Content */}
            <article className="text-base leading-relaxed text-gray-700 mb-8 text-justify whitespace-pre-line">
              {article.content}
            </article>

            {/* Autor completo section */}
            <p className="text-sm font-bold text-gray-800 mb-4">Autor completo:</p>
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 bg-[#E86100] text-white px-6 py-3 rounded font-bold hover:bg-[#c55200] transition">
                <Icon icon="mdi:download" className="w-5 h-5" />
                Baixar
              </button>
              <a
                href={article.articleFile || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-100 text-[#E86100] px-6 py-3 rounded font-bold hover:bg-orange-200 transition"
              >
                <Icon icon="mdi:external-link" className="w-5 h-5" />
                Acessar publicação
              </a>
            </div>

          </div>
        </section>

        {/* ÚLTIMAS NOTÍCIAS */}
        <section className="py-12 px-4 md:px-8 mt-12">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-widest">Últimas Notícias</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="bg-white">
                    <h3 className="text-xl font-bold text-primary mb-6 leading-snug hover:text-primary transition cursor-pointer">
                      {relatedArticle.title}
                    </h3>
                    <div>
                      {relatedArticle.tags && relatedArticle.tags.length > 0 ? (
                        <>
                          <p className="text-xs text-gray-600 font-medium mb-3">Assuntos:</p>
                          <div className="flex flex-col gap-2">
                            {relatedArticle.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="inline-block text-sm text-gray-700 font-medium bg-gray-100 px-3 py-2 rounded-full w-fit hover:bg-primary hover:text-white transition-colors"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-400 italic">Sem tags</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-3">Nenhum artigo relacionado encontrado.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
