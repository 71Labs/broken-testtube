"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../actions";
import { initials, type Profile } from "@/lib/panel/types";
import { cn } from "@/lib/utils";
import {
  Briefcase01Icon,
  FolderLibraryIcon,
  Home03Icon,
  Icon,
  Logout01Icon,
  Structure01Icon,
  Task01Icon,
  UserCircleIcon,
  UserGroup03Icon,
  type HugeIcon,
} from "./ui/icons";

const NAV: { href: string; label: string; icon: HugeIcon }[] = [
  { href: "/panel", label: "Overview", icon: Home03Icon },
  { href: "/panel/tasks", label: "Tasks", icon: Task01Icon },
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
        <Link href="/panel" className="font-wordmark text-base tracking-tight text-ink">
          71labs
        </Link>
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[10px] font-medium text-white">
            {initials(profile.full_name)}
          </span>
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
