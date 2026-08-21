'use client';

/**
 * GELWO TransitionManager — Section 35 of blueprint
 *
 * A cinematic page-transition system that wraps each page's content.
 * Uses Framer Motion's AnimatePresence to detect route changes and apply
 * the correct transition type based on the destination route.
 *
 * Transition types (Section 35):
 *  FadeTransition | SlideTransition | ScaleTransition | BlurTransition
 *  RevealTransition | ImageTransition | PageMorphTransition
 *
 * Respects prefers-reduced-motion for accessibility (Section 36).
 */

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { getTransitionForRoute, transitionMap } from '@/lib/transitions';

// ─── Transition Overlay ───────────────────────────────────────────────────────
// A brief full-screen overlay that fires on every route change to create a
// seamless "wipe" effect between pages — inspired by cinematic scene cuts.
const overlayVariants = {
  initial: { scaleY: 0, originY: 0 },
  enter: {
    scaleY: [0, 1, 1, 0],
    originY: [0, 0, 1, 1],
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      times: [0, 0.4, 0.6, 1],
    },
  },
  exit: { scaleY: 0 },
};

interface PageTransitionOverlayProps {
  active: boolean;
}

function PageTransitionOverlay({ active }: PageTransitionOverlayProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#121417] via-[#1B1F23] to-[#0A0B0D] border-b border-[#D8C7A3] pointer-events-none"
          initial={{ scaleY: 0, originY: '0%' }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
            times: [0, 0.35, 0.65, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}

export function TransitionManager({ children }: TransitionManagerProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.05 : 0.18, ease: 'easeOut' }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── usePageTransition hook ───────────────────────────────────────────────────
// Exposed for components that want to know what transition type is active
// (e.g., backgrounds that need to animate in sync with the page transition).
export function usePageTransition() {
  const pathname = usePathname();
  const transitionType = getTransitionForRoute(pathname);
  return { transitionType, config: transitionMap[transitionType] };
}
