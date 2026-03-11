'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Se ainda está carregando, não redirecionar
        if (loading) return;

        // Se não há usuário autenticado, redirecionar para login
        if (!user) {
            router.push(`/admin?redirect=${encodeURIComponent(pathname)}`);
            return;
        }
    }, [user, loading, router, pathname]);

    // Mostrar spinner enquanto carrega a autenticação
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Icon icon="solar:shield-user-bold" className="text-[#F97D0E] text-6xl animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Icon icon="solar:loading-bold-duotone" className="text-white text-xl animate-spin" />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-600 font-bold text-lg mb-1">Verificando autenticação...</p>
                        <p className="text-slate-400 text-sm">Por favor, aguarde um momento</p>
                    </div>
                </div>
            </div>
        );
    }

    // Se não há usuário, mostrar tela vazia (redirecionamento em progresso)
    if (!user) {
        return null;
    }

    // Se tudo está ok, mostrar o conteúdo protegido
    return <>{children}</>;
}
