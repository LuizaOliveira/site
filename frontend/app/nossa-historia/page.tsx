"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Header } from "../components/layout/Header";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const TypingText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Inicia a animação após 1 segundo do carregamento da página
        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, 1000);

        return () => clearTimeout(startTimeout);
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index <= text.length) {
                setDisplayedText(text.substring(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 40); // Velocidade de digitação: 120ms por letra (mais lento)

        return () => clearInterval(interval);
    }, [text, hasStarted]);

    return (
        <span className="inline-block mt-4 bg-[#f26a00] text-[#0d2340] text-md lg:text-3xl px-3 lg:pl-1 lg:pr-5 py-2 rounded-xl font-medium whitespace-nowrap">
            {displayedText}
        </span>
    );
};

export default function NossaHistoria() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const content1Ref = useRef<HTMLDivElement>(null);
    const content2Ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!sectionRef.current || prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(titleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
                .fromTo(imageRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0.2)
                .fromTo(cardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4)
                .fromTo(barRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 0.8)
                .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.6)
                .fromTo(content1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.8)
                .fromTo(content2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1);
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <>
            <Header />
            <section ref={sectionRef} className="min-h-screen bg-white py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-8 mt-12 md:mt-20">
                    <span className="border border-gray-400 text-gray-700 lg:px-5 px-3 py-1 rounded-full text-[0.625rem] lg:text-xs ">
                        Conheça mais sobre nós
                    </span>
                    {/* Título */}
                    <div ref={titleRef} className="mb-10 md:mb-16 mt-5">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font lg:font-medium">
                            <span className="text-[#0B1B3B]">Nossa</span>{" "}
                            <span className="text-[#E86000]">História</span>
                        </h1>
                    </div>

                    {/* Imagem principal com card overlay */}
                    <div ref={imageRef} className="mb-10 md:mb-16">
                        <div className="relative w-full h-96 md:h-96 lg:h-175 rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/clodonil-edijane.svg"
                                alt="Nossa História"
                                fill
                                className="object-cover"
                            />

                            {/* Card overlay */}
                            <div ref={cardRef} className="absolute left-[-10] lg:right-4 md:left-8 md:right-auto lg:bottom-8 bottom-0 m rounded-2xl p-6 shadow-xl">
                                <div className="w-64 lg:w-150   bg-[#efefef] rounded-xl relative px-3 py-5 lg:px-12 lg:py-10 flex flex-col justify-between">

                                    {/* Topo */}
                                    <div className="flex justify-between items-start">

                                        {/* Tag */}
                                        <span className="border border-gray-400 text-gray-700 lg:px-5 px-3 py-1 rounded-full text-[0.625rem] lg:text-xs">
                                            Nossa História
                                        </span>

                                        {/* Ícone */}
                                        <div className="lg:w-16 lg:h-16 h-10 w-10 bg-[#0d2340] rounded-full flex items-center justify-center">
                                            <Icon icon="mdi:account-group" className="text-[#E86000] text-sm lg:text-3xl" />
                                        </div>
                                    </div>

                                    {/* Título */}
                                    <div>
                                        <h2 className="text-lg lg:text-3xl leading-[1.2] text-[#0d2340] font-normal">
                                            Onde Começamos Define
                                        </h2>

                                        <TypingText text="Quem Nos Tornamos" />
                                    </div>

                                    {/* Rodapé */}
                                    <div className="lg:flex hidden justify-between items-center my-5">
                                        <p className="text-gray-700 text-xs lg:text-base">
                                            Todo Nosso Empenho Visa Sempre O Cliente
                                        </p>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seção "Onde tudo começou" */}
                    <div ref={textRef} className="mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0B1B3B] mb-8 md:mb-12">
                            Onde tudo começou
                        </h2>

                        {/* Primeiro parágrafo */}
                        <div ref={content1Ref} className="mb-8 md:mb-10">
                            <p className="text-sm md:text-base lg:text-lg text-[#2D3134] leading-relaxed text-justify">
                                Nascido no litoral sul do estado de São Paulo na década de 70, Clodonil Monteiro foi um jovem estudante da rede pública de ensino.
                                Filho de pais semianalfabetos, concluiu o ensino fundamental e mudou-se para a capital paulista no ano de 1989 onde estudou e concluiu
                                o ensino médio. Como prioridade de sobrevivência, iniciou sua jornada no mercado de trabalho paulista como office boy aos quinze anos,
                                passando por outras funções como auxiliar administrativo e profissional da área de marketing, lançando-se no empreendedorismo e
                                deixando para o “futuro” os planos de uma possível graduação.

                            </p>
                        </div>

                        {/* Segundo parágrafo */}
                        <div ref={content2Ref} className="mb-8 md:mb-10">
                            <p className="text-sm md:text-base lg:text-lg text-[#2D3134] leading-relaxed text-justify">
                                Ao iniciar uma grande jornada de tentativas e fracassos, empreendeu em diversas áreas do mercado.
                                Sonhos e desilusões foram substantivos acumulados por muitos anos até que o destino moveu algumas peças e,
                                em 31 de dezembro de 2008, o fez conhecer a pessoa que mudaria tudo. Ao unir-se com a acariense Edjane Lucena,
                                passou a enxergar novamente que a educação seria o único caminho para o verdadeiro sucesso. Assim, em 2013 ingressou
                                no curso de Direito, concluindo em 2017, sendo aprovado no exame de ordem da OAB no mesmo ano.
                            </p>
                        </div>

                        <div ref={content2Ref}>
                            <p className="text-sm md:text-base lg:text-lg text-[#2D3134] leading-relaxed text-justify">
                                O Escritório de Advocacia Clodonil Monteiro foi fundado em 20 de janeiro de 2018, mas a data de 21 de junho do mesmo ano marca sua
                                trajetória de sucesso na atuação especializada na área do Direito Administrativo, defendendo com maestria o direito dos servidores
                                públicos. O Escritório se formalizou como sociedade em 08 de junho de 2020. Com clientes em mais de 160 municípios no Estado do
                                Rio Grande do Norte e em diversos municípios de outros Estados em que atua, o escritório conta com tecnologia de ponta e uma
                                gestão profissional, representada por uma Controladoria Jurídica capaz de otimizar os processos internos e entregar aos clientes
                                uma performance jurídica célere e eficaz.
                            </p>
                        </div>
                    </div>

                    {/* Voltar */}
                    <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
                        <Link
                            href="/#sobre-nos"
                            className="inline-flex items-center gap-2 text-[#0B1B3B] hover:text-[#E86000] transition-colors font-medium"
                        >
                            <Icon icon="mdi:arrow-left" className="text-xl" />
                            Voltar
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
