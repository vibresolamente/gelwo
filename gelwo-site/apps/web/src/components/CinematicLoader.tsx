'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<'particles' | 'assembling' | 'slogan' | 'complete'>('particles');
  const [progress, setProgress] = useState(0);

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

    // Particle / Cube physics
    const numCubes = 60;
    const cubes = Array.from({ length: numCubes }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      targetX: width / 2 + (Math.random() - 0.5) * 160,
      targetY: height / 2 - 20 + (Math.random() - 0.5) * 160,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
      color: Math.random() > 0.3 ? '#00F0FF' : '#0F4C81',
      spark: Math.random() > 0.5,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    let startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / 3200) * 100));
      setProgress(pct);

      ctx.fillStyle = 'rgba(10, 15, 29, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // Draw particle cubes flying together
      cubes.forEach((cube) => {
        if (elapsed > 1000) {
          // Assembling motion towards center logo
          cube.x += (cube.targetX - cube.x) * 0.08;
          cube.y += (cube.targetY - cube.y) * 0.08;
        } else {
          // Floating free sparks
          cube.x += cube.speedX;
          cube.y += cube.speedY;

          if (cube.x < 0 || cube.x > width) cube.speedX *= -1;
          if (cube.y < 0 || cube.y > height) cube.speedY *= -1;
        }

        ctx.save();
        ctx.shadowBlur = cube.spark ? 15 : 5;
        ctx.shadowColor = cube.color;
        ctx.fillStyle = cube.color;
        ctx.globalAlpha = cube.alpha;

        // Draw rotated mini-cubes
        ctx.translate(cube.x, cube.y);
        ctx.rotate((elapsed * 0.002) % (Math.PI * 2));
        ctx.fillRect(-cube.size / 2, -cube.size / 2, cube.size, cube.size);
        ctx.restore();
      });

      // Connecting spark lines
      if (elapsed > 800 && elapsed < 2500) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
        ctx.lineWidth = 1;
        for (let i = 0; i < cubes.length; i += 4) {
          ctx.beginPath();
          ctx.moveTo(cubes[i].x, cubes[i].y);
          const next = cubes[(i + 3) % cubes.length];
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }
      }

      if (elapsed < 3500) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    // Stage timelines
    const t1 = setTimeout(() => setStage('assembling'), 1000);
    const t2 = setTimeout(() => setStage('slogan'), 2200);
    const t3 = setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 3800);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0F1D] overflow-hidden select-none"
        >
          {/* Background Canvas for Electric Sparks & Flying Cubes */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Central Logo Assembly Container */}
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            {/* Animated Logo Shield & Glow Beam */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: stage !== 'particles' ? 1 : 0.6, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative mb-6"
            >
              {/* Outer Beam Flare */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0,240,255,0.2)',
                    '0 0 70px rgba(0,240,255,0.8)',
                    '0 0 30px rgba(124,58,237,0.4)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-[#0F4C81] via-[#00F0FF] to-[#7C3AED] p-[2px] flex items-center justify-center shadow-2xl"
              >
                <div className="w-full h-full bg-[#0A0F1D] rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
                  {/* Light beam pass-through */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: stage === 'slogan' ? '200%' : '-100%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  
                  <span className="font-extrabold text-4xl md:text-5xl tracking-tighter text-white font-heading">
                    G<span className="text-[#00F0FF]">E</span>LWO
                  </span>
                  <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-cyan-300 font-semibold uppercase mt-1">
                    Technologies
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Title & Slogan Animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: stage === 'slogan' ? 0 : 10, opacity: stage === 'slogan' ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-2"
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-heading">
                GELWO TECHNOLOGIES
              </h1>
              <p className="text-cyan-400 font-medium text-sm md:text-base tracking-wider italic">
                “Building Tomorrow’s Solutions Today”
              </p>
            </motion.div>

            {/* Progress Bar & Counter */}
            <div className="mt-8 w-64 md:w-80 h-1.5 bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0F4C81] via-[#00F0FF] to-[#7C3AED]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <p className="text-slate-400 text-xs mt-3 tracking-widest uppercase font-mono">
              Initializing Core Systems... {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
