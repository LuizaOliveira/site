import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0F2747] text-white pt-16 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COLUNA 1 - LOGO + CONTATO */}
          <div className="space-y-6 col-span-1 lg:col-span-1">
            <Image
              src="/logo.svg"
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
              <Link href="/#contato" className="bg-orange-500 hover:bg-orange-600 transition-colors px-5 py-2 rounded-full text-sm font-semibold">
                Fale conosco
              </Link>

              <Link href="/#contato" aria-label="Ir para contato" className="bg-orange-500 hover:bg-orange-600 transition-colors w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                <Icon icon="mdi:arrow-top-right" className="text-lg" />
              </Link>
            </div>
          </div>

          {/* COLUNA 2 - LINKS ÚTEIS */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Links úteis
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <Link href="/#hero" className="flex items-center gap-2">
                <span>▶</span> Início
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <Link href="/#sobre-nos" className="flex items-center gap-2">
                <span>▶</span> Institucional
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <Link href="/#noticias" className="flex items-center gap-2">
                <span>▶</span> Conteúdo
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <Link href="/#contato" className="flex items-center gap-2">
                <span>▶</span> Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3 - REDES SOCIAIS */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Redes Sociais
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <a
                  href="https://www.facebook.com/clodonilmonteiroadvocacia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Icon icon="mdi:facebook" /> Facebook
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <a
                  href="https://br.linkedin.com/in/clodonil-monteiro-pereira-10ba9b158"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Icon icon="mdi:linkedin" /> LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <a
                  href="https://www.youtube.com/@clodonilmonteiroadvocacia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Icon icon="mdi:youtube" /> Youtube
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <a
                  href="https://www.instagram.com/clodonilmonteiro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Icon icon="mdi:instagram" /> Instagram
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <a
                  href="https://www.tiktok.com/@clodonilmonteiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Icon icon="ic:baseline-tiktok" /> TikTok
                </a>
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