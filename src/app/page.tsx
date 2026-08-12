import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Talise } from "@/components/site/talise";
import { Features } from "@/components/site/features";
import { Gallery } from "@/components/site/gallery";
import { Dashboard } from "@/components/site/dashboard";
import { Capabilities } from "@/components/site/capabilities";
import { ContactCTA } from "@/components/site/contact-cta";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Talise />
        <Features />
        <Gallery />
        <Dashboard />
        <Capabilities />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
