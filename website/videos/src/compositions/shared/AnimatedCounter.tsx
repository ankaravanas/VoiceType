import React from "react";
import { spring } from "remotion";
import { SPRING_CONFIGS } from "./animations";

interface AnimatedCounterProps {
  value: string;
  frame: number;
  fps: number;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  frame,
  fps,
  delay = 0,
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.counter,
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
