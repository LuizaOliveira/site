"use client";

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getPosts, deletePost, Post } from '../../lib/api';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';

export default function ArquivoDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();

  const fetchPosts = async () => {
    setIsLoading(true);
    const result = await getPosts();
    if (result.success && result.data) {
      setPosts(result.data);
    } else {
      setError(result.error || 'Erro ao carregar postagens');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
      const result = await deletePost(id);
      if (result.success) {
        setPosts(prev => prev.filter(post => post.id !== id));
      } else {
        alert(result.error || 'Erro ao excluir postagem');
      }
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col ml-64">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 h-20 flex items-center justify-between px-10 border-b border-slate-200">
          <h2 className="text-[#1B1B3A] font-extrabold text-xl tracking-tight">Arquivo de Notícias</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 border-2 border-[#F97D0E] rounded-full flex items-center justify-center font-black">A</div>
          </div>
        </header>

        <div className="p-10 max-w-6xl w-full mx-auto space-y-6">

          {/* BARRA DE BUSCA E FILTROS */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-[#F97D0E] transition-colors pointer-events-none"
              />
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97D0E]/10 focus:border-[#F97D0E] transition-all shadow-sm text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={fetchPosts} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-sm shadow-sm">
                <Icon icon="solar:refresh-bold-duotone" className={`text-lg text-[#F97D0E] ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Histórico de Publicações</span>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-bold">{filteredPosts.length} Itens</span>
            </div>

            {error && (
              <div className="p-8 text-center">
                <p className="text-red-500 font-medium">{error}</p>
                <button onClick={fetchPosts} className="mt-4 text-[#F97D0E] font-bold hover:underline">Tentar novamente</button>
              </div>
            )}

            {isLoading ? (
              <div className="p-20 flex flex-col items-center justify-center gap-4">
                <Icon icon="solar:loading-bold-duotone" className="text-4xl text-[#F97D0E] animate-spin" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carregando postagens...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/30">
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Notícia</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredPosts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-medium">Nenhuma postagem encontrada.</td>
                      </tr>
                    ) : filteredPosts.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                        <td className="px-8 py-5">
                          <span className="font-bold text-[#1B1B3A] block">{item.title}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-medium">ID: #{item.id}</span>
                        </td>
                        <td className="py-5 text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${item.published ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                            {item.published ? 'Publicado' : 'Rascunho'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a href={item.file} target="_blank" rel="noopener noreferrer" title="Visualizar PDF" className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                              <Icon icon="solar:eye-bold" className="text-xl" />
                            </a>
                            <button onClick={() => handleDelete(item.id)} title="Excluir" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                              <Icon icon="solar:trash-bin-trash-bold" className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGINAÇÃO SIMPLIFICADA */}
            <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Mostrando {filteredPosts.length} notícias</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
