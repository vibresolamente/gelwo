/**
 * GELWO Transition Engine — Section 35 of blueprint
 *
 * Defines all page transition animation variants used by the TransitionManager.
 * Transitions are chosen contextually based on route pairs.
 *
 * Types:
 *  - FadeTransition
 *  - SlideTransition
 *  - ScaleTransition
 *  - BlurTransition
 *  - RevealTransition
 *  - ImageTransition
 *  - PageMorphTransition
 */

import { Variants, Transition } from 'framer-motion';

export type TransitionType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'reveal'
  | 'image'
  | 'morph';

export interface TransitionConfig {
  variants: Variants;
  transition: Transition;
}

// ─── Shared base transition timings ──────────────────────────────────────────
const easeInOut: Transition = {
  duration: 0.55,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const easeOut: Transition = {
  duration: 0.5,
  ease: [0.0, 0.0, 0.2, 1],
};

const spring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

// ─── FadeTransition ───────────────────────────────────────────────────────────
export const FadeTransition: TransitionConfig = {
  variants: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: easeInOut,
};

// ─── SlideTransition ─────────────────────────────────────────────────────────
export const SlideTransition: TransitionConfig = {
  variants: {
    initial: { opacity: 0, x: 60 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
  transition: easeOut,
};

// ─── ScaleTransition ─────────────────────────────────────────────────────────
export const ScaleTransition: TransitionConfig = {
  variants: {
    initial: { opacity: 0, scale: 0.92 },
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.06 },
  },
  transition: easeInOut,
};

// ─── BlurTransition ──────────────────────────────────────────────────────────
export const BlurTransition: TransitionConfig = {
  variants: {
    initial: { opacity: 0, filter: 'blur(18px)' },
    enter: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(18px)' },
  },
  transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
};

// ─── RevealTransition (cinematic clip-path reveal from bottom) ───────────────
export const RevealTransition: TransitionConfig = {
  variants: {
    initial: {
      opacity: 0,
      clipPath: 'inset(100% 0 0 0)',
    },
    enter: {
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
    },
    exit: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
    },
  },
  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
};

// ─── ImageTransition (zoom+fade for image-heavy pages) ───────────────────────
export const ImageTransition: TransitionConfig = {
  variants: {
    initial: { opacity: 0, scale: 1.08, y: 30 },
    enter: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: -30 },
  },
  transition: { duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] },
};

// ─── PageMorphTransition (premium morph for key routes) ──────────────────────
export const PageMorphTransition: TransitionConfig = {
  variants: {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 40,
      filter: 'blur(8px)',
    },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    exit: {
      opacity: 0,
      scale: 1.04,
      y: -20,
      filter: 'blur(4px)',
    },
  },
  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
};

// ─── Transition Registry ─────────────────────────────────────────────────────
export const transitionMap: Record<TransitionType, TransitionConfig> = {
  fade: FadeTransition,
  slide: SlideTransition,
  scale: ScaleTransition,
  blur: BlurTransition,
  reveal: RevealTransition,
  image: ImageTransition,
  morph: PageMorphTransition,
};

// ─── Route-pair based transition selector ────────────────────────────────────
/**
 * Given the current pathname, returns the best transition type.
 * Blueprint example:
 *   Home → Services: ImageRevealTransition
 *   Services → Product: ScaleTransition
 */
export function getTransitionForRoute(pathname: string): TransitionType {
  if (pathname === '/') return 'morph';
  if (pathname.startsWith('/services/')) return 'image';
  if (pathname.startsWith('/products/')) return 'scale';
  if (pathname.startsWith('/solutions')) return 'reveal';
  if (pathname.startsWith('/industries')) return 'reveal';
  if (pathname.startsWith('/projects')) return 'slide';
  if (pathname.startsWith('/about')) return 'blur';
  if (pathname.startsWith('/contact')) return 'fade';
  if (pathname.startsWith('/technology')) return 'morph';
  if (pathname.startsWith('/portal')) return 'fade';
  if (pathname.startsWith('/admin')) return 'fade';
  return 'fade';
}
