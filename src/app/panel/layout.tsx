import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Panel", template: "%s · 71Labs Panel" },
  robots: { index: false, follow: false },
};

export default function PanelRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white text-neutral-900">{children}</div>;
}
