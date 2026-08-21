'use client';

import React, { useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion } from 'framer-motion';
import { FiCpu, FiGlobe, FiSmartphone, FiCloud, FiDatabase, FiLock, FiZap, FiBarChart2 } from 'react-icons/fi';

export default function TechnologyPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const techDomains = [
    { title: 'Web Architectures', icon: '🌐', desc: 'Next.js 13+, React 18, Server Components & Tailwind CSS.' },
    { title: 'Mobile Apps', icon: '📱', desc: 'Cross-platform iOS and Android native apps with offline sync.' },
    { title: 'Cloud Infrastructure', icon: '☁️', desc: 'Dockerized microservices, Kubernetes clusters & CDN acceleration.' },
    { title: 'Artificial Intelligence', icon: '🤖', desc: 'Custom LLM integration, speech-to-text, RAG systems & avatars.' },
    { title: 'APIs & Microservices', icon: '🔌', desc: 'NestJS REST & GraphQL APIs with JWT authentication.' },
    { title: 'Databases & Cache', icon: '🗄️', desc: 'PostgreSQL, Supabase, Redis caching & automated backups.' },
    { title: 'Workflow Automation', icon: '⚡', desc: 'Event-driven triggers, background queues, and automated reporting.' },
    { title: 'Cybersecurity', icon: '🛡️', desc: 'Role-Based Access Control (RBAC), end-to-end encryption & audits.' },
    { title: 'Analytics Engine', icon: '📊', desc: 'Real-time telemetry dashboards and predictive business metrics.' },
  ];

  // Interactive Animated Node Graph matching ASCII diagram in txt Section 22
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = 400);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      angle += 0.01;

      const centerX = w / 2;
      const centerY = h / 2;

      // Draw Center Hub (GELWO)
      ctx.fillStyle = '#00F0FF';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00F0FF';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0A0F1D';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GELWO', centerX, centerY);

      // Node positions: AI (top), CLOUD (right), MOBILE (bottom), WEB (left)
      const nodes = [
        { label: 'AI', x: centerX, y: centerY - 120 },
        { label: 'CLOUD', x: centerX + 180, y: centerY },
        { label: 'MOBILE', x: centerX, y: centerY + 120 },
        { label: 'WEB', x: centerX - 180, y: centerY },
      ];

      nodes.forEach((n) => {
        // Draw Connecting Lines with pulsing glow
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Node Circle
        ctx.fillStyle = '#7C3AED';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#7C3AED';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(n.label, n.x, n.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
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
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30"
          >
            <FiCpu className="text-cyan-400" />
            <span>Technical Ecosystem & Capabilities</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white mt-6 font-heading tracking-tight uppercase"
          >
            TECHNOLOGY <span className="text-gradient-cyan">ENGINE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            GELWO’s enterprise software stack, cloud infrastructure, and AI layers.
          </motion.p>
        </div>
      </section>

      {/* Animated Node Diagram matching txt Section 22 */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 text-center relative">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-4">
            CONNECTED SYSTEM ARCHITECTURE
          </span>
          <div className="w-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center p-4">
            <canvas ref={canvasRef} className="w-full max-w-2xl h-[360px]" />
          </div>
        </div>
      </section>

      {/* Tech Capabilities Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techDomains.map((domain, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-400 transition-all">
              <span className="text-3xl mb-3 block">{domain.icon}</span>
              <h3 className="font-bold text-white text-lg font-heading mb-2">{domain.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{domain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
