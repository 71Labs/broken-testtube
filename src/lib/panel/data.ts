import { createClient } from "@/lib/supabase/server";
import type { Activity, Department, Profile, Project, Task } from "./types";

export async function getMyProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return (data as Profile) ?? null;
}

export async function getTasks(): Promise<Task[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tasks")
    .select(
      "*, project:projects(name,slug,color), assignee:profiles!tasks_assignee_id_fkey(full_name)",
    )
    .order("created_at", { ascending: false });
  return (data as Task[]) ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").order("created_at");
  return (data as Project[]) ?? [];
}

export async function getTeam(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select(
      "*, department:departments(name,slug,color), manager:profiles!profiles_manager_id_fkey(id,full_name)",
    )
    .order("full_name");
  return (data as Profile[]) ?? [];
}

export async function getDepartments(): Promise<Department[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("departments")
    .select("*, lead:profiles!departments_lead_id_fkey(id,full_name)")
    .order("created_at");
  return (data as Department[]) ?? [];
}

export async function getActivity(limit = 12): Promise<Activity[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("activity")
    .select("*, actor:profiles!activity_actor_id_fkey(full_name)")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Activity[]) ?? [];
}
