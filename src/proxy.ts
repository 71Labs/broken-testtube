import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

// Only guard the panel; the marketing site is untouched.
export const config = {
  matcher: ["/panel/:path*"],
};
