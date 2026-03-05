import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0E2E28' }}>
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
              Last updated: March 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Acceptance of Terms
              </h2>
              <p className="leading-relaxed" style={{ color: '#6E7C87' }}>
                By accessing or using VoiceType, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using or accessing this service. The materials and services provided by
                VoiceType are protected by applicable copyright and trademark law.
              </p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Description of Service
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                VoiceType is AI-powered voice dictation software that converts spoken words into written
                text. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: '#6E7C87' }}>
                <li>Real-time voice-to-text dictation across applications</li>
                <li>AI-powered text cleanup and formatting</li>
                <li>Audio file upload and transcription</li>
                <li>Multi-language support with automatic detection</li>
                <li>Personal dictionary and customization features</li>
              </ul>
              <p className="leading-relaxed mt-4" style={{ color: '#6E7C87' }}>
                We reserve the right to modify, suspend, or discontinue any aspect of the service at any
                time without prior notice.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                User Accounts
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                When you create an account with VoiceType, you must provide accurate and complete
                information. You are responsible for:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    <strong style={{ color: '#0E2E28' }}>Account Security:</strong> Maintaining the
                    confidentiality of your account credentials and restricting access to your account.
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    <strong style={{ color: '#0E2E28' }}>Account Activity:</strong> All activities that
                    occur under your account, whether or not you authorized them.
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(205,250,138,0.15)' }}>
                  <p className="text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                    <strong style={{ color: '#0E2E28' }}>Notification:</strong> Immediately notifying us
                    of any unauthorized use of your account or any other security breach.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Acceptable Use
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                You agree to use VoiceType only for lawful purposes and in accordance with these Terms.
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2" style={{ color: '#6E7C87' }}>
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Reverse engineer, decompile, or disassemble the software</li>
                <li>Share your account credentials with others</li>
                <li>Use the service to infringe on intellectual property rights</li>
                <li>Exceed usage limits or abuse free tier allocations</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Intellectual Property
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                The VoiceType service, including its original content, features, and functionality, is
                owned by VoiceType and is protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0E2E28' }}>
                <p className="text-white leading-relaxed">
                  <strong>Your Content:</strong> You retain ownership of all text and content you create
                  using VoiceType. We do not claim any intellectual property rights over the output
                  generated from your dictation.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Limitation of Liability
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                To the maximum extent permitted by applicable law, VoiceType and its affiliates, officers,
                directors, employees, and agents shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4" style={{ color: '#6E7C87' }}>
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from unauthorized access to your account or data</li>
                <li>Errors, mistakes, or inaccuracies in transcription output</li>
                <li>Service interruptions or unavailability</li>
              </ul>
              <p className="leading-relaxed" style={{ color: '#6E7C87' }}>
                Our total liability for any claims arising from your use of the service shall not exceed
                the amount you paid us in the twelve months preceding the claim.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Termination
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                We may terminate or suspend your account and access to the service immediately, without
                prior notice or liability, for any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4" style={{ color: '#6E7C87' }}>
                <li>Breach of these Terms of Service</li>
                <li>Violation of applicable laws or regulations</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Non-payment of applicable fees</li>
              </ul>
              <p className="leading-relaxed" style={{ color: '#6E7C87' }}>
                You may terminate your account at any time by contacting us or using the account
                deletion feature in the application. Upon termination, your right to use the service
                will immediately cease.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Changes to Terms
              </h2>
              <p className="leading-relaxed" style={{ color: '#6E7C87' }}>
                We reserve the right to modify or replace these Terms at any time at our sole discretion.
                If a revision is material, we will provide at least 30 days notice prior to any new terms
                taking effect. What constitutes a material change will be determined at our sole
                discretion. By continuing to access or use our service after any revisions become
                effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: '#0E2E28' }}>
                Contact Us
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#6E7C87' }}>
                If you have any questions about these Terms of Service, please contact us:
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
