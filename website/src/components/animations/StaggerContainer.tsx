"use client";

import { motion, useReducedMotion } from "motion/react";
import { staggerContainerVariants } from "@/lib/animations";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
