import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ProductsIntro } from "@/components/site/products-intro";
import { Talise } from "@/components/site/talise";
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
        <ProductsIntro />
        <Talise />
        <Utsuro />
        <Capabilities />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
