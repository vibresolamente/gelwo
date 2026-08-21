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

// ─── Main TransitionManager ───────────────────────────────────────────────────
interface TransitionManagerProps {
  children: React.ReactNode;
}

export function TransitionManager({ children }: TransitionManagerProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const prevPathname = useRef<string>(pathname);
  const isFirstRender = useRef(true);
  const [overlayActive, setOverlayActive] = React.useState(false);

  // Detect page change and trigger the overlay
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathname.current = pathname;
      return;
    }

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (!prefersReducedMotion) {
        setOverlayActive(true);
        const timer = setTimeout(() => setOverlayActive(false), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, prefersReducedMotion]);

  // Pick the right animation variant for this route
  const transitionType = getTransitionForRoute(pathname);
  const config = prefersReducedMotion
    ? {
        variants: {
          initial: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        },
        transition: { duration: 0.15 },
      }
    : transitionMap[transitionType];

  return (
    <>
      {/* Cinematic wipe overlay */}
      {!prefersReducedMotion && <PageTransitionOverlay active={overlayActive} />}

      {/* Page content wrapper with enter/exit animations */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={config.variants}
          transition={config.transition}
          style={{ minHeight: '100vh' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
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
