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

interface LanguageItem {
  text: string;
  language: string;
  flag: string;
}

const languages: LanguageItem[] = [
  { text: "Hello, how are you?", language: "English", flag: "EN" },
  { text: "Hola, como estas?", language: "Spanish", flag: "ES" },
  { text: "Bonjour, comment ca va?", language: "French", flag: "FR" },
  { text: "Hallo, wie geht es dir?", language: "German", flag: "DE" },
  { text: "Ciao, come stai?", language: "Italian", flag: "IT" },
];

const FRAMES_PER_LANGUAGE = 30;

const LanguageBubble: React.FC<{
  item: LanguageItem;
  index: number;
  isActive: boolean;
}> = ({ item, index, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const scale = isActive ? 1 : 0.85;
  const opacity = isActive ? 1 : 0.4;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "24px 40px",
        backgroundColor: isActive ? COLORS.white : "rgba(255, 255, 255, 0.5)",
        borderRadius: 20,
        border: isActive ? `3px solid ${COLORS.lemon}` : "3px solid transparent",
        transform: `scale(${scale * entrySpring}) translateX(${(1 - entrySpring) * 50}px)`,
        opacity: opacity * entrySpring,
        transition: "all 0.2s ease",
        boxShadow: isActive ? "0 10px 40px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 10,
          backgroundColor: isActive ? COLORS.lemon : COLORS.border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 16,
          color: COLORS.darkGreen,
        }}
      >
        {item.flag}
      </div>
      <div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.darkGreen,
            marginBottom: 4,
          }}
        >
          {item.text}
        </div>
        <div
          style={{
            fontSize: 16,
            color: COLORS.muted,
            fontWeight: 500,
          }}
        >
          {item.language}
        </div>
      </div>
    </div>
  );
};

export const MultilingualVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate which language is currently active
  const introFrames = 30;
  const languageFrame = Math.max(0, frame - introFrames);
  const activeIndex = Math.min(
    Math.floor(languageFrame / FRAMES_PER_LANGUAGE),
    languages.length - 1
  );

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: "Arial, sans-serif",
        padding: 80,
      }}
    >
      {/* Title Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 60,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: COLORS.lemon,
            padding: "12px 24px",
            borderRadius: 50,
            marginBottom: 24,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke={COLORS.darkGreen}
              strokeWidth="2"
            />
            <path
              d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
              stroke={COLORS.darkGreen}
              strokeWidth="2"
            />
          </svg>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.darkGreen,
              letterSpacing: 1,
            }}
          >
            MULTILINGUAL SUPPORT
          </span>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.darkGreen,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Speak Any Language
        </h1>
        <p
          style={{
            fontSize: 24,
            color: COLORS.muted,
            marginTop: 16,
          }}
        >
          Auto-detection across 50+ languages
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Left: Waveform visualization */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              backgroundColor: COLORS.darkGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Pulse rings */}
            {[0, 1, 2].map((i) => {
              const pulseFrame = (frame + i * 20) % 60;
              const pulseScale = 1 + pulseFrame / 60;
              const pulseOpacity = 1 - pulseFrame / 60;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    border: `2px solid ${COLORS.lemon}`,
                    transform: `scale(${pulseScale})`,
                    opacity: pulseOpacity * 0.5,
                  }}
                />
              );
            })}
            <Waveform
              barCount={15}
              barWidth={8}
              barGap={6}
              minHeight={20}
              maxHeight={80}
              color={COLORS.lemon}
              fadeInDelay={20}
            />
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 20,
              color: COLORS.muted,
              fontWeight: 500,
            }}
          >
            Speaking...
          </div>
        </div>

        {/* Right: Language bubbles */}
        <div
          style={{
            flex: 1.2,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {languages.map((lang, index) => (
            <Sequence key={index} from={introFrames + index * 8}>
              <LanguageBubble
                item={lang}
                index={index}
                isActive={index === activeIndex}
              />
            </Sequence>
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [120, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 22,
            color: COLORS.darkGreen,
            fontWeight: 500,
          }}
        >
          No setup required.{" "}
          <span style={{ color: COLORS.lemon, fontWeight: 700 }}>
            Just speak.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
