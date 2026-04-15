"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { advogados } from '../../data/advogados';
import { createArticle, uploadFile } from '../../lib/api';

interface ArticleFormData {
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  articleImage: string;
  published: boolean;
}

interface FileData {
  coverImageFile: File | null;
}

export default function AdminArtigosPage() {
  const { user } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState({ coverImage: false });
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    description: '',
    author: '',
    thumbnail: '',
    articleImage: '',
    published: false,
  });
  const [selectedFiles, setSelectedFiles] = useState<FileData>({
    coverImageFile: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleFileSelect = (file: File) => {
    setError('');
    setSelectedFiles({ coverImageFile: file });
  };

  const uploadCoverImage = async (): Promise<string | null> => {
    if (formData.thumbnail) {
      return formData.thumbnail;
    }

    if (!selectedFiles.coverImageFile) {
      return null;
    }

    setUploadProgress({ coverImage: true });
    try {
      const result = await uploadFile(selectedFiles.coverImageFile);

      if (!result.success || !result.url) {
        throw new Error(result.error || 'Erro no upload da imagem de capa');
      }

      setFormData((prev) => ({
        ...prev,
        thumbnail: result.url!,
        articleImage: result.url!,
      }));

      return result.url;
    } finally {
      setUploadProgress({ coverImage: false });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      author: '',
      thumbnail: '',
      articleImage: '',
      published: false,
    });
    setSelectedFiles({ coverImageFile: null });
  };

  const handleSubmit = async (published: boolean) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!formData.title.trim()) {
      setError('Título do artigo é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Descrição é obrigatória');
      setIsLoading(false);
      return;
    }

    if (!formData.author.trim()) {
      setError('Selecione um autor');
      setIsLoading(false);
      return;
    }

    if (!selectedFiles.coverImageFile && !formData.thumbnail) {
      setError('Imagem de capa é obrigatória');
      setIsLoading(false);
      return;
    }

    try {
      const coverImageUrl = await uploadCoverImage();

      if (!coverImageUrl) {
        setError('Erro ao processar imagem de capa. Tente novamente.');
        setIsLoading(false);
        return;
      }

      const result = await createArticle({
        title: formData.title.trim(),
        description: formData.description.trim(),
        author: formData.author,
        thumbnail: coverImageUrl,
        articleImage: coverImageUrl,
        articleFile: '',
        content: formData.description.trim(),
        published,
      });

      if (result.success) {
        setSuccess(published ? 'Artigo publicado com sucesso!' : 'Rascunho salvo com sucesso!');
        resetForm();
      } else {
        setError(result.error || 'Erro ao salvar artigo');
      }
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Erro durante o processo de envio'
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      <AdminSidebar />

      <main className="flex-1 flex flex-col ml-64">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 h-20 flex items-center justify-between px-10 border-b border-slate-200">
          <div>
            <h2 className="text-[#1B1B3A] font-extrabold text-xl tracking-tight">Criar Artigo</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
              Dashboard &gt; Artigos &gt; Novo
            </p>
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
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Informações Gerais
              </span>
              <div className="flex items-center gap-2">
                {(uploadProgress.coverImage || isLoading) && (
                  <span className="text-[10px] bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md font-bold italic flex items-center gap-1">
                    <Icon
                      icon="solar:loading-bold-duotone"
                      className="animate-spin text-xs"
                    />
                    Processando...
                  </span>
                )}
                <span
                  className={`text-[10px] px-2 py-1 rounded-md font-bold italic ${
                    formData.title && formData.author && formData.description && formData.thumbnail
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {formData.title && formData.author && formData.description && formData.thumbnail
                    ? 'Pronto para Publicar'
                    : 'Rascunho Automático'}
                </span>
              </div>
            </div>

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
                    Título do Artigo *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Alterações recentes no regime jurídico dos servidores"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:bg-white focus:border-[#F97D0E] focus:ring-4 focus:ring-[#F97D0E]/10 transition-all text-slate-800 font-medium placeholder:text-slate-400"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest transition-colors group-focus-within:text-[#F97D0E]">
                    Autor *
                  </label>
                  <div className="relative">
                    <select
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full appearance-none px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:bg-white focus:border-[#F97D0E] focus:ring-4 focus:ring-[#F97D0E]/10 transition-all text-slate-800 font-medium"
                    >
                      <option value="">Selecione um autor</option>
                      {advogados.map((advogado) => (
                        <option key={advogado.id} value={advogado.nome}>
                          {advogado.nome}
                        </option>
                      ))}
                    </select>
                    <Icon
                      icon="solar:alt-arrow-down-bold"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest transition-colors group-focus-within:text-[#F97D0E]">
                    Descrição *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Resumo do artigo para exibição nas páginas de listagem..."
                    maxLength={700}
                    rows={6}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:bg-white focus:border-[#F97D0E] focus:ring-4 focus:ring-[#F97D0E]/10 transition-all text-slate-800 font-medium placeholder:text-slate-400 resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">{formData.description.length}/700</p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div>
                  <label className="block text-xs font-black text-[#1B1B3A] mb-2 uppercase tracking-widest">
                    Imagem de Capa *
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('image/') && !uploadProgress.coverImage) {
                        handleFileSelect(file);
                      }
                    }}
                    className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 group ${
                      dragActive && !uploadProgress.coverImage
                        ? 'border-[#F97D0E] bg-orange-50/50 scale-[1.02]'
                        : 'border-slate-300 bg-slate-50 hover:border-[#F97D0E]/50 hover:bg-slate-100/50'
                    }`}
                  >
                    {uploadProgress.coverImage ? (
                      <div className="flex flex-col items-center">
                        <Icon
                          icon="solar:loading-bold-duotone"
                          className="text-[#F97D0E] animate-spin text-4xl mb-4"
                        />
                        <p className="text-sm text-[#F97D0E] font-bold">Enviando imagem...</p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`p-4 rounded-full mb-4 transition-colors ${
                            dragActive
                              ? 'bg-[#F97D0E] text-white'
                              : 'bg-white text-slate-400 shadow-sm group-hover:text-[#F97D0E]'
                          }`}
                        >
                          <Icon icon="solar:upload-minimalistic-bold-duotone" className="text-3xl" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && !uploadProgress.coverImage) {
                              handleFileSelect(file);
                            }
                          }}
                          disabled={uploadProgress.coverImage || isLoading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <p className="text-sm text-slate-600 font-bold">
                          Solte a imagem ou{' '}
                          <span className="text-[#F97D0E] hover:underline transition-all">
                            navegue
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">
                          JPG, PNG ou WEBP (Max 100MB)
                        </p>
                      </>
                    )}

                    {(selectedFiles.coverImageFile || formData.thumbnail) && !uploadProgress.coverImage && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <Icon icon="solar:check-circle-bold" className="text-green-600 text-lg" />
                        <p className="text-xs text-green-600 font-medium">
                          {formData.thumbnail
                            ? 'Imagem enviada para a Cloudinary'
                            : `Imagem selecionada: ${selectedFiles.coverImageFile?.name}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => handleSubmit(true)}
                    disabled={
                      isLoading ||
                      uploadProgress.coverImage ||
                      !formData.title ||
                      !formData.author ||
                      !formData.description ||
                      (!selectedFiles.coverImageFile && !formData.thumbnail)
                    }
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
                    disabled={
                      isLoading ||
                      uploadProgress.coverImage ||
                      !formData.title ||
                      !formData.author ||
                      !formData.description
                    }
                    className="w-full py-4 text-slate-400 hover:text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed font-bold text-xs uppercase transition-all tracking-widest"
                  >
                    {isLoading ? 'Salvando Rascunho...' : 'Salvar como Rascunho'}
                  </button>

                  {uploadProgress.coverImage && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-2">
                        <Icon icon="solar:loading-bold-duotone" className="animate-spin" />
                        Enviando imagem de capa...
                      </p>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-slate-400">
                    <p className="font-bold uppercase tracking-widest mb-2">Requisitos:</p>
                    <div className="space-y-1">
                      <p
                        className={`flex items-center gap-2 ${
                          formData.title ? 'text-green-600' : 'text-slate-400'
                        }`}
                      >
                        <Icon
                          icon={
                            formData.title
                              ? 'solar:check-circle-bold'
                              : 'solar:close-circle-bold'
                          }
                        />
                        Título preenchido
                      </p>
                      <p
                        className={`flex items-center gap-2 ${
                          formData.author ? 'text-green-600' : 'text-slate-400'
                        }`}
                      >
                        <Icon
                          icon={
                            formData.author
                              ? 'solar:check-circle-bold'
                              : 'solar:close-circle-bold'
                          }
                        />
                        Autor selecionado
                      </p>
                      <p
                        className={`flex items-center gap-2 ${
                          formData.description ? 'text-green-600' : 'text-slate-400'
                        }`}
                      >
                        <Icon
                          icon={
                            formData.description
                              ? 'solar:check-circle-bold'
                              : 'solar:close-circle-bold'
                          }
                        />
                        Descrição preenchida
                      </p>
                      <p
                        className={`flex items-center gap-2 ${
                          selectedFiles.coverImageFile || formData.thumbnail
                            ? 'text-green-600'
                            : 'text-slate-400'
                        }`}
                      >
                        <Icon
                          icon={
                            selectedFiles.coverImageFile || formData.thumbnail
                              ? 'solar:check-circle-bold'
                              : 'solar:close-circle-bold'
                          }
                        />
                        Imagem de capa{' '}
                        {formData.thumbnail
                          ? '(enviada)'
                          : selectedFiles.coverImageFile
                            ? '(selecionada)'
                            : ''}
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
