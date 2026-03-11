'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { SectionTitle } from '../../ui/SectionTitle';
import { SimplePDFViewer } from './SimplePDFViewer';
import { getPosts } from '../../../lib/api';
import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  file: string;
  thumbnail: string;
  pageCount: number;
  createdAt: string;
  published: boolean;
  newsImage: string;
  description: string;
}

export function NewsFilter() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showNavigationButtons, setShowNavigationButtons] = useState(true);
  // Removendo estados relacionados ao snap para teste
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [dragDistance, setDragDistance] = useState(0);
  // const [shouldSnap, setShouldSnap] = useState(false);
  
  // Removendo ref de snap timeout para teste
  // const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Buscar posts do banco de dados
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const result = await getPosts();

        if (result.success && result.data) {
            // Filtrar apenas posts publicados e pegar os 4 primeiros
            const postsArray = Array.isArray(result.data)
              ? result.data
              : (result.data as any).data;
            const publishedPosts = (postsArray || [])
              .filter((post: Post) => post.published)
              .slice(0, 4);
            setPosts(publishedPosts);
        } else {
          setError(result.error || 'Erro ao carregar posts');
        }
      } catch (err) {
        setError('Erro ao carregar posts');
        console.error('Erro ao buscar posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Cleanup do timeout quando componente for desmontado
  useEffect(() => {
    // Removido cleanup do snap timeout para teste
    return () => {
      // if (snapTimeoutRef.current) {
      //   clearTimeout(snapTimeoutRef.current);
      // }
    };
  }, []);

  // DESATIVADO TEMPORARIAMENTE - Função para snap suave ao card mais próximo
  // const snapToNearestCard = useCallback((force = false) => {
  //   console.log('snapToNearestCard chamado - DESATIVADO');
  //   return; // Desativado para teste
  // }, []);

  // DESATIVADO TEMPORARIAMENTE - Função para detectar se deve aplicar snap após inatividade  
  // const scheduleOptionalSnap = useCallback(() => {
  //   console.log('scheduleOptionalSnap chamado - DESATIVADO');
  //   return; // Desativado para teste
  // }, []);

  // DESATIVADO TEMPORARIAMENTE - Navegação por botões
  // const scrollToIndex = useCallback((index: number) => {
  //   console.log('scrollToIndex chamado para index:', index, '- DESATIVADO');
  //   return; // Desativado para teste
  // }, []);

  // DESATIVADO TEMPORARIAMENTE - Navegação direcional
  // const navigate = useCallback((direction: 'prev' | 'next') => {
  //   console.log('navigate chamado com direção:', direction, '- DESATIVADO');
  //   return; // Desativado para teste
  // }, []);

  // Touch handlers para mobile (versão simplificada para teste)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    
    console.log('Touch start - posição inicial:', e.touches[0].pageX);
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.touches[0].pageX;
    const walk = (startX - x) * 1.5;
    const newScrollLeft = scrollLeft + walk;
    
    console.log('Touch move - nova posição scroll:', newScrollLeft);
    
    // Permitir scroll livre sem restrições - TESTE
    scrollRef.current.scrollLeft = Math.max(0, newScrollLeft);
  };

  const handleTouchEnd = () => {
    console.log('Touch end - posição final scroll:', scrollRef.current?.scrollLeft);
    setIsDragging(false);
    // NÃO CHAMA NENHUMA FUNÇÃO DE REPOSICIONAMENTO
  };

  // Mouse drag para desktop (versão simplificada para teste)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    console.log('Mouse down - posição inicial:', e.pageX);
    
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    
    const x = e.pageX;
    const walk = (startX - x) * 2;
    const newScrollLeft = scrollLeft + walk;
    
    console.log('Mouse move - nova posição scroll:', newScrollLeft);
    
    // Permitir scroll livre com limites naturais
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft));
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    
    console.log('Mouse up - posição final scroll:', scrollRef.current.scrollLeft);
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
    scrollRef.current.style.userSelect = 'auto';
    
    // NÃO CHAMA NENHUMA FUNÇÃO DE REPOSICIONAMENTO
  };

  const handleMouseLeave = () => {
    if (isDragging && scrollRef.current) {
      console.log('Mouse leave - posição final scroll:', scrollRef.current.scrollLeft);
      
      setIsDragging(false);
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
      
      // NÃO CHAMA NENHUMA FUNÇÃO DE REPOSICIONAMENTO
    }
  };

  // Handler para scroll nativo (versão simplificada para teste)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    console.log('Wheel scroll detectado');
    // NÃO FAZ NADA - deixa scroll nativo funcionar livremente
  }, []);

  // Post mais recente para o PDF viewer
  const latestPost = useMemo(() => {
    console.log('Posts disponíveis:', posts);
    const post = posts[0] || {
      id: 1,
      title: 'Teste PDF',
      file: 'https://res.cloudinary.com/dlykmt2r4/image/upload/v1770643668/CLODONEWS_001_fjx1fj.pdf',
      thumbnail: '',
      pageCount: 2,
      createdAt: new Date().toISOString(),
      published: true
    };
    if (!post.pageCount || post.pageCount === 0) {
      post.pageCount = 2;
    }
    return post;
  }, [posts]);

  const newsCards = posts;

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex items-center justify-center">
            <Icon icon="eos-icons:loading" className="w-12 h-12 text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="noticias" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 md:px-0">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-0">
          <div className='x '>
            <div className={` mb-12 lg:mb-16 mt-8`}>
              <div className={`flex items-center gap-2 mb-4 `}>
                <span className="w-4 h-1 bg-[#E86000] rounded-full"></span>
                <span className={`font-normal text-sm text-darkgray`}>Aqui o servidor público tem voz</span>
              </div>
              <h2 className={`lg:text-4xl font-bold font-red-hat-text `}>
                <span className={`  text-primary`}>Últimas </span>
                <span className="text-[#E86000]"> notícias & <br />conteúdos</span>
              </h2>
            </div>


          </div>
          <div className="flex gap-4 items-center">
            {/* Toggle para alternar entre versões */}
            {/* <button 
              onClick={() => setShowNavigationButtons(!showNavigationButtons)}
              className="bg-gray-200 px-3 py-2 text-sm rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              title={showNavigationButtons ? "Ocultar botões de navegação" : "Mostrar botões de navegação"}
            >
              <Icon icon={showNavigationButtons ? "mdi:eye-off" : "mdi:eye"} className="w-4 h-4" />
              {showNavigationButtons ? "Sem botões" : "Com botões"}
            </button> */}
            <button className="bg-[#11213F] px-4 py-2 text-white rounded-xl hover:bg-secondary transition-colors flex items-center gap-2 self-start">
              Ver todas
            </button>
          </div>
        </div>

          {/* Conteúdos e nóticias */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className='flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none scrollbar-hide' 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'auto', // Remover scroll suave automático
              scrollPaddingLeft: '0px',
              WebkitOverflowScrolling: 'touch', // Melhorar scroll no iOS
              overscrollBehaviorX: 'contain' // Evitar bounce desnecessário
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
          >
            <div 
              className='animate-stagger shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.33px)] xl:w-[calc(25%-24px)]' 
              style={{ animationDelay: '0s' }}
            >
              <SimplePDFViewer
                pdfUrl={latestPost.file}
              // totalPages={latestPost.pageCount}
              />
            </div>

          {newsCards.map((post, index) => (
            <div 
              key={post.id} 
              className='relative bg-white rounded-xl shadow-lg p-3 border border-[#D5D5D5] flex flex-col shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.33px)] xl:w-[calc(25%-24px)] animate-stagger'
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <img
                src={post.newsImage}
                alt={post.title}
                className="w-full h-56 object-cover"
              />

              <div className='mx-2 my-5'>
                <span className='text-[#E86000] text-md  font-bold '>{post.title}</span>
                <p className='text-[#8494B8] text-md mt-3'>{post.description}</p>
              </div>

              <div className="absolute  bottom-8 right-3 bg-[#E86000] w-10 h-10 rounded-full flex justify-center items-center rotate-45 translate-y-2">
                <Icon icon="fluent:arrow-up-28-filled" className="w-5 h-5 text-primary " />
              </div>
            </div>
          ))}
          </div>
          {/* Botões de navegação (opcional) */}
          {showNavigationButtons && posts.length > 0 && (
            <>
              {/* <button
                onClick={() => navigate('prev')}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10 border border-gray-200"
                aria-label="Anterior"
              >
                <Icon icon="mdi:chevron-left" className="w-6 h-6 text-[#11213F]" />
              </button>
              
              <button
                onClick={() => navigate('next')}
                disabled={currentIndex >= posts.length}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10 border border-gray-200"
                aria-label="Próximo"
              >
                <Icon icon="mdi:chevron-right" className="w-6 h-6 text-[#11213F]" />
              </button> */}

              {/* Indicadores de página - DESATIVADOS PARA TESTE */}
              {/* <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: posts.length + 1/2 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-[#E86000]' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir para card ${index + 1}`}
                  />
                ))}
              </div> */}
            </>
          )}        </div>
      </div>
    </div>
  );
}