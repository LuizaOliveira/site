'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
    id: number;
    email: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    name: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
    register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Função para buscar usuário atual
    const getCurrentUser = async (): Promise<{ success: boolean; user?: User }> => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return { success: false };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                return { success: false };
            }

            const userData = await response.json();
            return { success: true, user: userData };
        } catch {
            return { success: false };
        }
    };

    // Função para atualizar dados do usuário
    const refreshUser = async () => {
        setLoading(true);
        try {
            const result = await getCurrentUser();
            if (result.success && result.user) {
                setUser(result.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
        setLoading(false);
    };

    // Função de login
    const login = async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, error: result.error || 'Erro ao fazer login' };
            }

            // Salvar token no localStorage
            if (result.token) {
                localStorage.setItem('authToken', result.token);
            }

            setUser(result.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Erro de rede' };
        }
    };

    // Função de registro
    const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, error: result.error || 'Erro ao registrar' };
            }

            // Salvar token no localStorage
            if (result.token) {
                localStorage.setItem('authToken', result.token);
            }

            setUser(result.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Erro de rede' };
        }
    };

    // Função de logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    // Verificar se há um token válido no carregamento inicial
    useEffect(() => {
        refreshUser();
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar o contexto de autenticação
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
