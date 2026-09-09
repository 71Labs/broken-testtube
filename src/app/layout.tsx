import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

// AREA 17 workhorse type — Inter as the Suisse Intl substitute.
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://71labs.xyz"),
  title: {
    default: "71Labs · A product studio and research lab",
    template: "%s · 71Labs",
  },
  description:
    "71Labs is an independent product studio building at the frontier. Consumer payments with Talise, and Bitcoin-backed dollars with Maren.",
  keywords: [
    "71Labs",
    "product studio",
    "Talise",
    "Maren",
    "Bitcoin-backed dollars",
    "stablecoin payments",
  ],
  openGraph: {
    title: "71Labs · A product studio and research lab",
    description:
      "An independent product studio building Talise (payments) and Maren (Bitcoin-backed dollars).",
    url: "https://71labs.xyz",
    siteName: "71Labs",
    type: "website",
    images: [{ url: "/talise/og.png", width: 3780, height: 1890, alt: "Talise. Money that moves freely, like messages." }],
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
      className={`${sans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
