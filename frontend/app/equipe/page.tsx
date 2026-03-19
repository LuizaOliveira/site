"use client";

import { advogados } from "../data/advogados";
import { AdvCard } from "../components/ui/AdvCard";
import { Header } from "../components/layout/Header";
import Image from "next/image";

export default function EquipePage() {
  // Separar fundadores e sócios dos outros advogados
  const fundadoresESocios = advogados.slice(0, 4);
  const outrosAdvogados = advogados.slice(4);

  return (
    <>
      <Header />
      <section className=" mt-10min-h-screen bg-white py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 mt-6 sm:mt-10">

          {/* Seção Outros Advogados */}
          <div className="mb-6 sm:mb-8 md:mb-12 my-5">
            <div className="inline-block border border-gray-300 px-3 sm:px-4 py-1 rounded-full">
              <span className="text-xs font-semibold text-primary uppercase">
                Equipe
              </span>
            </div>
          </div>
          <div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary my-8 sm:my-12 md:my-16 lg:w-3/5 font-cabinet">
                Ambiente construído pela união e guiado pelo{" "}
                <span className="text-secondary">comprometimento</span>
              </h2>
            </div>

            <div className="relative w-full h-72 sm:h-96 md:h-96 lg:h-125 rounded-lg sm:rounded-xl overflow-hidden shadow-lg my-6 sm:my-8 md:my-8">
              <Image
                src="/equipe-advogados.svg"
                alt="Equipe de advogados"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 md:gap-10 my-12 sm:my-16 md:my-20">
              <p className="text-primary font-cabinet text-2xl sm:text-xl md:text-2xl lg:text-3xl lg:w-2/5">
                Fortalecendo servidores públicos com advocacia <span className="text-secondary">especializada e experiência técnica</span> 
              </p>
              <div className="w-full lg:w-2/5">
                <p className="text-gray-600 text-sm sm:text-base text-justify font-light">
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  orem Ipsum has been the industry's standard dummy text ever since the"
                </p>
              </div>
            </div>


            <div className="mb-4 sm:mb-5 md:my-8">
              <div className="inline-block border border-gray-300 px-3 sm:px-4 py-1 rounded-full">
                <span className="text-[0.625rem] sm:text-xs font-semibold text-primary uppercase">
                  Nosso corpo jurídico
                </span>
              </div>
            </div>
              <div className="text-lg sm:text-xl text-darkgray font-cabinet mb-6">Fundadores e Sócios</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 my-4">
              {fundadoresESocios.map((advogado) => (
                <div key={advogado.id} className="flex justify-center">
                  <AdvCard
                    imgSrc={advogado.imagem}
                    nome={advogado.nome}
                    titulo={advogado.titulo}
                  />
                </div>
              ))}
            </div>

{/* Divisor */}
          <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent my-12 sm:my-16"/>
            <div className="text-lg sm:text-xl text-darkgray font-cabinet mb-6">Outros Advogados</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
              {outrosAdvogados.map((advogado) => (
                <div key={advogado.id} className="flex justify-center">
                  <AdvCard
                    imgSrc={advogado.imagem}
                    nome={advogado.nome}
                    titulo={advogado.titulo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4">
              Pronto para obter ajuda jurídica?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto px-2">
              Entre em contato conosco para uma consulta gratuita com um de
              nossos especialistas.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-bold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full">
              Solicitar Consulta
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
