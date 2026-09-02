"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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

export function Sidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-hairline bg-white p-4 lg:flex">
      <Link
        href="/panel"
        className="px-2 font-wordmark text-lg tracking-tight text-ink"
      >
        71labs
      </Link>
      <p className="mt-1 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-grey-2">
        Company panel
      </p>

      <nav className="mt-7 flex flex-col gap-0.5">
        {NAV.map((n) => {
          const active =
            n.href === "/panel"
              ? pathname === "/panel"
              : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] outline-none",
                "transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ink/10",
                active
                  ? "bg-secondary font-medium text-ink"
                  : "text-grey hover:bg-secondary/60 hover:text-ink",
              )}
            >
              {active && (
                <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-yellow" />
              )}
              <Icon
                icon={n.icon}
                size={18}
                strokeWidth={active ? 2 : 1.5}
                className="shrink-0"
              />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-hairline pt-3">
        <div className="flex items-center gap-2.5 px-1">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-medium text-white">
            {initials(profile.full_name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ink">
              {profile.full_name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-grey-2">
              {profile.role}
            </p>
          </div>
        </div>
        <form action={signOut}>
          <button
            className={cn(
              "mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs text-grey outline-none",
              "transition-colors duration-150 hover:border-ink/20 hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/10",
            )}
          >
            <Icon icon={Logout01Icon} size={15} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
