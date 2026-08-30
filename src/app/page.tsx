import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Recognition } from "@/components/site/recognition";
import { ProductsIntro } from "@/components/site/products-intro";
import { Talise } from "@/components/site/talise";
import { VideoBlock } from "@/components/site/video-block";
import { Utsuro } from "@/components/site/utsuro";
import { Capabilities } from "@/components/site/capabilities";
import { ContactCTA } from "@/components/site/contact-cta";
import { SiteFooter } from "@/components/site/footer";
import { AnnouncementBar } from "@/components/site/announcement-bar";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Recognition />
        <ProductsIntro />
        <Talise />
        <VideoBlock />
        <Utsuro />
        <Capabilities />
        <ContactCTA />
      </main>
      <SiteFooter />
      <AnnouncementBar />
    </>
  );
}
