import { Icon } from '@iconify/react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#0F2747] text-white pt-16 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COLUNA 1 - LOGO + CONTATO */}
          <div className="space-y-6">
            <Image
              src="/logo-test.svg"
              alt="Clodonil Monteiro Advocacia"
              width={200}
              height={60}
              className="w-auto h-14"
            />

            <div className="text-sm text-slate-300 leading-relaxed space-y-4">
              <p>
                Rua Silvino Adonias Bezerra, 02 – <br />
                Acari-RN
              </p>

              <div>
                <p>Clodonilmonteiro@gmail.com</p>
                <p>Fone: (84) 3433-2179</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-5 py-2 rounded-full text-sm font-semibold">
                Fale conosco
              </button>

              <div className="bg-orange-500 hover:bg-orange-600 transition-colors w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                <Icon icon="mdi:arrow-top-right" className="text-lg" />
              </div>
            </div>
          </div>

          {/* COLUNA 2 - LINKS ÚTEIS */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Links úteis
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <span>▶</span> Início
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <span>▶</span> Institucional
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <span>▶</span> Conteúdo
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <span>▶</span> Contato
              </li>
            </ul>
          </div>

          {/* COLUNA 3 - REDES SOCIAIS */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Redes Sociais
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <Icon icon="mdi:facebook" /> Facebook
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <Icon icon="mdi:linkedin" /> LinkedIn
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <Icon icon="mdi:youtube" /> Youtube
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <Icon icon="mdi:instagram" /> Instagram
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer">
                <Icon icon="ic:baseline-tiktok" /> TikTok
              </li>
            </ul>
          </div>

          {/* COLUNA 4 - FUNCIONAMENTO */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Funcionamento
            </h3>

            <div className="space-y-6 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-white">
                  Segunda à Sexta-feira
                </p>
                <p>07:00 AM - 18:00 PM</p>
              </div>

              <div>
                <p className="font-semibold text-white">
                  Sábado e Domingo
                </p>
                <p>Fechado</p>
              </div>
            </div>
          </div>

        </div>

        {/* LINHA INFERIOR */}
        <div className="mt-16 border-t border-slate-600/40 pt-6 text-xs text-slate-400 text-left">
          © 2025 Clodonil Monteiro Advocacia – CNPJ 37.694.573/0001-72 – 
          Rua Silvino Adonias Bezerra, 02 – Acari-RN – 
          Fone: (84) 3433-2179 – Todos os direitos reservados.
        </div>

      </div>
    </footer>
  )
}