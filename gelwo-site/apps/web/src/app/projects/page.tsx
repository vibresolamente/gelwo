'use client';

/**
 * /projects — Portfolio / Selected Work Page
 *
 * Blueprint Sections 17-20:
 *   - Case study showcase
 *   - Category filtering
 *   - Metrics highlight
 *   - Direct link to detail case study
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion } from 'framer-motion';
import { FiAward, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

interface Metric {
  label: string;
  value: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category?: string;
  shortDesc?: string;
  heroImage?: string;
  metrics?: Metric[];
  featured?: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      {/* Hero Header */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-gradient-to-b from-[#070B19] via-[#0A0F1D] to-[#0A0F1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-6"
          >
            <FiAward className="text-cyan-400" />
            <span>Proven Enterprise Track Record</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold text-white font-heading tracking-tight uppercase leading-none"
          >
            SELECTED <span className="text-gradient-cyan">WORK</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Detailed engineering case studies showcasing system implementations, clean energy microgrids,
            and ICT security infrastructure deployed across East Africa.
          </motion.p>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading portfolio...</div>
        ) : (
          projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-mono font-extrabold text-cyan-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {project.category && (
                      <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-mono font-bold uppercase">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-extrabold text-white font-heading group-hover:text-cyan-300 transition-colors uppercase">
                    {project.title}
                  </h3>

                  {project.client && (
                    <p className="text-xs font-mono text-slate-400">Client: {project.client}</p>
                  )}

                  {project.shortDesc && (
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {project.shortDesc}
                    </p>
                  )}

                  {/* Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-4 pt-2">
                      {project.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono"
                        >
                          <span className="text-cyan-400 font-bold mr-2">{m.value}</span>
                          <span className="text-slate-400">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4">
                    <a
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center space-x-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider hover:text-white transition-colors"
                    >
                      <span>[ READ CASE STUDY ]</span>
                      <FiArrowRight />
                    </a>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5">
                  <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative group-hover:border-cyan-500/50 transition-colors">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${project.heroImage || '/futuristic_bg.jpg'}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
