"use client"
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

// Versão simplificada sem animações pesadas
export function AnimatedSection({ 
  children, 
  className = ''
}: AnimatedSectionProps) {
  return (
    <div className={`transition-opacity duration-500 ${className}`}>
      {children}
    </div>
  )
}

// Versão simplificada dos containers
export function StaggerContainer({ 
  children, 
  className = ''
}: { 
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function StaggerItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}