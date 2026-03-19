"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const handleGoToContact = () => {
    const contactSection = document.getElementById("contato");

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = "/#contato";
  };

  const handleGoToNews = () => {
    const newsSection = document.getElementById("noticias");

    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = "/#noticias";
  };

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 30,
    });

    gsap.set(backgroundRef.current, {
      opacity: 0,
      scale: 1.15,
    });

    gsap.set(bottomLabelsRef.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set(decorativeLineRef.current, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "left",
    });

    gsap.set([leftArrowRef.current, rightArrowRef.current], {
      opacity: 0,
      x: (i) => (i === 0 ? -30 : 30),
    });

    tl
      .to(
        backgroundRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      )
      .to(
        decorativeLineRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        0.2
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.3
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<0.1"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<0.1"
      )
      .to(
        [leftArrowRef.current, rightArrowRef.current],
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
        },
        "<0.05"
      )
      .to(
        bottomLabelsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<0.05"
      );

    const cardElements = cardsRef.current.filter(Boolean);

    if (cardElements.length > 0) {
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 1.2 + index * 0.08,
            ease: "power2.out",
          }
        );
      });
    }

    gsap.to(backgroundRef.current, {
      scrollTrigger: {
        trigger: "#consulting-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 100,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
          src={"/tes.svg"}
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
                <button
                  type="button"
                  onClick={handleGoToContact}
                  className="lg:max-w-none  bg-[#E86100] hover:bg-secondary text-white font-bold pl-3 lg:pl-6 pr-2 lg:pr-3 lg:py-2 py-1 rounded-full flex items-center gap-3 lg:gap-6 transition-all duration-300"
                >
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

      {/* BOTTOM CARDS */}
      <div
        ref={bottomLabelsRef}
        className=" absolute bottom-0 left-5 right-0 lg:mx-0 z-20 lg:w-full  px-4 lg:px-8 py-6 bg-linear-to-t from-primary/20 via-primary/10 to-transparent"
      >
        <div className="container mx-auto">
          <div className="flex gap-1 overflow-x-auto pb-2 pr-2 scrollbar-hide md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:pr-0 lg:gap-6 lg:mb-10">
            {[
              "Advocacia Especializadas",
              "Comprometimento e Transparência",
              "Edições do clodonews",
            ].map((text, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="flex items-center justify-center shrink-0 min-w-max md:min-w-0"
              >
                {index === 2 ? (
                  <button
                    type="button"
                    onClick={handleGoToNews}
                    className="group w-auto md:w-full text-center px-3 py-2 lg:px-6 lg:py-4 rounded-lg lg:rounded-2xl font-semibold text-sm backdrop-blur-lg transition-all duration-300 whitespace-nowrap cursor-pointer bg-white/25 text-white"
                  >
                    <span className="text-[0.625rem] font-light lg:font-bold lg:text-sm inline-block whitespace-nowrap group-hover:scale-105 transition-transform">
                      {text}
                    </span>
                  </button>
                ) : (
                  <div
                    className={`group w-auto md:w-full text-center px-3 py-2 lg:px-6 lg:py-4 rounded-lg lg:rounded-2xl font-semibold text-sm backdrop-blur-lg transition-all duration-300 whitespace-nowrap ${
                      index === 0
                        ? "bg-white text-gray-600"
                        : "bg-white/25 text-white"
                    }`}
                  >
                    <span className="text-[0.625rem] font-light lg:font-bold lg:text-sm inline-block whitespace-nowrap group-hover:scale-105 transition-transform">
                      {text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <button
        ref={leftArrowRef}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white hidden lg:block"
      >
        <Icon icon="humbleicons:chevron-left" className="w-8 h-8" />
      </button>

      <button
        ref={rightArrowRef}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white hidden lg:block"
      >
        <Icon icon="humbleicons:chevron-right" className="w-8 h-8" />
      </button>
    </section>
  );
}