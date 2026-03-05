import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Badge Component
function Badge({ type }: { type: 'new' | 'improved' | 'fixed' }) {
  const styles = {
    new: { backgroundColor: '#CDFA8A', color: '#0E2E28' },
    improved: { backgroundColor: '#0E2E28', color: 'white' },
    fixed: { backgroundColor: 'rgba(205,250,138,0.3)', color: '#0E2E28' },
  };

  const labels = {
    new: 'NEW',
    improved: 'IMPROVED',
    fixed: 'FIXED',
  };

  return (
    <span
      className="text-xs font-semibold px-2 py-1 rounded-full"
      style={styles[type]}
    >
      {labels[type]}
    </span>
  );
}

// Change Item Component
function ChangeItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#CDFA8A' }} />
      {text}
    </li>
  );
}

// Version Card Component
function VersionCard({
  version,
  date,
  isLatest,
  newFeatures,
  improvements,
  bugFixes,
}: {
  version: string;
  date: string;
  isLatest?: boolean;
  newFeatures?: string[];
  improvements?: string[];
  bugFixes?: string[];
}) {
  return (
    <div className="relative pl-6 sm:pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div
        className="absolute left-0 top-3 bottom-0 w-px"
        style={{ backgroundColor: '#E5E9EB' }}
      />
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-3 w-2.5 h-2.5 rounded-full -translate-x-1/2"
        style={{ backgroundColor: isLatest ? '#CDFA8A' : '#E5E9EB', borderWidth: '2px', borderColor: isLatest ? '#0E2E28' : '#E5E9EB' }}
      />

      <div
        className="rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-white"
        style={{ borderWidth: '1px', borderColor: isLatest ? '#CDFA8A' : '#E5E9EB' }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#0E2E28' }}>
            {version}
          </h3>
          {isLatest && <Badge type="new" />}
          <span className="text-sm" style={{ color: '#6E7C87' }}>{date}</span>
        </div>

        {/* New Features */}
        {newFeatures && newFeatures.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge type="new" />
              <span className="font-medium text-sm" style={{ color: '#0E2E28' }}>New Features</span>
            </div>
            <ul className="space-y-2 ml-1">
              {newFeatures.map((feature, index) => (
                <ChangeItem key={index} text={feature} />
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {improvements && improvements.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge type="improved" />
              <span className="font-medium text-sm" style={{ color: '#0E2E28' }}>Improvements</span>
            </div>
            <ul className="space-y-2 ml-1">
              {improvements.map((improvement, index) => (
                <ChangeItem key={index} text={improvement} />
              ))}
            </ul>
          </div>
        )}

        {/* Bug Fixes */}
        {bugFixes && bugFixes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge type="fixed" />
              <span className="font-medium text-sm" style={{ color: '#0E2E28' }}>Bug Fixes</span>
            </div>
            <ul className="space-y-2 ml-1">
              {bugFixes.map((fix, index) => (
                <ChangeItem key={index} text={fix} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Changelog Data
const releases = [
  {
    version: "v2.1.0",
    date: "March 2026",
    isLatest: true,
    newFeatures: [
      "Smart punctuation mode: AI now predicts punctuation based on speech patterns and context",
      "Voice shortcuts: Create custom voice commands for frequently used phrases and templates",
      "Real-time collaboration: Share dictation sessions with team members (Agency plan)",
      "Browser extension: Dictate directly in Chrome, Firefox, and Safari without the desktop app",
    ],
    improvements: [
      "40% faster processing speed for real-time dictation",
      "Enhanced accuracy for technical terminology and proper nouns",
      "Improved language switching detection for multilingual users",
      "Redesigned preferences panel with better organization",
    ],
    bugFixes: [
      "Fixed microphone reconnection issues after system sleep",
      "Resolved text duplication bug in certain Electron-based apps",
      "Fixed memory leak when processing long audio files",
    ],
  },
  {
    version: "v2.0.0",
    date: "January 2026",
    newFeatures: [
      "Audio file upload: Transcribe voice memos, meeting recordings, and podcasts",
      "Personal dictionary: Add custom words, names, and technical terms for better accuracy",
      "Agency plan: Team features for up to 10 members with admin dashboard",
      "Offline mode: Basic dictation works without internet connection",
    ],
    improvements: [
      "Complete UI redesign with improved accessibility",
      "50% reduction in CPU usage during active dictation",
      "Expanded language support from 30 to 50+ languages",
      "New onboarding flow for first-time users",
    ],
    bugFixes: [
      "Fixed hotkey conflicts with popular applications",
      "Resolved audio input device switching issues on Windows",
      "Fixed text formatting inconsistencies in rich text editors",
      "Addressed rare crash when dictating in full-screen apps",
    ],
  },
  {
    version: "v1.5.0",
    date: "November 2025",
    newFeatures: [
      "Auto-language detection: VoiceType now automatically detects and transcribes in 30 languages",
      "Voice commands: Say 'new line', 'scratch that', and 'undo' while dictating",
      "Dictation history: Review and copy your last 50 dictation sessions",
    ],
    improvements: [
      "25% improvement in recognition accuracy across all languages",
      "Faster app startup time (under 2 seconds)",
      "Better handling of background noise and crosstalk",
      "Improved support for medical and legal terminology",
    ],
    bugFixes: [
      "Fixed dictation delay in Slack and Discord",
      "Resolved issues with special characters in certain languages",
      "Fixed notification sound not respecting system volume",
      "Addressed visual glitch in menu bar icon on macOS Sonoma",
    ],
  },
  {
    version: "v1.0.0",
    date: "August 2025",
    newFeatures: [
      "Real-time dictation with AI-powered text cleanup and formatting",
      "Works in any application - email, documents, chat, code editors",
      "Customizable hotkey activation for quick access",
      "Free tier with 5,000 words per week",
      "Pro subscription for unlimited dictation",
      "Support for English, Spanish, French, German, Portuguese, and 24 more languages",
    ],
    improvements: [
      "Initial release - optimized for speed and accuracy",
    ],
  },
];

export default function Changelog() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-medium mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>
            Changelog
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ color: '#0E2E28', lineHeight: '1.1' }}
          >
            What&apos;s New in VoiceType
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#6E7C87' }}
          >
            Stay up to date with the latest features, improvements, and bug fixes. We ship updates regularly to make VoiceType better for you.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl"
            style={{ backgroundColor: 'rgba(205,250,138,0.2)' }}
          >
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>4</p>
              <p className="text-xs sm:text-sm" style={{ color: '#6E7C87' }}>Major Releases</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>50+</p>
              <p className="text-xs sm:text-sm" style={{ color: '#6E7C87' }}>New Features</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>100+</p>
              <p className="text-xs sm:text-sm" style={{ color: '#6E7C87' }}>Bug Fixes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>Weekly</p>
              <p className="text-xs sm:text-sm" style={{ color: '#6E7C87' }}>Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {releases.map((release, index) => (
            <VersionCard
              key={index}
              version={release.version}
              date={release.date}
              isLatest={release.isLatest}
              newFeatures={release.newFeatures}
              improvements={release.improvements}
              bugFixes={release.bugFixes}
            />
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center"
            style={{ backgroundColor: '#0E2E28' }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Never Miss an Update
            </h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
              VoiceType automatically updates to the latest version. Make sure you&apos;re running the newest release for the best experience.
            </p>
            <a
              href="/#download"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
            >
              Download Latest Version
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
