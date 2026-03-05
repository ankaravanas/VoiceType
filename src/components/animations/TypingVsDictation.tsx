"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { EASING } from "@/lib/animations";
import { AnimatedWaveform } from "./AnimatedWaveform";

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. This sentence demonstrates how much faster voice dictation is compared to traditional typing.";

export function TypingVsDictation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  const [typedChars, setTypedChars] = useState(0);
  const [dictationPhase, setDictationPhase] = useState<"waiting" | "listening" | "done">("waiting");
  const [dictatedChars, setDictatedChars] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Typing animation - slow
  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setTypedChars(SAMPLE_TEXT.length);
        setDictatedChars(SAMPLE_TEXT.length);
        setDictationPhase("done");
        setShowResult(true);
      }
      return;
    }

    const typingInterval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= SAMPLE_TEXT.length) {
          clearInterval(typingInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 80); // Slow typing speed

    return () => clearInterval(typingInterval);
  }, [isInView, shouldReduceMotion]);

  // Dictation animation - fast, starts after delay
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    // Start listening after 1 second
    const listenTimeout = setTimeout(() => {
      setDictationPhase("listening");
    }, 1000);

    // Start transcribing after 2.5 seconds (listening for 1.5s)
    const transcribeTimeout = setTimeout(() => {
      setDictationPhase("done");
      // Instant text appearance with slight animation
      let chars = 0;
      const fastInterval = setInterval(() => {
        chars += 8;
        setDictatedChars(Math.min(chars, SAMPLE_TEXT.length));
        if (chars >= SAMPLE_TEXT.length) {
          clearInterval(fastInterval);
          setShowResult(true);
        }
      }, 20);
    }, 2500);

    return () => {
      clearTimeout(listenTimeout);
      clearTimeout(transcribeTimeout);
    };
  }, [isInView, shouldReduceMotion]);

  const typingProgress = (typedChars / SAMPLE_TEXT.length) * 100;
  const dictationProgress = (dictatedChars / SAMPLE_TEXT.length) * 100;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASING }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: "#0E2E28" }}>
            See the Difference
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0E2E28" }}>
            Typing vs VoiceType
          </h2>
          <p className="text-lg" style={{ color: "#6E7C87" }}>
            Same text. Different speeds.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASING, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Left: Typing */}
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col"
            style={{ borderWidth: "1px", borderColor: "#E5E9EB" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#F4F9F8" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="#6E7C87" strokeWidth="2" />
                  <path d="M6 10H6.01M10 10H10.01M14 10H14.01M18 10H18.01M8 14H16" stroke="#6E7C87" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-lg font-semibold" style={{ color: "#0E2E28" }}>
                Traditional Typing
              </span>
            </div>

            {/* Text area */}
            <div
              className="flex-1 rounded-xl p-4 text-base leading-relaxed min-h-[160px]"
              style={{ backgroundColor: "#F4F9F8", color: "#0E2E28" }}
            >
              {SAMPLE_TEXT.slice(0, typedChars)}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                style={{ backgroundColor: "#0E2E28" }}
              />
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E9EB" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#9AA6AC", width: `${typingProgress}%` }}
                />
              </div>
              <p className="text-sm mt-2 text-center" style={{ color: "#6E7C87" }}>
                {Math.round(typingProgress)}% complete
              </p>
            </div>
          </div>

          {/* Right: VoiceType */}
          <div className="rounded-2xl p-6 sm:p-8 flex flex-col" style={{ backgroundColor: "#0E2E28" }}>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#CDFA8A" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="#0E2E28" />
                  <path d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10" stroke="#0E2E28" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 19V23M8 23H16" stroke="#0E2E28" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">VoiceType</span>
              <div
                className="ml-auto px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "#CDFA8A", color: "#0E2E28" }}
              >
                3x FASTER
              </div>
            </div>

            {/* Text area */}
            <div
              className="flex-1 rounded-xl p-4 text-base leading-relaxed min-h-[160px] flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
            >
              {dictationPhase === "waiting" && (
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Waiting to start...</span>
              )}
              {dictationPhase === "listening" && (
                <div className="flex flex-col items-center gap-4">
                  <AnimatedWaveform barCount={20} />
                  <span style={{ color: "#CDFA8A" }} className="text-sm font-medium">
                    Listening...
                  </span>
                </div>
              )}
              {dictationPhase === "done" && (
                <span className="self-start">{SAMPLE_TEXT.slice(0, dictatedChars)}</span>
              )}
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#CDFA8A", width: `${dictationProgress}%` }}
                />
              </div>
              <p className="text-sm mt-2 text-center" style={{ color: "rgba(255,255,255,0.7)" }}>
                {Math.round(dictationProgress)}% complete
              </p>
            </div>
          </div>
        </motion.div>

        {/* Result callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showResult ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: EASING }}
          className="mt-8 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ backgroundColor: "#CDFA8A" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#0E2E28" />
            </svg>
            <span className="text-lg font-semibold" style={{ color: "#0E2E28" }}>
              VoiceType finishes 3x faster
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
