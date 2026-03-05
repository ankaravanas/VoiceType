import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";

const COLORS = {
  background: "#F4F9F8",
  darkGreen: "#0E2E28",
  lemon: "#CDFA8A",
  muted: "#6E7C87",
};

const testimonials = [
  {
    quote: "I write 10,000+ words daily for my clients. VoiceType cut my writing time in half.",
    name: "Sarah Kim",
    role: "Content Strategist",
    initials: "SK",
    bgColor: COLORS.darkGreen,
    textColor: "white",
  },
  {
    quote: "As a developer, I use VoiceType for documentation, Slack messages, and even code comments.",
    name: "Marcus Rodriguez",
    role: "Senior Developer",
    initials: "MR",
    bgColor: "white",
    textColor: COLORS.darkGreen,
  },
  {
    quote: "Our whole agency switched to VoiceType. 10 team members, all saving 2+ hours daily.",
    name: "Jennifer Lee",
    role: "Agency Owner",
    initials: "JL",
    bgColor: COLORS.lemon,
    textColor: COLORS.darkGreen,
  },
];

const TestimonialCard: React.FC<{
  testimonial: typeof testimonials[0];
  frame: number;
  fps: number;
}> = ({ testimonial, frame, fps }) => {
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const quoteOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 800,
        padding: 60,
        borderRadius: 30,
        backgroundColor: testimonial.bgColor,
        border: testimonial.bgColor === "white" ? "2px solid #E5E9EB" : "none",
        transform: `translateY(${(1 - cardSpring) * 100}px) scale(${0.9 + cardSpring * 0.1})`,
        opacity: cardSpring,
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 8, marginBottom: 30 }}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="32"
            height="32"
            fill={testimonial.bgColor === COLORS.lemon ? COLORS.darkGreen : COLORS.lemon}
            viewBox="0 0 20 20"
            style={{
              opacity: interpolate(frame, [5 + i * 3, 10 + i * 3], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${spring({ frame: frame - 5 - i * 3, fps, config: { damping: 10, stiffness: 150 } })})`,
            }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: 32,
          lineHeight: 1.5,
          color: testimonial.textColor,
          marginBottom: 40,
          opacity: quoteOpacity,
        }}
      >
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: authorOpacity,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: testimonial.bgColor === COLORS.darkGreen ? COLORS.lemon : COLORS.darkGreen,
            color: testimonial.bgColor === COLORS.darkGreen ? COLORS.darkGreen : COLORS.lemon,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: testimonial.textColor,
              margin: 0,
            }}
          >
            {testimonial.name}
          </p>
          <p
            style={{
              fontSize: 16,
              color: testimonial.bgColor === "white" ? COLORS.muted : "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TestimonialVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 200,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: COLORS.lemon,
          opacity: 0.2,
        }}
      />

      {/* Testimonials carousel */}
      {testimonials.map((testimonial, index) => (
        <Sequence key={index} from={index * 70} durationInFrames={70}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <TestimonialCard testimonial={testimonial} frame={frame - index * 70} fps={fps} />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
