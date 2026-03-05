import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, AnimatedCounter, SPRING_CONFIGS } from "./shared";

interface ComparisonItem {
  name: string;
  speed: number;
  color: string;
  highlight?: boolean;
}

const comparisons: ComparisonItem[] = [
  { name: "VoiceType", speed: 180, color: COLORS.lemon, highlight: true },
  { name: "Wispr Flow", speed: 140, color: "#6B7280" },
  { name: "Apple Dictation", speed: 90, color: "#9CA3AF" },
  { name: "Google Voice", speed: 85, color: "#D1D5DB" },
];

const MAX_SPEED = 200;

export const SpeedComparisonVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Winner badge animation
  const showWinner = frame > 100;
  const winnerSpring = spring({
    frame: frame - 100,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkGreen,
        fontFamily: "Arial, sans-serif",
        padding: 80,
      }}
    >
      {/* Title */}
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
            gap: 10,
            backgroundColor: "rgba(205, 250, 138, 0.2)",
            padding: "10px 24px",
            borderRadius: 50,
            marginBottom: 20,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              fill={COLORS.lemon}
            />
          </svg>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.lemon,
              letterSpacing: 1,
            }}
          >
            SPEED BENCHMARK
          </span>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.white,
            margin: 0,
          }}
        >
          Words Per Minute
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: 12,
          }}
        >
          Real-world speed comparison across dictation tools
        </p>
      </div>

      {/* Comparison Bars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {comparisons.map((item, index) => {
          const delay = 30 + index * 20;
          const barProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 20, stiffness: 80 },
          });
          const barWidth = (item.speed / MAX_SPEED) * 100 * barProgress;

          const labelSpring = spring({
            frame: frame - delay - 10,
            fps,
            config: SPRING_CONFIGS.smooth,
          });

          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              {/* Label */}
              <div
                style={{
                  width: 180,
                  textAlign: "right",
                  opacity: labelSpring,
                  transform: `translateX(${(1 - labelSpring) * -20}px)`,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: item.highlight ? 700 : 500,
                    color: item.highlight ? COLORS.lemon : COLORS.white,
                  }}
                >
                  {item.name}
                </span>
              </div>

              {/* Bar container */}
              <div
                style={{
                  flex: 1,
                  height: 56,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 28,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Animated bar */}
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    backgroundColor: item.color,
                    borderRadius: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 20,
                    boxShadow: item.highlight
                      ? "0 0 30px rgba(205, 250, 138, 0.5)"
                      : "none",
                  }}
                >
                  {barProgress > 0.5 && (
                    <span
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: item.highlight ? COLORS.darkGreen : COLORS.white,
                        opacity: (barProgress - 0.5) * 2,
                      }}
                    >
                      <AnimatedCounter
                        value={`${item.speed}`}
                        frame={frame}
                        fps={fps}
                        delay={delay + 20}
                      />
                      <span style={{ fontSize: 16, fontWeight: 500, marginLeft: 4 }}>
                        WPM
                      </span>
                    </span>
                  )}
                </div>

                {/* Highlight glow for VoiceType */}
                {item.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: `${barWidth}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, transparent 60%, rgba(205, 250, 138, 0.3) 100%)`,
                      borderRadius: 28,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Winner badge */}
      {showWinner && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `scale(${winnerSpring})`,
            opacity: winnerSpring,
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
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={COLORS.darkGreen}
              />
            </svg>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.darkGreen,
              }}
            >
              VoiceType is 28% faster than the competition
            </span>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: `2px solid rgba(205, 250, 138, 0.2)`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: `2px solid rgba(205, 250, 138, 0.15)`,
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
