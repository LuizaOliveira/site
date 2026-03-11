"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button } from '../../components/ui/Button';
import { createPost, uploadFile, CreatePostData } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/layout/AdminSidebar';

interface PostData {
  title: string;
  thumbnail: string;
  file: string;
  newsImage: string;
  description: string;
  published: boolean;
}

interface FileData {
  thumbnailFile: File | null;
  pdfFile: File | null;
  newsImageFile: File | null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState({ thumbnail: false, file: false, newsImage: false });
  const [formData, setFormData] = useState<PostData>({
    title: '',
    thumbnail: '',
    file: '',
    newsImage: '',
    description: '',
    published: false
  });
  const [selectedFiles, setSelectedFiles] = useState<FileData>({
    thumbnailFile: null,
    pdfFile: null,
    newsImageFile: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpar erro ao digitar
  };

  const handleFileSelect = (file: File, type: 'thumbnail' | 'file' | 'newsImage') => {
    setError('');

    if (type === 'thumbnail') {
      setSelectedFiles(prev => ({ ...prev, thumbnailFile: file }));
    } else if (type === 'file') {
      setSelectedFiles(prev => ({ ...prev, pdfFile: file }));
    } else if (type === 'newsImage') {
      setSelectedFiles(prev => ({ ...prev, newsImageFile: file }));
    }
  };

  const uploadFiles = async () => {
    const uploads: Promise<{ type: string; url?: string }>[] = [];
    const uploadedUrls: { thumbnail?: string; file?: string; newsImage?: string } = {};

    if (selectedFiles.thumbnailFile && !formData.thumbnail) {
      setUploadProgress(prev => ({ ...prev, thumbnail: true }));
      uploads.push(
        uploadFile(selectedFiles.thumbnailFile).then(result => {
          if (result.success && result.url) {
            uploadedUrls.thumbnail = result.url;
            setFormData(prev => ({ ...prev, thumbnail: result.url! }));
            return { type: 'thumbnail', url: result.url };
          } else {
            throw new Error(result.error || 'Erro no upload da imagem');
          }
        }).finally(() => {
          setUploadProgress(prev => ({ ...prev, thumbnail: false }));
        })
      );
    }

    if (selectedFiles.pdfFile && !formData.file) {
      setUploadProgress(prev => ({ ...prev, file: true }));
      uploads.push(
        uploadFile(selectedFiles.pdfFile).then(result => {
          if (result.success && result.url) {
            uploadedUrls.file = result.url;
            setFormData(prev => ({ ...prev, file: result.url! }));
            return { type: 'file', url: result.url };
          } else {
            throw new Error(result.error || 'Erro no upload do PDF');
          }
        }).finally(() => {
          setUploadProgress(prev => ({ ...prev, file: false }));
        })
      );
    }

    if (selectedFiles.newsImageFile && !formData.newsImage) {
      setUploadProgress(prev => ({ ...prev, newsImage: true }));
      uploads.push(
        uploadFile(selectedFiles.newsImageFile).then(result => {
          if (result.success && result.url) {
            uploadedUrls.newsImage = result.url;
            setFormData(prev => ({ ...prev, newsImage: result.url! }));
            return { type: 'newsImage', url: result.url };
          } else {
            throw new Error(result.error || 'Erro no upload da imagem de notícia');
          }
        }).finally(() => {
          setUploadProgress(prev => ({ ...prev, newsImage: false }));
        })
      );
    }

    if (uploads.length > 0) {
      try {
        await Promise.all(uploads);
        setSuccess('Arquivos enviados com sucesso!');
        return uploadedUrls;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro no upload');
        throw error;
      }
    }

    return {};
  };

  const handleSubmit = async (published: boolean) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validações
    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!selectedFiles.thumbnailFile && !formData.thumbnail) {
      setError('Imagem de capa é obrigatória');
      setIsLoading(false);
      return;
    }

