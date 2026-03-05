"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { EASING } from "@/lib/animations";
import { AnimatedWaveform } from "./AnimatedWaveform";

const FILE_TYPES = [".mp3", ".wav", ".m4a", ".webm"];
const TRANSCRIPT_TEXT = `"Hey team, just wanted to follow up on our meeting yesterday. The main action items are: first, finalize the Q4 projections by Friday; second, schedule user interviews for next week; and third, prepare the investor deck draft..."`;

export function AudioUploadDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<"drop" | "processing" | "done">("drop");
  const [fileIndex, setFileIndex] = useState(0);
  const [transcriptChars, setTranscriptChars] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  // File type cycling
  useEffect(() => {
    if (!isInView || phase !== "drop") return;
    const interval = setInterval(() => {
      setFileIndex((prev) => (prev + 1) % FILE_TYPES.length);
    }, 600);
    return () => clearInterval(interval);
  }, [isInView, phase]);

  // Animation phases
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setPhase("done");
      setTranscriptChars(TRANSCRIPT_TEXT.length);
      return;
    }

    // Drop phase for 2 seconds
    const processingTimeout = setTimeout(() => {
      setPhase("processing");
    }, 2000);

    // Processing for 2 seconds
    const doneTimeout = setTimeout(() => {
      setPhase("done");
    }, 4000);

    return () => {
      clearTimeout(processingTimeout);
      clearTimeout(doneTimeout);
    };
  }, [isInView, shouldReduceMotion]);

  // Processing progress
  useEffect(() => {
    if (phase !== "processing") return;
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  // Transcript typing
  useEffect(() => {
    if (phase !== "done") return;
    const interval = setInterval(() => {
      setTranscriptChars((prev) => {
        if (prev >= TRANSCRIPT_TEXT.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 3;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#0E2E28" }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASING }}
          className="text-center mb-10 sm:mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: "#CDFA8A" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#0E2E28" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 8L12 3L7 8M12 3V15" stroke="#0E2E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "#0E2E28" }}>
              UNIQUE FEATURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Upload Any Audio File
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Voice memos, meetings, podcasts → Clean transcripts
          </p>
        </motion.div>

        {/* Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASING, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 items-center"
        >
          {/* Left: Upload zone */}
          <div
            className="rounded-2xl p-8 min-h-[320px] flex flex-col items-center justify-center relative"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: `2px dashed ${phase !== "drop" ? "#CDFA8A" : "rgba(255,255,255,0.3)"}`,
            }}
          >
            {phase === "drop" && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASING }}
                className="flex flex-col items-center"
              >
                {/* Animated file icon */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-36 rounded-xl flex flex-col items-center justify-center mb-6"
                  style={{ backgroundColor: "#CDFA8A", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#0E2E28" strokeWidth="2" />
                    <path d="M10 8L16 12L10 16V8Z" fill="#0E2E28" />
                  </svg>
                  <span className="text-xl font-bold mt-2" style={{ color: "#0E2E28" }}>
                    {FILE_TYPES[fileIndex]}
                  </span>
                </motion.div>
                <p style={{ color: "rgba(255,255,255,0.5)" }}>Drop your audio file here</p>
              </motion.div>
            )}

            {phase === "processing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <AnimatedWaveform barCount={25} className="mb-6" />
                <p className="text-lg font-medium mb-4" style={{ color: "#CDFA8A" }}>
                  Processing audio...
                </p>
                <div className="w-48 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "#CDFA8A", width: `${processingProgress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: EASING }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#CDFA8A" }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10" stroke="#0E2E28" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-white">Transcription Complete</p>
              </motion.div>
            )}
          </div>

          {/* Right: Transcript output */}
          <div
            className="bg-white rounded-2xl p-6 min-h-[320px] flex flex-col"
            style={{ opacity: phase === "drop" ? 0.5 : 1, transition: "opacity 0.3s" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#CDFA8A" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#0E2E28" strokeWidth="2" />
                  <path d="M14 2V8H20M16 13H8M16 17H8" stroke="#0E2E28" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-semibold" style={{ color: "#0E2E28" }}>
                Clean Transcript
              </span>
              {phase === "done" && transcriptChars >= TRANSCRIPT_TEXT.length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#CDFA8A" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10" stroke="#0E2E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </div>

            <div
              className="flex-1 rounded-xl p-4 text-sm leading-relaxed"
              style={{ backgroundColor: "#F4F9F8", color: "#0E2E28" }}
            >
              {phase === "done" ? (
                <>
                  {TRANSCRIPT_TEXT.slice(0, transcriptChars)}
                  {transcriptChars < TRANSCRIPT_TEXT.length && (
                    <span className="inline-block w-0.5 h-4 ml-0.5 align-middle" style={{ backgroundColor: "#0E2E28" }} />
                  )}
                </>
              ) : (
                <span style={{ color: "#6E7C87" }}>Transcript will appear here...</span>
              )}
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "done" ? 1 : 0 }}
              className="flex gap-2 mt-4"
            >
              {["AI-Cleaned", "Formatted", "Exportable"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#F4F9F8", color: "#0E2E28" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Supported formats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-3 mt-8"
        >
          {FILE_TYPES.map((ext, i) => (
            <span
              key={ext}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: phase === "drop" && i === fileIndex ? "#CDFA8A" : "rgba(255,255,255,0.1)",
                color: phase === "drop" && i === fileIndex ? "#0E2E28" : "white",
              }}
            >
              {ext}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
