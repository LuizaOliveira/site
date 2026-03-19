'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { SectionTitle } from '../ui/SectionTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATIONS, EASINGS } from '../../lib/animations/constants';

gsap.registerPlugin(ScrollTrigger);

export function AreaAtuacao() {
  const statsImages = [
    { src: '/Camada_x0020_1.svg', alt: 'Estado RN', sigla: 'RN', estado: 'Rio Grande do Norte' },
    { src: '/Camada_x0020_1 (1).svg', alt: 'Estado SP', sigla: 'SP', estado: 'Sao Paulo' },
    { src: '/Camada_x0020_1 (2).svg', alt: 'Estado RJ', sigla: 'RJ', estado: 'Rio de Janeiro' },
    { src: '/_36936856.svg', alt: 'Estado MA', sigla: 'MA', estado: 'Maranhao' },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cardElements = cardsGridRef.current?.querySelectorAll('.animatable-card');
      if (cardElements && cardElements.length > 0) {
        gsap.set(cardElements, { opacity: 0, y: 100 });
      }

      let hasAnimated = false;
      const animateAll = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
          0
        );

        if (cardElements && cardElements.length > 0) {
          tl.to(cardElements,
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 },
            0.45
          );

          cardElements.forEach((card: Element) => {
            const cardElement = card as HTMLElement;
            cardElement.addEventListener('mouseenter', () => {
              gsap.to(cardElement, { y: -8, boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)', duration: 0.3, ease: 'power2.out' });
            });
            cardElement.addEventListener('mouseleave', () => {
              gsap.to(cardElement, { y: 0, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)', duration: 0.3, ease: 'power2.out' });
            });
          });
        }
      };

      ScrollTrigger.create({
        trigger: cardsGridRef.current,
        start: 'top 85%',
        once: true,
        onEnter: animateAll
      });
    }, sectionRef);
 
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="area-atuacao" ref={sectionRef} className="bg-white px-4 md:px-12 py-10">
      
      <div className="bg-[#071B42] rounded-3xl p-6 md:p-10 shadow-xl mx-0 md:mx-12 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 mt-4 md:mt-8 gap-8">
            <div className="lg:col-span-8 hidden lg:block">
              <div ref={titleRef}>
                <SectionTitle subtitle='Aqui o servidor público tem voz' title='Nossa' dark centerOnMobile>
                  área de Atuação
                </SectionTitle>
              </div>
            </div>

            <div>
              <div ref={titleRef} className="lg:hidden block">
                <div className="inline-block border border-[#C0C8D9
               
               
               
               ] px-2 lg:px-4 py-0.5 lg:py-1 rounded-lg mb-6">
                  <span className="text-[#C0C8D9] text-xs lg:text-sm">Área de Atuação</span>
                </div>
                <h2 className="text-white text-2xl lg:text-3xl md:text-3xl sm:font-light lg:font-bold mb-4">
                  Soluções Jurídicas
                  <span className="text-secondary">
                    <br />Especializadas
                  </span>
                </h2>

              </div>
            </div>
          </div>

          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-14 mt-10 mb-14' ref={cardsGridRef}>
            {[
              { id: 3, title: 'Professores ativos', content: 'standard dummy text ever since the 1500sstandard dummy text ever since the 1500s' }, 
              { id: 1, title: 'Servidores Ativos', content: 'standard dummy text ever since the 1500sstandard dummy text ever since the 1500s' }, 
              { id: 2, title: 'Professores aposentados', content: 'standard dummy text ever since the 1500sstandard dummy text ever since the 1500s' }, 
              { id: 4, title: 'Servidores aposentados', content: 'standard dummy text ever since the 1500sstandard dummy text ever since the 1500s' }].map((i) => (
              <div key={i.id} className="p-5 bg-linear-to-br from-[#0F234A] via-[#0F234A] to-[#0b214d] shadow-xl animatable-card transition-all duration-300 rounded-xl">
                <Icon icon="hugeicons:teacher" className="w-8 h-8 text-[#E86000] mb-6 md:mb-10" />
                <p className="text-white text-sm md:text-xl font-medium mb-2">
                  {i.title}
                </p>
                <p className="text-white mb-6 md:mb-12 text-sm md:text-base font-extralight lg:font-light">
                  {i.content}
                </p>
              </div>
            ))}
          </div>
        </div>
  
        
        <div
          className="hidden md:block absolute -bottom-10 left-35 w-16 h-10 bg-[#071B42]"
          style={{ clipPath: "path('M0 0 Q8 0 12 6 L28 24 Q32 28 36 24 L52 6 Q56 0 64 0 Z')" }}
        />
      </div>

      
      <div className="mx-4 md:mx-10">
        <p className='lg:text-2xl  text-xl text-[#3F3F46] font-extralight mt-6 lg:ml-20 lg:mt-14'>Estados de atuação</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-8 md:mt-10 gap-6 md:gap-8 lg:gap-x-6 lg:gap-y-0">
          {statsImages.map((item, index) => (
            <div
              key={item.src}
              className="flex flex-col items-center justify-center gap-2 px-2 md:px-4 lg:px-8 pb-4 border-b border-[#F0F0F0] lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={170}
                height={170}
                className="w-full max-w-30 md:max-w-33.75 lg:max-w-40"
                priority={index === 0}
              />
              <p
                className="text-center text-base md:text-lg font-normal text-[#8E939E]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {item.estado}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
} 