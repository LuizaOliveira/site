'use client'

import Image from 'next/image'
import { Icon } from '@iconify/react'
import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Fernanda Lima",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the!",
    stars: 5,
    image: "https://www.loremfaces.net/96/id/5.jpg"
  },
  {
    name: "Roberto Souza",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the!",
    stars: 5,
    image: "https://www.loremfaces.net/96/id/4.jpg"
  },
  {
    name: "Ana Clara Santos",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the!",
    stars: 5,
    image: "https://www.loremfaces.net/96/id/1.jpg"
  },
  {
    name: "Carlos Eduardo",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    stars: 5,
    image: "https://www.loremfaces.net/96/id/2.jpg"
  },
  {
    name: "Juliana Mendes",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    stars: 5,
    image: "https://www.loremfaces.net/96/id/3.jpg"
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const totalPages = Math.ceil(testimonials.length / cardsPerPage)

  // RESPONSIVIDADE 1 / 2 / 3
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 768) setCardsPerPage(1)
      else if (window.innerWidth < 1280) setCardsPerPage(2)
      else setCardsPerPage(3)
    }

    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return

    const containerWidth = scrollRef.current.offsetWidth

    scrollRef.current.scrollTo({
      left: containerWidth * index,
      behavior: 'smooth'
    })

    setActiveIndex(index)
  }, [])

  const navigate = (direction: 'next' | 'prev') => {
    if (direction === 'next' && activeIndex < totalPages - 1) {
      scrollToIndex(activeIndex + 1)
    } else if (direction === 'prev' && activeIndex > 0) {
      scrollToIndex(activeIndex - 1)
    }
  }

  // TOUCH/SWIPE HANDLERS PARA MOBILE
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    
    const x = e.touches[0].pageX
    const walk = (startX - x) * 2 // multiplicador para sensibilidade
    scrollRef.current.scrollLeft = scrollLeft + walk
  }

  const handleTouchEnd = () => {
    if (!scrollRef.current) return
    setIsDragging(false)
    
    // Snap para a página mais próxima
    const containerWidth = scrollRef.current.offsetWidth
    const scrollPosition = scrollRef.current.scrollLeft
    const newIndex = Math.round(scrollPosition / containerWidth)
    
    scrollToIndex(Math.max(0, Math.min(newIndex, totalPages - 1)))
  }

  // MOUSE DRAG PARA DESKTOP (OPCIONAL)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(scrollRef.current.scrollLeft)
    scrollRef.current.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    
    const x = e.pageX
    const walk = (startX - x) * 2
    scrollRef.current.scrollLeft = scrollLeft + walk
  }

  const handleMouseUp = () => {
    if (!scrollRef.current) return
    setIsDragging(false)
    scrollRef.current.style.cursor = 'grab'
    
    // Snap para a página mais próxima
    const containerWidth = scrollRef.current.offsetWidth
    const scrollPosition = scrollRef.current.scrollLeft
    const newIndex = Math.round(scrollPosition / containerWidth)
    
    scrollToIndex(Math.max(0, Math.min(newIndex, totalPages - 1)))
  }

  const handleMouseLeave = () => {
    if (isDragging && scrollRef.current) {
      handleMouseUp()
    }
  }

  // ANIMAÇÃO
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [cardsPerPage])

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <section
        ref={sectionRef}
        className="bg-[#F3F4F6] py-20 lg:py-28 px-4 relative"
      >
      <div className="container mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-0.5 bg-orange-500"></span>
            Veja o que dizem sobre a gente
          </p>

          <h2 className="text-3xl lg:text-5xl font-bold text-[#0F172A]">
            Relatos e{" "}
            <span className="text-[#F97316]">Avaliações</span>
          </h2>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none hide-scrollbar pt-12 pb-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex gap-6 lg:gap-8 shrink-0 w-full justify-center snap-start px-4"
            >
              {testimonials
                .slice(
                  pageIndex * cardsPerPage,
                  (pageIndex + 1) * cardsPerPage
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={`testimonial-card relative bg-white my-2 rounded-3xl pt-24 pb-10 px-6 lg:px-8 shadow-lg shrink-0 overflow-visible ${
                      cardsPerPage === 1 
                        ? 'w-full max-w-md mx-auto' 
                        : cardsPerPage === 2 
                        ? 'w-[calc(50%-12px)] max-w-md' 
                        : 'w-[calc(33.333%-22px)] max-w-sm'
                    }`}
                  >
                    {/* AVATAR */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    {/* ASPAS */}
                    <div className="absolute top-6 right-6 text-gray-100 text-7xl font-serif pointer-events-none">
                      “
                    </div>

                    {/* STARS */}
                    <div className="flex gap-1 mb-4 ">
                      {[...Array(item.stars)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="mdi:star"
                          className="text-[#F97316] text-xl"
                        />
                      ))}
                    </div>

                    {/* NAME */}
                    <h4 className="font-bold text-lg text-[#0E2C55] mb-4">
                      {item.name}
                    </h4>

                    {/* TEXT */}
                    <p className="text-[#0E2C55] text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
            </div>
          ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            onClick={() => navigate('prev')}
            disabled={activeIndex === 0}
            className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
              activeIndex === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 hover:scale-110 cursor-pointer'
            }`}
            aria-label="Anterior"
          >
            <Icon icon="mdi:chevron-left" className="text-xl text-gray-700" />
          </button>

          {/* Indicadores de página */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-8 bg-[#F97316]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate('next')}
            disabled={activeIndex === totalPages - 1}
            className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
              activeIndex === totalPages - 1
                ? 'bg-gray-300 opacity-50 cursor-not-allowed text-gray-500'
                : 'bg-[#F97316] hover:opacity-90 hover:scale-110 cursor-pointer text-white'
            }`}
            aria-label="Próximo"
          >
            <Icon icon="mdi:chevron-right" className="text-xl" />
          </button>
        </div>
      </div>
    </section>
    </>
  )
}
// <section ref={sectionRef} className="bg-primary py-12 lg:py-20 px-4 lg:px-6 relative overflow-hidden">
  {/* <div className="absolute top-0 left-0 w-full mt-4 lg:mt-9 pointer-events-none opacity-60">
    <Image src="/lines.svg" alt="" width={1920} height={100} className="w-full h-10 lg:h-auto object-cover" />
  </div>

  <div className="container mx-auto relative z-10">
    <div ref={headerRef} className="py-6 lg:py-10">
      <SectionTitle title='Relatos e' subtitle='Veja o que dizem sobre a gente' center dark>Avaliações</SectionTitle>
    </div>

    <div
      ref={scrollRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      className="flex overflow-hidden pb-4 mb-8 lg:mb-12 cursor-grab active:cursor-grabbing select-none"
    >
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          className="flex gap-4 lg:gap-6 shrink-0 w-full justify-center px-2 lg:px-4"
        >
          {testimonials
            .slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage)
            .map((item, index) => (
              <div
                key={index}
                className="bg-secondary-blue p-6 lg:p-8 rounded-2xl border border-white/5 relative w-full lg:max-w-170 testimonial-card min-h-[420px] flex flex-col justify-between"
              >
                <Image
                  src="/vector.svg"
                  alt=""
                  width={120}
                  height={120}
                  className="absolute top-4 right-4 lg:right-8 opacity-10 pointer-events-none w-24 lg:w-32 z-0"
                />

                <div className="relative z-10"> 
                  <div className="flex gap-1 mb-4 lg:mb-6">
                    {[...Array(item.stars)].map((_, i) => (
                      <Icon key={i} icon="mdi:star" className="text-secondary text-xl" />
                    ))}
                  </div>
                  <p className="text-[#A9B5CE] text-base lg:text-lg text-justify leading-relaxed mb-6 lg:mb-8">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm lg:text-base">{item.name} — {item.location}</h4>
                    <p className="text-[#6A80B0] text-xs lg:text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>

    <div ref={paginationRef} className="flex justify-center gap-2 lg:gap-3 py-6 lg:py-14">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToIndex(index)}
          className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
            ? 'w-8 bg-[#F97D0E]'
            : 'w-4 lg:w-8 bg-[#313164] hover:bg-[#4a4a8a]'
            }`}
          aria-label={`Ir para página ${index + 1}`}
        />
      ))}
    </div>
  </div>

  <div className='absolute bottom-0 left-0 w-full pointer-events-none'>
    <Image src="/linhas verticais.svg" alt="" width={1920} height={100} className="w-full h-16 lg:h-auto object-cover opacity-50" />
  </div> */}

  
// </section> */}