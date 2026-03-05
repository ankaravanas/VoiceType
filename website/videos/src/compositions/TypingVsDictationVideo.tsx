import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, Waveform, SPRING_CONFIGS } from "./shared";

const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. This sentence demonstrates how much faster voice dictation is compared to traditional typing methods.";

const TYPING_SPEED = 3; // Characters per frame (slow)
const DICTATION_START = 60; // Frame when dictation starts
const DICTATION_DURATION = 30; // Frames for full text to appear

export const TypingVsDictationVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typing progress (slow)
  const typedChars = Math.min(Math.floor(frame / TYPING_SPEED), SAMPLE_TEXT.length);
  const typedText = SAMPLE_TEXT.slice(0, typedChars);
  const typingProgress = typedChars / SAMPLE_TEXT.length;

  // Dictation progress (fast, after waveform animation)
  const dictationFrame = Math.max(0, frame - DICTATION_START - 30);
  const dictationProgress = Math.min(dictationFrame / DICTATION_DURATION, 1);
  const dictatedChars = Math.floor(SAMPLE_TEXT.length * dictationProgress);
  const dictatedText = SAMPLE_TEXT.slice(0, dictatedChars);

  // Waveform active state
  const waveformActive = frame >= DICTATION_START && frame < DICTATION_START + 40;

  // Final callout animation
  const showCallout = frame > 180;
  const calloutSpring = spring({
    frame: frame - 180,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.darkGreen,
            margin: 0,
          }}
        >
          Typing vs VoiceType
        </h1>
        <p
          style={{
            fontSize: 22,
            color: COLORS.muted,
            marginTop: 12,
          }}
        >
          Same text. Different speeds.
        </p>
      </div>

      {/* Split Screen Container */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          bottom: 200,
          gap: 40,
        }}
      >
        {/* Left: Typing */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            borderRadius: 24,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            border: `2px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: COLORS.border,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="6"
                  width="20"
                  height="12"
                  rx="2"
                  stroke={COLORS.muted}
                  strokeWidth="2"
                />
                <path
                  d="M6 10H6.01M10 10H10.01M14 10H14.01M18 10H18.01M8 14H16"
                  stroke={COLORS.muted}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.darkGreen,
              }}
            >
              Traditional Typing
            </span>
          </div>

          {/* Text area */}
          <div
            style={{
              flex: 1,
              backgroundColor: COLORS.background,
              borderRadius: 16,
              padding: 24,
              fontSize: 22,
              lineHeight: 1.6,
              color: COLORS.darkGreen,
              position: "relative",
            }}
          >
            {typedText}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 24,
                backgroundColor: COLORS.darkGreen,
                marginLeft: 2,
                opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
              }}
            />
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: 24,
              height: 8,
              backgroundColor: COLORS.border,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${typingProgress * 100}%`,
                height: "100%",
                backgroundColor: COLORS.muted,
                borderRadius: 4,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 16,
              color: COLORS.muted,
              textAlign: "center",
            }}
          >
            {Math.round(typingProgress * 100)}% complete
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 2,
            backgroundColor: COLORS.border,
            alignSelf: "stretch",
            margin: "40px 0",
          }}
        />

        {/* Right: VoiceType */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.darkGreen,
            borderRadius: 24,
            padding: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
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
                  d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
                  fill={COLORS.darkGreen}
                />
                <path
                  d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10"
                  stroke={COLORS.darkGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 19V23M8 23H16"
                  stroke={COLORS.darkGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.white,
              }}
            >
              VoiceType
            </span>
            <div
              style={{
                marginLeft: "auto",
                backgroundColor: COLORS.lemon,
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.darkGreen,
              }}
            >
              3x FASTER
            </div>
          </div>

          {/* Waveform or text area */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              padding: 24,
              fontSize: 22,
              lineHeight: 1.6,
              color: COLORS.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {frame < DICTATION_START ? (
              <div
                style={{
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: 20,
                }}
              >
                Waiting to start...
              </div>
            ) : frame < DICTATION_START + 40 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Waveform
                  barCount={25}
                  barWidth={8}
                  barGap={6}
                  minHeight={30}
                  maxHeight={100}
                  color={COLORS.lemon}
                  fadeInDelay={0}
                  active={waveformActive}
                />
                <span style={{ color: COLORS.lemon, fontSize: 18, fontWeight: 500 }}>
                  Listening...
                </span>
              </div>
            ) : (
              <div style={{ alignSelf: "flex-start" }}>{dictatedText}</div>
            )}
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: 24,
              height: 8,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${dictationProgress * 100}%`,
                height: "100%",
                backgroundColor: COLORS.lemon,
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
            }}
          >
            {Math.round(dictationProgress * 100)}% complete
          </div>
        </div>
      </div>

      {/* Final Callout */}
      {showCallout && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `scale(${calloutSpring})`,
            opacity: calloutSpring,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: COLORS.lemon,
              padding: "20px 48px",
              borderRadius: 60,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.darkGreen,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                fill={COLORS.darkGreen}
              />
            </svg>
            VoiceType finishes 3x faster
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
