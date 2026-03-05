import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Icons
const SpeedIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const PuzzleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>About VoiceType</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8" style={{ color: '#0E2E28', lineHeight: '1.1' }}>
              We Believe Your Ideas Deserve to Flow Freely
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: '#6E7C87' }}>
              VoiceType was born from a simple frustration: typing couldn&apos;t keep up with our thoughts. We built the tool we wished existed.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Our Story</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0E2E28' }}>
                Built by Creators, for Creators
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#6E7C87' }}>
                  We run multiple businesses. We write thousands of words daily. Typing was our bottleneck. So we fixed it.
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#6E7C87' }}>
                  We tried every voice dictation tool on the market. They all had the same problem: raw, unedited transcripts that needed hours of cleanup. The promise of &ldquo;just speak&rdquo; was broken before it started.
                </p>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#6E7C87' }}>
                  VoiceType is different. We built AI that doesn&apos;t just transcribe&mdash;it edits, formats, and polishes. You speak naturally, and you get professional text. No cleanup required.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-8 sm:p-12" style={{ backgroundColor: '#0E2E28' }}>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed">
                &ldquo;We didn&apos;t set out to build a company. We set out to solve our own problem. VoiceType is the tool we use every single day.&rdquo;
              </p>
              <p className="mt-6 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                &mdash; The VoiceType Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
              Our Principles
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Value 1 - Speed */}
            <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8" style={{ backgroundColor: '#CDFA8A' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(14,46,40,0.1)', color: '#0E2E28' }}>
                <SpeedIcon />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#0E2E28' }}>Speed is Everything</h3>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(14,46,40,0.8)' }}>
                Your brain works faster than your fingers. We built VoiceType to close that gap. Every millisecond matters, and we obsess over making dictation feel instant.
              </p>
            </div>

            {/* Value 2 - Privacy */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white mb-6" style={{ backgroundColor: '#0E2E28' }}>
                <ShieldIcon />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#0E2E28' }}>Privacy First</h3>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                Your voice is personal. Your ideas are valuable. We process your audio and delete it immediately. No storage, no training on your data, no exceptions.
              </p>
            </div>

            {/* Value 3 - Workflow */}
            <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 sm:col-span-2 md:col-span-1" style={{ backgroundColor: '#0E2E28' }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                <PuzzleIcon />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">Your Workflow, Not Ours</h3>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
                We don&apos;t want to change how you work. VoiceType lives invisibly inside your existing tools. Same apps, same workflow, just faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Our Mission</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8" style={{ color: '#0E2E28' }}>
            Making Communication Effortless
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: '#6E7C87' }}>
            We believe the future of writing isn&apos;t about better keyboards&mdash;it&apos;s about eliminating the keyboard entirely. VoiceType is our first step toward a world where getting your thoughts out is as natural as having them.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
              <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#0E2E28' }}>50K+</p>
              <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>Active Users</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
              <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#0E2E28' }}>10M+</p>
              <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>Words Dictated</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
              <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#0E2E28' }}>50+</p>
              <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>Languages</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
              <p className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#0E2E28' }}>4.9</p>
              <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center" style={{ backgroundColor: '#0E2E28' }}>
            <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#CDFA8A' }}>Ready to get started?</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Experience the Future of Typing
            </h2>
            <p className="text-sm sm:text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Download VoiceType free. 5,000 words per week, no credit card required.
            </p>
            <Link
              href="/#download"
              className="inline-flex px-8 py-4 rounded-full font-semibold transition-colors items-center gap-2 text-sm sm:text-base"
              style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
            >
              Download VoiceType Free
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
