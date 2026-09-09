import { Hero } from "@/components/site/hero";
import { Recognition } from "@/components/site/recognition";
import { ProductsIntro } from "@/components/site/products-intro";
import { Talise } from "@/components/site/talise";
import { VideoBlock } from "@/components/site/video-block";
import { Maren } from "@/components/site/maren";
import { Capabilities } from "@/components/site/capabilities";
import { ContactCTA } from "@/components/site/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Recognition />
      <ProductsIntro />
      <Talise />
      <VideoBlock />
      <Maren />
      <Capabilities />
      <ContactCTA />
    </>
  );
}
