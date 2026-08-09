'use client';

import React, { useState } from 'react';
import { CinematicLoader } from '@/components/CinematicLoader';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { LiveStatistics } from '@/components/LiveStatistics';
import { WhoWeAre } from '@/components/WhoWeAre';
import { ServicesSection } from '@/components/ServicesSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { IndustriesWeServe } from '@/components/IndustriesWeServe';
import { AIQuotationCenter } from '@/components/AIQuotationCenter';
import { TestimonialsAndCertifications } from '@/components/TestimonialsAndCertifications';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      {/* Cinematic Loader Intro Sequence */}
      {!loaderComplete && (
        <CinematicLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Main Website Structure */}
      <Header />
      <HeroSection />
      <LiveStatistics />
      <WhoWeAre />
      <ServicesSection />
      <WhyChooseUs />
      <FeaturedProjects />
      <IndustriesWeServe />
      <AIQuotationCenter />
      <TestimonialsAndCertifications />
      <Footer />

      {/* Global Interactive Widgets & Modals */}
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
