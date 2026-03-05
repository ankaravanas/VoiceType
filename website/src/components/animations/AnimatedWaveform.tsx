"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

interface AnimatedWaveformProps {
  barCount?: number;
  className?: string;
}

export function AnimatedWaveform({
  barCount = 30,
  className,
}: AnimatedWaveformProps) {
  const shouldReduceMotion = useReducedMotion();

  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => ({
      id: i,
      baseHeight: 20 + Math.random() * 60,
      delay: i * 0.05,
    }));
  }, [barCount]);

  return (
    <div className={`flex items-center gap-0.5 sm:gap-1 h-6 sm:h-8 ${className || ""}`}>
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="w-1 rounded-full flex-shrink-0"
          style={{ backgroundColor: "#CDFA8A" }}
          initial={{ height: `${bar.baseHeight}%` }}
          animate={
            shouldReduceMotion
              ? { height: `${bar.baseHeight}%` }
              : {
                  height: [
                    `${bar.baseHeight}%`,
                    `${Math.max(20, bar.baseHeight - 30)}%`,
                    `${Math.min(100, bar.baseHeight + 20)}%`,
                    `${bar.baseHeight}%`,
                  ],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: bar.delay % 0.6,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
