"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "../actions";
import { initials, type Profile } from "@/lib/panel/types";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/panel", label: "Overview", d: "M4 11l8-6 8 6M6 10v9h12v-9" },
  { href: "/panel/tasks", label: "Tasks", d: "M4 7h16M4 12h16M4 17h10" },
  { href: "/panel/projects", label: "Projects", d: "M4 6h6v6H4zM14 6h6v12h-6zM4 15h6v3H4z" },
  { href: "/panel/team", label: "Team", d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0-2-5M21 20a6 6 0 0 0-4-5.6" },
  { href: "/panel/org", label: "Organization", d: "M9 4h6v3H9zM4 17h5v3H4zM15 17h5v3h-5zM12 7v4M6.5 17v-3h11v3" },
  { href: "/panel/profile", label: "Profile", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0" },
];

export function Sidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-neutral-200 bg-white p-4 lg:flex">
      <Link href="/panel" className="px-2 font-wordmark text-lg font-medium tracking-tight text-neutral-950">
        71labs
      </Link>
      <p className="mt-1 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
        Company panel
      </p>

      <nav className="mt-6 flex flex-col gap-0.5">
        {NAV.map((n) => {
          const active = n.href === "/panel" ? pathname === "/panel" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors",
                active
                  ? "bg-neutral-100 font-medium text-neutral-950"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950",
              )}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d={n.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-neutral-200 pt-3">
        <div className="flex items-center gap-2.5 px-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-medium text-white">
            {initials(profile.full_name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-neutral-900">{profile.full_name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
              {profile.role}
            </p>
          </div>
        </div>
        <form action={signOut}>
          <button className="mt-3 w-full rounded-lg border border-neutral-200 py-2 text-xs text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-950">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
