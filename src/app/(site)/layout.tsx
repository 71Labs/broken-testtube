import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { AnnouncementBar } from "@/components/site/announcement-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <AnnouncementBar />
    </>
  );
}
