"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { FreeAnalysisSection } from "../ui/FreeAnalysisSection";

export function Contact() {
  return (
    <section className="relative overflow-hidden" id="contato">

      {/* Divider */}
      <div className="relative w-full flex items-center justify-center py-2">
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#D9D9D9] -translate-y-1/2"></div>

        <div className="relative z-10 px-8 py-3 rounded-full border border-[#D9D9D9] bg-white">
          <span className="text-orange-500 font-medium text-lg">
            Nossos contatos
          </span>
        </div>
      </div>

      {/* Background dividido */}
      <div className="absolute inset-0 bg-linear-to-b from-white from-50% to-[#0F2747] to-50% -z-20"></div>

      {/* CONTAINER */}
      <div className="container mx-auto px-4 py-10 md:py-24 relative z-10">

        <FreeAnalysisSection />

      </div>

      {/* NEWSLETTER */}
      <div className="relative z-10 pb-16">
        <div className="container mx-auto px-4 flex justify-center">

          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 text-white">

            {/* TEXTO */}
            <p className="text-sm md:text-base max-w-md">
              Se inscreva no Clodonews e receba semanalmente notícias e conteúdos
              acerca de seus direitos como servidor
            </p>

            {/* INPUT + BOTÃO */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu email"
                className="w-full md:w-72 px-6 py-3 rounded-full text-sm bg-white text-black focus:outline-none"
              />

              <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2">
                <Icon icon="mdi:send" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}