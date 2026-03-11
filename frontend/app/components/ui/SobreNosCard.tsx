import { Icon } from "@iconify/react";

interface SobreNosCardProps {
  titulo: string;
  icone: string;
  texto: string;
}

export function SobreNosCard({ titulo, icone, texto }: SobreNosCardProps) {
  return (
    <div className="flex items-center w-full sm:w-auto md:my-0 sm:my-10">
      <div className="flex items-center border border-text-color shadow-text-color shadow-md rounded-lg w-full sm:w-70 bg-white">
          <span className="bg-secondary h-16 sm:h-20 w-1 rounded-r-full shrink-0" />
          <div className="p-3 sm:p-4 flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-primary text-xs sm:text-sm">{titulo}</div>
              <Icon icon={icone} className="text-secondary w-7 h-7" />
            </div>
            <h2 className="text-primary font-bold text-sm sm:text-base">{texto}</h2>

          </div>
        </div>
    </div>
    
  )
}