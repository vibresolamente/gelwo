'use client';

/**
 * HeroSection Component — GELWO Poster Color System
 * Palette:
 *  - Primary Background: Warm Ivory (#FCF9F5) with subtle Soft Blush (#EDE6E5) gradient
 *  - Primary Text: Deep Midnight (#131322)
 *  - Primary Accent: Deep Purple (#4A346A) -> Royal Purple (#261E3D)
 *  - Secondary Accent: Sage Green (#566944)
 *  - Particle Canvas: Purple and Sage particles
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiArrowRight, FiPlay, FiFileText, FiPhoneCall, FiChevronDown, FiShield, FiZap
} from 'react-icons/fi';

export const HeroSection: React.FC = () => {
  const { triggerQuotationModal, language } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const servicesList = [
    'Software Development & Systems',
    'Business Systems & ERP',
    'AI Solutions & Automation',
    'ICT & Security Infrastructure',
    'Solar Microgrids & Clean Energy',
    'Civil Construction & Engineering',
  ];

  const [currentServiceIdx, setCurrentServiceIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceIdx((prev) => (prev + 1) % servicesList.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [servicesList.length]);

  // Background Particle Mesh Simulation — Purple & Sage Green Node Colors
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const nodes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1.5,
      color: Math.random() > 0.45 ? '#4A346A' : '#566944',
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Radial background subtle ambient glow
      const bgGrad = ctx.createRadialGradient(w * 0.6, h * 0.3, 50, w / 2, h / 2, w);
      bgGrad.addColorStop(0, 'rgba(74, 52, 106, 0.05)');
      bgGrad.addColorStop(0.5, 'rgba(237, 230, 229, 0.2)');
      bgGrad.addColorStop(1, 'rgba(252, 249, 245, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Nodes & connecting lines
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.color;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(74, 52, 106, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-hero-atmosphere">
      {/* Canvas particle mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-gelwo-blush/80 dark:bg-gelwo-royal border border-gelwo-purple/30 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-gelwo-purple animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gelwo-purple dark:text-gelwo-blush">
                EST. 2022 • KENYA • NCA &amp; AGPO ACCREDITED
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory font-heading leading-tight tracking-tight uppercase"
            >
              BUILDING WHAT'S <br />
              <span className="text-gradient-purple dark:text-gradient-light">NEXT.</span>
            </motion.h1>

            {/* Animated Rotating Service Subhead */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap sm:flex-nowrap items-center gap-2 text-base sm:text-xl md:text-2xl text-gelwo-midnight/80 dark:text-gelwo-gray font-medium"
            >
              <span className="text-gelwo-purple font-semibold flex-shrink-0">Division:</span>
              <div className="h-8 sm:h-9 overflow-hidden relative inline-block min-w-0 w-full sm:w-auto flex-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentServiceIdx}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-bold text-gelwo-purple dark:text-gelwo-ivory font-heading block truncate"
                  >
                    {servicesList[currentServiceIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Subtitle Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gelwo-midnight/70 dark:text-gelwo-gray text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
            >
              Technology • Energy • Security • Supplies • Consultancy • Innovation. GELWO Technologies engineers custom enterprise software, clean energy microgrids, and security infrastructure designed around how African businesses actually work.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <button
                onClick={() => triggerQuotationModal()}
                className="btn-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm uppercase flex items-center justify-center space-x-3 w-full sm:w-auto text-center"
              >
                <FiFileText className="text-lg" />
                <span>[ REQUEST A QUOTE ]</span>
                <FiArrowRight className="text-lg" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="btn-secondary px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm uppercase flex items-center justify-center space-x-2 w-full sm:w-auto text-center"
              >
                <FiPlay className="text-sm text-gelwo-purple" />
                <span>Watch Reel</span>
              </button>
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-gelwo-gray dark:border-gelwo-royal max-w-lg">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-gelwo-purple font-heading block">500+</span>
                <span className="text-[10px] sm:text-xs text-gelwo-midnight/60 dark:text-gelwo-gray font-mono">Projects</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-gelwo-sage font-heading block">100%</span>
                <span className="text-[10px] sm:text-xs text-gelwo-midnight/60 dark:text-gelwo-gray font-mono">Compliance</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-gelwo-royal dark:text-gelwo-ivory font-heading block">12</span>
                <span className="text-[10px] sm:text-xs text-gelwo-midnight/60 dark:text-gelwo-gray font-mono">County Hubs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Card with GELWO Signature Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden shadow-gelwo-purple border border-gelwo-gray dark:border-gelwo-purple/30">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono text-gelwo-purple dark:text-gelwo-blush font-bold uppercase tracking-wider">
                  GELWO ECOSYSTEM
                </span>
                <span className="px-3 py-1 rounded-full bg-gelwo-sage/15 text-gelwo-sage text-xs font-mono font-bold">
                  ● Enterprise Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-royal">
                  <h4 className="text-sm font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-1 flex items-center gap-2">
                    <FiZap className="text-gelwo-purple" />
                    <span>Software &amp; ERP Systems</span>
                  </h4>
                  <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray leading-relaxed">
                    Custom web apps, multi-branch ERP, automated M-Pesa billing &amp; inventory telemetry.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-royal">
                  <h4 className="text-sm font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-1 flex items-center gap-2">
                    <FiShield className="text-gelwo-sage" />
                    <span>ICT Security &amp; Infrastructure</span>
                  </h4>
                  <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray leading-relaxed">
                    4K CCTV surveillance, biometric access turnstiles, fiber backbones &amp; server racks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-royal">
                  <h4 className="text-sm font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-1 flex items-center gap-2">
                    <FiZap className="text-gelwo-purple" />
                    <span>Clean Energy Microgrids</span>
                  </h4>
                  <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray leading-relaxed">
                    10kW to 1MW commercial solar plants, lithium BESS battery banks &amp; SCADA telemetry.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gelwo-gray dark:border-gelwo-royal flex items-center justify-between">
                <span className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray font-mono">Ready to engineer?</span>
                <button
                  onClick={() => triggerQuotationModal()}
                  className="text-xs font-bold text-gelwo-purple hover:underline flex items-center gap-1 font-heading"
                >
                  <span>Explore Quotation Engine</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[7000] flex items-center justify-center p-4 bg-gelwo-midnight/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gelwo-ivory dark:bg-gelwo-royal border border-gelwo-purple/30 rounded-3xl p-6 max-w-3xl w-full text-center space-y-4 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading">GELWO Showreel</h3>
              <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">Showing engineering operations across Kenya.</p>
              <div className="aspect-video bg-gelwo-midnight rounded-2xl flex items-center justify-center border border-gelwo-royal">
                <span className="text-xs font-mono text-gelwo-ivory">[ VIDEO REEL STREAMING ]</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="btn-primary px-6 py-2 rounded-xl text-xs"
              >
                Close Showreel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
