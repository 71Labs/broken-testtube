import type { Metadata } from "next";
import {
  Urbanist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const sans = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Wordmark face. Stand-in for "Kangge" (drop the licensed Kangge file in and
// it takes over via the `.font-wordmark` stack in globals.css).
const wordmark = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
    default: "71Labs · A product studio and research lab",
    template: "%s · 71Labs",
  },
  description:
    "71Labs is an independent product studio building at the frontier. Consumer payments with Talise, and AI image & video with Utsuro.",
  keywords: [
    "71Labs",
    "product studio",
    "Talise",
    "Utsuro",
    "AI video",
    "stablecoin payments",
  ],
  openGraph: {
    title: "71Labs · A product studio and research lab",
    description:
      "An independent product studio building Talise (payments) and Utsuro (AI image & video).",
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
      className={`${sans.variable} ${wordmark.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
