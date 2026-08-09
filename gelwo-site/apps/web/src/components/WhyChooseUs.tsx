'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiHeart, FiClock, FiArrowRight } from 'react-icons/fi';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Experienced Team',
      desc: 'Skilled professionals with past industry experience.',
      icon: FiUsers,
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Quality Guaranteed',
      desc: 'We deliver top-quality solutions that last.',
      icon: FiCheckCircle,
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Customer Focused',
      desc: 'We put our clients at the heart of everything.',
      icon: FiHeart,
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
    {
      title: 'Timely Delivery',
      desc: 'We deliver on time, every time.',
      icon: FiClock,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  ];

  return (
    <section className="py-20 relative z-10 bg-[#070B19] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Features Grid */}
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight"
            >
              Why Choose <span className="text-cyan-400">GELWO</span>?
            </motion.h2>
            
            <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl">
              We combine expertise, innovation and integrity to deliver value that exceeds expectations.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 border ${pt.iconBg}`}>
                      <Icon />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading mb-1">{pt.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#services"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Discover More</span>
                <FiArrowRight />
              </a>
            </div>
          </div>

          {/* Right Column: Engineer/Technician Banner */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-gradient-to-tr from-cyan-900/40 to-slate-900"
            >
              <img
                src="/gelwo_technician.jpg"
                alt="GELWO Technician Engineer"
                className="w-full h-[450px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0A0F1D]/90 backdrop-blur-md border border-cyan-500/30 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono font-bold">GELWO Certified Field Team</span>
                    <h4 className="text-sm font-bold font-heading">Engineered for Excellence</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    100% On-Time
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

