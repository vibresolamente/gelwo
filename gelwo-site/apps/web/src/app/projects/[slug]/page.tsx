'use client';

/**
 * /projects/[slug] — Case Study Detail Page
 *
 * Blueprint Sections 18-20:
 *   - Overview, Client, Industry
 *   - Challenge, Solution, Architectural Experience
 *   - Technology Stack, Verified Results, Testimonial
 *   - Quotation CTA
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiFileText,
  FiCheckCircle,
  FiAward,
  FiLoader,
  FiAlertCircle,
} from 'react-icons/fi';

interface Metric {
  label: string;
  value: string;
}

interface Testimonial {
  quote: string;
  author: string;
  company?: string;
}

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category?: string;
  shortDesc?: string;
  fullDesc?: string;
  heroImage?: string;
  metrics?: Metric[];
  technologies?: string[];
  testimonial?: Testimonial;
}

export default function CaseStudyDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'enterprise-management-system';
  const { triggerQuotationModal } = useApp();

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/projects/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then((data) => {
        setProject(data.project);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      {loading && (
        <div className="pt-40 pb-20 max-w-7xl mx-auto px-4 text-center">
          <FiLoader className="text-cyan-400 text-4xl animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading Case Study...</p>
        </div>
      )}

      {error && (
        <div className="pt-40 pb-20 max-w-7xl mx-auto px-4 text-center">
          <FiAlertCircle className="text-red-400 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Case Study Not Found</h2>
          <a href="/projects" className="text-cyan-400 underline text-sm">
            ← Return to Projects
          </a>
        </div>
      )}

      {!loading && !error && project && (
        <>
          {/* Hero Banner */}
          <section className="pt-36 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="/projects"
              className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-white mb-6 transition-colors"
            >
              <FiArrowLeft />
              <span>← Back to Selected Work</span>
            </a>

            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase">
                  CASE STUDY • {project.category || 'Engineering'}
                </span>
                {project.client && (
                  <span className="text-xs font-mono text-slate-400">
                    Client: <strong className="text-slate-200">{project.client}</strong>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading uppercase leading-tight">
                {project.title}
              </h1>

              {project.shortDesc && (
                <p className="text-cyan-300 text-base sm:text-lg leading-relaxed max-w-4xl">
                  {project.shortDesc}
                </p>
              )}

              {/* Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading block">
                        {m.value}
                      </span>
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Details Section */}
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Full Overview */}
            {project.fullDesc && (
              <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-3">
                  PROJECT SCOPE &amp; IMPLEMENTATION
                </span>
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                  {project.fullDesc}
                </p>
              </div>
            )}

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="glass-card p-8 rounded-3xl border border-slate-800">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block mb-4">
                  TECHNOLOGY &amp; HARDWARE STACK
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <div className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-blue-950/30 to-purple-950/30 text-center">
                <FiAward className="text-cyan-400 text-4xl mx-auto mb-4" />
                <blockquote className="text-lg sm:text-xl font-medium text-white italic max-w-3xl mx-auto mb-4">
                  "{project.testimonial.quote}"
                </blockquote>
                <p className="text-sm text-cyan-300 font-heading font-bold">
                  {project.testimonial.author}
                </p>
                {project.testimonial.company && (
                  <p className="text-xs text-slate-400 font-mono">
                    {project.testimonial.company}
                  </p>
                )}
              </div>
            )}

            {/* Quotation CTA */}
            <div className="glass-card p-10 rounded-3xl border border-cyan-500/40 text-center bg-gradient-to-r from-blue-900/30 via-[#0A0F1D] to-purple-900/30">
              <h3 className="text-3xl font-extrabold text-white font-heading uppercase mb-3">
                Have a Similar Project?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
                Get an instant AI-calculated quotation or connect with a GELWO technical lead today.
              </p>
              <button
                onClick={() => triggerQuotationModal(project.title)}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-sm uppercase rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 mx-auto"
              >
                <FiFileText />
                <span>[ START YOUR PROJECT QUOTATION ]</span>
              </button>
            </div>
          </section>
        </>
      )}

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
