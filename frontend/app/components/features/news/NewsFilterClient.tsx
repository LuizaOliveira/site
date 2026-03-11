import dynamic from 'next/dynamic';

// Desabilitar SSR para o NewsFilter que depende do PDF.js
const NewsFilterDynamic = dynamic(() => import('./NewsFilter').then(mod => mod.NewsFilter), {
  ssr: false,
  loading: () => <div className="text-center py-8">Carregando notícias...</div>,
});

export function NewsFilterClient() {
  return <NewsFilterDynamic />;
}
