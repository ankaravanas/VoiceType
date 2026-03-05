import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const COLORS = {
  background: "#F4F9F8",
  darkGreen: "#0E2E28",
  lemon: "#CDFA8A",
  muted: "#6E7C87",
};

export const HeroVideo: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = title.split("\n");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Animated background shapes */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          backgroundColor: COLORS.lemon,
          opacity: 0.3,
          top: -100,
          right: -100,
          transform: `scale(${spring({ frame, fps, config: { damping: 100, stiffness: 50 } })})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: COLORS.lemon,
          opacity: 0.2,
          bottom: -50,
          left: -50,
          transform: `scale(${spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 50 } })})`,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 280,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [0, 20], [20, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <span
          style={{
            color: COLORS.darkGreen,
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          AI Voice Dictation for Professionals
        </span>
      </div>

      {/* Main title lines */}
      <div style={{ textAlign: "center" }}>
        {lines.map((line, index) => {
          const delay = index * 15;
          const lineSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={index}
              style={{
                fontSize: 90,
                fontWeight: 700,
                color: COLORS.darkGreen,
                lineHeight: 1.1,
                opacity,
                transform: `translateY(${(1 - lineSpring) * 50}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          bottom: 250,
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 100 } })})`,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.lemon,
            color: COLORS.darkGreen,
            padding: "20px 50px",
            borderRadius: 50,
            fontSize: 24,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          Download Free
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Waveform animation */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 4,
          opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {[...Array(20)].map((_, i) => {
          const height = 20 + Math.sin((frame + i * 5) * 0.2) * 15;
          return (
            <div
              key={i}
              style={{
                width: 6,
                height,
                backgroundColor: COLORS.lemon,
                borderRadius: 3,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
