"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Icons
const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="#6E7C87" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form doesn't actually submit - just styled
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F9F8' }}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-medium mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Contact Us</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#0E2E28', lineHeight: '1.1' }}>
              Let&apos;s Talk
            </h1>
            <p className="text-lg sm:text-xl" style={{ color: '#6E7C87' }}>
              Have a question, feedback, or want to explore a partnership? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                  <MailIcon />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#0E2E28' }}>Email Us</h3>
                <p className="text-sm sm:text-base mb-4" style={{ color: '#6E7C87' }}>
                  For any inquiries, reach out directly to our team.
                </p>
                <a
                  href="mailto:hello@wedohype.com"
                  className="text-base sm:text-lg font-medium transition-opacity hover:opacity-80"
                  style={{ color: '#0E2E28' }}
                >
                  hello@wedohype.com
                </a>
              </div>

              {/* Response Time Card */}
              <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8" style={{ backgroundColor: '#0E2E28' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}>
                  <ClockIcon />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Response Time</h3>
                <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  We typically respond within <span className="text-white font-medium">24-48 hours</span>. For urgent support issues, Pro and Agency users receive priority responses.
                </p>
              </div>

              {/* Quick Links */}
              <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8" style={{ backgroundColor: 'rgba(205,250,138,0.2)', borderWidth: '1px', borderColor: 'rgba(205,250,138,0.4)' }}>
                <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: '#0E2E28' }}>Quick Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/help" className="text-sm sm:text-base font-medium transition-opacity hover:opacity-80" style={{ color: '#0E2E28' }}>
                      Help Center &rarr;
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-sm sm:text-base font-medium transition-opacity hover:opacity-80" style={{ color: '#0E2E28' }}>
                      Pricing &rarr;
                    </a>
                  </li>
                  <li>
                    <a href="/#download" className="text-sm sm:text-base font-medium transition-opacity hover:opacity-80" style={{ color: '#0E2E28' }}>
                      Download VoiceType &rarr;
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10" style={{ borderWidth: '1px', borderColor: '#E5E9EB' }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0E2E28' }}>Send us a message</h2>
                <p className="text-sm sm:text-base mb-8" style={{ color: '#6E7C87' }}>
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#0E2E28' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-sm sm:text-base transition-colors focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: '#F4F9F8',
                        borderWidth: '1px',
                        borderColor: '#E5E9EB',
                        color: '#0E2E28',
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#0E2E28' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm sm:text-base transition-colors focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: '#F4F9F8',
                        borderWidth: '1px',
                        borderColor: '#E5E9EB',
                        color: '#0E2E28',
                      }}
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: '#0E2E28' }}>
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm sm:text-base appearance-none transition-colors focus:outline-none focus:ring-2 cursor-pointer"
                        style={{
                          backgroundColor: '#F4F9F8',
                          borderWidth: '1px',
                          borderColor: '#E5E9EB',
                          color: formData.subject ? '#0E2E28' : '#6E7C87',
                        }}
                      >
                        <option value="" disabled>Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                      <ChevronDownIcon />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#0E2E28' }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 resize-none"
                      style={{
                        backgroundColor: '#F4F9F8',
                        borderWidth: '1px',
                        borderColor: '#E5E9EB',
                        color: '#0E2E28',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold transition-all hover:opacity-90 text-sm sm:text-base"
                    style={{ backgroundColor: '#0E2E28', color: 'white' }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base" style={{ color: '#0E2E28' }}>Common Questions</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0E2E28' }}>
            Looking for quick answers?
          </h2>
          <p className="text-base sm:text-lg mb-8" style={{ color: '#6E7C87' }}>
            Check out our FAQ section or Help Center for instant answers to common questions about VoiceType.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#faq"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
              style={{ borderWidth: '1px', borderColor: '#E5E9EB', color: '#0E2E28' }}
            >
              View FAQ
            </a>
            <a
              href="/help"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
              style={{ backgroundColor: '#CDFA8A', color: '#0E2E28' }}
            >
              Browse Help Center
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
