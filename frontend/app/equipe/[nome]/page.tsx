"use client";

import { Icon } from "@iconify/react";
import { advogados } from "../../data/advogados";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "../../components/layout/Header";
import { AdvCard } from "@/app/components/ui/AdvCard";
import { ArticleCard } from "@/app/components/ui/articleCard";
import { useEffect, useState } from "react";
import { Article, getArticlesByAuthor } from "@/app/lib/api";

export default function TeamDetail() {
  const params = useParams();
  const nomeParam = params.nome as string;

  const [artigos, setArtigos] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(artigos.length / itemsPerPage);
  const displayedArticles = artigos.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const advogado = advogados.find(
    (a) =>
      a.nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-") === nomeParam
  );

  useEffect(() => {
    async function loadArticles() {
      if (!advogado?.nome) {
        setArtigos([]);
        return;
      }

      const response = await getArticlesByAuthor(advogado.nome);

      if (!response.success || !response.data) {
        setArtigos([]);
        return;
      }

      setArtigos(response.data.filter((article) => article.published));
    }

    loadArticles();
  }, [advogado?.nome]);

  const goToPage = (page: number) => {
    const validPage = Math.max(0, Math.min(page, totalPages - 1));
    setCurrentPage(validPage);
  };

  if (!advogado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Advogado não encontrado</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      <section className="min-h-screen bg-white py-12 ">
        <div className="container mx-auto px-4 md:px-8 mt-20">
          {/* Header com Badge */}
          <div className="mb-8 md:mb-12">
            <div className="inline-block border border-gray-300 px-4 py-1 rounded-full">
              <span className="text-xs md:text-sm font-semibold text-primary uppercase">
                Equipe
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Coluna esquerda - Informações */}
            <div className="order-2 lg:order-1">
              {/* Nome */}
              <h1 className="text-4xl md:text-5xl font-cabinet text-primary mb-3">
                {advogado.nome}
              </h1>

              {/* Título */}
              <p className="text-lg text-gray-600 mb-8">{advogado.titulo}</p>

              {/* Descrição */}
              <p className="text-gray-700 leading-relaxed mb-10 text-justify">
                {advogado.descricao}
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Icon icon="mdi:email" className="text-secondary text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Endereço de email</p>
                  <a
                    href={`mailto:${advogado.email}`}
                    className="text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    {advogado.email}
                  </a>
                </div>
              </div>


              
              {/* Especialização */}
              <div className="mb-12">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">
                  Atuação e Especializações
                </h3>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex flex-wrap gap-3">
                    {advogado.especializacoes.map((esp, index) => (
                      <div
                        key={index}
                        className="bg-[#F8F8FB] text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                      >
                        <div className='flex items-center gap-3'>
                          <p className='text-xs group-hover:text-white'>{esp}</p>
                        </div>
                        <div className='bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs rotate-45 transform'>
                          <Icon icon="bitcoin-icons:arrow-up-filled" className="w-4 h-4 text-secondary transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex gap-6">
                {advogado.sociais.linkedin && (
                  <a
                    href={`https://www.instagram.com/clodonilmonteiro/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    <Icon icon="mdi:instagram" className="text-2xl" />
                  </a>
                )}
                {advogado.sociais.twitter && (
                  <a
                    href={"https://www.tiktok.com/@clodonilmonteiro"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    <Icon icon="ic:twotone-tiktok" className="text-2xl" />
                  </a>
                )}
              </div>
            </div>

            {/* Coluna direita - Imagem */}
            <div className="flex items-center justify-center order-1 lg:order-2 w-full">
              <div className="w-full max-w-sm lg:ml-0 ml-5">
                <AdvCard
                  imgSrc={advogado.imagem}
                  nome={advogado.nome}
                  titulo={advogado.titulo}
                  social={advogado.sociais}
                  />
              </div>
            </div>
          </div>

          {/* Artigos - Seção com Paginação */}
          {artigos.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">
                Artigos
              </h3>

              {/* Grid de Artigos - Paginado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {displayedArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ArticleCard
                      articleId={article.id}
                      articleImg={article.articleImage || article.thumbnail}
                      articleTitle={article.title}
                      tags={article.tags}
                    />
                  </div>
                ))}
              </div>

              {/* Indicadores de Paginação - Bolinhas */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`transition-all duration-500 rounded-full hover:scale-125 transform ${
                        currentPage === index
                          ? 'bg-primary w-4 h-4 shadow-lg scroll-indicator-active'
                          : 'bg-gray-300 w-2 h-2 hover:bg-primary/60'
                      }`}
                      aria-label={`Ir para página ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Voltar */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/#equipe"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
            >
              <Icon icon="mdi:arrow-left" className="text-xl" />
              Voltar para a equipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
