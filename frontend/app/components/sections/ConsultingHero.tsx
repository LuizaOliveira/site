'use client'

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ConsultingHero() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const bottomLabelsRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const leftArrowRef = useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = useRef<HTMLButtonElement | null>(null);
  const decorativeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    const tl = gsap.timeline();

    
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    gsap.set(backgroundRef.current, {
      opacity: 0,
      scale: 1.15
    });

    gsap.set(bottomLabelsRef.current, {
      opacity: 0,
      y: 20
    });

    gsap.set(decorativeLineRef.current, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: 'left'
    });

    gsap.set([leftArrowRef.current, rightArrowRef.current], {
      opacity: 0,
      x: (i) => i === 0 ? -30 : 30
    });

 
    tl
      
      .to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0)
      // Linha decorativa animada
      .to(decorativeLineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.2)
      // Título principal com fade-in + slide up
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.3)
      // Subtítulo com delay progressivo
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '<0.1')
      // Botão com delay
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '<0.1')
      // Setas laterais
      .to([leftArrowRef.current, rightArrowRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05
      }, '<0.05')
      // Bottom labels container
      .to(bottomLabelsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '<0.05');

    // Animação dos cards do bottom com stagger e fade-in on scroll
    const cardElements = cardsRef.current.filter(Boolean);
    if (cardElements.length > 0) {
      cardElements.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 20
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 1.2 + index * 0.08,
          ease: 'power2.out'
        });
      });
    }

    // Parallax effect ao fazer scroll
    gsap.to(backgroundRef.current, {
      scrollTrigger: {
        trigger: '#consulting-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false
      },
      y: 100,
      ease: 'none',
      duration: 1
    });

    // Hover animations para botão
    const button = buttonRef.current?.querySelector('button');
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    // Hover animations para setas
    const arrows = [leftArrowRef.current, rightArrowRef.current];
    arrows.forEach((arrow) => {
      if (arrow) {
        arrow.addEventListener('mouseenter', () => {
          gsap.to(arrow, {
            color: '#FF8C00',
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        arrow.addEventListener('mouseleave', () => {
          gsap.to(arrow, {
            color: '#FFFFFF',
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    // Funcionalidade do header - comportamento específico para ConsultingHero
    const handleHeaderVisibility = () => {
      const header = document.querySelector('header') || document.querySelector('[data-header]') || document.querySelector('nav');
      const heroSection = document.getElementById('consulting-hero');
      
      if (header && heroSection) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            const scrollY = self.scroll();
            const heroRect = heroSection.getBoundingClientRect();
            const isInHeroSection = heroRect.top <= 0 && heroRect.bottom > 0;
            
            if (isInHeroSection) {
              if (scrollY > 100) {
                gsap.to(header, {
                  y: -100,
                  opacity: 0,
                  duration: 0.3,
                  ease: 'power2.out'
                });
              } else {
                gsap.to(header, {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out'
                });
                
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
              }
            }
          },
          onLeave: () => {
            gsap.to(header, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'blur(10px)';
          },
          onEnterBack: () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
              gsap.to(header, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
              });
            } else {
              gsap.to(header, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
              
              header.style.backgroundColor = 'transparent';
              header.style.backdropFilter = 'none';
            }
          }
        });
      }
    };

    handleHeaderVisibility();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full bg-white overflow-hidden pt-14 lg:pt-20 lg:h-screen lg:min-h-175"
    >
      {/* IMAGE CARD */}
      <div
        ref={backgroundRef}
        className="
        relative mx-3 mt-6 h-72 md:h-96 lg:rounded-none rounded-4xl overflow-hidden
        lg:absolute lg:inset-0 lg:h-full lg:mx-0 lg:mt-0
      "
      >
        <Image
          src="/tes.svg"
          alt="Consulting Background"
          fill
          className="object-cover sm:object-top-right rounded-4xl lg:rounded-none"
          priority
        />

        <div className="absolute inset-0 bg-black/10 rounded-4xl lg:rounded-none" />

        {/* CONTENT SOBRE A IMAGEM */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center p-4 lg:relative lg:h-full lg:items-center lg:justify-center lg:p-0">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-6 lg:mb-12">
              <div className="mb-2" ref={titleRef}>
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl md:text-4xl lg:text-7xl font-normal">
                    Advocacia para
                  </h1>

                  <div
                    ref={decorativeLineRef}
                    className="h-1 w-14 lg:w-32 bg-secondary rounded-full"
                  />
                </div>
              </div>

              <h1
                className="text-3xl md:text-4xl  lg:text-7xl font-normal leading-tight mb-6"
                ref={subtitleRef}
              >
                Servidores Públicos
              </h1>

              <div ref={buttonRef}>
                <button className="lg:max-w-none  bg-[#E86100] hover:bg-secondary text-white font-bold pl-3 lg:pl-6 pr-2 lg:pr-3 lg:py-2 py-1 rounded-full flex items-center gap-3 lg:gap-6 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Icon icon="ic:twotone-whatsapp" className="w-5 h-5 lg:w-8 lg:h-8" />
                    <p className=" text-xs lg:text-lg text-left">
                      Tenha uma análise
                    </p>
                  </div>

                  <div className="bg-[#8F3D29] w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center rotate-45">
                    <Icon
                      icon="bitcoin-icons:arrow-up-filled"
                      className="w-4 h-4 lg:w-5 lg:h-5 text-secondary"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Labels */}
      <div ref={bottomLabelsRef} className='absolute bottom-0 left-0 right-0 z-20 w-full px-8 py-8 bg-linear-to-t from-primary/20 via-primary/10 to-transparent'>
        <div className="container mx-auto">
          <div className='grid grid-cols-3 gap-6 mb-10'>
            {[
              'Advocacia Especializadas',
              'Comprometimento e Transparência',
              'Edições do clodonews e conteúdos exclusivos'
            ].map((text, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="w-full flex items-center justify-center"
              >
                <div className={`group w-full text-center px-6 py-4 rounded-2xl font-semibold text-sm backdrop-blur-lg transition-all duration-300 ease-in-out ${
                  index === 0
                    ? 'bg-white text-gray-600 hover:bg-orange-50'
                    : 'bg-white/30 text-white hover:bg-orange-50 hover:text-gray-500'
                }`}>
                  <span className="inline-block transition-transform duration-300 ease-in-out group-hover:scale-105">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        ref={leftArrowRef}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-secondary transition"
      >
        <Icon icon="humbleicons:chevron-left" className="w-8 h-8" />
      </button>

      <button
        ref={rightArrowRef}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-secondary transition"
      >
        <Icon icon="humbleicons:chevron-right" className="w-8 h-8" />
      </button>
    </section>
  );
}
