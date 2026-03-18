"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { advogados } from "../../data/advogados";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "../../components/layout/Header";
import AvatarCircle from "@/app/components/ui/AvatarCircle";
import { AdvCard } from "@/app/components/ui/AdvCard";

export default function TeamDetail() {
  const params = useParams();
  const nomeParam = params.nome as string;

  const advogado = advogados.find(
    (a) =>
      a.nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-") === nomeParam
  );

  if (!advogado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Advogado não encontrado</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      <section className="min-h-screen bg-white py-12 ">
        <div className="container mx-auto px-4 md:px-8 mt-20">
          {/* Header com Badge */}
          <div className="mb-8 md:mb-12">
            <div className="inline-block border border-gray-300 px-4 py-1 rounded-full">
              <span className="text-xs md:text-sm font-semibold text-primary uppercase">
                Equipe
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Coluna esquerda - Informações */}
            <div className="order-2 lg:order-1">
              {/* Nome */}
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
                {advogado.nome}
              </h1>

              {/* Título */}
              <p className="text-lg text-gray-600 mb-8">{advogado.titulo}</p>

              {/* Descrição */}
              <p className="text-gray-700 leading-relaxed mb-10 text-justify">
                {advogado.descricao}
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Icon icon="mdi:email" className="text-secondary text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Endereço de email</p>
                  <a
                    href={`mailto:${advogado.email}`}
                    className="text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    {advogado.email}
                  </a>
                </div>
              </div>

              {/* Especialização */}
              <div className="mb-12">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">
                  Especialização
                </h3>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex flex-wrap gap-3">
                    {advogado.especializacoes.map((esp, index) => (
                      <div
                        key={index}
                        className="bg-[#F8F8FB] text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                      >
                        <div className='flex items-center gap-3'>
                          <p className='text-xs group-hover:text-white'>{esp}</p>
                        </div>
                        <div className='bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs rotate-45 transform'>
                          <Icon icon="bitcoin-icons:arrow-up-filled" className="w-4 h-4 text-secondary transform" />
                        </div>
                        {/* <span>{esp}</span>
                        <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center text-white text-xs rotate-45 transform">
                          <Icon
                            icon="mdi:arrow-right"
                            className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                          />

                        </div> */}

                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex gap-6">
                {advogado.sociais.linkedin && (
                  <a
                    href={advogado.sociais.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    <Icon icon="mdi:linkedin" className="text-2xl" />
                  </a>
                )}
                {advogado.sociais.twitter && (
                  <a
                    href={advogado.sociais.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    <Icon icon="mdi:twitter" className="text-2xl" />
                  </a>
                )}
              </div>
            </div>

            {/* Coluna direita - Imagem */}
            <div className="flex items-center justify-center order-1 lg:order-2 w-full">
              <div className="w-full max-w-sm">
                {/* <Image
                src={`/${advogado.imagem}`}
                alt={advogado.nome}
                fill
                className="object-cover rounded-3xl"
              /> */}
                {/* <AvatarCircle imgSrc={advogado.imagem} nome={advogado.nome} big rounded/> */}
                <AdvCard
                  imgSrc={advogado.imagem}
                  nome={advogado.nome}
                  titulo={advogado.titulo}
                  social={advogado.sociais}

                />
              </div>
            </div>
          </div>

          {/* Voltar */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/#equipe"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
            >
              <Icon icon="mdi:arrow-left" className="text-xl" />
              Voltar para a equipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
