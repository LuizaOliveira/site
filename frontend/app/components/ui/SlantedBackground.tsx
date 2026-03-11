interface SlantedBackgroundProps {
  children: React.ReactNode;

}


export function SlantedBackground({ children }: SlantedBackgroundProps) {
  return (
    <section className="relative w-full  overflow-hidden py-32">
      
      {/* Background inclinado */}
      <div
        className="
          absolute
          inset-0
          bg-gray-100
          transform
          -skew-y-3
          origin-top-left
        "
      />

      {/* Conteúdo (corrige a inclinação) */}
      <div className="relative transform skew-y-3 max-w-6xl mx-auto px-6">
        {children}
      </div>

    </section>
  );
}
