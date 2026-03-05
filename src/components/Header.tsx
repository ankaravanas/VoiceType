"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
            <Link href="/#features" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>Features</Link>
            <Link href="/#how-it-works" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>How It Works</Link>
            <Link href="/pricing" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>Pricing</Link>
            <Link href="/help" className="transition-colors" style={{ color: '#6E7C87' }} onMouseOver={(e) => e.currentTarget.style.color = '#0E2E28'} onMouseOut={(e) => e.currentTarget.style.color = '#6E7C87'}>Help</Link>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/#download"
            className="hidden sm:flex text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2"
            style={{ backgroundColor: '#0E2E28' }}
          >
            Download Free
            <ArrowRightIcon />
          </Link>

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
            <Link href="/#features" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="/#how-it-works" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link href="/pricing" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/help" className="block py-2" style={{ color: '#6E7C87' }} onClick={() => setMobileMenuOpen(false)}>Help</Link>
            <Link
              href="/#download"
              className="block w-full text-white px-5 py-3 rounded-full text-center font-medium mt-4"
              style={{ backgroundColor: '#0E2E28' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Download Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
