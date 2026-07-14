import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Elegant serif used only for the Talise brand-tagline accent.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://71labs.xyz"),
  title: {
    default: "71Labs — A product studio and research lab",
    template: "%s · 71Labs",
  },
  description:
    "71Labs designs, builds, and ships software at the frontier — developer infrastructure, AI systems, and consumer tools that bring hard technology to everyday life.",
  keywords: [
    "71Labs",
    "product studio",
    "research lab",
    "developer tools",
    "AI infrastructure",
  ],
  openGraph: {
    title: "71Labs — A product studio and research lab",
    description:
      "We design, build, and ship software at the frontier. Currently building Talise — money that moves freely, like messages.",
    url: "https://71labs.xyz",
    siteName: "71Labs",
    type: "website",
    images: [{ url: "/talise/og.png", width: 3780, height: 1890, alt: "Talise — money that moves freely, like messages." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "71Labs",
    description:
      "A product studio and research lab. Currently building Talise.",
    images: ["/talise/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:text-white">
        {children}
      </body>
    </html>
  );
}
