"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariants, EASING, TIMING } from "@/lib/animations";
import type { ReactNode } from "react";

interface FadeInWhenVisibleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

export function FadeInWhenVisible({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: FadeInWhenVisibleProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: fadeUpVariants.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: TIMING.normal,
            ease: EASING,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
