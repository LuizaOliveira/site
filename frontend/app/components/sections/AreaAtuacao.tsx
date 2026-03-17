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
              gsap.to(cardElement, { y: -8, boxShadow: '0 15px 35px rgba(232, 96, 0, 0.15)', duration: 0.3, ease: 'power2.out' });
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
            <div className="lg:col-span-8">
              <div ref={titleRef}>
                <SectionTitle subtitle='Aqui o servidor público tem voz' title='Nossa' dark centerOnMobile>
                  área de Atuação
                </SectionTitle>
              </div>
            </div>
          </div>

          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-14 mt-10 mb-14' ref={cardsGridRef}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 bg-linear-to-br from-[#0F234A] via-[#0F234A] to-[#0b214d] shadow-xl animatable-card transition-all duration-300 rounded-xl">
                <Icon icon="hugeicons:teacher" className="w-8 h-8 text-[#E86000] mb-6 md:mb-10" />
                <p className="text-white mb-6 md:mb-12 text-sm md:text-base">
                  standard dummy text ever since the 1500sstandard dummy text ever since the 1500s
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 md:mt-20 gap-8 md:gap-0">
          
          
          <div className="flex flex-col items-center gap-3 px-4 md:px-8 border-b md:border-b-0 md:border-r border-[#F0F0F0] pb-6 md:pb-0 last:border-0">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-2xl md:text-3xl">+29 mil</p>
            </div>
            <div className="text-center text-darkgray font-medium text-sm md:text-base">
              Processos Protocolados
            </div>
          </div>

          
          <div className="flex flex-col items-center gap-3 px-4 md:px-8 border-b md:border-b-0 md:border-r border-[#F0F0F0] pb-6 md:pb-0 last:border-0">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-2xl md:text-3xl">+8 mil</p>
            </div>
            <div className="text-center text-darkgray font-medium text-sm md:text-base">
              Clientes Satisfeitos
            </div>
          </div>

          
          <div className="flex flex-col items-center gap-3 px-4 md:px-8 border-b md:border-b-0 md:border-r border-[#F0F0F0] pb-6 md:pb-0 last:border-0">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-2xl md:text-3xl">99%</p>
            </div>
            <div className="text-center text-darkgray font-medium text-sm md:text-base">
              de procedência
            </div>
          </div>

          
          <div className="flex flex-col items-center gap-3 px-4 md:px-8">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-2xl md:text-3xl">+8 anos</p>
            </div>
            <div className="text-center text-darkgray font-medium text-sm md:text-base">
              Experiência com servidores
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 