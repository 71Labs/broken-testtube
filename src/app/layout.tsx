import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      "We design, build, and ship software at the frontier — from developer infrastructure to AI systems.",
    url: "https://71labs.xyz",
    siteName: "71Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "71Labs",
    description:
      "A product studio and research lab building software at the frontier.",
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
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:text-white">
        {children}
      </body>
    </html>
  );
}
