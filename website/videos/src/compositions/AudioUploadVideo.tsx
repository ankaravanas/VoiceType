import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, Waveform, SPRING_CONFIGS } from "./shared";

const FILE_TYPES = [
  { ext: ".mp3", icon: "music" },
  { ext: ".wav", icon: "waveform" },
  { ext: ".m4a", icon: "podcast" },
  { ext: ".webm", icon: "video" },
];

const TRANSCRIPT_TEXT = `"Hey team, just wanted to follow up on our meeting yesterday. The main action items are: first, finalize the Q4 projections by Friday; second, schedule user interviews for next week; and third, prepare the investor deck draft..."`;

export const AudioUploadVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation phases
  const dropPhase = frame < 40; // File dropping
  const processingPhase = frame >= 40 && frame < 100; // Waveform processing
  const transcriptPhase = frame >= 100; // Show transcript

  // File drop animation
  const dropY = interpolate(frame, [0, 30], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dropScale = spring({
    frame: frame - 25,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const dropOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Processing animation
  const processingOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transcript animation
  const transcriptSpring = spring({
    frame: frame - 100,
    fps,
    config: SPRING_CONFIGS.smooth,
  });
  const transcriptChars = Math.floor(
    interpolate(frame, [110, 160], [0, TRANSCRIPT_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Current file type cycle
  const fileIndex = Math.floor(frame / 20) % FILE_TYPES.length;
  const currentFile = FILE_TYPES[fileIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkGreen,
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
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: COLORS.lemon,
            padding: "12px 24px",
            borderRadius: 50,
            marginBottom: 20,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15"
              stroke={COLORS.darkGreen}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 8L12 3L7 8M12 3V15"
              stroke={COLORS.darkGreen}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.darkGreen,
              letterSpacing: 1,
            }}
          >
            UNIQUE FEATURE
          </span>
        </div>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.white,
            margin: 0,
          }}
        >
          Upload Any Audio File
        </h1>
        <p
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: 12,
          }}
        >
          Voice memos, meetings, podcasts → Clean transcripts
        </p>
      </div>

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 120,
          right: 120,
          bottom: 100,
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Left: Upload zone */}
        <div
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 32,
            border: `3px dashed ${processingPhase || transcriptPhase ? COLORS.lemon : "rgba(255, 255, 255, 0.3)"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transition: "border-color 0.3s ease",
          }}
        >
          {dropPhase && (
            <>
              {/* Animated file icon */}
              <div
                style={{
                  transform: `translateY(${dropY}px) scale(${dropScale})`,
                  opacity: dropOpacity,
                }}
              >
                <div
                  style={{
                    width: 140,
                    height: 180,
                    backgroundColor: COLORS.lemon,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke={COLORS.darkGreen}
                      strokeWidth="2"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke={COLORS.darkGreen}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: COLORS.darkGreen,
                      marginTop: 12,
                    }}
                  >
                    {currentFile.ext}
                  </span>
                </div>
              </div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: 18,
                  marginTop: 30,
                }}
              >
                Drop your audio file here
              </p>
            </>
          )}

          {processingPhase && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: processingOpacity,
              }}
            >
              <Waveform
                barCount={30}
                barWidth={10}
                barGap={6}
                minHeight={30}
                maxHeight={120}
                color={COLORS.lemon}
                fadeInDelay={0}
                active={true}
              />
              <p
                style={{
                  color: COLORS.lemon,
                  fontSize: 22,
                  marginTop: 30,
                  fontWeight: 500,
                }}
              >
                Processing audio...
              </p>
              <div
                style={{
                  marginTop: 20,
                  width: 200,
                  height: 6,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${interpolate(frame, [40, 100], [0, 100], {
                      extrapolateRight: "clamp",
                    })}%`,
                    height: "100%",
                    backgroundColor: COLORS.lemon,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          )}

          {transcriptPhase && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${transcriptSpring})`,
                opacity: transcriptSpring,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  backgroundColor: COLORS.lemon,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10"
                    stroke={COLORS.darkGreen}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  color: COLORS.white,
                  fontSize: 24,
                  marginTop: 24,
                  fontWeight: 600,
                }}
              >
                Transcription Complete
              </p>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div
          style={{
            opacity: transcriptPhase ? 1 : 0.3,
            transition: "opacity 0.3s ease",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke={COLORS.lemon}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Right: Transcript output */}
        <div
          style={{
            flex: 1.2,
            height: "100%",
            backgroundColor: COLORS.white,
            borderRadius: 32,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            opacity: transcriptPhase ? 1 : 0.5,
            transition: "opacity 0.3s ease",
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
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: COLORS.lemon,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke={COLORS.darkGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2V8H20M16 13H8M16 17H8M10 9H8"
                  stroke={COLORS.darkGreen}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.darkGreen,
              }}
            >
              Clean Transcript
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: COLORS.background,
              borderRadius: 16,
              padding: 24,
              fontSize: 20,
              lineHeight: 1.7,
              color: COLORS.darkGreen,
              overflow: "hidden",
            }}
          >
            {transcriptPhase ? (
              <>
                {TRANSCRIPT_TEXT.slice(0, transcriptChars)}
                {transcriptChars < TRANSCRIPT_TEXT.length && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 22,
                      backgroundColor: COLORS.darkGreen,
                      marginLeft: 2,
                    }}
                  />
                )}
              </>
            ) : (
              <span style={{ color: COLORS.muted }}>
                Transcript will appear here...
              </span>
            )}
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 20,
              opacity: transcriptPhase ? transcriptSpring : 0,
            }}
          >
            {["AI-Cleaned", "Formatted", "Exportable"].map((feature, i) => (
              <div
                key={feature}
                style={{
                  backgroundColor: COLORS.background,
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 500,
                  color: COLORS.darkGreen,
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported formats */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          opacity: interpolate(frame, [10, 30], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {FILE_TYPES.map((file, i) => (
          <div
            key={file.ext}
            style={{
              padding: "10px 20px",
              backgroundColor:
                i === fileIndex && dropPhase
                  ? COLORS.lemon
                  : "rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
              fontSize: 16,
              fontWeight: 600,
              color: i === fileIndex && dropPhase ? COLORS.darkGreen : COLORS.white,
              transition: "all 0.2s ease",
            }}
          >
            {file.ext}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
