export const COLORS = {
  background: "#F4F9F8",
  darkGreen: "#0E2E28",
  lemon: "#CDFA8A",
  muted: "#6E7C87",
  border: "#E5E9EB",
  white: "#FFFFFF",
} as const;

export type ColorKey = keyof typeof COLORS;
