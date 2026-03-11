'use client'

import Image from 'next/image'
import { Icon } from '@iconify/react'

export function FreeAnalysisSection() {
  return (
    <section className="w-full   px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch">
        
        {/* CARD ESQUERDA */}
        <div className="bg-[#fefeff] rounded-3xl p-10 shadow-2xl border border-gray-200 z-10">
          
          {/* Badge */}
          <span className="inline-block text-xs px-4 py-1 rounded-full border border-orange-400 text-orange-500 mb-6">
            Fale conosco
          </span>

          {/* Título */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tenha uma análise gratuita
          </h2>

          <p className="text-gray-600 mb-8">
            Preencha os dados e marque o que precisa e receba uma análise
            gratuita do seu caso.
          </p>

          {/* Form */}
          <form className="space-y-6">

            {/* Linha 1 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Seu nome</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Linha 2 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Telefone</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">
                  Tipo de profissional
                </label>
                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="tipo" className="accent-orange-500" />
                    Professor
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="tipo" className="accent-orange-500" />
                    Servidor
                  </label>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-2 gap-y-3 gap-x-8 pt-4">
              {[
                'Progressão de Letras',
                'Progressão de nível (Titulação)',
                'Retificação de Titulação',
                'Licença Prêmio',
                'Demora para concessão de aposentadoria',
                'Retificação de Letra',
              ].map((item, index) => (
                <label
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    className="mt-1 accent-orange-500"
                  />
                  {item}
                </label>
              ))}
            </div>

            {/* Botão */}
            <div className="pt-6">
              <button
                type="submit"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-md"
              >
                <Icon icon="mdi:whatsapp" width={20} />
                Enviar
              </button>
            </div>

          </form>
        </div>

        {/* IMAGEM DIREITA */}
        <div className="relative hidden lg:block right-10">
          <Image
            src="/group.svg" // coloque sua imagem aqui
            alt="Consultoria"
            fill
            className="object-cover rounded-r-3xl"
          />
        </div>

      </div>
    </section>
  )
}