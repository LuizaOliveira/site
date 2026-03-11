'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { SobreNosCard } from '../ui/SobreNosCard';
import { SectionTitle } from '../ui/SectionTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATIONS, EASINGS } from '../../lib/animations/constants';

gsap.registerPlugin(ScrollTrigger);

export function AreaAtuacao() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const checkListRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const shouldAnimate = !prefersReducedMotion;

      // ⚠️ IMPORTANTE: Definir estado inicial dos cards ANTES do trigger
      // Isso evita o "flash" de aparição inicial
      const cardElements = cardsGridRef.current?.querySelectorAll('.animatable-card');
      if (cardElements && cardElements.length > 0) {
        gsap.set(cardElements, {
          opacity: 0,
          y: 100
        });
      }

      // Timeline coordenada com hierarquia visual
      let hasAnimated = false;

      const animateAll = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        const tl = gsap.timeline();

        // 1. PRIMEIRO: Título sobe de baixo - duração perceptível
        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 100 // Começa 100px ABAIXO
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75, // Aumentado de 0.6s para ser mais elegante
            ease: 'power2.out' // Suave e natural
          },
          0 // Começa no tempo 0
        );

        // 2. POR ÚLTIMO: Cards sobem em sequência rápida
        const cardElements = cardsGridRef.current?.querySelectorAll('.animatable-card');
        
        if (cardElements && cardElements.length > 0) {
          // Anima cada card em sequência bem ágil
          // Inicia 0.45s, no meio da animação do título
          tl.to(
            cardElements,
            {
              opacity: 1,
              y: 0,
              duration: 0.4, // Reduzido para ficar ágil
              ease: 'power2.out',
              stagger: 0.05 // Bem próximos entre si
            },
            0.45 // Começa no meio do título
          );

          // Hover animations para cada card
          cardElements.forEach((card: Element) => {
            const cardElement = card as HTMLElement;
            cardElement.addEventListener('mouseenter', () => {
              gsap.to(cardElement, {
                y: -8,
                boxShadow: '0 15px 35px rgba(232, 96, 0, 0.15)',
                duration: 0.3,
                ease: 'power2.out'
              });
            });

            cardElement.addEventListener('mouseleave', () => {
              gsap.to(cardElement, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
              });
            });
          });
        }
      };

      // ScrollTrigger - ativa quando cards ficam visíveis
      ScrollTrigger.create({
        trigger: cardsGridRef.current,
        start: 'top 85%',
        once: true,
        onEnter: animateAll
      });

      const shouldAnimate2 = !prefersReducedMotion;
      const animationDuration2 = prefersReducedMotion ? DURATIONS.instant : DURATIONS.slow;

      // Remover timeline dos outros elementos - deixar apenas os cards animados
      // (comentado pois os cards já têm sua própria animação com ScrollTrigger)

      // Timeline principal com entrada dos elementos (resto da seção) - DESATIVADO
      /*
      const tl = gsap.timeline({
        defaults: { ease: EASINGS.easeOut },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animação do título
      tl.fromTo(titleRef.current,
        { y: shouldAnimate2 ? 30 : 0, opacity: 0 },
        { y: 0, opacity: 1, duration: animationDuration2 }
      );

      // Animação do texto
      tl.fromTo(textRef.current,
        { y: shouldAnimate2 ? 20 : 0, opacity: 0 },
        { y: 0, opacity: 1, duration: animationDuration2 },
        shouldAnimate2 ? '-=0.3' : '-=0.05'
      );

      // Animação da lista de checks
      tl.fromTo(checkListRef.current?.children || [],
        { y: shouldAnimate2 ? 15 : 0, opacity: 0 },
        { y: 0, opacity: 1, duration: animationDuration2, stagger: 0.1 },
        shouldAnimate2 ? '-=0.2' : '-=0.05'
      );

      // Animação das imagens
      tl.fromTo(imagesRef.current,
        { scale: shouldAnimate2 ? 0.9 : 1, opacity: 0 },
        { scale: 1, opacity: 1, duration: prefersReducedMotion ? DURATIONS.instant : DURATIONS.slower },
        shouldAnimate2 ? '-=0.4' : '-=0.05'
      );

      // Animação dos cards com stagger
      tl.fromTo(cardsRef.current?.children || [],
        { y: shouldAnimate2 ? 25 : 0, opacity: 0 },
        { y: 0, opacity: 1, duration: animationDuration2, stagger: 0.15 },
        shouldAnimate2 ? '-=0.3' : '-=0.05'
      );
      */

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    
    <section id="area-atuacao" ref={sectionRef} className="bg-white px-12">
      <div className="bg-[#071B42] rounded-3xl p-10 shadow-xl mx-12 relative">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-8 lg:gap-0">
            <div className="lg:col-span-6">
              <div ref={titleRef}>
                <SectionTitle subtitle='Aqui o servidor público tem voz' title='Nossa' dark>área de Atuação</SectionTitle>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-14 mt-6 mb-14' ref={cardsGridRef}>
            <div className="p-5 bg-linear-to-br from-[#0F234A] via-[#0F234A] to-[#0b214d] shadow-xl animatable-card transition-all duration-300">
              <Icon icon="hugeicons:teacher" className="w-8 h-8 text-[#E86000] mb-10" />
              <p className="text-white mb-12">standard dummy text ever since the 1500sstandard dummy text ever since the 1500s</p>
            </div>

            <div className="p-5 bg-linear-to-br from-[#0F234A] via-[#0F234A] to-[#0b214d] shadow-xl animatable-card transition-all duration-300">
              <Icon icon="hugeicons:teacher" className="w-8 h-8 text-[#E86000] mb-10" />
              <p className="text-white mb-12">standard dummy text ever since the 1500sstandard dummy text ever since the 1500s</p>
            </div>

            <div className="p-5 bg-linear-to-br from-[#0F234A] via-[#0F234A] to-[#0b214d] shadow-xl animatable-card transition-all duration-300">
              <Icon icon="hugeicons:teacher" className="w-8 h-8 text-[#E86000] mb-10" />
              <p className="text-white mb-12">standard dummy text ever since the 1500sstandard dummy text ever since the 1500s</p>
            </div>

            <div className="p-5 bg-linear-to-br from-[#0F234A] via-[#0F234A] to-[#0b214d] shadow-xl animatable-card transition-all duration-300">
              <Icon icon="hugeicons:teacher" className="w-8 h-8 text-[#E86000] mb-10" />
              <p className="text-white mb-12">standard dummy text ever since the 1500sstandard dummy text ever since the 1500s</p>
            </div>
          </div>
        </div>

        {/* Rabinho */}
        <div
          className="absolute -bottom-10 left-35 w-16 h-10 bg-[#071B42]"
          style={{
            clipPath:
              "path('M0 0 Q8 0 12 6 L28 24 Q32 28 36 24 L52 6 Q56 0 64 0 Z')",
          }}
        />
      </div>
      <div className="mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">

          {/* ITEM */}
          <div className="flex flex-col items-center gap-3 px-8 border-r border-[#F0F0F0] last:border-r-0">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-3xl">+29 mil</p>
            </div>
            <div className="text-center text-darkgray font-medium">
              Processos Protocolados
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 px-8 border-r border-[#F0F0F0] last:border-r-0">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-3xl">+8 mil</p>
            </div>
            <div className="text-center text-darkgray font-medium">
              Clientes Satisfeitos
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 px-8 border-r border-[#F0F0F0] last:border-r-0">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-3xl">99%</p>
            </div>
            <div className="text-center text-darkgray font-medium">
              de procedência
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 px-8">
            <div className="bg-[#F5F5F5] w-full max-w-50 py-3 px-5 shadow-md rounded-lg">
              <p className="text-center text-[#E86000] font-bold text-3xl">+8 anos</p>
            </div>
            <div className="text-center text-darkgray font-medium">
              Experiência com servidores
            </div>
          </div>

        </div>
      </div>



      {/* <div className="container mx-auto px-4 md:px-0 mt-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">

          <div className='w-xl'>
            <SectionTitle subtitle='Sobre nós' title='Tradição, compromisso' >e excelência jurídica</SectionTitle>

          </div>
          <p className='text-[#12141D] w-2xl text-md font-light text-justify'>
            Somos um escritório que pratica a advocacia com visão estratégica e inovação para que os nossos resultados
            apresentem sempre melhoria contínua em todos os âmbitos desde os processos operacionais aos gerenciais.
            Com foco em resultados, desenvolvemos soluções customizadas para os servidores públicos, com ênfase nos
            servidores da educação
          </p>
        </div>

        <div className='grid grid-cols-3 gap-8 my-6'>

          <div>
            <div className="flex flex-col lg:flex-row items-center gap-8 mt-10 mb-8">

              <div className=" p-2 bg-secondary rounded-full flex items-center justify-center text-white z-10"
              >
                <Icon icon="cuida:bullseye-outline" className="w-5 h-5 " />
              </div>
            </div>

            <div className='mr-10'>
              <p className='font-bold text-md text-[#12141D] pb-3'> Missão</p>
              <p className='text-[#12141D] text-md text-justify font-light'>
                Garantir a defesa dos direitos dos servidores públicos, com foco na excelência e na ética,
                promovendo soluções jurídicas eficazes e personalizadas para cada cliente.
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col lg:flex-row items-center gap-8 mt-10 mb-8">

              <div className=" p-2 bg-primary rounded-full flex items-center justify-center text-white z-10"
              >
                <Icon icon="famicons:telescope-outline" className="w-5 h-5 " />
              </div>
            </div>

            <div className='mr-10'>
              <p className='font-bold text-md text-[#12141D] pb-3'> Visão</p>
              <p className='text-[#12141D] text-md text-justify font-light'>
                Garantir a defesa dos direitos dos servidores públicos, com foco na excelência e na ética,
                promovendo soluções jurídicas eficazes e personalizadas para cada cliente.
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col lg:flex-row items-center gap-8 mt-10 mb-8">

              <div className=" p-2 bg-secondary rounded-full flex items-center justify-center text-white z-10"
              >
                <Icon icon="material-symbols-light:balance" className="w-5 h-5 " />
              </div>
            </div>

            <div className='mr-10'>
              <p className='font-bold text-md text-[#12141D] pb-3'> Valores</p>
              <p className='text-[#12141D] text-md text-justify font-light'>
                Garantir a defesa dos direitos dos servidores públicos, com foco na excelência e na ética,
                promovendo soluções jurídicas eficazes e personalizadas para cada cliente.
              </p>
            </div>
          </div>

        </div>

      </div> */}


    </section>
    // <section id="sobre-nos" ref={sectionRef} className="py-8 md:py-16 bg-[#F2F4F5] relative">
    //   <div className="container mx-auto px-4 md:px-0">
    //     <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-8 lg:gap-0">
    //       <div className="lg:col-span-6">
    //         <div ref={titleRef}>
    //           <SectionTitle subtitle='Sobre nós' title='Tradição, compromisso'>e excelência jurídica</SectionTitle>
    //         </div>
    //         <div ref={imagesRef} className='lg:hidden xl:hidden'>
    //           <Image
    //             src="/equipe-resp.svg"
    //             alt="Tablet com notificações para servidores públicos"
    //             width={1000}
    //             height={1000}
    //             className="rounded-xl w-full h-auto"
    //           />

    //         </div>
    //         <p ref={textRef} className="text-[#6A80B0] mt-4 text-justify leading-relaxed md:leading-loose text-base md:text-lg">Somos um escritório que pratica a advocacia com visão estratégica e inovação para que os nossos resultados apresentem sempre melhoria contínua em todos os âmbitos desde os processos operacionais aos gerenciais. Com foco em resultados, desenvolvemos soluções customizadas para os servidores públicos, com ênfase nos servidores da educação</p>
    //         <div ref={checkListRef} className='mt-10'>
    //           <div className='text-[#6A80B0] flex items-center mt-4 md:mt-6 text-sm md:text-base'>
    //             <Icon icon="lets-icons:check-fill" className="inline-block text-secondary w-7 h-7 md:w-9 md:h-9 mr-2 shrink-0" />
    //             Professores Ativos e Aposentados
    //           </div>
    //           <div className='text-[#6A80B0] flex items-center mt-4 md:mt-6 text-sm md:text-base'>
    //             <Icon icon="lets-icons:check-fill" className="inline-block text-secondary w-7 h-7 md:w-9 md:h-9 mr-2 shrink-0" />
    //             Servidores públicos
    //           </div>
    //         </div>
    //       </div>
    //       <div className="lg:col-span-6  justify-center items-center mt-8 hidden lg:mt-0 sm:hidden md:hidden lg:flex xl:flex">
    //         <div ref={imagesRef} className="h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full relative mt-20">
    //           <Image src="/fotoEscritorio.png" alt="escritorio" layout="fill" objectFit="cover" className="rounded-full" />
    //           <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full relative -right-32 sm:-right-44 md:-right-52 lg:-right-64 bottom-4 sm:bottom-6 md:bottom-8">
    //             <Image src="/fotoAssinando.png" alt="assinando" layout="fill" objectFit="cover" className="rounded-full" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div ref={cardsRef} className='mt-14 md:mt-24 flex flex-wrap sm:gap-8 md:gap-12 lg:gap-40'>
    //       <SobreNosCard titulo='Transparencia' texto='Mais de 15 mil ações procedentes' icone="octicon:law-16" />
    //       <SobreNosCard titulo='Atuação' texto='Atuação em seis Estados brasileiros' icone="game-icons:brazil" />
    //       <SobreNosCard titulo='Atuação' texto='Quase 10 anos de atuação na área jurídica' icone="fa7-solid:hourglass-2" />
    //     </div>
    //   </div>
    //   <div className="absolute bottom-0 left-0 w-full">
    //     <Image
    //       src="/lines.svg"
    //       alt=""
    //       width={1920}
    //       height={100}
    //       className="w-full h-auto [filter:brightness(0)_saturate(100%)_invert(91%)_sepia(8%)_saturate(1094%)_hue-rotate(196deg)_brightness(98%)_contrast(96%)]"
    //     />
    //   </div>
    // </section>
  );
}