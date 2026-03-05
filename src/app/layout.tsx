import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#84cc16",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://voicetype.app"),
  title: {
    default: "VoiceType - AI Voice Dictation for Mac",
    template: "%s | VoiceType",
  },
  description:
    "The fastest way to turn your voice into text. Dictate anywhere on your Mac. AI cleans up your words instantly. 3X faster than typing.",
  keywords: [
    "voice dictation",
    "speech to text",
    "AI transcription",
    "Mac app",
    "productivity",
    "dictation software",
    "voice typing",
    "audio transcription",
    "voice to text",
    "Mac dictation",
  ],
  authors: [{ name: "VoiceType" }],
  creator: "VoiceType",
  publisher: "VoiceType",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://voicetype.app",
    siteName: "VoiceType",
    title: "VoiceType - AI Voice Dictation for Mac",
    description:
      "Stop typing. Start speaking. Get more done. The fastest AI voice dictation app for Mac with audio file upload.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoiceType - AI Voice Dictation for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceType - AI Voice Dictation for Mac",
    description:
      "Stop typing. Start speaking. Get more done. 3X faster than typing with AI-powered cleanup.",
    images: ["/og-image.png"],
    creator: "@voicetypeapp",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://voicetype.app",
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${archivo.variable} ${interTight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
