import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

// Neue Montreal: the default workhorse (nav, UI, subtext, supporting copy).
const neue = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/neue-montreal/NeueMontreal-BoldItalic.otf", weight: "700", style: "italic" },
  ],
});

// SF Pro Rounded: leading + main texts (headlines, lead copy, wordmark).
const rounded = localFont({
  variable: "--font-rounded",
  display: "swap",
  src: [
    { path: "../../public/fonts/sf-pro-rounded/SF-Pro-Rounded-Regular.otf", weight: "400", style: "normal" },
  ],
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
      className={`${neue.variable} ${rounded.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
