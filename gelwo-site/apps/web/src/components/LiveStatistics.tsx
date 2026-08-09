'use client';

import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface CounterProps {
  label: string;
  target: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ label, target, suffix = '+' }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center" ref={ref}>
      <span className="text-4xl md:text-5xl font-bold text-gelwo-blue">
        {inView ? (
          <CountUp start={0} end={target} duration={2.5} separator="," />
        ) : (
          '0'
        )}
        {suffix}
      </span>
      <span className="mt-2 text-sm md:text-base text-gray-300">{label}</span>
    </div>
  );
};

export const LiveStatistics: React.FC = () => {
  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center gap-8">
        <Counter label="Projects Completed" target={500} />
        <Counter label="Institutional Clients" target={120} />
        <Counter label="Products" target={30} />
      </div>
    </section>
  );
};
