'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<'loading' | 'environment' | 'ai-presenter' | 'complete'>('loading');
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [presenterPersona, setPresenterPersona] = useState<'host' | 'tech' | 'business' | 'product'>('host');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numCubes = 70;
    const cubes = Array.from({ length: numCubes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      targetX: width / 2 + (Math.random() - 0.5) * 200,
      targetY: height / 2 - 20 + (Math.random() - 0.5) * 200,
      size: Math.random() * 8 + 3,
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
      color: Math.random() > 0.4 ? '#4A346A' : '#566944',
      alpha: Math.random() * 0.8 + 0.2,
    }));

    const startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / 2500) * 100));
      setProgress(pct);

      ctx.fillStyle = 'rgba(19, 19, 34, 0.4)';
      ctx.fillRect(0, 0, width, height);

      cubes.forEach((cube) => {
        if (stage === 'environment' || stage === 'ai-presenter') {
          cube.x += (cube.targetX - cube.x) * 0.05;
          cube.y += (cube.targetY - cube.y) * 0.05;
        } else {
          cube.x += cube.speedX;
          cube.y += cube.speedY;
          if (cube.x < 0 || cube.x > width) cube.speedX *= -1;
          if (cube.y < 0 || cube.y > height) cube.speedY *= -1;
        }

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = cube.color;
        ctx.fillStyle = cube.color;
        ctx.globalAlpha = cube.alpha;
        ctx.translate(cube.x, cube.y);
        ctx.rotate((elapsed * 0.0015) % (Math.PI * 2));
        ctx.fillRect(-cube.size / 2, -cube.size / 2, cube.size, cube.size);
        ctx.restore();
      });

      if (stage !== 'complete') {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const t1 = setTimeout(() => setStage('environment'), 1200);
    const t2 = setTimeout(() => setStage('ai-presenter'), 2600);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage]);

  const handleFinish = () => {
    setStage('complete');
    onComplete();
  };

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none px-4"
          style={{ background: 'linear-gradient(135deg, #131322 0%, #261E3D 55%, #4A346A 100%)' }}
        >
          {/* Background Canvas Particles */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Quick Skip Control Top Right */}
          <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-1.5 rounded-xl bg-gelwo-royal/80 border border-gelwo-purple/40 text-xs text-gelwo-gray hover:text-gelwo-ivory flex items-center space-x-1 backdrop-blur-md transition-colors"
            >
              <span>{soundEnabled ? '🔊 Sound On' : '🔇 Muted'}</span>
            </button>
            <button
              onClick={handleFinish}
              className="px-4 py-1.5 rounded-xl bg-gelwo-purple/30 border border-gelwo-purple/60 text-xs font-semibold text-gelwo-blush hover:bg-gelwo-purple/50 flex items-center space-x-1.5 backdrop-blur-md transition-colors"
            >
              <span>⏭ Skip Intro</span>
            </button>
          </div>

          {/* STAGE 1 — Minimal Symbol Loading */}
          {stage === 'loading' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-center text-center"
            >
              <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-gelwo-purple mb-6 border-2 border-gelwo-purple/40">
                <Image
                  src="/logo.png"
                  alt="GELWO"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gelwo-ivory font-heading">GELWO</h2>
              <div className="mt-6 w-56 h-1.5 bg-gelwo-royal rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #4A346A, #566944)',
                  }}
                />
              </div>
              <span className="text-xs text-gelwo-gray font-mono mt-2">Initializing GELWO Digital Environment... {progress}%</span>
            </motion.div>
          )}

          {/* STAGE 2 — Environment Reveal */}
          {stage === 'environment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-center text-center"
            >
              <div className="px-6 py-2 rounded-full bg-gelwo-purple/20 border border-gelwo-purple/40 text-gelwo-blush text-xs font-mono mb-4 uppercase tracking-widest">
                STAGE 2 • DIGITAL ENVIRONMENT INITIALIZATION
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gelwo-ivory font-heading max-w-2xl leading-tight">
                Entering <span className="text-gradient-light">GELWO Digital Realm</span>
              </h1>
              <p className="text-gelwo-gray mt-3 text-sm max-w-md">
                Constructing cinematic architecture, product catalogs & AI layer...
              </p>
            </motion.div>
          )}

          {/* STAGE 3 — AI Presenter System */}
          {stage === 'ai-presenter' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl w-full"
            >
              {/* Presenter Card Box */}
              <div className="w-full border border-gelwo-purple/40 rounded-3xl p-6 sm:p-8 shadow-gelwo-purple relative overflow-hidden backdrop-blur-xl"
                style={{ background: 'rgba(38, 30, 61, 0.65)' }}
              >
                {/* AI Presenter Visual Avatar */}
                <div className="relative mb-6 inline-block">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 mx-auto shadow-gelwo-purple border-2 border-gelwo-purple/50"
                    style={{ background: 'linear-gradient(135deg, #4A346A, #566944)' }}
                  >
                    <div className="w-full h-full bg-gelwo-midnight rounded-full flex items-center justify-center relative overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="GELWO AI"
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      />
                      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-gelwo-sage rounded-full border-2 border-gelwo-midnight animate-pulse" />
                    </div>
                  </div>
                  <span className="inline-block mt-2 text-[11px] font-mono font-bold uppercase tracking-wider text-gelwo-blush bg-gelwo-purple/30 px-3 py-0.5 rounded-full border border-gelwo-purple/50">
                    AI Host Presenter
                  </span>
                </div>

                {/* Direct Dialogue Text */}
                <h3 className="text-xl sm:text-2xl font-bold text-gelwo-ivory font-heading mb-3">
                  "Welcome to GELWO."
                </h3>
                <p className="text-gelwo-gray text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-sans">
                  We create technology, digital experiences, and business solutions designed around the way people actually work. Explore what we're building.
                </p>

                {/* Persona Switcher Chips */}
                <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
                  {(['host', 'tech', 'business', 'product'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPresenterPersona(p)}
                      className={`px-3 py-1 rounded-full font-semibold transition-all ${
                        presenterPersona === p
                          ? 'bg-gelwo-purple text-gelwo-ivory'
                          : 'bg-gelwo-midnight text-gelwo-gray border border-gelwo-royal hover:border-gelwo-purple'
                      }`}
                    >
                      {p === 'host' ? 'AI Host' : p === 'tech' ? 'Tech Specialist' : p === 'business' ? 'Business Consultant' : 'Product Specialist'}
                    </button>
                  ))}
                </div>

                {/* Presenter Control Bar */}
                <div className="mt-8 pt-6 border-t border-gelwo-purple/30 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
                  <button
                    onClick={handleFinish}
                    className="px-5 py-2.5 rounded-xl text-gelwo-ivory font-bold hover:scale-105 transition-transform flex items-center space-x-1.5 shadow-gelwo-purple"
                    style={{ background: 'linear-gradient(135deg, #4A346A, #566944)' }}
                  >
                    <span>EXPLORE GELWO →</span>
                  </button>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="px-4 py-2.5 rounded-xl bg-gelwo-midnight border border-gelwo-royal text-gelwo-gray hover:text-gelwo-ivory flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{soundEnabled ? '🔊 Sound' : '🔇 Mute'}</span>
                  </button>
                  <button
                    onClick={handleFinish}
                    className="px-4 py-2.5 rounded-xl bg-gelwo-midnight border border-gelwo-royal text-gelwo-gray hover:text-gelwo-ivory flex items-center space-x-1.5 transition-colors"
                  >
                    <span>⏭ Skip Intro</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
