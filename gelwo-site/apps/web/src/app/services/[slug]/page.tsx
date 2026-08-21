'use client';

/**
 * /services/[slug] — Service Detail Page
 *
 * Blueprint Sections 11, 12, 13:
 *  - Service Hero with title, subtitle, CTA
 *  - Image story transition engine (crossfade, zoom, parallax, etc.)
 *  - Full page structure: Hero → Overview → Problems → What We Build
 *    → Features → Process → Technology → FAQ → Quotation → Contact
 *
 * Data is fetched from /api/services/[slug] (DB-first, seed fallback).
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiFileText,
  FiChevronDown,
  FiArrowRight,
  FiLoader,
  FiAlertCircle,
} from 'react-icons/fi';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface GalleryItem {
  url: string;
  altText?: string;
}

interface ServiceData {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  category?: string;
  icon?: string;
  heroImage?: string;
  gallery?: GalleryItem[];
  video?: string;
  features?: string[];
  benefits?: string[];
  process?: ProcessStep[];
  pricingType?: string;
  active?: boolean;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Media slide helper ──────────────────────────────────────────────────────
// Blueprint Section 13: image transitions — crossfade, zoom, parallax, etc.
const SLIDE_EFFECTS = ['crossfade', 'zoom', 'parallax', 'masked reveal', 'horizontal slide', 'depth transition'];

function buildMediaSlides(service: ServiceData) {
  const slides: { label: string; effect: string; url: string }[] = [];
  if (service.heroImage) {
    slides.push({ label: `${service.name} — Hero`, effect: SLIDE_EFFECTS[0], url: service.heroImage });
  }
  if (service.gallery && service.gallery.length > 0) {
    service.gallery.forEach((g, i) => {
      slides.push({ label: `${service.name} — Gallery ${i + 1}`, effect: SLIDE_EFFECTS[(i + 1) % SLIDE_EFFECTS.length], url: g.url });
    });
  }
  // Fallback slide when no images configured
  if (slides.length === 0) {
    slides.push({ label: `${service.name} — Overview`, effect: 'crossfade', url: '/futuristic_bg.jpg' });
    slides.push({ label: `${service.name} — Detail`, effect: 'zoom', url: '/futuristic_bg.jpg' });
    slides.push({ label: `${service.name} — Process`, effect: 'parallax', url: '/futuristic_bg.jpg' });
  }
  return slides;
}

// ─── Loading skeleton ────────────────────────────────────────────────────────
function ServiceSkeleton() {
  return (
    <div className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="h-5 w-40 bg-slate-800 rounded-full" />
          <div className="h-12 w-3/4 bg-slate-800 rounded-xl" />
          <div className="h-4 w-full bg-slate-800 rounded" />
          <div className="h-4 w-5/6 bg-slate-800 rounded" />
          <div className="h-14 w-48 bg-slate-700 rounded-2xl mt-4" />
        </div>
        <div className="lg:col-span-6">
          <div className="aspect-video bg-slate-800 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'software-development';
  const { triggerQuotationModal } = useApp();

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-advance slides every 4 seconds (cinematic feel, Section 13)
  useEffect(() => {
    if (!service) return;
    const slides = buildMediaSlides(service);
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [service]);

  // Fetch from API (Section 42)
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/services/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Service not found');
        return res.json();
      })
      .then((data) => {
        setService(data.service);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const slides = service ? buildMediaSlides(service) : [];
  const currentSlide = slides[activeSlideIdx] || slides[0];

  const features = Array.isArray(service?.features)
    ? (service!.features as string[])
    : [];
  const benefits = Array.isArray(service?.benefits)
    ? (service!.benefits as string[])
    : [];
  const process = Array.isArray(service?.process)
    ? (service!.process as ProcessStep[])
    : [];

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      {loading && (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#070B19] via-[#0A0F1D] to-[#0A0F1D]">
          <ServiceSkeleton />
        </section>
      )}

      {error && (
        <section className="pt-48 pb-24 flex flex-col items-center justify-center">
          <FiAlertCircle className="text-red-400 text-5xl mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Service Not Found</h2>
          <p className="text-slate-400 mb-8">{error}</p>
          <a href="/services" className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-2xl">
            Browse All Services
          </a>
        </section>
      )}

      {!loading && !error && service && (
        <>
          {/* ── SERVICE HERO — Section 12 ──────────────────────────────────── */}
          <section className="pt-36 pb-20 relative overflow-hidden bg-gradient-to-b from-[#070B19] via-[#0A0F1D] to-[#0A0F1D]">
            {/* Background ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Hero Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-6 space-y-6"
                >
                  <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    GELWO SERVICE DIVISION
                  </span>

                  <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading leading-tight uppercase">
                    {service.name.split(' ').map((word, i) =>
                      i === 0 ? (
                        <span key={i} className="text-gradient-cyan">{word} </span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                  </h1>

                  {service.shortDescription && (
                    <p className="text-xl text-cyan-300 font-medium leading-relaxed">
                      {service.shortDescription}
                    </p>
                  )}

                  {service.longDescription && (
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {service.longDescription}
                    </p>
                  )}

                  {/* Stats bar */}
                  {features.length > 0 && (
                    <div className="flex gap-6 pt-2">
                      <div>
                        <span className="text-2xl font-extrabold text-cyan-400 font-heading">{features.length}+</span>
                        <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Features</p>
                      </div>
                      {benefits.length > 0 && (
                        <div>
                          <span className="text-2xl font-extrabold text-emerald-400 font-heading">{benefits.length}+</span>
                          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Benefits</p>
                        </div>
                      )}
                      {process.length > 0 && (
                        <div>
                          <span className="text-2xl font-extrabold text-purple-400 font-heading">{process.length}</span>
                          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Process Steps</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => triggerQuotationModal(service.name)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white font-extrabold text-sm uppercase rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all flex items-center space-x-2"
                    >
                      <FiFileText />
                      <span>[ START A PROJECT ]</span>
                    </button>
                    <a
                      href="#overview"
                      className="px-6 py-4 glass-card border border-slate-700 text-slate-200 font-bold text-sm uppercase rounded-2xl hover:text-white flex items-center gap-2"
                    >
                      <span>Learn More</span>
                      <FiChevronDown />
                    </a>
                  </div>
                </motion.div>

                {/* ── Image Story Transition Engine — Section 13 ────────────────── */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="lg:col-span-6"
                >
                  <div className="glass-card p-4 rounded-3xl border border-cyan-500/30 shadow-2xl">
                    <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlideIdx}
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.94 }}
                          transition={{ duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] }}
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${currentSlide?.url}')` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                            <span className="text-xs font-mono font-bold text-cyan-400 bg-black/60 px-3 py-1 rounded-full border border-cyan-500/40 w-max mb-2">
                              ✦ {currentSlide?.effect}
                            </span>
                            <h4 className="text-base font-bold text-white font-heading">{currentSlide?.label}</h4>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
                        <motion.div
                          key={activeSlideIdx}
                          className="h-full bg-cyan-400"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 4, ease: 'linear' }}
                        />
                      </div>
                    </div>

                    {/* Slide Controls */}
                    <div className="mt-4 flex items-center justify-between text-xs font-mono px-2">
                      <div className="flex space-x-2">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveSlideIdx(idx)}
                            className={`w-8 h-8 rounded-lg border transition-all ${
                              activeSlideIdx === idx
                                ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </button>
                        ))}
                      </div>
                      <span className="text-slate-400">
                        {activeSlideIdx + 1} / {slides.length}
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ── DETAIL SECTIONS — Section 11 ──────────────────────────────────── */}
          <section id="overview" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

            {/* Benefits */}
            {benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/20"
              >
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-2">
                  WHY CHOOSE GELWO FOR THIS
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mb-8">Key Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <FiCheckCircle className="text-emerald-400 text-xl flex-shrink-0 mt-0.5" />
                      <span className="text-slate-200 text-sm leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Features & Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-8 rounded-3xl border border-cyan-500/20"
                >
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-2">
                    FEATURES
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading mb-6">What We Deliver</h3>
                  <ul className="space-y-4">
                    {features.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                        <span className="text-cyan-400 font-mono font-bold flex-shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {process.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass-card p-8 rounded-3xl border border-purple-500/20"
                >
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block mb-2">
                    PROCESS
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading mb-6">How GELWO Delivers</h3>
                  <div className="space-y-4">
                    {process.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-extrabold font-heading text-sm">
                          {String(step.step).padStart(2, '0')}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{step.title}</p>
                          <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quotation CTA — Section 11 */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-10 rounded-3xl border border-cyan-500/40 text-center bg-gradient-to-r from-blue-900/30 via-[#0A0F1D] to-purple-900/30"
            >
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">REQUEST A QUOTATION</span>
              <h3 className="text-3xl font-extrabold text-white font-heading uppercase mt-3 mb-3">
                Ready to Build with GELWO?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                Get an instant AI-calculated quotation or connect with a GELWO technical lead today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => triggerQuotationModal(service.name)}
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-sm uppercase rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <FiFileText />
                  <span>[ GENERATE INSTANT QUOTATION ]</span>
                </button>
                <a
                  href="/contact"
                  className="px-8 py-4 glass-card border border-slate-700 text-slate-200 font-bold text-sm uppercase rounded-2xl hover:text-white flex items-center justify-center gap-2"
                >
                  <span>Talk to a Specialist</span>
                  <FiArrowRight />
                </a>
              </div>
            </motion.div>

          </section>
        </>
      )}

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
