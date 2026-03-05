import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "./colors";

interface WaveformProps {
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  minHeight?: number;
  maxHeight?: number;
  color?: string;
  speed?: number;
  fadeInDelay?: number;
  fadeInDuration?: number;
  active?: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({
  barCount = 20,
  barWidth = 6,
  barGap = 4,
  minHeight = 20,
  maxHeight = 50,
  color = COLORS.lemon,
  speed = 0.2,
  fadeInDelay = 0,
  fadeInDuration = 20,
  active = true,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [fadeInDelay, fadeInDelay + fadeInDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: barGap,
        alignItems: "center",
        opacity,
      }}
    >
      {[...Array(barCount)].map((_, i) => {
        const height = active
          ? minHeight + Math.sin((frame + i * 5) * speed) * (maxHeight - minHeight) / 2 + (maxHeight - minHeight) / 2
          : minHeight;
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height,
              backgroundColor: color,
              borderRadius: barWidth / 2,
              transition: "height 0.1s ease",
            }}
          />
        );
      })}
    </div>
  );
};

export const WaveformLine: React.FC<{
  width?: number;
  height?: number;
  color?: string;
  amplitude?: number;
  frequency?: number;
  strokeWidth?: number;
  fadeInDelay?: number;
}> = ({
  width = 400,
  height = 100,
  color = COLORS.lemon,
  amplitude = 30,
  frequency = 0.05,
  strokeWidth = 3,
  fadeInDelay = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [fadeInDelay, fadeInDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const points: string[] = [];
  for (let x = 0; x <= width; x += 2) {
    const y = height / 2 + Math.sin((x + frame * 3) * frequency) * amplitude;
    points.push(`${x},${y}`);
  }

  return (
    <svg width={width} height={height} style={{ opacity }}>
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
