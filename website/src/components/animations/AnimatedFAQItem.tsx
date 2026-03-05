"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

interface AnimatedFAQItemProps {
  question: string;
  answer: string;
}

export function AnimatedFAQItem({ question, answer }: AnimatedFAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ borderBottomWidth: "1px", borderColor: "#E5E9EB" }}>
      <button
        className="w-full py-4 sm:py-5 flex items-center justify-between text-left gap-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium" style={{ color: "#0E2E28" }}>
          {question}
        </span>
        <motion.span
          className="flex-shrink-0"
          style={{ color: "#6E7C87" }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-4 sm:pb-5">
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: "#6E7C87" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
