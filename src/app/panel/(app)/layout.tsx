import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getMyProfile } from "@/lib/panel/data";
import { SetupNotice } from "../_components/setup-notice";
import { Sidebar } from "../_components/sidebar";
import { MobileNav } from "../_components/mobile-nav";

export default async function PanelAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) return <SetupNotice />;

  const profile = await getMyProfile();
  if (!profile) redirect("/panel/login");

  return (
    <div className="min-h-screen">
      <Sidebar profile={profile} />
      <MobileNav profile={profile} />
      <main className="lg:pl-60">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
