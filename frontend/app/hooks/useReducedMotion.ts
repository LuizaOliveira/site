"use client"

import { useEffect, useState } from 'react'

/**
 * Hook para detectar preferência de movimento reduzido do usuário
 * Respeita WCAG 2.1 - Animation from Interactions
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        // Verifica se a API está disponível
        if (typeof window === 'undefined' || !window.matchMedia) {
            return
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        // Listener para mudanças na preferência
        const listener = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', listener)
        return () => mediaQuery.removeEventListener('change', listener)
    }, [])

    return prefersReducedMotion
}
