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
      <section className="min-h-screen bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 mt-10">

          

          {/* Seção Outros Advogados */}
          <div className="mb-8 md:mb-12">
            <div className="inline-block border border-gray-300 px-4 py-1 rounded-full">
              <span className="text-xs md:text-sm font-semibold text-primary uppercase">
                Equipe
              </span>
            </div>
          </div>
          <div>
            <div>
              <h2 className="text-4xl md:text-6xl w-3/5 font-bold text-primary my-16  font-cabinet">
                Ambiente construído pela união e guiado pelo{" "}
                <span className="text-secondary">comprometimento</span>
              </h2>
            </div>

            <Image
              src="/equipe-advogados.svg"
              alt="Equipe de advogados"
              width={1200}
              height={400}
              className="w-full h-auto my-8 rounded-xl shadow-lg mt-8"
            />

            <div className="flex justify-between my-20 iten">
              <p className="text-primary font-cabinet w-2/5 text-4xl">
                Fortalecendo servidores públicos com advocacia <span className="text-secondary">especializada e experiência técnica</span> 
              </p>
              <div className="w-2/5">
                <p className="text-gray-600 text-md text-justify font-light">
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  orem Ipsum has been the industry's standard dummy text ever since the"
                </p>
              </div>
            </div>


            <div className="mb-5 md:my-8">
              <div className="inline-block border border-gray-300 px-4 py-1 rounded-full">
                <span className="text-[0.625rem] md:text-xs font-semibold text-primary uppercase">
                  Nosso corpo jurídico
                </span>
              </div>
            </div>
              <div className="text-xl text-darkgray font-cabinet ml-2">Fundadores e Sócios</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-4">
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
          <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent my-16"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
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
          <div className="mt-20 px-6 py-12 md:py-16 bg-linear-to-r from-primary/5 to-secondary/5 rounded-3xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Pronto para obter ajuda jurídica?
            </h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Entre em contato conosco para uma consulta gratuita com um de
              nossos especialistas.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-bold px-8 py-3 rounded-full">
              Solicitar Consulta
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
