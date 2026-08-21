'use client';

import React from 'react';
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
  return (
    <main className="min-h-screen bg-gelwo-ivory text-gelwo-midnight relative selection:bg-gelwo-purple selection:text-gelwo-ivory dark:bg-gelwo-midnight dark:text-gelwo-ivory">
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
