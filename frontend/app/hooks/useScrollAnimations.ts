"use client"
import { useEffect, useRef, RefObject } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// Hook para efeito parallax
export function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

// Hook para detectar quando elemento entra na viewport
export function useInView(ref: RefObject<HTMLElement>) {
  const isInView = useRef(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])

  return { x, y, isInView }
}

// Hook para scroll suave nos elementos
export function useScrollAnimation() {
  const scrollY = useMotionValue(0)
  const springConfig = { damping: 50, stiffness: 400 }
  const smoothScrollY = useSpring(scrollY, springConfig)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  return { scrollY: smoothScrollY }
}