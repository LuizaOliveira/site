"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../ui/Button';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F5]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Cabeçalho do Painel */}
        <div className="bg-[#1B1B3A] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#273459] rounded-xl mb-4 border border-white/10">
            <Icon icon="material-symbols:admin-panel-settings-outline" className="text-3xl text-[#F97D0E]" />
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-[#6A80B0] text-sm mt-1">Gestão de Conteúdo e Notícias</p>
        </div>

        {/* Formulário de Login */}
        <div className="p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1B1B3A] mb-1.5">Usuário</label>
              <div className="relative">
                <Icon icon="ph:user-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F97D0E] focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="Seu usuário"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B1B3A] mb-1.5">Senha</label>
              <div className="relative">
                <Icon icon="ph:lock-key-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F97D0E] focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              variant="secondary" 
              className="w-full py-3 mt-4 font-bold flex items-center justify-center gap-2"
            >
              <span>Acessar</span>
              <Icon icon="ph:arrow-right-bold" />
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}