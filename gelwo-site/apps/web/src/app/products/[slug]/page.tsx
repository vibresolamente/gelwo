'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiFileText, FiCheck, FiArrowLeft, FiArrowRight, FiShield, FiBox, FiLayers } from 'react-icons/fi';

const productDetailsData: Record<string, any> = {
  'enterprise-server-rack': {
    sku: 'GELWO-PRD-001',
    name: 'GELWO Enterprise AI Edge Server Rack 42U',
    category: 'ICT & Hardware Infrastructure',
    price: 'KSh 850,000',
    currency: 'KES',
    availability: 'In Stock (Nairobi HQ Depot)',
    description: 'Heavy-duty 42U server cabinet pre-fitted with dual intelligent PDUs, environmental monitoring sensors, redundant ultra-quiet cooling fans, and high-speed optical fiber patch panels.',
    gallery: [
      { label: '01 / Main Enclosure View', url: '/futuristic_bg.jpg' },
      { label: '02 / Rear Cable Management', url: '/futuristic_bg.jpg' },
      { label: '03 / Smart PDU & Sensor Unit', url: '/futuristic_bg.jpg' },
      { label: '04 / 360° Interactive View', url: '/futuristic_bg.jpg' },
    ],
    features: [
      '42U Standard 19-inch Rack Mounting Depth (1000mm)',
      'Dual-Input Intelligent PDU with SNMP Remote Power Switching',
      'Perforated Hexagonal Vented Doors for 78% Airflow Efficiency',
      'Integrated Biometric Lock Option for ISO 27001 Compliance',
    ],
    specifications: [
      { key: 'Dimensions (HxWxD)', val: '2000mm x 800mm x 1000mm' },
      { key: 'Weight Capacity', val: '1,500 kg Static Load' },
      { key: 'Cooling Fans', val: '4x Heavy Duty Top-Mounted Exhaust Fans' },
      { key: 'Material', val: '2.0mm SPCC Cold Rolled Steel Frame' },
      { key: 'Warranty', val: '3 Years GELWO On-Site Warranty' },
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'enterprise-server-rack';
  const data = productDetailsData[slug] || productDetailsData['enterprise-server-rack'];
  const { triggerQuotationModal } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'photo' | '360' | 'video'>('photo');

  const currentGalleryItem = data.gallery[activeImageIdx] || data.gallery[0];

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Interactive Large Image Area with Controls (Matching txt Section 16) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card p-4 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="relative aspect-square bg-slate-950 rounded-2xl overflow-hidden">
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentGalleryItem.url}')` }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/40">
                      {currentGalleryItem.label}
                    </span>
                  </div>

                  {viewMode === '360' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-4 py-2 bg-cyan-500 text-black font-extrabold text-xs rounded-xl font-mono animate-pulse">
                        🔄 360° ROTATION MODE ACTIVE
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Gallery Controls (← 01 / 04 →) */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono ${viewMode === 'photo' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-900 text-slate-400'}`}
                  >
                    Photos
                  </button>
                  <button
                    onClick={() => setViewMode('360')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono ${viewMode === '360' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-900 text-slate-400'}`}
                  >
                    360° View
                  </button>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : data.gallery.length - 1))}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800"
                  >
                    <FiArrowLeft />
                  </button>
                  <span className="text-slate-300 font-bold">
                    0{activeImageIdx + 1} / 0{data.gallery.length}
                  </span>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev + 1) % data.gallery.length)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {data.gallery.map((g: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-video rounded-xl border overflow-hidden bg-cover bg-center transition-all ${
                    activeImageIdx === idx ? 'border-cyan-400 scale-105 shadow-md' : 'border-slate-800 opacity-60'
                  }`}
                  style={{ backgroundImage: `url('${g.url}')` }}
                />
              ))}
            </div>
          </div>

          {/* Product Info & Purchase / Quote Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                {data.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-3 leading-tight">
                {data.name}
              </h1>
              <span className="text-xs font-mono text-slate-400 block mt-1">SKU: {data.sku}</span>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Guide Pricing</span>
                <span className="text-3xl font-extrabold text-cyan-400 font-heading">{data.price}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                ● {data.availability}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{data.description}</p>

            {/* Features list */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">KEY FEATURES</span>
              {data.features.map((feat: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <FiCheck className="text-cyan-400 text-sm flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Request Quotation CTA Button */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => triggerQuotationModal(data.name)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white font-extrabold text-sm uppercase rounded-2xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
              >
                <FiFileText />
                <span>[ REQUEST OFFICIAL QUOTATION ]</span>
              </button>
            </div>

            {/* Technical Specs Table */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">TECHNICAL SPECIFICATIONS</span>
              <div className="space-y-2 text-xs">
                {data.specifications.map((spec: any, idx: number) => (
                  <div key={idx} className="flex justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 font-medium">{spec.key}</span>
                    <span className="text-white font-mono font-bold">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