    if (!selectedFiles.pdfFile && !formData.file) {
      setError('Arquivo principal é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!selectedFiles.newsImageFile && !formData.newsImage) {
      setError('Imagem de notícia é obrigatória');
      setIsLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Descrição é obrigatória');
      setIsLoading(false);
      return;
    }

    try {
      // Fazer upload dos arquivos se necessário
      const uploadedUrls = await uploadFiles();

      // Usar URLs retornadas do upload, ou as URLs já existentes no formData
      const finalData = {
        title: formData.title.trim(),
        thumbnail: uploadedUrls.thumbnail || formData.thumbnail,
        file: uploadedUrls.file || formData.file,
        newsImage: uploadedUrls.newsImage || formData.newsImage,
        description: formData.description.trim(),
        published
      };

      // Validação final das URLs
      if (!finalData.thumbnail || !finalData.file || !finalData.newsImage) {
        setError('Erro ao processar os arquivos. Tente novamente.');
        setIsLoading(false);
        return;
      }

      const result = await createPost(finalData);

      if (result.success) {
        setSuccess(published ? 'Post publicado com sucesso!' : 'Rascunho salvo com sucesso!');

        // Limpar formulário após sucesso
        setFormData({
          title: '',
          thumbnail: '',
          file: '',
          newsImage: '',
          description: '',
          published: false
        });
        setSelectedFiles({
          thumbnailFile: null,
          pdfFile: null,
          newsImageFile: null
        });
      } else {
        setError(result.error || 'Erro ao salvar post');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro durante o processo de envio');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">

      <AdminSidebar />
        
        <main className="flex-1 flex flex-col ml-64">


          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 h-20 flex items-center justify-between px-10 border-b border-slate-200">
            <div>
              <h2 className="text-[#1B1B3A] font-extrabold text-xl tracking-tight">Criar Publicação</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Dashboard &gt; Notícias &gt; Novo</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-[#1B1B3A]">{user?.name || 'Usuário'}</p>
                <p className="text-[10px] text-green-500 font-bold uppercase">Online agora</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 border-2 border-[#F97D0E] rounded-full flex items-center justify-center text-[#1B1B3A] font-black shadow-inner">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </header>


          <div className="p-10 max-w-6xl w-full mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Informações Gerais</span>
                <div className="flex items-center gap-2">
                  {(uploadProgress.thumbnail || uploadProgress.file || isLoading) && (
                    <span className="text-[10px] bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md font-bold italic flex items-center gap-1">
                      <Icon icon="solar:loading-bold-duotone" className="animate-spin text-xs" />
                      Processando...
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-1 rounded-md font-bold italic ${formData.title && formData.thumbnail && formData.file
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600'
                    }`}>
                    {formData.title && formData.thumbnail && formData.file ? 'Pronto para Publicar' : 'Rascunho Automático'}
                  </span>
                </div>
              </div>

              {/* Mensagens de feedback */}
              {error && (
                <div className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mx-8 mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                  {success}
                </div>
              )}

              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">


                <div className="lg:col-span-7 space-y-8">
                  <div className="group">
                    <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest transition-colors group-focus-within:text-[#F97D0E]">
                      Título da Notícia *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Novo decreto municipal sobre educação..."
                      required
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:bg-white focus:border-[#F97D0E] focus:ring-4 focus:ring-[#F97D0E]/10 transition-all text-slate-800 font-medium placeholder:text-slate-400"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest transition-colors group-focus-within:text-[#F97D0E]">
                      Descrição *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Descrição breve da notícia (máximo 500 caracteres)..."
                      maxLength={500}
                      rows={4}
                      required
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:bg-white focus:border-[#F97D0E] focus:ring-4 focus:ring-[#F97D0E]/10 transition-all text-slate-800 font-medium placeholder:text-slate-400 resize-none"
                    />
                    <p className="text-xs text-slate-400 mt-1">{formData.description.length}/500</p>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest">
                      Upload do Arquivo Principal (PDF) *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file, 'file');
                        }}
                        disabled={uploadProgress.file || isLoading}
                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-[#F97D0E] transition-all text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#F97D0E] file:text-white file:text-xs file:font-bold disabled:opacity-50"
                      />
                      {uploadProgress.file && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Icon icon="solar:loading-bold-duotone" className="text-[#F97D0E] animate-spin text-xl" />
                        </div>
                      )}
                    </div>
                    {(selectedFiles.pdfFile || formData.file) && !uploadProgress.file && (
                      <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                        <Icon icon="solar:check-circle-bold" className="text-sm" />
                        {formData.file ? 'Arquivo enviado para servidor' : `Arquivo selecionado: ${selectedFiles.pdfFile?.name}`}
                      </p>
                    )}
                  </div>
                </div>


                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest">Imagem de Capa (Thumbnail) *</label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith('image/') && !uploadProgress.thumbnail) {
                          handleFileSelect(file, 'thumbnail');
                        }
                      }}
                      className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 group ${dragActive && !uploadProgress.thumbnail ? 'border-[#F97D0E] bg-orange-50/50 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:border-[#F97D0E]/50 hover:bg-slate-100/50'
                        }`}
                    >
                      {uploadProgress.thumbnail ? (
                        <div className="flex flex-col items-center">
                          <Icon icon="solar:loading-bold-duotone" className="text-[#F97D0E] animate-spin text-4xl mb-4" />
                          <p className="text-sm text-[#F97D0E] font-bold">Enviando imagem...</p>
                        </div>
                      ) : (
                        <>
                          <div className={`p-4 rounded-full mb-4 transition-colors ${dragActive ? 'bg-[#F97D0E] text-white' : 'bg-white text-slate-400 shadow-sm group-hover:text-[#F97D0E]'}`}>
                            <Icon icon="solar:upload-minimalistic-bold-duotone" className="text-3xl" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && !uploadProgress.thumbnail) handleFileSelect(file, 'thumbnail');
                            }}
                            disabled={uploadProgress.thumbnail || isLoading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <p className="text-sm text-slate-600 font-bold">
                            Solte a imagem ou <span className="text-[#F97D0E] hover:underline transition-all">navegue</span>
                          </p>
                          <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">JPG, PNG ou WEBP (Max 100MB)</p>
                        </>
                      )}

                      {(selectedFiles.thumbnailFile || formData.thumbnail) && !uploadProgress.thumbnail && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                          <Icon icon="solar:check-circle-bold" className="text-green-600 text-lg" />
                          <p className="text-xs text-green-600 font-medium">
                            {formData.thumbnail ? 'Imagem enviada para servidor' : `Imagem selecionada: ${selectedFiles.thumbnailFile?.name}`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest">Imagem de Notícia *</label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith('image/') && !uploadProgress.newsImage) {
                          handleFileSelect(file, 'newsImage');
                        }
                      }}
                      className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 group ${dragActive && !uploadProgress.newsImage ? 'border-[#F97D0E] bg-orange-50/50 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:border-[#F97D0E]/50 hover:bg-slate-100/50'
                        }`}
                    >
                      {uploadProgress.newsImage ? (
                        <div className="flex flex-col items-center">
                          <Icon icon="solar:loading-bold-duotone" className="text-[#F97D0E] animate-spin text-4xl mb-4" />
                          <p className="text-sm text-[#F97D0E] font-bold">Enviando imagem...</p>
                        </div>
                      ) : (
                        <>
                          <div className={`p-4 rounded-full mb-4 transition-colors ${dragActive ? 'bg-[#F97D0E] text-white' : 'bg-white text-slate-400 shadow-sm group-hover:text-[#F97D0E]'}`}>
                            <Icon icon="solar:upload-minimalistic-bold-duotone" className="text-3xl" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && !uploadProgress.newsImage) handleFileSelect(file, 'newsImage');
                            }}
                            disabled={uploadProgress.newsImage || isLoading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <p className="text-sm text-slate-600 font-bold">
                            Solte a imagem ou <span className="text-[#F97D0E] hover:underline transition-all">navegue</span>
                          </p>
                          <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">JPG, PNG ou WEBP (Max 100MB)</p>
                        </>
                      )}

                      {(selectedFiles.newsImageFile || formData.newsImage) && !uploadProgress.newsImage && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                          <Icon icon="solar:check-circle-bold" className="text-green-600 text-lg" />
                          <p className="text-xs text-green-600 font-medium">
                            {formData.newsImage ? 'Imagem enviada para servidor' : `Imagem selecionada: ${selectedFiles.newsImageFile?.name}`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => handleSubmit(true)}
                      disabled={isLoading || uploadProgress.thumbnail || uploadProgress.file || uploadProgress.newsImage || !formData.title || !formData.description || (!selectedFiles.pdfFile && !formData.file) || (!selectedFiles.thumbnailFile && !formData.thumbnail) || (!selectedFiles.newsImageFile && !formData.newsImage)}
                      className="w-full py-5 bg-[#F97D0E] hover:bg-[#e06d0a] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Icon icon="solar:loading-bold-duotone" className="text-xl animate-spin" />
                          Publicando...
                        </>
                      ) : (
                        <>
                          <Icon icon="solar:paper-plane-bold-duotone" className="text-xl" />
                          Publicar Agora
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSubmit(false)}
                      disabled={isLoading || uploadProgress.thumbnail || uploadProgress.file || uploadProgress.newsImage || !formData.title || !formData.description}
                      className="w-full py-4 text-slate-400 hover:text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed font-bold text-xs uppercase transition-all tracking-widest"
                    >
                      {isLoading ? 'Salvando Rascunho...' : 'Salvar como Rascunho'}
                    </button>

                    {/* Indicadores de progresso */}
                    {(uploadProgress.thumbnail || uploadProgress.file || uploadProgress.newsImage) && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-600 font-medium flex items-center gap-2">
                          <Icon icon="solar:loading-bold-duotone" className="animate-spin" />
                          {uploadProgress.thumbnail && uploadProgress.file && uploadProgress.newsImage ? 'Enviando arquivos...' :
                            uploadProgress.thumbnail && uploadProgress.newsImage ? 'Enviando imagens...' :
                            uploadProgress.file && uploadProgress.newsImage ? 'Enviando arquivo e imagem...' :
                            uploadProgress.thumbnail ? 'Enviando imagem de capa...' :
                            uploadProgress.file ? 'Enviando PDF...' :
                            'Enviando imagem de notícia...'}
                        </p>
                      </div>
                    )}

                    {/* Resumo dos requisitos */}
                    <div className="mt-4 text-xs text-slate-400">
                      <p className="font-bold uppercase tracking-widest mb-2">Requisitos:</p>
                      <div className="space-y-1">
                        <p className={`flex items-center gap-2 ${formData.title ? 'text-green-600' : 'text-slate-400'}`}>
                          <Icon icon={formData.title ? "solar:check-circle-bold" : "solar:close-circle-bold"} />
                          Título preenchido
                        </p>
                        <p className={`flex items-center gap-2 ${formData.description ? 'text-green-600' : 'text-slate-400'}`}>
                          <Icon icon={formData.description ? "solar:check-circle-bold" : "solar:close-circle-bold"} />
                          Descrição preenchida
                        </p>
                        <p className={`flex items-center gap-2 ${(selectedFiles.thumbnailFile || formData.thumbnail) ? 'text-green-600' : 'text-slate-400'}`}>
                          <Icon icon={(selectedFiles.thumbnailFile || formData.thumbnail) ? "solar:check-circle-bold" : "solar:close-circle-bold"} />
                          Imagem de capa {formData.thumbnail ? '(enviada)' : selectedFiles.thumbnailFile ? '(selecionada)' : ''}
                        </p>
                        <p className={`flex items-center gap-2 ${(selectedFiles.newsImageFile || formData.newsImage) ? 'text-green-600' : 'text-slate-400'}`}>
                          <Icon icon={(selectedFiles.newsImageFile || formData.newsImage) ? "solar:check-circle-bold" : "solar:close-circle-bold"} />
                          Imagem de notícia {formData.newsImage ? '(enviada)' : selectedFiles.newsImageFile ? '(selecionada)' : ''}
                        </p>
                        <p className={`flex items-center gap-2 ${(selectedFiles.pdfFile || formData.file) ? 'text-green-600' : 'text-slate-400'}`}>
                          <Icon icon={(selectedFiles.pdfFile || formData.file) ? "solar:check-circle-bold" : "solar:close-circle-bold"} />
                          Arquivo PDF {formData.file ? '(enviado)' : selectedFiles.pdfFile ? '(selecionado)' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
} 