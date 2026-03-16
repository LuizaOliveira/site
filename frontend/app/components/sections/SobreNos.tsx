"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";


gsap.registerPlugin(ScrollTrigger);

export function SobreNos() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Refs específicos para animação da seção "Nossa Essência"
  const essenceImageRef = useRef<HTMLDivElement>(null);
  const essenceTitleRef = useRef<HTMLHeadingElement>(null);
  const essenceDescriptionRef = useRef<HTMLParagraphElement>(null);
  const essenceItem1Ref = useRef<HTMLLIElement>(null);
  const essenceItem2Ref = useRef<HTMLLIElement>(null);

  // Refs para animação da seção "Advocacia para Servidores Públicos"
  const advocacyImageRef = useRef<HTMLDivElement>(null);
  const advocacyTitleRef = useRef<HTMLHeadingElement>(null);
  const advocacyDescriptionRef = useRef<HTMLParagraphElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Animação elegante e institucional para a seção "Nossa Essência"
    const animateEssenceSection = () => {
      if (prefersReducedMotion) return;

      // Função para resetar elementos ao estado inicial
      const resetElements = () => {
        gsap.set(essenceImageRef.current, {
          opacity: 0,
          x: -40
        });

        gsap.set([essenceTitleRef.current, essenceDescriptionRef.current, essenceItem1Ref.current, essenceItem2Ref.current], {
          opacity: 0,
          y: 30
        });
      };

      // Função para animar elementos
      const animateElements = () => {
        // Timeline para animação sequencial elegante
        const tl = gsap.timeline();

        // 1. Imagem à esquerda - fade + movimento horizontal suave
        tl.to(essenceImageRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        })

          // 2. Título "Nossa Essência" - fade + movimento vertical
          .to(essenceTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.5") // Inicia 0.3s após a imagem começar

          // 3. Parágrafo descritivo
          .to(essenceDescriptionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.4") // Intervalo de 0.2s

          // 4. Primeiro bloco "Valores que nos Guiam"
          .to(essenceItem1Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }, "-=0.35") // Intervalo de 0.25s

          // 5. Segundo bloco "Essência Colaborativa"
          .to(essenceItem2Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }, "-=0.3"); // Intervalo de 0.2s
      };

      // Definir estado inicial
      resetElements();

      // Criar ScrollTrigger que executa sempre que entra na tela
      ScrollTrigger.create({
        trigger: card1Ref.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: animateElements,     // Quando entra descendo
        onEnterBack: animateElements, // Quando entra subindo
        onLeave: resetElements,       // Reset quando sai descendo
        onLeaveBack: resetElements    // Reset quando sai subindo
      });
    };

    animateEssenceSection();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="sobre-nos"
      className="pb-10 md:py-16 lg:py-20 bg-white border-0 "
    >
      <div className="container mx-auto px-4 mt-0 md:mt-20 ">
        {/* Título da seção */}
        {/* <AnimatedSection animation="fadeUp"> */}
        {/* <SectionTitle title='Nossa' subtitle='Aqui o servidor público tem voz' center dark>Área De Atuação</SectionTitle> */}
        {/* </AnimatedSection> */}

        {/* Primeira linha - Principal público */}
        <div
          ref={card1Ref}
          className=" grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-10 mb-8 lg:mb-12 px-3 sm:px-6 lg:px-5 py-4 lg:py-5 rounded-lg "
          style={{
            clipPath: "polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40px)",
          }}
        >
          <div ref={essenceImageRef} className="relative hidden md:block md:col-span-1 lg:col-span-1 xl:col-span-1">
            <div className="relative w-full h-125 min-w-20 min-h-36 max-w-96 max-h-125 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/smilily-woman.png"
                alt="Conheça nossa história"
                fill
                className="object-cover"
              />

              <div
                className="absolute bottom-0 left-0 w-full 
                    bg-[#E86000] 
                    flex items-center justify-between 
                    px-6 py-5 
                    rounded-b-2xl"
              >
                <p className="text-white font-semibold">
                  Conheça nossa história
                </p>

                <button
                  className="bg-[#0B1B3B] 
                         rounded-full 
                         p-3 
                         hover:scale-105 
                         transition"
                >
                  <Icon
                    icon="mdi:arrow-right"
                    className="w-5 h-5 text-[#E86000]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal público */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6 text-ligth-gray order-1 md:order-2  md:text-left ">
            <div className="items-center justify-center my-5">
              <h3
                ref={essenceTitleRef}
                className="text-3xl md:text-3xl lg:text-4xl font-extrabold"
              >
                <span className="text-[#E86000]">Nossa</span> <span className="text-[#0B1B3B]">Essência</span>
              </h3>
              <p
                ref={essenceDescriptionRef}
                className="text-sm sm:text-base lg:text-[0.9rem]  md:text-sm leading-relaxed pr-5 text-justify font-normal text-[#2D3134] mt-6"
              >
                Somos um escritório em evolução, com atuação estratégica e foco
                em soluções jurídicas eficazes. Trabalhamos de forma integrada
                na resolução de demandas complexas, com destaque para a área de
                servidores públicos, onde reunimos mais de oito anos de
                experiência e uma equipe multidisciplinar. Comprometidos com
                clientes, sociedade e equipe, promovemos crescimento e melhoria
                contínua.
              </p>
            </div>

            {/* Lista de serviços */}
            <ul className="space-y-3 sm:space-y-4">
              <li ref={essenceItem1Ref} className=" items-center gap-8 flex">
                <div className="bg-[#FFFCF9] p-2 rounded-lg justify-center items-center ">
                  <Icon
                    icon="streamline:target-solid"
                    className="w-7 h-7 ml-2.5 text-[#E86000] inline-block mr-2"
                  />
                </div>
                <div>
                  <span className=" text-sm sm:text-base lg:text-md  md:text-sm leading-relaxed pr-5 text-justify font-semibold text-[#2D3134]">
                    Valores que nos Guiam
                  </span>
                  <p className=" w-full md:w-4/5 text-sm sm:text-base lg:text-md  md:text-sm leading-relaxed pr-5 text-justify font-normal text-[#676A6C]">
                    Ética, transparência e compromisso orientam cada decisão,
                    garantindo segurança e confiança em todas as etapas do
                    atendimento.
                  </p>
                </div>
              </li>

              <li ref={essenceItem2Ref} className=" items-center gap-8 flex">
                <div className="bg-[#FFFCF9] p-2 rounded-lg justify-center items-center ">
                  <Icon
                    icon="vaadin:handshake"
                    className="w-7 h-7 ml-2.5 text-[#E86000] inline-block mr-2"
                  />
                </div>
                <div>
                  <span className=" text-sm sm:text-base lg:text-md  md:text-sm leading-relaxed pr-5 text-justify font-semibold text-[#2D3134]">
                    Essência Colaborativa
                  </span>
                  <p className=" w-full md:w-4/5text-sm sm:text-base lg:text-md  md:text-sm leading-relaxed pr-5 text-justify font-normal text-[#676A6C]">
                    Adotamos uma abordagem estratégica, buscando soluções
                    jurídicas eficazes e personalizadas para cada cliente, com
                    foco em resultados concretos.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* <div
          ref={card2Ref}
          className="bg-secondary-blue grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-8 lg:mb-12 px-3 sm:px-6 lg:px-5 py-4 lg:py-5 rounded-lg lg:hidden xl:hidden"
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, 0% 100%)",
          }}
        >

          <div ref={advocacyImageRef} className="relative md:col-span-1">
            <div className="flex gap-4 items-center">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/working-morning-woman.jpg"
                  alt="Equipe de advocacia trabalhando"
                  fill
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-112 object-cover rounded-lg clip-path-corner-right"
                  style={{
                    clipPath:
                      "polygon(0% 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, 0% 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 sm:space-y-6 text-ligth-gray order-1 md:order-2 text-center md:text-left  ">
            <h3
              ref={advocacyTitleRef}
              className="text-xl sm:text-2xl lg:text-3xl font-medium"
            >
              Advocacia para <br />
              servidores públicos
            </h3>
            <p
              ref={advocacyDescriptionRef}
              className="text-sm sm:text-base lg:text-md  md:text-sm leading-relaxed pr-5 text-justify font-normal"
            >
              O núcleo do Direito Administrativo direciona sua atuação e sua
              atenção nos direitos dos Servidores Públicos através de assessoria
              e consultoria jurídica com o escopo de esclarecer direitos,
              analisar documentos e processos de forma a estabelecer a melhor
              solução para cada pleito, uma vez que é necessário a discussão da
              legalidade e/ou constitucionalidade do direito e obrigações por
              meio da interpretação de novas normas e jurisprudência, sejam elas
              decorrentes da falta de cumprimento dos direitos da Administração
              Pública, sejam em razão de erros materiais ou de interpretação
              pacificadas pelos tribunais.
            </p>
          </div>
        </div> */}


      </div>

    </section>
  );
}
