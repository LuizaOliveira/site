"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AvatarCircle from "./AvatarCircle";
import { s } from "framer-motion/client";

interface AdvCardProps {
  imgSrc: string;
  nome: string;
  titulo?: string;
  texto?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export function AdvCard({ imgSrc, nome, titulo, texto, social }: AdvCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    const nomeFormatado = nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
    router.push(`/equipe/${nomeFormatado}`);
  };
  return (
    <div onClick={handleNavigate} className='group bg-white w-xs lg:w-sm rounded-xl border border-gray-200 shadow-lg hover:bg-[#F3F5FD] transition-colors duration-300'>
    <div className='flex items-center justify-center p-5'>
      <AvatarCircle imgSrc={imgSrc} nome={nome}  />
      </div> 
      <div className='h-px bg-gray-300 w-full group-hover:bg-gray-400 transition-colors duration-300'></div>
      {!social ? (
      <div className='px-5 py-4  my-2 flex items-center justify-between'>
        <div>
          
          <p className='text-[#061A58] font-semibold group-hover:text-primary transition-colors duration-300'>{nome}</p>
          <p className='text-[#061A58] font-light text-xs group-hover:text-primary transition-colors duration-300'>{titulo || "Advogado Fundodor"}</p>
        </div>

        <button className='flex items-center gap-2 mt-3 rounded-full hover:scale-110 transition-transform duration-300'>
          <div className='bg-secondary w-8 h-8 rounded-full flex items-center justify-center text-white text-xs rotate-45 transform'>
            <Icon icon="bitcoin-icons:arrow-up-filled" className="w-5 h-5 transform text-primary" />
          </div>
        </button>

      </div>
      ): (
        <div className='px-5 py-4  my-2 flex items-center justify-center gap-5'>
          {/* <div>
            <p className='text-[#061A58] font-semibold group-hover:text-white transition-colors duration-300'>{nome}</p>
            <p className='text-[#061A58] font-light text-xs group-hover:text-white transition-colors duration-300'>{titulo || "Advogado Fundodor"}</p>
          </div> */}
          {social.linkedin && (
            <Icon icon="akar-icons:linkedinv1-fill" className="w-6 h-6 text-[#061A58] hover:text-primary transition-colors duration-300 cursor-pointer" />
          )}
          {social.twitter && (
            <Icon icon="ri:twitter-x-line" className="w-6 h-6 text-[#061A58] hover:text-primary transition-colors duration-300 cursor-pointer" />
          )}
          {social.facebook && (
            <Icon icon="uil:instagram" className="w-6 h-6 text-[#061A58] hover:text-primary transition-colors duration-300 cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
}
