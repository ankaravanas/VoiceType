"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageLoader } from "@/components/loading/PageLoader";
import {
  FadeInWhenVisible,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  AnimatedCounter,
  AnimatedWaveform,
  AnimatedFAQItem,
  TypingVsDictation,
  AudioUploadDemo,
} from "@/components/animations";

// Icons as simple SVG components
const MicrophoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

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

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="#CDFA8A" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platform, setPlatform] = useState<'mac' | 'windows' | 'other'>('mac');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Pricing (yearly = 10 months price, 2 months free)
  const pricing = {
    pro: {
      monthly: 10,
      yearly: 100,
    },
    agency: {
      monthly: 15,
      yearly: 150,
    },
  };

  // Detect user's operating system
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) {
      setPlatform('windows');
    } else if (userAgent.includes('mac')) {
      setPlatform('mac');
    } else {
      setPlatform('other');
    }
  }, []);

  return (
    <PageLoader>
      <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(244,249,248,0.8)', borderColor: '#E5E9EB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="VoiceType" width={32} height={32} />
                <span className="text-xl font-semibold" style={{ color: '#0E2E28' }}>VoiceType</span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>Features</a>
                <a href="#how-it-works" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>How It Works</a>
                <a href="#pricing" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>Pricing</a>
                <a href="#faq" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>FAQ</a>
              </div>

              {/* Desktop CTA */}
              <a
                href="#download"
                className="hidden sm:flex text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2"
                style={{ backgroundColor: '#0E2E28' }}
              >
                Download Free
                <ArrowRightIcon />
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                style={{ color: '#6E7C87' }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t" style={{ backgroundColor: '#F4F9F8', borderColor: '#E5E9EB' }}>
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#pricing" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#faq" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a
                  href="#download"
                  className="block w-full text-white px-5 py-3 rounded-full text-center font-medium mt-4"
                  style={{ backgroundColor: '#0E2E28' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Download Free
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <TextReveal delay={0.1}>
                <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>AI Voice Dictation for Professionals</p>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6" style={{ color: '#0E2E28', lineHeight: '1.1' }}>
                  Stop Typing.<br />Start Speaking.<br />Get More Done.
                </h1>
              </TextReveal>
              <TextReveal delay={0.4}>
                <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto px-4" style={{ color: '#6E7C87' }}>
                  Dictate anywhere, in any app. AI cleans up your words instantly. No more slow typing, no more editing raw transcripts.
                </p>
              </TextReveal>

              {/* CTA */}
              <TextReveal delay={0.5}>
                <div className="flex items-center justify-center">
                  <a
                    href="#download"
                    className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
                  >
                    {platform === 'windows' ? 'Download for Windows' : 'Download for Mac'}
                    <ArrowRightIcon />
                  </a>
                </div>
              </TextReveal>
            </div>

            {/* Dashboard Preview */}
            <FadeInWhenVisible delay={0.6} className="mt-12 sm:mt-16 relative">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto" style={{ borderColor: '#E5E9EB', borderWidth: '1px' }}>
                {/* Mock Dashboard Header */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2" style={{ backgroundColor: '#E5E9EB' }}>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                </div>
                {/* Mock Dashboard Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div className="rounded-lg sm:rounded-xl p-3 sm:p-4" style={{ backgroundColor: '#F4F9F8' }}>
                      <p className="text-xs sm:text-sm mb-1" style={{ color: '#6E7C87' }}>Words Today</p>
                      <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>2,847</p>
                      <p className="text-xs sm:text-sm" style={{ color: '#0E2E28' }}>+23% from yesterday</p>
                    </div>
                    <div className="rounded-lg sm:rounded-xl p-3 sm:p-4" style={{ backgroundColor: '#F4F9F8' }}>
                      <p className="text-xs sm:text-sm mb-1" style={{ color: '#6E7C87' }}>Time Saved</p>
                      <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>1.5 hrs</p>
                      <p className="text-xs sm:text-sm" style={{ color: '#0E2E28' }}>vs typing manually</p>
                    </div>
                    <div className="rounded-lg sm:rounded-xl p-3 sm:p-4" style={{ backgroundColor: '#F4F9F8' }}>
                      <p className="text-xs sm:text-sm mb-1" style={{ color: '#6E7C87' }}>Accuracy</p>
                      <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#0E2E28' }}>98.7%</p>
                      <p className="text-xs sm:text-sm" style={{ color: '#0E2E28' }}>AI auto-corrected</p>
                    </div>
                  </div>
                  {/* Waveform Visual */}
                  <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4" style={{ backgroundColor: 'rgba(205,250,138,0.2)' }}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                      <MicrophoneIcon />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <AnimatedWaveform barCount={30} />
                    </div>
                    <span className="font-medium text-sm sm:text-base whitespace-nowrap" style={{ color: '#0E2E28' }}>Recording...</span>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Typing vs Dictation Demo */}
        <TypingVsDictation />

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <FadeInWhenVisible>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
                <div className="max-w-xl">
                  <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Why Creators Choose Us</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                    Built for Speed. Designed for Your Workflow.
                  </h2>
                </div>
                <p className="text-base sm:text-lg max-w-md" style={{ color: '#6E7C87' }}>
                  We tested every voice tool on the market. None were fast enough. So we built our own.
                </p>
              </div>
            </FadeInWhenVisible>

            {/* Feature Cards */}
            <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Feature 1 */}
              <StaggerItem>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-colors h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(205,250,138,0.3)', color: '#0E2E28' }}>
                    <MicrophoneIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Real-Time Dictation</h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    Speak naturally. Watch your words appear instantly, cleaned and formatted. Works in any app on your computer.
                  </p>
                  <a href="#" className="font-medium transition-colors inline-flex items-center gap-1 text-sm sm:text-base" style={{ color: '#0E2E28' }}>
                    See it in action <ArrowRightIcon />
                  </a>
                </div>
              </StaggerItem>

              {/* Feature 2 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(14,46,40,0.1)' }}>
                    <UploadIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Audio File Upload</h3>
                  <p className="mb-3 sm:mb-4 opacity-90 text-sm sm:text-base">
                    Got a voice memo? A meeting recording? Upload it and get a clean transcript in minutes. No competitor offers this.
                  </p>
                  <a href="#" className="font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1 text-sm sm:text-base">
                    Try it free <ArrowRightIcon />
                  </a>
                </div>
              </StaggerItem>

              {/* Feature 3 */}
              <StaggerItem>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-colors sm:col-span-2 md:col-span-1 h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(205,250,138,0.3)', color: '#0E2E28' }}>
                    <GlobeIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Multilingual Support</h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    Auto-detects your language. Switch between English, Greek, Spanish, or any of 50+ languages mid-sentence.
                  </p>
                  <a href="#" className="font-medium transition-colors inline-flex items-center gap-1 text-sm sm:text-base" style={{ color: '#0E2E28' }}>
                    View all languages <ArrowRightIcon />
                  </a>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Why Us / Stats Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-10 sm:mb-16">
                <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>The Numbers</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                  Why Creators Switch to VoiceType
                </h2>
              </div>
            </FadeInWhenVisible>

            <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Stat 1 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#F4F9F8' }}>
                  <p className="text-5xl sm:text-6xl font-bold mb-2" style={{ color: '#CDFA8A' }}>
                    <AnimatedCounter target={3} suffix="X" />
                  </p>
                  <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#0E2E28' }}>Faster than typing</p>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    Average users dictate 150 words per minute. Typing averages 40. Do the math.
                  </p>
                </div>
              </StaggerItem>

              {/* Stat 2 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white h-full" style={{ backgroundColor: '#0E2E28' }}>
                  <p className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Zero Raw Transcripts</p>
                  <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Every dictation tool gives you messy output. Ours doesn&apos;t. AI removes filler words, fixes grammar, adds punctuation automatically.
                  </p>
                </div>
              </StaggerItem>

              {/* Stat 3 - Chart Card */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 sm:col-span-2 md:col-span-1 h-full" style={{ backgroundColor: '#F4F9F8' }}>
                  <p className="text-xs sm:text-sm mb-2" style={{ color: '#6E7C87' }}>Speed Comparison</p>
                  <p className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#0E2E28' }}>Faster Than Wispr Flow</p>
                  {/* Mini chart */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span style={{ color: '#6E7C87' }}>VoiceType</span>
                        <span className="font-medium" style={{ color: '#0E2E28' }}>140%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E9EB' }}>
                        <div className="h-full rounded-full" style={{ width: "95%", backgroundColor: '#CDFA8A' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span style={{ color: '#6E7C87' }}>Wispr Flow</span>
                        <span style={{ color: '#6E7C87' }}>100%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E9EB' }}>
                        <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: '#9AA6AC' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span style={{ color: '#6E7C87' }}>Apple Dictation</span>
                        <span style={{ color: '#6E7C87' }}>65%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E9EB' }}>
                        <div className="h-full rounded-full" style={{ width: "44%", backgroundColor: '#9AA6AC' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-10 sm:mb-16">
                <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Trusted by Professionals</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                  Real Results from Real Users
                </h2>
              </div>
            </FadeInWhenVisible>

            {/* Impact Stats */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              <StaggerItem>
                <div className="text-center p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1" style={{ color: '#0E2E28' }}>
                    <AnimatedCounter target={2.5} suffix="h" decimals={1} />
                  </p>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>Saved per day</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1" style={{ color: '#0E2E28' }}>
                    <AnimatedCounter target={98} suffix="%" />
                  </p>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>Accuracy rate</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1" style={{ color: '#0E2E28' }}>
                    <AnimatedCounter target={50} suffix="K+" />
                  </p>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>Active users</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center p-4 sm:p-6 rounded-xl" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1" style={{ color: '#0E2E28' }}>
                    <AnimatedCounter target={4.9} decimals={1} />★
                  </p>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>User rating</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Testimonial Cards */}
            <StaggerContainer className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {/* Testimonial 1 */}
              <StaggerItem>
                <div className="rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#0E2E28' }}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="#CDFA8A" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white text-lg mb-6 leading-relaxed">
                    &ldquo;I write 10,000+ words daily for my clients. VoiceType cut my writing time in half. The AI cleanup is incredible — no more editing filler words.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                      SK
                    </div>
                    <div>
                      <p className="text-white font-medium">Sarah Kim</p>
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Content Strategist</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Testimonial 2 */}
              <StaggerItem>
                <div className="rounded-2xl p-6 sm:p-8 bg-white h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="#CDFA8A" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: '#353535' }}>
                    &ldquo;As a developer, I use VoiceType for documentation, Slack messages, and even code comments. It&apos;s 3x faster than typing and the accuracy is spot-on.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#0E2E28', color: '#CDFA8A' }}>
                      MR
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#0E2E28' }}>Marcus Rodriguez</p>
                      <p className="text-sm" style={{ color: '#6E7C87' }}>Senior Developer</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Testimonial 3 */}
              <StaggerItem>
                <div className="rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#CDFA8A' }}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="#0E2E28" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: '#0E2E28' }}>
                    &ldquo;Our whole agency switched to VoiceType. 10 team members, all saving 2+ hours daily. The ROI paid for itself in the first week.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#0E2E28', color: '#CDFA8A' }}>
                      JL
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#0E2E28' }}>Jennifer Lee</p>
                      <p className="text-sm" style={{ color: 'rgba(14,46,40,0.7)' }}>Agency Owner</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-10 sm:mb-16">
                <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>How It Works</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                  From Voice to Text in 3 Steps
                </h2>
              </div>
            </FadeInWhenVisible>

            <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Step 1 */}
              <StaggerItem>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <span className="text-4xl sm:text-5xl font-bold" style={{ color: '#CDFA8A' }}>01</span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4 mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Activate Anywhere</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    Press your hotkey in any app. Email, Slack, Notion, your code editor. VoiceType works everywhere.
                  </p>
                </div>
              </StaggerItem>

              {/* Step 2 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden h-full" style={{ backgroundColor: '#CDFA8A' }}>
                  <span className="text-4xl sm:text-5xl font-bold" style={{ color: 'rgba(14,46,40,0.2)' }}>02</span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4 mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Speak Naturally</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(14,46,40,0.8)' }}>
                    Talk like you normally would. Pause, think, change direction. The AI handles the cleanup so you don&apos;t have to.
                  </p>
                  {/* Decorative waveform */}
                  <div className="absolute -bottom-4 -right-4 opacity-20 hidden sm:block">
                    <svg width="120" height="60" viewBox="0 0 120 60">
                      <path d="M0,30 Q15,10 30,30 T60,30 T90,30 T120,30" fill="none" stroke="#0E2E28" strokeWidth="3"/>
                    </svg>
                  </div>
                </div>
              </StaggerItem>

              {/* Step 3 */}
              <StaggerItem>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 sm:col-span-2 md:col-span-1 h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <span className="text-4xl sm:text-5xl font-bold" style={{ color: '#CDFA8A' }}>03</span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4 mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Get Clean Text</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    Your words appear formatted, punctuated, and ready to use. No editing required. Just keep moving.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Mission / Values Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-10 sm:mb-16">
                <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Our Promise</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                  Built by Creators Who Got Tired of Typing
                </h2>
              </div>
            </FadeInWhenVisible>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Card 1 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: 'rgba(205,250,138,0.2)', borderWidth: '1px', borderColor: 'rgba(205,250,138,0.4)' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                    <SpeedIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Speed Is Everything</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    We run multiple businesses. We write thousands of words daily. Typing was our bottleneck. So we fixed it.
                  </p>
                </div>
              </StaggerItem>

              {/* Card 2 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#F4F9F8', borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6" style={{ backgroundColor: '#0E2E28' }}>
                    <ShieldIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Privacy First</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    Your audio is processed and deleted. We don&apos;t store your recordings. We don&apos;t train on your data. Period.
                  </p>
                </div>
              </StaggerItem>

              {/* Card 3 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#F4F9F8', borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6" style={{ backgroundColor: '#0E2E28' }}>
                    <PuzzleIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Your Workflow, Not Ours</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    No new apps to learn. No workflows to change. VoiceType works invisibly inside the tools you already use.
                  </p>
                </div>
              </StaggerItem>

              {/* Card 4 */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ backgroundColor: '#CDFA8A' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(14,46,40,0.1)', color: '#0E2E28' }}>
                    <UploadIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#0E2E28' }}>Upload Any Audio</h3>
                  <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(14,46,40,0.8)' }}>
                    Voice memos from your commute. Meeting recordings. Podcast interviews. Upload any audio file and get a clean transcript back.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Audio Upload Demo */}
        <AudioUploadDemo />

        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-10 sm:mb-16">
                <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Simple Pricing</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                  Start Free. Upgrade When You&apos;re Ready.
                </h2>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <span
                    className="text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: billingPeriod === 'monthly' ? '#0E2E28' : '#6E7C87' }}
                    onClick={() => setBillingPeriod('monthly')}
                  >
                    Monthly
                  </span>
                  <button
                    onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                    className="relative w-12 h-7 rounded-full transition-colors"
                    style={{ backgroundColor: billingPeriod === 'yearly' ? '#CDFA8A' : '#E5E9EB' }}
                  >
                    <span
                      className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-200"
                      style={{
                        left: billingPeriod === 'yearly' ? 'calc(100% - 24px)' : '4px',
                      }}
                    />
                  </button>
                  <span
                    className="text-sm font-medium cursor-pointer transition-colors flex items-center gap-2"
                    style={{ color: billingPeriod === 'yearly' ? '#0E2E28' : '#6E7C87' }}
                    onClick={() => setBillingPeriod('yearly')}
                  >
                    Yearly
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                      2 months free
                    </span>
                  </span>
                </div>
              </div>
            </FadeInWhenVisible>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {/* Free Tier */}
              <StaggerItem>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>Free</p>
                  <p className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#0E2E28' }}>$0<span className="text-base sm:text-lg font-normal" style={{ color: '#6E7C87' }}>/month</span></p>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      5,000 words/week
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      Audio upload (5 min max)
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      AI editing & formatting
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      50+ languages
                    </li>
                  </ul>
                  <a href="#download" className="block w-full py-3 text-center rounded-full font-medium transition-colors text-sm sm:text-base" style={{ borderWidth: '1px', borderColor: '#E5E9EB', color: '#0E2E28' }}>
                    Download Free
                  </a>
                </div>
              </StaggerItem>

              {/* Pro Tier */}
              <StaggerItem>
                <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative sm:col-span-2 lg:col-span-1 h-full" style={{ backgroundColor: '#0E2E28' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                    Most Popular
                  </div>
                  <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>Pro</p>
                  <p className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
                    ${billingPeriod === 'monthly' ? pricing.pro.monthly : pricing.pro.yearly}
                    <span className="text-base sm:text-lg font-normal" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </p>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <CheckIcon />
                      Unlimited dictation
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <CheckIcon />
                      Priority processing
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <CheckIcon />
                      30-min audio uploads
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <CheckIcon />
                      Personal dictionary
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <CheckIcon />
                      Email support
                    </li>
                  </ul>
                  <a href="#" className="block w-full py-3 text-center rounded-full font-medium transition-colors text-sm sm:text-base" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                    Start Pro Trial
                  </a>
                </div>
              </StaggerItem>

              {/* Agency Tier */}
              <StaggerItem>
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                  <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>Agency</p>
                  <p className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#0E2E28' }}>
                    ${billingPeriod === 'monthly' ? pricing.agency.monthly : pricing.agency.yearly}
                    <span className="text-base sm:text-lg font-normal" style={{ color: '#6E7C87' }}>
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </p>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      Everything in Pro
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      Up to 10 team members
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      Team admin dashboard
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      60-min audio files
                    </li>
                    <li className="flex items-center gap-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                      <CheckIcon />
                      Priority support
                    </li>
                  </ul>
                  <a href="#" className="block w-full py-3 text-center rounded-full font-medium transition-colors text-sm sm:text-base" style={{ borderWidth: '1px', borderColor: '#E5E9EB', color: '#0E2E28' }}>
                    Start Agency Plan
                  </a>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <FadeInWhenVisible>
              <div className="text-center mb-10 sm:mb-16">
                <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>FAQ</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
                  Questions About VoiceType?
                </h2>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <div style={{ borderColor: '#E5E9EB' }}>
                <AnimatedFAQItem
                  question="How is this different from Apple Dictation?"
                  answer="Apple Dictation gives you raw speech. VoiceType gives you edited text. We remove filler words, fix grammar, add punctuation, and format your output. It's like having an editor built in."
                />
                <AnimatedFAQItem
                  question="What about Wispr Flow?"
                  answer="We benchmarked against Wispr Flow extensively. VoiceType is faster, offers more free words (5,000/week vs 2,000), and includes audio file upload - a feature Wispr doesn't have."
                />
                <AnimatedFAQItem
                  question="Does it work in every app?"
                  answer="Yes. Any text field on your computer. Email clients, Slack, Notion, VS Code, Google Docs, your terminal. If you can type there, you can dictate there."
                />
                <AnimatedFAQItem
                  question="What languages do you support?"
                  answer="50+ languages with automatic detection. You can switch languages mid-sentence and the AI figures it out."
                />
                <AnimatedFAQItem
                  question="Is my data private?"
                  answer="Completely. Audio is processed and immediately deleted. We don't store recordings, we don't train on your data, and we never will."
                />
                <AnimatedFAQItem
                  question="What's included in the free tier?"
                  answer="5,000 words per week, audio file upload (up to 5 minutes), full AI editing, all languages. No credit card required."
                />
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                Still have questions?{" "}
                <a href="mailto:hello@wedohype.com" className="font-medium" style={{ color: '#0E2E28' }}>
                  Reach out to us
                </a>
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Footer CTA */}
        <section id="download" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8" style={{ backgroundColor: '#0E2E28' }}>
                <div className="text-center md:text-left">
                  <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#CDFA8A' }}>Ready to stop typing?</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Join Thousands of Creators Who Ditched Their Keyboards
                  </h2>
                  <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Download VoiceType free. 5,000 words per week, no credit card required.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
                  <a
                    href="#"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
                    style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
                  >
                    {platform === 'windows' ? 'Download for Windows' : 'Download for Mac'}
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8" style={{ borderTopWidth: '1px', borderColor: '#E5E9EB' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
              {/* Logo & Tagline */}
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Image src="/logo.svg" alt="VoiceType" width={32} height={32} />
                  <span className="text-xl font-semibold" style={{ color: '#0E2E28' }}>VoiceType</span>
                </Link>
                <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  AI voice dictation for people who have things to say.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Product</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li><a href="#features" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Features</a></li>
                  <li><Link href="/pricing" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Pricing</Link></li>
                  <li><a href="#download" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Download</a></li>
                  <li><Link href="/changelog" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Changelog</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Company</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/about" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>About</Link></li>
                  <li><Link href="/contact" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Contact</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Support</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li><Link href="/help" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Help Center</Link></li>
                  <li><Link href="/privacy" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Privacy</Link></li>
                  <li><Link href="/terms" className="transition-colors text-sm sm:text-base" style={{ color: '#6E7C87' }}>Terms</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 sm:pt-8 text-center text-sm" style={{ borderTopWidth: '1px', borderColor: '#E5E9EB', color: '#6E7C87' }}>
              <p>&copy; 2026 VoiceType. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageLoader>
  );
}
