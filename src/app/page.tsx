import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Products } from "@/components/site/products";
import { Talise } from "@/components/site/talise";
import { Features } from "@/components/site/features";
import { Gallery } from "@/components/site/gallery";
import { Utsuro } from "@/components/site/utsuro";
import { Capabilities } from "@/components/site/capabilities";
import { ContactCTA } from "@/components/site/contact-cta";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Products />
        <Talise />
        <Features />
        <Gallery />
        <Utsuro />
        <Capabilities />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
