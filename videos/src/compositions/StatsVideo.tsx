import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const COLORS = {
  background: "#F4F9F8",
  darkGreen: "#0E2E28",
  lemon: "#CDFA8A",
  muted: "#6E7C87",
};

const stats = [
  { value: "2.5h", label: "Saved per day" },
  { value: "98%", label: "Accuracy rate" },
  { value: "50K+", label: "Active users" },
  { value: "4.9★", label: "User rating" },
];

const AnimatedCounter: React.FC<{
  value: string;
  frame: number;
  fps: number;
  delay: number;
}> = ({ value, frame, fps, delay }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // For numeric values, animate the number
  const numericMatch = value.match(/^([\d.]+)/);
  if (numericMatch) {
    const targetNum = parseFloat(numericMatch[1]);
    const currentNum = targetNum * progress;
    const suffix = value.replace(numericMatch[1], "");

    return (
      <span>
        {currentNum.toFixed(value.includes(".") ? 1 : 0)}
        {suffix}
      </span>
    );
  }

  return <span style={{ opacity: progress }}>{value}</span>;
};

export const StatsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkGreen,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 150,
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <p style={{ color: COLORS.lemon, fontSize: 20, fontWeight: 500, marginBottom: 10, letterSpacing: 2 }}>
          REAL RESULTS
        </p>
        <h2 style={{ color: "white", fontSize: 60, fontWeight: 700, margin: 0 }}>
          Numbers That Speak
        </h2>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
          marginTop: 100,
        }}
      >
        {stats.map((stat, index) => {
          const delay = 30 + index * 15;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "40px 50px",
                borderRadius: 20,
                backgroundColor: "rgba(205, 250, 138, 0.1)",
                opacity: cardSpring,
                transform: `translateY(${(1 - cardSpring) * 50}px) scale(${0.8 + cardSpring * 0.2})`,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 700,
                  color: COLORS.lemon,
                  marginBottom: 10,
                }}
              >
                <AnimatedCounter value={stat.value} frame={frame} fps={fps} delay={delay + 10} />
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          width: interpolate(frame, [100, 130], [0, 400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: 4,
          backgroundColor: COLORS.lemon,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};
