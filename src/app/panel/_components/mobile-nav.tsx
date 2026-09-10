"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../actions";
import { type Profile } from "@/lib/panel/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { GradientAvatar } from "./ui/avatar";
import {
  Briefcase01Icon,
  BubbleChatIcon,
  FolderLibraryIcon,
  Home03Icon,
  Icon,
  Logout01Icon,
  Rocket01Icon,
  Structure01Icon,
  Target01Icon,
  Task01Icon,
  TestTube01Icon,
  UserCircleIcon,
  UserGroup03Icon,
  type HugeIcon,
} from "./ui/icons";

const NAV: { href: string; label: string; icon: HugeIcon }[] = [
  { href: "/panel", label: "Overview", icon: Home03Icon },
  { href: "/panel/tasks", label: "Tasks", icon: Task01Icon },
  { href: "/panel/messages", label: "Messages", icon: BubbleChatIcon },
  { href: "/panel/products", label: "Products", icon: Rocket01Icon },
  { href: "/panel/research", label: "Research", icon: TestTube01Icon },
  { href: "/panel/leads", label: "Leads", icon: Target01Icon },
  { href: "/panel/projects", label: "Projects", icon: FolderLibraryIcon },
  { href: "/panel/team", label: "Team", icon: UserGroup03Icon },
  { href: "/panel/org", label: "Organization", icon: Structure01Icon },
  { href: "/panel/jobs", label: "Careers", icon: Briefcase01Icon },
  { href: "/panel/profile", label: "Profile", icon: UserCircleIcon },
];

export function MobileNav({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-40 border-b border-hairline bg-white/90 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/panel" aria-label="71Labs panel">
          <Logo variant="black" size={22} />
        </Link>
        <div className="flex items-center gap-3">
          <GradientAvatar
            seed={profile.id}
            gradient={profile.avatar_gradient}
            name={profile.full_name}
            size={28}
          />
          <form action={signOut}>
            <button
              aria-label="Sign out"
              className="grid h-8 w-8 place-items-center rounded-lg text-grey outline-none transition-colors hover:bg-secondary hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10"
            >
              <Icon icon={Logout01Icon} size={16} />
            </button>
          </form>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV.map((n) => {
          const active =
            n.href === "/panel" ? pathname === "/panel" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs outline-none transition-colors",
                active
                  ? "bg-ink font-medium text-white"
                  : "text-grey hover:bg-secondary hover:text-ink",
              )}
            >
              <Icon icon={n.icon} size={15} strokeWidth={active ? 2 : 1.5} />
              {n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
