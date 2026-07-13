import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Products } from "@/components/site/products";
import { Cortex } from "@/components/site/cortex";
import { Capabilities } from "@/components/site/capabilities";
import { BackedBy } from "@/components/site/backed-by";
import { ContactCTA } from "@/components/site/contact-cta";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Products />
        <Cortex />
        <Capabilities />
        <BackedBy />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
