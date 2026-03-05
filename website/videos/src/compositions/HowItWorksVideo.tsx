import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { COLORS, Waveform, SPRING_CONFIGS } from "./shared";

const STEP_DURATION = 90; // 3 seconds per step

interface StepProps {
  stepNumber: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps & { children: React.ReactNode }> = ({
  stepNumber,
  title,
  description,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Step indicator */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: entrySpring,
        }}
      >
        {["01", "02", "03"].map((num, i) => (
          <div
            key={num}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor:
                  num === stepNumber ? COLORS.lemon : COLORS.border,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color:
                  num === stepNumber ? COLORS.darkGreen : COLORS.muted,
                transition: "all 0.3s ease",
              }}
            >
              {num}
            </div>
            {i < 2 && (
              <div
                style={{
                  width: 80,
                  height: 3,
                  backgroundColor:
                    parseInt(stepNumber) > i + 1
                      ? COLORS.lemon
                      : COLORS.border,
                  borderRadius: 2,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 120px",
          transform: `translateY(${(1 - entrySpring) * 50}px)`,
          opacity: entrySpring,
        }}
      >
        {/* Visual */}
        <div
          style={{
            marginBottom: 48,
          }}
        >
          {children}
        </div>

        {/* Text */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: COLORS.darkGreen,
              margin: 0,
              marginBottom: 16,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 24,
              color: COLORS.muted,
              margin: 0,
              maxWidth: 600,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Step 1: Activate Anywhere visual
const ActivateVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cursorX = interpolate(frame, [20, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clickScale = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const glowOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative" }}>
      {/* App window mockup */}
      <div
        style={{
          width: 500,
          height: 300,
          backgroundColor: COLORS.white,
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          padding: 20,
          position: "relative",
          border: `2px solid ${COLORS.border}`,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
        </div>

        {/* Text lines */}
        {[0.9, 0.7, 0.5, 0.8, 0.6].map((width, i) => (
          <div
            key={i}
            style={{
              height: 16,
              backgroundColor: COLORS.border,
              borderRadius: 4,
              marginBottom: 12,
              width: `${width * 100}%`,
            }}
          />
        ))}

        {/* VoiceType button */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: COLORS.lemon,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${frame > 45 ? clickScale : 1})`,
            boxShadow: `0 0 ${glowOpacity * 30}px rgba(205, 250, 138, ${glowOpacity})`,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
              fill={COLORS.darkGreen}
            />
            <path
              d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10"
              stroke={COLORS.darkGreen}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          bottom: 40 - cursorX * 0.5,
          right: 40 - cursorX,
          pointerEvents: "none",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4L10.5 20.5L13 13L20.5 10.5L4 4Z"
            fill={COLORS.darkGreen}
            stroke={COLORS.white}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// Step 2: Speak Naturally visual
const SpeakVisual: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      {/* Person speaking icon */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: COLORS.darkGreen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={COLORS.lemon} />
          <path
            d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
            stroke={COLORS.lemon}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Sound waves */}
        {[0, 1, 2].map((i) => {
          const waveFrame = (frame + i * 15) % 45;
          const scale = 1 + waveFrame / 30;
          const opacity = 1 - waveFrame / 45;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: `3px solid ${COLORS.lemon}`,
                transform: `scale(${scale})`,
                opacity: opacity * 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Waveform */}
      <Waveform
        barCount={25}
        barWidth={10}
        barGap={6}
        minHeight={20}
        maxHeight={80}
        color={COLORS.lemon}
        fadeInDelay={0}
      />
    </div>
  );
};

// Step 3: Get Clean Text visual
const TextVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "Your perfectly formatted text appears instantly, ready to use.";
  const charCount = Math.floor(
    interpolate(frame, [20, 70], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const checkSpring = spring({
    frame: frame - 75,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  return (
    <div
      style={{
        width: 600,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 32,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
        border: `2px solid ${COLORS.border}`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: COLORS.lemon,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
              stroke={COLORS.darkGreen}
              strokeWidth="2"
            />
          </svg>
        </div>
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.darkGreen,
          }}
        >
          Clean Output
        </span>
        {frame > 75 && (
          <div
            style={{
              marginLeft: "auto",
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: COLORS.lemon,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${checkSpring})`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12L11 14L15 10"
                stroke={COLORS.darkGreen}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Text content */}
      <div
        style={{
          backgroundColor: COLORS.background,
          borderRadius: 12,
          padding: 24,
          fontSize: 22,
          lineHeight: 1.6,
          color: COLORS.darkGreen,
          minHeight: 100,
        }}
      >
        {text.slice(0, charCount)}
        {charCount < text.length && (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 24,
              backgroundColor: COLORS.darkGreen,
              marginLeft: 2,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const HowItWorksVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={STEP_DURATION}>
        <Step
          stepNumber="01"
          title="Activate Anywhere"
          description="Click the VoiceType button or use your keyboard shortcut in any app"
        >
          <ActivateVisual />
        </Step>
      </Sequence>

      <Sequence from={STEP_DURATION} durationInFrames={STEP_DURATION}>
        <Step
          stepNumber="02"
          title="Speak Naturally"
          description="Talk like you normally would - no special commands needed"
        >
          <SpeakVisual />
        </Step>
      </Sequence>

      <Sequence from={STEP_DURATION * 2} durationInFrames={STEP_DURATION}>
        <Step
          stepNumber="03"
          title="Get Clean Text"
          description="AI automatically formats, punctuates, and cleans your speech"
        >
          <TextVisual />
        </Step>
      </Sequence>
    </AbsoluteFill>
  );
};
