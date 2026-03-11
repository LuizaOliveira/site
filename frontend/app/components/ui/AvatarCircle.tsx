import Image from "next/image";

interface AvatarCircleProps {
  imgSrc: string;
  nome: string;
  big?: boolean;
  rounded?: boolean;
}

export default function AvatarCircle({ imgSrc, nome, big = false, rounded = false }: AvatarCircleProps) {
  return (
    <div className={`group relative w-44 aspect-square  overflow-hidden cursor-pointer ${big ? 'w-72 h-72' : ''} ${rounded ? 'rounded-lg' : 'rounded-full'}`}>
      
      {/* Fundo */}
      <div
        className={`absolute inset-0 ${rounded ? 'rounded-lg' : 'rounded-full'}
          bg-[linear-gradient(to_right,#CAD3E2_40%,#EDEDED_60%)] transition-all duration-500 group-hover:bg-[linear-gradient(to_left,#CAD3E2_50%,#EDEDED_50%)] border border-gray-100`}
      />

      <Image 
        src={`/${imgSrc}`}
        alt={nome}
        fill
        className={`
          object-cover object-[50%_15%]
          ${rounded ? 'rounded-lg' : 'rounded-full'}
          transition-transform duration-500 ease-out
          group-hover:scale-110
        `}
      />
    </div>
  );
}