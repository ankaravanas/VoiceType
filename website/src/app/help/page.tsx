"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const MicrophoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const WrenchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottomWidth: '1px', borderColor: '#E5E9EB' }}>
      <button
        className="w-full py-4 flex items-center justify-between text-left gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm sm:text-base font-medium" style={{ color: '#0E2E28' }}>{question}</span>
        <span className="flex-shrink-0" style={{ color: '#6E7C87' }}>
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="leading-relaxed text-sm" style={{ color: '#6E7C87' }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

// FAQ Category Card Component
function FAQCategory({
  icon,
  title,
  description,
  faqs,
  accentBg = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  faqs: { question: string; answer: string }[];
  accentBg?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all"
      style={{
        backgroundColor: accentBg ? '#CDFA8A' : 'white',
        borderWidth: accentBg ? '0' : '1px',
        borderColor: '#E5E9EB',
      }}
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-4"
        style={{
          backgroundColor: accentBg ? 'rgba(14,46,40,0.1)' : 'rgba(205,250,138,0.3)',
          color: '#0E2E28',
        }}
      >
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#0E2E28' }}>
        {title}
      </h3>
      <p
        className="text-sm sm:text-base mb-4"
        style={{ color: accentBg ? 'rgba(14,46,40,0.8)' : '#6E7C87' }}
      >
        {description}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm font-medium transition-colors flex items-center gap-1"
        style={{ color: '#0E2E28' }}
      >
        {isExpanded ? 'Hide FAQs' : `View ${faqs.length} FAQs`}
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="mt-4 pt-4" style={{ borderTopWidth: '1px', borderColor: accentBg ? 'rgba(14,46,40,0.2)' : '#E5E9EB' }}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </div>
  );
}

// FAQ Data
const faqCategories = [
  {
    icon: <RocketIcon />,
    title: "Getting Started",
    description: "Learn how to install VoiceType and start dictating in minutes.",
    accentBg: false,
    faqs: [
      {
        question: "How do I download and install VoiceType?",
        answer: "Download VoiceType from our website for Mac or Windows. Once downloaded, open the installer and follow the on-screen instructions. The entire process takes less than 2 minutes. After installation, VoiceType will appear in your menu bar (Mac) or system tray (Windows).",
      },
      {
        question: "How do I start my first dictation?",
        answer: "Press the default hotkey (Option+Space on Mac, Alt+Space on Windows) in any text field. You'll see a small indicator showing VoiceType is listening. Start speaking naturally, and when you're done, press the hotkey again or simply stop talking. Your text will appear automatically.",
      },
      {
        question: "Can I customize the activation hotkey?",
        answer: "Yes! Open VoiceType preferences from the menu bar icon and go to 'Hotkeys'. You can set any key combination you prefer. Many users choose F5, Cmd+Shift+V, or double-tap Caps Lock for quick access.",
      },
      {
        question: "Does VoiceType work in all applications?",
        answer: "VoiceType works in any application where you can type text - emails, documents, Slack, Notion, code editors, browsers, and more. It types directly into the active text field, so there's no copy-pasting needed.",
      },
      {
        question: "How do I set up VoiceType for the first time?",
        answer: "After installation, VoiceType will guide you through a quick setup: grant microphone permissions, test your audio, and optionally sign in for cloud features. The whole process takes about 30 seconds.",
      },
    ],
  },
  {
    icon: <MicrophoneIcon />,
    title: "Voice Commands",
    description: "Master punctuation, formatting, and special commands.",
    accentBg: true,
    faqs: [
      {
        question: "How do I add punctuation while dictating?",
        answer: "You can say punctuation naturally: 'period', 'comma', 'question mark', 'exclamation point', 'colon', 'semicolon'. For example: 'Hello comma how are you question mark' becomes 'Hello, how are you?'. The AI also auto-detects punctuation based on context.",
      },
      {
        question: "Can I format text with my voice?",
        answer: "Yes! Say 'new line' or 'new paragraph' for line breaks. Say 'all caps' before a word to capitalize it. Say 'bullet point' or 'number one' to create lists. The AI understands formatting intent and applies it automatically.",
      },
      {
        question: "How do I correct mistakes while dictating?",
        answer: "Simply say 'scratch that' or 'delete that' to remove the last phrase. Say 'undo' to reverse the last action. For larger corrections, you can say 'select all' and start over, or manually edit after dictation.",
      },
      {
        question: "What special commands are available?",
        answer: "Key commands include: 'new line', 'new paragraph', 'tab', 'scratch that', 'undo', 'select all', 'all caps [word]', 'no caps [word]', 'spell out [word]'. Say 'help' during dictation to see all available commands.",
      },
      {
        question: "Can I dictate in multiple languages?",
        answer: "VoiceType supports 50+ languages with automatic detection. Simply start speaking in any supported language, and it will detect and transcribe accordingly. You can even switch languages mid-sentence.",
      },
    ],
  },
  {
    icon: <WrenchIcon />,
    title: "Troubleshooting",
    description: "Solutions for common issues with accuracy, microphone, and more.",
    accentBg: false,
    faqs: [
      {
        question: "Why is my dictation accuracy low?",
        answer: "Check these common causes: 1) Background noise - move to a quieter location or use a headset mic. 2) Microphone quality - built-in laptop mics work but external mics improve accuracy. 3) Speaking pace - speak naturally but clearly. 4) Microphone distance - stay 6-12 inches from your mic.",
      },
      {
        question: "VoiceType isn't detecting my microphone. What should I do?",
        answer: "First, check System Preferences/Settings to ensure VoiceType has microphone permissions. Then verify your mic is selected as the input device in both system settings and VoiceType preferences. Try unplugging and reconnecting external mics. If issues persist, restart VoiceType.",
      },
      {
        question: "The app isn't typing in my application. How do I fix this?",
        answer: "Some apps require accessibility permissions. On Mac, go to System Preferences > Security & Privacy > Accessibility and ensure VoiceType is enabled. On Windows, run VoiceType as administrator if needed. Also verify the app's text field is focused before dictating.",
      },
      {
        question: "Why is there a delay in my dictation appearing?",
        answer: "Slight delays (1-2 seconds) are normal as VoiceType processes and cleans your speech. Longer delays may indicate: slow internet connection, heavy system load, or server-side issues. Try toggling to offline mode in settings for faster local processing.",
      },
      {
        question: "VoiceType crashes when I start dictating. What's wrong?",
        answer: "First, ensure you're running the latest version - check for updates in the app menu. Clear the app cache in preferences. If crashes continue, try reinstalling VoiceType. Contact support with your system info and any error messages for further help.",
      },
    ],
  },
  {
    icon: <CreditCardIcon />,
    title: "Billing & Account",
    description: "Manage your subscription, billing, and account settings.",
    accentBg: false,
    faqs: [
      {
        question: "What's included in the free plan?",
        answer: "The free plan includes 5,000 words per week, audio file upload (up to 5 minutes), full AI editing and formatting, support for 50+ languages, and access across all your devices. No credit card required to start.",
      },
      {
        question: "How do I upgrade to Pro or Agency?",
        answer: "Click your profile icon in VoiceType and select 'Upgrade'. Choose your plan (Pro at $10/month or Agency at $15/month) and enter payment details. Your upgrade is instant, and you'll immediately have access to unlimited dictation and premium features.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel anytime from your account settings. Your Pro/Agency features will remain active until the end of your current billing period. After cancellation, you'll automatically switch to the free plan with no interruption to basic features.",
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a full refund within 7 days of your first subscription payment if you're not satisfied. Contact us at hello@wedohype.com with your account email and reason for the refund. Refunds are processed within 5-7 business days.",
      },
    ],
  },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-medium mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>
            Help Center
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ color: '#0E2E28', lineHeight: '1.1' }}
          >
            How Can We Help You?
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: '#6E7C87' }}
          >
            Find answers to common questions, learn how to get the most out of VoiceType, and get support when you need it.
          </p>

          {/* Search Bar (Visual Only) */}
          <div className="max-w-xl mx-auto">
            <div
              className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white"
              style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}
            >
              <span style={{ color: '#6E7C87' }}>
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search for answers..."
                className="flex-1 bg-transparent outline-none text-sm sm:text-base"
                style={{ color: '#0E2E28' }}
              />
              <button
                className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors"
                style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {faqCategories.map((category, index) => (
              <FAQCategory
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                faqs={category.faqs}
                accentBg={category.accentBg}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center"
            style={{ backgroundColor: '#0E2E28' }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
            >
              <MailIcon />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Still Need Help?
            </h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Our support team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="mailto:hello@wedohype.com"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-colors text-sm sm:text-base"
              style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
            >
              <MailIcon />
              hello@wedohype.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
