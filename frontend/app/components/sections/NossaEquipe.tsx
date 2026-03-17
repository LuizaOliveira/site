"use client";

import Image from "next/image";
import { SectionTitle } from "../ui/SectionTitle";
import { AdvCard } from "../ui/AdvCard";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { advogados } from "../../data/advogados";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NossaEquipe() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardInfoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fundadoresESocios = advogados.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;

    const containerWidth = scrollRef.current.offsetWidth;

    scrollRef.current.scrollTo({
      left: containerWidth * index,
      behavior: 'smooth'
    });

    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animar elementos principais
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        cardInfoRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animar cards dos advogados
      const advCards = document.querySelectorAll('.adv-card-item');
      if (advCards && advCards.length > 0) {
        gsap.set(advCards, {
          opacity: 0,
          y: 80
        });

        gsap.to(advCards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.adv-cards-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const loremIpsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.";

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <section id="equipe" ref={sectionRef} className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
      <h2 className="text-primary text-2xl lg:text-3xl md:text-3xl sm:font-light lg:font-bold mb-4">
        Nosso Corpo 
        <span className="text-secondary">
           {" "}jurídico
        </span>
      </h2>
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10 items-stretch">
          {/* ===== IMAGEM (2/3) ===== */}
          <div ref={imageRef} className="relative lg:col-span-2 h-56 md:h-72 lg:h-120 rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/office-work.svg" // troque pela sua imagem
              alt="Equipe de advogados"
              fill
              priority
              className="object-cover"
            />
            
            {/* Logo no topo esquerdo */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg p-2 shadow-md">
              {/* <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-md flex items-center justify-center">
                <Icon icon="mdi:check" className="text-white w-8 h-8 lg:w-10 lg:h-10" />
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">24.09 × 25</p> */}
            </div>

            {/* Card com texto ilustrativo na base */}
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 flex gap-3 lg:gap-4">
              <div className="bg-white bg-opacity-90 rounded-3xl px-4 lg:px-6 py-3 lg:py-4 shadow-lg">
                <p className="text-gray-700 text-sm lg:text-base font-medium">Texto Ilustrativo</p>
              </div>
              <div className="bg-white bg-opacity-90 rounded-3xl px-4 lg:px-6 py-3 lg:py-4 shadow-lg">
                <p className="text-gray-700 text-sm lg:text-base font-medium">Texto Ilustrativo</p>
              </div>
            </div>
          </div>

          {/* ===== CARD (1/3) ===== */}
          <div ref={cardInfoRef} className="lg:col-span-1  lg:h-120 rounded-[36px] bg-linear-to-br from-[#0B1A3A] via-[#10285C] to-[#061534] p-6 lg:p-10 flex flex-col justify-between shadow-xl">
            {/* Parte superior */}
            <div>
              <div className="inline-block border border-orange-500 px-2 lg:px-4 py-0.5 lg:py-1 rounded-lg mb-6">
                <span className="text-orange-400 text-xs lg:text-sm">Nossa equipe</span>
              </div>

              <h2 className="text-white text-xl  lg:text-3xl font-semibold mb-6 leading-snug">
                Conheça nossos profissionais
              </h2>

              <p className="text-gray-300 leading-relaxed text-xs lg:text-sm mb-10 lg:mb-0">
                Nossa equipe é formada por profissionais experientes em
                diferentes áreas, os quais trabalham de forma integrada e
                utilizam habilidades técnicas coordenadas ligadas a casos
                rotineiros direcionados aos litígios de Servidores Públicos.
              </p>
            </div>

            {/* Botão */}
            <div>
              <button className="bg-orange-500 hover:bg-orange-600 transition text-xs lg:text-sm text-white px-3 lg:px-6 py-3 rounded-full font-medium">
                Marque uma consulta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-primary text-2xl lg:text-3xl md:text-3xl sm:font-light lg:font-bold">
            Advogados, Fundadores 
            <span className="text-secondary">
              <br /> e Sócios
            </span>
          </h2>
          {/* <div className="flex gap-3 ">
            <Link
              href="/equipe"
              className="rounded-full bg-secondary px-4 py-2 md:py-0 flex items-center justify-center font-bold text-sm md:text-base text-white hover:bg-orange-600 transition-colors duration-300"
            >
              Ver mais
            </Link>
            <Link
              href="/equipe"
              className="rounded-full bg-primary w-10 h-10 flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
            >
              <Icon
                icon="humbleicons:chevron-right"
                className="text-white w-5 h-5"
              />
            </Link>
          </div> */}
        </div>

        <div className="">
          {/* Grid para desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-8 my-8 adv-cards-container">
            {fundadoresESocios.map((advogado) => (
              <div key={advogado.id} className="flex justify-center adv-card-item">
                <AdvCard
                  imgSrc={advogado.imagem}
                  nome={advogado.nome}
                  titulo={advogado.titulo}
                />
              </div>
            ))}
          </div>

          {/* Scroll horizontal no mobile e tablet */}
          <div className="lg:hidden relative">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              {fundadoresESocios.map((advogado) => (
                <div 
                  key={advogado.id} 
                  className="shrink-0 w-full md:w-1/2 snap-start px-2 md:px-3 adv-card-item"
                >
                  <div className="flex justify-center">
                    <AdvCard
                      imgSrc={advogado.imagem}
                      nome={advogado.nome}
                      titulo={advogado.titulo}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores de página */}
            <div className="flex justify-center items-center gap-2 mt-6 pb-4">
              {fundadoresESocios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index 
                      ? 'bg-orange-500 w-6' 
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
