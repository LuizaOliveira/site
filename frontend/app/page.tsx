"use client";
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { SobreNos  } from './components/sections/SobreNos';
import { Footer } from './components/layout/Footer';
import { AreaAtuacao } from './components/sections/AreaAtuacao';
import { NossaEquipe } from './components/sections/NossaEquipe';
import { ConsultingHero } from './components/sections/ConsultingHero';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { NewsFilterClient } from './components/features/news/NewsFilterClient';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      {/* <Hero /> */}
      <ConsultingHero />
      <SobreNos />
      <AreaAtuacao />
      <NossaEquipe />
      <Testimonials />
      <NewsFilterClient/>
      <Contact />
      <Footer />
    </main>
  );
}
