'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiArrowRight, FiPlay, FiFileText, FiPhoneCall, FiChevronDown, FiShield, FiZap, FiCheckCircle
} from 'react-icons/fi';

export const HeroSection: React.FC = () => {
  const { triggerQuotationModal, language } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const servicesList = [
    'ICT & Security Solutions',
    'Solar Energy & Microgrids',
    'Electrical Infrastructure',
    'General Supplies & Procurement',
    'Branding & Media Production',
    'Corporate Consultancy & Strategy',
    'Environmental Services',
    'Cereals & Agri-Commodities',
    'Poultry Infrastructure & Feeds',
    'Commercial & Industrial Cleaning',
    'Civil Construction & Engineering',
    'Community Development & Empowerment',
  ];

  const [currentServiceIdx, setCurrentServiceIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceIdx((prev) => (prev + 1) % servicesList.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [servicesList.length]);

  // Background Interactive 3D Mesh Particle Simulation
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

    // Nodes representing tech, solar grids & connectivity
    const nodes = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 3 + 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw subtle background gradient mesh
      const bgGrad = ctx.createRadialGradient(w / 2, h / 3, 100, w / 2, h / 2, w);
      bgGrad.addColorStop(0, 'rgba(15, 76, 129, 0.25)');
      bgGrad.addColorStop(0.5, 'rgba(10, 15, 29, 0.8)');
      bgGrad.addColorStop(1, '#0A0F1D');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Update & Draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 - dist / 800})`;
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Real Vivid Futuristic Technology Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-70 scale-100 transition-transform duration-1000"
        style={{ backgroundImage: `url('/futuristic_bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/80 via-[#070B19]/50 to-[#070B19] z-0 pointer-events-none" />

      {/* Dynamic 3D Particle Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Institutional Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-8 shadow-xl"
        >
          <FiShield className="text-cyan-400 text-base" />
          <span>Kenya & East Africa’s Premier Multi-Sector Corporate Leader</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-heading max-w-5xl mx-auto leading-[1.15]"
        >
          Transforming Businesses, Institutions & Communities Through{' '}
          <span className="text-gradient-cyan">Technology, Innovation</span> & Excellence.
        </motion.h1>

        {/* Rotating Animated Service Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 h-14 flex items-center justify-center"
        >
          <div className="text-lg sm:text-2xl text-slate-300 font-medium flex items-center space-x-3">
            <span className="text-slate-400 hidden sm:inline">Specialized Expertise In:</span>
            <div className="relative overflow-hidden h-10 w-72 sm:w-96 text-left border-b-2 border-cyan-400">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentServiceIdx}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 font-bold text-cyan-400 font-heading flex items-center"
                >
                  <FiZap className="mr-2 text-yellow-400" />
                  {servicesList[currentServiceIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Action Button Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto"
        >
          {/* Explore Services */}
          <a
            href="#services"
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white font-bold text-base hover:scale-105 shadow-xl shadow-cyan-500/25 transition-all flex items-center space-x-2"
          >
            <span>🚀 Explore Services</span>
            <FiArrowRight />
          </a>

          {/* Get Instant Quotation */}
          <button
            onClick={() => triggerQuotationModal()}
            className="px-7 py-4 rounded-2xl glass-card border border-cyan-400/40 text-cyan-300 font-bold text-base hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center space-x-2 shadow-lg"
          >
            <FiFileText className="text-cyan-400" />
            <span>📄 Get Instant Quotation</span>
          </button>

          {/* Contact Experts */}
          <a
            href="#footer"
            className="px-6 py-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 font-semibold text-sm hover:text-white hover:border-slate-700 transition-all flex items-center space-x-2"
          >
            <FiPhoneCall className="text-cyan-400" />
            <span>📞 Contact Experts</span>
          </a>

          {/* Watch Story Video Modal */}
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="px-6 py-4 rounded-2xl glass-card text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
              <FiPlay className="ml-0.5" />
            </div>
            <span>▶ Watch Company Story</span>
          </button>
        </motion.div>

        {/* Key Operational Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-xs sm:text-sm text-slate-300"
        >
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-cyan-400 text-lg flex-shrink-0" />
            <span>Government Certified (NCA & AGPO)</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
            <span>Integrated AI Quotation Engine</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-yellow-400 text-lg flex-shrink-0" />
            <span>24/7 Dedicated Technical Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-purple-400 text-lg flex-shrink-0" />
            <span>Countrywide Service Logistics</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 inline-flex flex-col items-center cursor-pointer text-slate-400 hover:text-cyan-400"
        >
          <a href="#about" className="text-xs uppercase tracking-widest font-semibold mb-2">
            Scroll To Discover
          </a>
          <FiChevronDown className="text-2xl text-cyan-400" />
        </motion.div>
      </div>

      {/* Video Modal Simulation */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#0A0F1D] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-4 bg-slate-900 flex justify-between items-center border-b border-slate-800">
                <span className="font-bold text-white font-heading">GELWO Corporate Journey & Infrastructure</span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg text-sm"
                >
                  Close ✕
                </button>
              </div>

              {/* Simulated Cinematic Video Player */}
              <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 text-3xl mb-4 animate-pulse">
                  <FiPlay className="ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-2">
                  Building Africa's Digital & Physical Infrastructure
                </h3>
                <p className="text-slate-400 max-w-lg text-sm">
                  Documentary highlighting GELWO's solar microgrid projects, ICT data center installations, high-capacity general supplies, and community empowerment initiatives.
                </p>
                <div className="mt-6 px-6 py-2 bg-cyan-500 text-black font-bold rounded-xl text-xs uppercase tracking-wider">
                  Playing Cinematic 4K Reel
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
