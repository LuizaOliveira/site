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
          ? 'bg-white lg:bg-transparent backdrop-blur-0 border-b border-gray-100 lg:border-none' 
          : 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Image
              src="/dark-logo.svg"
              alt="Clodonil Monteiro Advocacia"
              width={170}
              height={50}
              priority
              className="h-8 sm:h-14 md:h-10 w-auto transition-transform hover:scale-105 duration-300 lg:hidden"
            />
            <Image
              src={isOnConsultingHero ? "/logo.svg" : "/dark-logo.svg"}
              alt="Clodonil Monteiro Advocacia"
              width={160}
              height={35}
              priority
              className="hidden h-8 sm:h-9 md:h-10 w-auto transition-transform hover:scale-105 duration-300 lg:block"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
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
          <div className="hidden lg:flex items-center space-x-4">
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

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Search Icon */}
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300">
              <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile menu button - Grid/Dots */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-[#E86100] hover:bg-secondary transition-all duration-300 focus:outline-none"
              aria-label="Menu"
            >
              <Icon 
                icon={isMenuOpen ? "mdi:close" : "mdi:dots-grid"} 
                className="w-6 h-6 text-primary" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 top-14 bg-black/50 z-30 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'fixed left-0 right-0 top-14 z-40 w-screen h-screen bg-red opacity-100 border border-b-gray-200 overflow-y-auto' 
              : 'overflow-hidden max-h-0 opacity-0 pointer-events-none '
          }`}
        >
          <nav className={`flex flex-col space-y-1 py-4 pb-[5vh] border-t rounded-b-2xl transition-colors duration-300 bg-gray-50 ${
            isOnConsultingHero ? 'border-gray-200 lg:border-white/20' : 'border-gray-200'
          }`}>
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${
                  isOnConsultingHero 
                    ? 'text-gray-700 hover:text-secondary hover:bg-gray-50 lg:text-white lg:hover:bg-white/10' 
                    : 'text-gray-700 hover:text-secondary hover:bg-gray-50 border-b-g'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Button */}
            <button className="mt-4 mx-4 bg-[#E86100] hover:bg-secondary text-white text-sm font-bold px-6 py-3 rounded-full w-auto transition-all duration-300 hover:shadow-lg">
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