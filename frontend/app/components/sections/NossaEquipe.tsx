"use client";

import Image from "next/image";
import { SectionTitle } from "../ui/SectionTitle";
import { AdvCard } from "../ui/AdvCard";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { advogados } from "../../data/advogados";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NossaEquipe() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardInfoRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const fundadoresESocios = advogados.slice(0, 4);
  
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
      const advCards = cardsContainerRef.current?.querySelectorAll('.adv-card-item');
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
            trigger: cardsContainerRef.current,
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
    <section id="equipe" ref={sectionRef} className="py-8 md:py-16 bg-white">

      <div className="container mx-auto px-4">
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {/* ===== IMAGEM (2/3) ===== */}
          <div ref={imageRef} className="relative lg:col-span-2 h-120 rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/office-work.svg" // troque pela sua imagem
              alt="Equipe de advogados"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ===== CARD (1/3) ===== */}
          <div ref={cardInfoRef} className="lg:col-span-1 h-120 rounded-[36px] bg-linear-to-br from-[#0B1A3A] via-[#10285C] to-[#061534] p-10 flex flex-col justify-between shadow-xl">
            {/* Parte superior */}
            <div>
              <div className="inline-block border border-orange-500 px-4 py-1 rounded-lg mb-6">
                <span className="text-orange-400 text-sm">Nossa equipe</span>
              </div>

              <h2 className="text-white text-3xl font-semibold mb-6 leading-snug">
                Conheça nossos profissionais
              </h2>

              <p className="text-gray-300 leading-relaxed text-sm">
                Nossa equipe é formada por profissionais experientes em
                diferentes áreas, os quais trabalham de forma integrada e
                utilizam habilidades técnicas coordenadas ligadas a casos
                rotineiros direcionados aos litígios de Servidores Públicos.
              </p>
            </div>

            {/* Botão */}
            <div>
              <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-full font-medium">
                Marque uma consulta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-primary text-3xl md:text-3xl font-bold">
            Advogados, Fundadores{" "}
            <span className="text-secondary">
              <br /> e Sócios
            </span>
          </h2>
          <div className="flex gap-3">
            <Link
              href="/equipe"
              className="rounded-full bg-secondary px-4 py-2 md:py-0 flex items-center justify-center font-bold text-sm md:text-base text-white hover:bg-orange-600 transition-colors duration-300"
            >
              Ver toda equipe
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
          </div>
        </div>

        <div className="">
                      <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
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
          {/* <div className="flex gap-8 items-center justify-center">
            <AdvCard
              imgSrc="Clodonil.svg"
              nome="Clodonil Monteiro"
              titulo="Advogado fundador"
            />
            <AdvCard
              imgSrc="Edjane.svg"
              nome="Edjane Lucena"
              titulo="Advogado fundadora"
            />
            <AdvCard
              imgSrc="laura.svg"
              nome="Laura Maria"
              titulo="Advogado fundadora"
            />
            <AdvCard
              imgSrc="DIEGO.svg"
              nome="Diego Medeiros"
              titulo="Advogado fundador"
            />
          </div> */}
        </div>
      </div>
    </section>

    // <section id="equipe" className="py-8 md:py-16 bg-white">
    //   <div className="container mx-auto px-4 md:px-0">
    //     <div>
    //       <SectionTitle title="Nosso" subtitle="Nossa equipe">Time De Advogados</SectionTitle>
    //     </div>

    //     <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-6 lg:gap-0 mb-16 md:mb-24">
    //       <div className="lg:col-span-6">
    //         <div
    //           className="rounded-xl relative"
    //           style={{
    //             clipPath:
    //               "polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40px)",
    //           }}
    //         >
    //           <Image
    //             src="/equipe.png"
    //             alt="Tablet com notificações para servidores públicos"
    //             width={1000}
    //             height={1000}
    //             className="rounded-xl w-full h-auto"
    //           />
    //           <div className="bg-secondary text-white text-sm md:text-xl font-bold px-4 md:px-6 py-2 absolute bottom-4 right-4 md:bottom-8 md:right-8 rounded-lg">
    //             Experiencia e Inovação <br /> em equipe
    //           </div>
    //         </div>
    //       </div>
    //       <div className="lg:col-span-6 p-0 lg:p-10">
    //         <p className="text-[#6A80B0] text-justify leading-relaxed md:leading-loose text-base md:text-lg">Contamos com um corpo jurídico formado por advogados especializados e experientes, que atuam de maneira estratégica e coordenada na condução de demandas relacionadas aos direitos de Servidores Públicos. Nosso trabalho é pautado pelo rigor técnico, atualização constante e compromisso com resultados sólidos e eficazes</p>
    //       </div>
    //     </div>

    //     <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mb-12 md:mb-20"></div>

    //     <div className="mt-12 md:mt-16">
    //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
    //         <h2 className="text-primary text-3xl md:text-5xl font-bold">
    //           Advogados fundadores <span className="text-secondary"><br /> e Sócios</span>
    //         </h2>
    //         <div className="flex gap-3">
    //           <div className="rounded-full bg-secondary px-4 py-2 md:py-0 flex items-center justify-center font-bold text-sm md:text-base">Ver toda equipe</div>
    //           <div className="rounded-full bg-primary w-10 h-10 flex items-center justify-center"> {">"} </div>
    //         </div>
    //       </div>

    //       <div className="space-y-6 md:space-y-0">
    //         <AdvCard imgSrc="clodonilBG.png" nome="Clodonil Monteiro" titulo="Fundador" texto={loremIpsum} />
    //         <AdvCard imgSrc="edjaneBG.png" nome="Edjane Lucena" titulo="Fundadora" texto={loremIpsum} />
    //         <AdvCard imgSrc="lauraBG.png" nome="Laura Maria" titulo="Sócia" texto={loremIpsum} />
    //         <AdvCard imgSrc="diegoBG.png" nome="Diego Medeiros" titulo="Sócio" texto={loremIpsum} />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
