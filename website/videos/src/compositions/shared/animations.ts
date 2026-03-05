import { spring, interpolate, SpringConfig } from "remotion";

export const SPRING_CONFIGS = {
  smooth: { damping: 12, stiffness: 100 } as SpringConfig,
  bouncy: { damping: 10, stiffness: 100 } as SpringConfig,
  slow: { damping: 100, stiffness: 50 } as SpringConfig,
  counter: { damping: 15, stiffness: 80 } as SpringConfig,
} as const;

export const fadeInUp = (frame: number, delay: number = 0, duration: number = 20) => ({
  opacity: interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  transform: `translateY(${interpolate(frame - delay, [0, duration], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

export const scaleIn = (frame: number, fps: number, delay: number = 0, config = SPRING_CONFIGS.smooth) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config,
  });
  return {
    opacity: progress,
    transform: `scale(${0.8 + progress * 0.2})`,
  };
};

export const slideInFromLeft = (frame: number, delay: number = 0, duration: number = 20) => ({
  opacity: interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  transform: `translateX(${interpolate(frame - delay, [0, duration], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

export const slideInFromRight = (frame: number, delay: number = 0, duration: number = 20) => ({
  opacity: interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  transform: `translateX(${interpolate(frame - delay, [0, duration], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});
