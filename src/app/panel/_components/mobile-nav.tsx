"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../actions";
import { initials, type Profile } from "@/lib/panel/types";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/panel", label: "Overview" },
  { href: "/panel/tasks", label: "Tasks" },
  { href: "/panel/projects", label: "Projects" },
  { href: "/panel/team", label: "Team" },
  { href: "/panel/org", label: "Organization" },
  { href: "/panel/profile", label: "Profile" },
];

export function MobileNav({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/panel" className="font-wordmark text-base font-medium tracking-tight text-neutral-950">
          71labs
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-medium text-white">
            {initials(profile.full_name)}
          </span>
          <form action={signOut}>
            <button className="text-xs text-neutral-500">Sign out</button>
          </form>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV.map((n) => {
          const active = n.href === "/panel" ? pathname === "/panel" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors",
                active ? "bg-neutral-100 font-medium text-neutral-950" : "text-neutral-500",
              )}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
