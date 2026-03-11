/**
 * Constantes de animação baseadas em Material Design
 * e melhores práticas de UX
 */

export const DURATIONS = {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    slowest: 1.2,
} as const

export const EASINGS = {
    easeOut: 'power2.out',      // Entrada de elementos
    easeIn: 'power2.in',        // Saída de elementos
    easeInOut: 'power2.inOut',  // Transições
    elastic: 'elastic.out(1, 0.5)',
    back: 'back.out(1.7)',
} as const

export const STAGGER = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    golden: 0.161803398875,  // Proporção áurea
} as const

export const SCROLL_TRIGGER_DEFAULTS = {
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play reverse play reverse',
} as const
