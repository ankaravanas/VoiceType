import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0E2E28' }}>
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
              Last updated: March 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Introduction */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Introduction
              </h2>
              <p className="leading-relaxed" style={{ color: '#6E7C87' }}>
                At VoiceType, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our voice dictation software
                and related services. Please read this policy carefully to understand our practices
                regarding your personal data.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Information We Collect
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                We collect information to provide and improve our services. The types of information we collect include:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#0E2E28' }}>Account Information</h3>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    When you create an account, we collect your email address, name, and account credentials.
                    If you subscribe to a paid plan, we collect payment information through our secure payment processor.
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#0E2E28' }}>Voice Data</h3>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    When you use our dictation features, your voice is temporarily processed to convert
                    speech to text. This includes both real-time dictation and uploaded audio files.
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#0E2E28' }}>Usage Data</h3>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    We collect information about how you use VoiceType, including word counts, feature usage,
                    application settings, and general interaction patterns. This helps us improve our service.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: '#6E7C87' }}>
                <li>To provide and maintain our voice dictation service</li>
                <li>To process your transactions and manage your subscription</li>
                <li>To send you service-related communications and updates</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze usage patterns and improve our software</li>
                <li>To detect and prevent fraud or abuse of our service</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Voice Data Handling */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Voice Data Handling
              </h2>
              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0E2E28' }}>
                <p className="text-white leading-relaxed mb-4">
                  <strong>Your voice data is processed and immediately deleted.</strong> We do not store
                  your audio recordings or transcripts on our servers after processing is complete.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#CDFA8A' }}></span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <strong className="text-white">No storage:</strong> Voice recordings are processed in real-time
                      and immediately discarded after transcription.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#CDFA8A' }}></span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <strong className="text-white">No training:</strong> Your voice data is never used to train
                      AI models or for any purpose other than providing you with transcription.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#CDFA8A' }}></span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <strong className="text-white">End-to-end processing:</strong> Audio is encrypted in transit
                      and processed securely before being permanently deleted.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Data Security
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                We implement appropriate technical and organizational security measures to protect your
                personal information against unauthorized access, alteration, disclosure, or destruction.
                These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: '#6E7C87' }}>
                <li>Encryption of data in transit using TLS/SSL</li>
                <li>Secure cloud infrastructure with industry-standard protections</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls limiting employee access to personal data</li>
                <li>Secure payment processing through certified payment providers</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Your Rights
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: '#6E7C87' }}>
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
                <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="leading-relaxed mt-4" style={{ color: '#6E7C87' }}>
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Contact Us
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                If you have any questions about this Privacy Policy, our data practices, or would like
                to exercise your privacy rights, please contact us:
              </p>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)', borderWidth: '1px', borderColor: '#E5E9EB' }}>
                <p style={{ color: '#0E2E28' }}>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:hello@wedohype.com"
                    className="underline hover:opacity-80 transition-opacity"
                    style={{ color: '#0E2E28' }}
                  >
                    hello@wedohype.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
