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
  const [isFullscreenViewerOpen, setIsFullscreenViewerOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
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
  const fullscreenViewerRef = useRef<HTMLDivElement>(null);

  // Buscar posts do banco de dados
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const result = await getPosts();

        if (result.success && result.data) {
            // Filtrar apenas posts publicados e ordenar do mais recente para o mais antigo
            const postsArray = Array.isArray(result.data)
              ? result.data
              : (result.data as any).data;
            const publishedPosts = (postsArray || [])
              .filter((post: Post) => post.published)
              .sort(
                (a: Post, b: Post) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
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

  const newsCards = posts.slice(1);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const openFullscreenViewer = async (pdfUrl: string) => {
    setSelectedPdfUrl(pdfUrl);
    setIsFullscreenViewerOpen(true);

    if (document.fullscreenElement || !fullscreenViewerRef.current) return;

    try {
      await fullscreenViewerRef.current.requestFullscreen();
    } catch (fullscreenError) {
      console.error('Erro ao entrar em fullscreen:', fullscreenError);
    }
  };

  const closeFullscreenViewer = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (fullscreenError) {
        console.error('Erro ao sair do fullscreen:', fullscreenError);
      }
    }

    setIsFullscreenViewerOpen(false);
    setSelectedPdfUrl(null);
  }, []);

  useEffect(() => {
    if (!isFullscreenViewerOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFullscreenViewer();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenViewerOpen(false);
        setSelectedPdfUrl(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreenViewerOpen, closeFullscreenViewer]);

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
              <div className={`lg:flex hidden items-center gap-2 mb-4 `}>
                <span className="w-4 h-1 bg-[#E86000] rounded-full"></span>
                <span className={`font-normal text-sm text-darkgray`}>Aqui o servidor público tem voz</span>
              </div>
              <h2 className={`text-2xl font-light lg:text-4xl lg:font-bold lg:font-red-hat-text `}>
                <span className={` text-primary`}>Últimas </span>
                <span className="text-[#E86000]"> notícias & <br />conteúdos</span>
              </h2>
            </div>


          </div>
          <div className="flex gap-4 items-start lg:items-center">
            {/* Toggle para alternar entre versões */}
            {/* <button 
              onClick={() => setShowNavigationButtons(!showNavigationButtons)}
              className="bg-gray-200 px-3 py-2 text-sm rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              title={showNavigationButtons ? "Ocultar botões de navegação" : "Mostrar botões de navegação"}
            >
              <Icon icon={showNavigationButtons ? "mdi:eye-off" : "mdi:eye"} className="w-4 h-4" />
              {showNavigationButtons ? "Sem botões" : "Com botões"}
            </button> */}
            <button className="bg-[#11213F] px-4 py-3 text-xs lg:text-sm text-white rounded-xl hover:bg-secondary transition-colors flex items-center gap-2 self-start">
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

              <button
                type="button"
                onClick={() => openFullscreenViewer(post.file)}
                className="absolute bottom-8 right-3 bg-[#E86000] w-10 h-10 rounded-full flex justify-center items-center rotate-45 translate-y-2 hover:bg-[#d95700] transition-colors"
                aria-label={`Abrir PDF ${post.title} em tela cheia`}
              >
                <Icon icon="fluent:arrow-up-28-filled" className="w-5 h-5 text-primary" />
              </button>
            </div>
          ))}
          </div>
       </div>

        <div
          ref={fullscreenViewerRef}
          className={`fixed inset-0 z-100 bg-white ${isFullscreenViewerOpen && selectedPdfUrl ? 'block' : 'hidden'}`}
        >
          {isFullscreenViewerOpen && selectedPdfUrl && (
            <div className="relative h-full w-full">
              <button
                type="button"
                onClick={closeFullscreenViewer}
                className="absolute top-2 right-2 z-101 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                aria-label="Fechar visualizador"
              >
                <Icon icon="mdi:close" className="w-5 h-5 text-primary" />
              </button>

              <div className="h-full">
                <SimplePDFViewer pdfUrl={selectedPdfUrl} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}