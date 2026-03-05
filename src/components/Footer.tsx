import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
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
              <li><Link href="/#features" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Features</Link></li>
              <li><Link href="/pricing" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Pricing</Link></li>
              <li><Link href="/#download" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Download</Link></li>
              <li><Link href="/changelog" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Changelog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/about" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>About</Link></li>
              <li><Link href="/contact" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/help" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Help Center</Link></li>
              <li><Link href="/privacy" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Privacy</Link></li>
              <li><Link href="/terms" className="transition-colors text-sm sm:text-base hover:opacity-80" style={{ color: '#6E7C87' }}>Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ borderTopWidth: '1px', borderColor: '#E5E9EB', color: '#6E7C87' }}>
          <p>&copy; 2026 VoiceType. All rights reserved.</p>
          <a href="mailto:hello@wedohype.com" className="hover:opacity-80 transition-opacity">
            hello@wedohype.com
          </a>
        </div>
      </div>
    </footer>
  );
}
