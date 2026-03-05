import type { Variants } from "motion/react";

// Premium, Apple-like timing - subtle and refined
export const TIMING = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.1,
} as const;

// Apple-like ease-out for reveals
export const EASING = [0.16, 1, 0.3, 1] as const;

// Fade up animation (most common)
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING,
    },
  },
};

// Stagger container for card groups
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger,
      delayChildren: 0.1,
    },
  },
};

// Scale up from center (for dashboard preview)
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASING,
    },
  },
};

// FAQ expand/collapse
export const expandCollapseVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};
