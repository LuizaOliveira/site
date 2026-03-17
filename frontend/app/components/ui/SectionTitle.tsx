interface SectionTitleProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
  center?: boolean;
  centerOnMobile?: boolean;
  news?: boolean;
}

export function SectionTitle({ children, title, subtitle, className = '', dark = false, center = false, centerOnMobile = false, news = false }: SectionTitleProps) {
  return (
    <div className={`${center ? 'text-center' : centerOnMobile ? 'text-center lg:text-left' : ''} mb-12 lg:mb-16 ${className}`}>
      <div className={`flex items-center gap-2 mb-4 ${center ? 'justify-center' : centerOnMobile ? 'justify-center lg:justify-start' : ''}`}>
        <span className="w-4 h-1 bg-[#E86000] rounded-full"></span>
        <span className={`font-normal text-lg ${dark ? 'text-white' : 'text-darkgray'}`}>{subtitle}</span>
      </div>
      <h2 className={`${news ? 'text-xl' : 'text-xl'}  sm:text-4xl lg:text-5xl font-bold font-red-hat-text `}>
        <span className={` ${dark ? 'text-white' : 'text-primary'}`}>{title} </span>
        <span className="text-[#E86000]">{children}</span>
      </h2>
    </div>
  );
}