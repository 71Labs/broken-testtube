import { isSupabaseConfigured } from "@/lib/supabase/config";
import { SetupNotice } from "../_components/setup-notice";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  if (!isSupabaseConfigured) return <SetupNotice />;
  return <LoginForm />;
}
