"use client";

import { motion, AnimatePresence } from "motion/react";
import { useHydration } from "@/hooks/useHydration";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const isHydrated = useHydration();

  return (
    <>
      <AnimatePresence>
        {!isHydrated && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: "#F4F9F8" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#CDFA8A" }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="#0E2E28" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </motion.div>

              <div
                className="w-32 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "#E5E9EB" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#CDFA8A" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHydrated ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
