'use client';

/**
 * LiveStatistics Component — GELWO Poster Color System
 * Palette: Deep Purple (#4A346A), Sage Green (#566944), Warm Ivory (#FCF9F5)
 */

import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface CounterProps {
  label: string;
  target: number;
  suffix?: string;
  color?: string;
}

const Counter: React.FC<CounterProps> = ({ label, target, suffix = '+', color = 'text-gelwo-purple' }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center" ref={ref}>
      <span className={`text-4xl md:text-5xl font-extrabold ${color} font-heading`}>
        {inView ? <CountUp start={0} end={target} duration={2.2} separator="," /> : '0'}
        {suffix}
      </span>
      <span className="mt-2 text-xs md:text-sm font-mono uppercase tracking-wider text-gelwo-midnight/70 dark:text-gelwo-gray">{label}</span>
    </div>
  );
};

export const LiveStatistics: React.FC = () => {
  return (
    <section className="w-full py-12 bg-gelwo-blush dark:bg-gelwo-royal border-y border-gelwo-gray dark:border-gelwo-purple/20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-8">
        <Counter label="Projects Completed" target={500} color="text-gelwo-purple" />
        <Counter label="Enterprise Clients" target={200} color="text-gelwo-sage" />
        <Counter label="Regional Hubs" target={12} suffix="" color="text-gelwo-purple" />
        <Counter label="SLA Availability" target={99.9} suffix="%" color="text-gelwo-sage" />
      </div>
    </section>
  );
};
