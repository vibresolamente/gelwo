'use client';

/**
 * FeaturedProjects Component — GELWO Poster Color System
 * Dark section: Gradient 04 (Futuristic Dark) for the Software Development vibe
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiMapPin, FiArrowRight, FiAward } from 'react-icons/fi';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'Software' | 'Energy' | 'ICT' | 'Construction';
  location: string;
  year: string;
  summary: string;
  stats: string;
  client: string;
}

const projectsList: ProjectItem[] = [
  {
    id: 'p1',
    slug: 'enterprise-management-system',
    title: 'Multi-Branch Enterprise ERP System',
    category: 'Software',
    location: 'Nairobi / Nakuru',
    year: '2026',
    summary: 'Centralized cloud ERP integrating multi-store POS, inventory telemetry, HR payroll, and automated M-Pesa & card billing across 12 county hubs.',
    stats: '12 County Hubs • 0% Reconciliation Loss',
    client: 'Commercial Retail Enterprise',
  },
  {
    id: 'p2',
    slug: 'commercial-solar-microgrid',
    title: '150kW Industrial Solar Microgrid & BESS',
    category: 'Energy',
    location: 'Nakuru Hub',
    year: '2025',
    summary: '150kW rooftop monocrystalline solar array with 300kWh lithium iron phosphate energy storage bank and SCADA remote telemetry.',
    stats: '150kW Solar • 300kWh Battery Storage',
    client: 'Industrial Manufacturing Plant',
  },
  {
    id: 'p3',
    slug: 'institutional-cctv-access-control',
    title: 'Campus 4K CCTV & Biometric Access Grid',
    category: 'ICT',
    location: 'Nairobi',
    year: '2025',
    summary: '64-camera 4K CCTV surveillance installation with AI perimeter motion alerts, fiber backbone, and biometric facial recognition turnstiles.',
    stats: '64 4K Cameras • Biometric Turnstiles',
    client: 'Educational Campus',
  },
];

export const FeaturedProjects: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const filteredProjects = filter === 'ALL'
    ? projectsList
    : projectsList.filter((p) => p.category.toUpperCase() === filter);

  return (
    <section id="portfolio" className="py-24 relative z-10 border-t border-gelwo-purple/20"
      style={{ background: 'linear-gradient(135deg, #131322 0%, #261E3D 55%, #4A346A 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-gelwo-sage font-mono block mb-2">
              ENGINEERING CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gelwo-ivory font-heading uppercase">
              SELECTED <span className="text-gradient-light">WORK.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'SOFTWARE', 'ENERGY', 'ICT'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-heading tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-gelwo-purple text-gelwo-ivory'
                    : 'bg-gelwo-royal text-gelwo-gray border border-gelwo-purple/30 hover:border-gelwo-purple'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-8 rounded-3xl flex flex-col justify-between group border border-gelwo-purple/25 backdrop-blur-md transition-all hover:border-gelwo-purple/50 hover:translate-y-[-3px]"
              style={{ background: 'rgba(38, 30, 61, 0.65)' }}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-gelwo-purple bg-gelwo-midnight px-3 py-1 rounded-full border border-gelwo-purple/30">
                    {proj.category}
                  </span>
                  <span className="text-xs font-mono text-gelwo-gray">{proj.year}</span>
                </div>

                <h3 className="text-xl font-bold text-gelwo-ivory font-heading mb-3 group-hover:text-gelwo-blush transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs font-mono text-gelwo-sage mb-4 flex items-center gap-1">
                  <FiMapPin />
                  <span>{proj.location} • {proj.client}</span>
                </p>

                <p className="text-xs text-gelwo-gray leading-relaxed mb-6">
                  {proj.summary}
                </p>
              </div>

              <div>
                <div className="p-3 rounded-xl bg-gelwo-midnight border border-gelwo-royal text-xs font-mono text-gelwo-purple font-bold mb-6">
                  ⚡ {proj.stats}
                </div>

                <a
                  href={`/projects/${proj.slug}`}
                  className="w-full py-3 rounded-xl text-xs flex items-center justify-center space-x-2 border border-gelwo-purple/30 text-gelwo-ivory font-heading font-bold hover:bg-gelwo-purple/20 transition-colors"
                >
                  <span>[ READ CASE STUDY ]</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
