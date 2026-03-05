import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 32, showText = true, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="VoiceType"
        width={size}
        height={size}
        className="flex-shrink-0"
      />
      {showText && (
        <span className="text-xl font-semibold" style={{ color: '#0E2E28' }}>
          VoiceType
        </span>
      )}
    </Link>
  );
}

// Inline SVG version for cases where we need the raw SVG
export function LogoIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
    >
      <g id="background">
        <circle cx="256" cy="256" r="240" fill="#0E2E28"/>
      </g>
      <g id="soundwave-to-cursor">
        <rect x="68" y="216" width="28" height="80" rx="14" fill="#CDFA8A"/>
        <rect x="108" y="166" width="28" height="180" rx="14" fill="#CDFA8A"/>
        <rect x="148" y="106" width="28" height="300" rx="14" fill="#CDFA8A"/>
        <rect x="188" y="146" width="28" height="220" rx="14" fill="#CDFA8A"/>
        <g id="cursor">
          <rect x="250" y="106" width="28" height="300" rx="6" fill="#CDFA8A"/>
          <rect x="218" y="106" width="92" height="24" rx="6" fill="#CDFA8A"/>
          <rect x="218" y="382" width="92" height="24" rx="6" fill="#CDFA8A"/>
        </g>
        <rect x="344" y="166" width="26" height="180" rx="13" fill="#CDFA8A"/>
        <rect x="384" y="206" width="24" height="100" rx="12" fill="#CDFA8A"/>
        <rect x="420" y="236" width="22" height="40" rx="11" fill="#CDFA8A"/>
      </g>
    </svg>
  );
}
