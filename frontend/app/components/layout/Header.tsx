'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnConsultingHero, setIsOnConsultingHero] = useState(true);

  // Detectar scroll para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar se está na seção ConsultingHero
  useEffect(() => {
    const consultingSection = document.getElementById('consulting-hero');
    if (!consultingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnConsultingHero(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(consultingSection);
    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { id: 'hero', label: 'Início' },
    { id: 'area-atuacao', label: 'Área de Atuação' },
    { id: 'sobre-nos', label: 'Sobre Nós' },
    { id: 'equipe', label: 'Equipe' },
    { id: 'contato', label: 'Contato' },
    { id: 'noticias', label: 'Notícias' },
  ];

  // Função de scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Altura do header fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isOnConsultingHero 
          ? 'bg-transparent backdrop-blur-0' 
          : 'bg-white/80 backdrop-blur-lg shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Image
              src="/logo-test.svg"
              alt="Clodonil Monteiro Advocacia"
              width={180}
              height={40}
              priority
              className="h-10 w-auto transition-transform hover:scale-105 duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    isOnConsultingHero 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
            ))}
          </nav>

          {/* Icons e Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <button className={`p-2 rounded-full transition-all duration-300 ${
              isOnConsultingHero 
                ? 'text-white hover:bg-white/10' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <Icon icon="mdi:magnify" className="w-5 h-5" />
            </button>

            {/* Button */}
            <button className="bg-[#E86100] hover:bg-secondary text-white text-sm font-bold px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg">
              Acessar Clodonews
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-all duration-300"
            aria-label="Menu"
          >
            <div className="flex flex-col space-y-1.5">
              <span className={`block w-6 h-0.5 bg-[#2C3056] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#2C3056] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#2C3056] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="flex flex-col space-y-1 py-4 border-t border-slate-200">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-3 px-4 text-[#2C3056] hover:text-secondary hover:bg-slate-50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.label}
              </button>
            ))}
            <button className="mt-4 bg-[#E86100] hover:bg-secondary text-white text-sm font-bold px-6 py-2.5 rounded-full w-full transition-all duration-300">
              Acessar Clodonews
            </button>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}