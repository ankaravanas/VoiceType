"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="#CDFA8A" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CheckIconDark = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="#0E2E28" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="#9AA6AC" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottomWidth: '1px', borderColor: '#E5E9EB' }}>
      <button
        className="w-full py-4 sm:py-5 flex items-center justify-between text-left gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base sm:text-lg font-medium" style={{ color: '#0E2E28' }}>{question}</span>
        <span className="flex-shrink-0" style={{ color: '#6E7C87' }}>
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 sm:pb-5">
          <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#6E7C87' }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
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

  // Feature comparison data
  const features = [
    { name: "Voice dictation", free: true, pro: true, agency: true },
    { name: "AI cleanup", free: true, pro: true, agency: true },
    { name: "Words per week", free: "5,000", pro: "Unlimited", agency: "Unlimited" },
    { name: "Audio upload limit", free: "5 min", pro: "30 min", agency: "60 min" },
    { name: "Languages supported", free: "50+", pro: "50+", agency: "50+" },
    { name: "Custom vocabulary", free: false, pro: true, agency: true },
    { name: "Team members", free: "1", pro: "1", agency: "10" },
    { name: "Priority processing", free: false, pro: true, agency: true },
    { name: "Admin dashboard", free: false, pro: false, agency: true },
    { name: "Priority support", free: false, pro: false, agency: true },
    { name: "API access", free: false, pro: false, agency: true },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? <CheckIconDark /> : <XIcon />;
    }
    return <span className="text-sm sm:text-base font-medium" style={{ color: '#0E2E28' }}>{value}</span>;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Simple, Transparent Pricing</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ color: '#0E2E28', lineHeight: '1.1' }}>
            Start Free. Scale When Ready.
          </h1>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto" style={{ color: '#6E7C87' }}>
            No hidden fees. No complicated tiers. Just pick the plan that fits your workflow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
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
      </section>

      {/* Pricing Cards Section */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Free Tier */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
              <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>Free</p>
              <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#0E2E28' }}>$0<span className="text-base sm:text-lg font-normal" style={{ color: '#6E7C87' }}>/month</span></p>
              <p className="text-sm mb-6" style={{ color: '#6E7C87' }}>Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  5,000 words/week
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  Audio upload (5 min max)
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  AI editing & formatting
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  50+ languages
                </li>
              </ul>
              <Link href="/#download" className="block w-full py-3 text-center rounded-full font-medium transition-all hover:shadow-md text-sm sm:text-base" style={{ borderWidth: '1px', borderColor: '#E5E9EB', color: '#0E2E28' }}>
                Download Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative sm:col-span-2 lg:col-span-1 shadow-lg" style={{ backgroundColor: '#0E2E28' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                Most Popular
              </div>
              <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>Pro</p>
              <p className="text-3xl sm:text-4xl font-bold mb-2">
                ${billingPeriod === 'monthly' ? pricing.pro.monthly : pricing.pro.yearly}
                <span className="text-base sm:text-lg font-normal" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
              </p>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>For power users & creators</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <CheckIcon />
                  Unlimited dictation
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <CheckIcon />
                  Priority processing
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <CheckIcon />
                  30-min audio uploads
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <CheckIcon />
                  Personal dictionary
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <CheckIcon />
                  Email support
                </li>
              </ul>
              <a href="#" className="block w-full py-3 text-center rounded-full font-medium transition-all hover:opacity-90 text-sm sm:text-base" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                Start Pro Trial
              </a>
            </div>

            {/* Agency Tier */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
              <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: '#6E7C87' }}>Agency</p>
              <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#0E2E28' }}>
                ${billingPeriod === 'monthly' ? pricing.agency.monthly : pricing.agency.yearly}
                <span className="text-base sm:text-lg font-normal" style={{ color: '#6E7C87' }}>
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
              </p>
              <p className="text-sm mb-6" style={{ color: '#6E7C87' }}>For teams & agencies</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  Up to 10 team members
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  Team admin dashboard
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  60-min audio files
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
                  <CheckIcon />
                  Priority support
                </li>
              </ul>
              <a href="#" className="block w-full py-3 text-center rounded-full font-medium transition-all hover:shadow-md text-sm sm:text-base" style={{ borderWidth: '1px', borderColor: '#E5E9EB', color: '#0E2E28' }}>
                Start Agency Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Compare Plans</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
              Full Feature Breakdown
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottomWidth: '2px', borderColor: '#E5E9EB' }}>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: '#0E2E28' }}>Feature</th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: '#0E2E28' }}>Free</th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: '#0E2E28' }}>
                    <span className="inline-flex items-center gap-2">
                      Pro
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>Popular</span>
                    </span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: '#0E2E28' }}>Agency</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} style={{ borderBottomWidth: '1px', borderColor: '#E5E9EB' }}>
                    <td className="py-4 px-4 text-sm sm:text-base" style={{ color: '#6E7C87' }}>{feature.name}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">{renderFeatureValue(feature.free)}</div>
                    </td>
                    <td className="py-4 px-4 text-center" style={{ backgroundColor: 'rgba(205,250,138,0.1)' }}>
                      <div className="flex justify-center">{renderFeatureValue(feature.pro)}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">{renderFeatureValue(feature.agency)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Feature Cards */}
          <div className="md:hidden space-y-6">
            {/* Free Plan Features */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#F4F9F8', borderWidth: '1px', borderColor: '#E5E9EB' }}>
              <h3 className="font-semibold text-lg mb-4" style={{ color: '#0E2E28' }}>Free</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between text-sm" style={{ color: '#6E7C87' }}>
                    <span>{feature.name}</span>
                    <span className="flex items-center">{renderFeatureValue(feature.free)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan Features */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0E2E28' }}>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-lg text-white">Pro</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>Popular</span>
              </div>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <span>{feature.name}</span>
                    <span className="flex items-center">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? <CheckIcon /> : <XIcon />
                      ) : (
                        <span className="font-medium text-white">{feature.pro}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agency Plan Features */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#F4F9F8', borderWidth: '1px', borderColor: '#E5E9EB' }}>
              <h3 className="font-semibold text-lg mb-4" style={{ color: '#0E2E28' }}>Agency</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between text-sm" style={{ color: '#6E7C87' }}>
                    <span>{feature.name}</span>
                    <span className="flex items-center">{renderFeatureValue(feature.agency)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Pricing FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: '#0E2E28' }}>
              Common Questions
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
            <FAQItem
              question="Can I try VoiceType before paying?"
              answer="Absolutely! Our Free plan gives you 5,000 words per week with full AI editing capabilities. No credit card required. Use it as long as you want before deciding to upgrade."
            />
            <FAQItem
              question="What happens if I exceed my weekly word limit?"
              answer="On the Free plan, you'll need to wait until the next week resets or upgrade to Pro for unlimited dictation. We'll notify you when you're approaching your limit."
            />
            <FAQItem
              question="Can I cancel my subscription anytime?"
              answer="Yes, you can cancel at any time. If you cancel, you'll retain access to your paid features until the end of your billing period, then revert to the Free plan."
            />
            <FAQItem
              question="Is there a discount for annual billing?"
              answer="Yes! When you choose yearly billing, you get 2 months free. That's $100/year for Pro (instead of $120) and $150/year for Agency (instead of $180)."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through Stripe."
            />
            <FAQItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 14-day money-back guarantee on all paid plans. If VoiceType isn't right for you, contact us within 14 days of your purchase for a full refund."
            />
            <FAQItem
              question="What's included in priority support?"
              answer="Agency plan users get priority email support with guaranteed response within 4 business hours, plus access to our dedicated support Slack channel for real-time assistance."
            />
            <FAQItem
              question="Can I add more team members to the Agency plan?"
              answer="The Agency plan includes up to 10 team members. Need more? Contact us for custom enterprise pricing tailored to larger teams."
            />
          </div>

          <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base" style={{ color: '#6E7C87' }}>
            Still have questions?{" "}
            <Link href="/contact" className="font-medium" style={{ color: '#0E2E28' }}>
              Reach out to us
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8" style={{ backgroundColor: '#0E2E28' }}>
            <div className="text-center md:text-left">
              <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#CDFA8A' }}>Ready to get started?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Download VoiceType Free Today
              </h2>
              <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                5,000 words per week. No credit card required. Upgrade anytime.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
              <Link
                href="/#download"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
                style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
              >
                Download Free
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
