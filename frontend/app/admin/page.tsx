"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações básicas
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email e senha são obrigatórios');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login({ email: formData.email, password: formData.password });

      if (result.success) {
        // Redirecionar para dashboard após login bem-sucedido
        router.push('/admin/dashboard');
      } else {
        setError(result.error || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F5]">
      <div
        className="
          w-full max-w-md bg-white rounded-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          hover:shadow-[0_25px_70px_rgba(0,0,0,0.18)]
          transition-all duration-300
          overflow-hidden border border-gray-100
        "
      >
        
        
        <div className="bg-[#1B1B3A] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#273459] rounded-xl mb-4 border border-white/10">
            <Icon icon="material-symbols:admin-panel-settings-outline" className="text-3xl text-[#F97D0E]" />
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-[#6A80B0] text-sm mt-1">Gestão de Conteúdo e Notícias</p>
        </div>

        
        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Mensagem de erro */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#1B1B3A] mb-1.5">Email</label>
              <div className="relative">
                <Icon icon="ph:user-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border text-gray-500 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F97D0E] focus:border-transparent outline-none transition-all text-sm disabled:opacity-50"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B1B3A] mb-1.5">Senha</label>
              <div className="relative">
                <Icon icon="ph:lock-key-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border text-gray-500 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F97D0E] focus:border-transparent outline-none transition-all text-sm disabled:opacity-50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 font-bold flex items-center justify-center gap-2 bg-[#F97D0E] hover:bg-[#e06d0a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-md"
            >
              {isLoading ? (
                <>
                  <Icon icon="solar:loading-bold-duotone" className="animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span>Acessar Dashboard</span>
                  <Icon icon="ph:arrow-right-bold" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-xs text-[#6A80B0] hover:text-[#1B1B3A] transition-colors flex items-center justify-center mx-auto gap-1"
            >
              <Icon icon="ph:arrow-left" />
              Voltar para o site público
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
