import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type {
  Activity, Department, Job, Lead, Product, Profile, Project, Research, Task,
} from "./types";

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
      "*, project:projects(name,slug,color), assignee:profiles!tasks_assignee_id_fkey(id,full_name,avatar_gradient)",
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
    .select("*, department:departments!profiles_department_id_fkey(name,slug,color)")
    .order("full_name");
  const team = (data as Profile[]) ?? [];
  // Resolve the reporting line (manager) in JS rather than via a self-referential
  // embed — PostgREST's schema cache is unreliable for profiles→profiles FKs.
  const nameById = new Map(team.map((p) => [p.id, p.full_name]));
  for (const p of team) {
    p.manager = p.manager_id
      ? { id: p.manager_id, full_name: nameById.get(p.manager_id) ?? "—" }
      : null;
  }
  return team;
}

export async function getDepartments(): Promise<Department[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("departments")
    .select("*, lead:profiles!departments_lead_id_fkey(id,full_name)")
    .order("created_at");
  return (data as Department[]) ?? [];
}

const JOB_SELECT =
  "*, department:departments!jobs_department_id_fkey(name,slug,color)";

/** All jobs (admins see every status via RLS; workers see open only). */
export async function getJobs(): Promise<Job[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .order("created_at", { ascending: false });
  return (data as Job[]) ?? [];
}

/** Public: open roles for the marketing /careers page (RLS allows anon). */
export async function getOpenJobs(): Promise<Job[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("status", "open")
    .order("created_at", { ascending: false });
  return (data as Job[]) ?? [];
}

/** Public: a single open role by slug. */
export async function getOpenJob(slug: string): Promise<Job | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("slug", slug)
    .eq("status", "open")
    .maybeSingle();
  return (data as Job) ?? null;
}

export async function getProductPipeline(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, owner:profiles!products_owner_id_fkey(id,full_name)")
    .order("created_at", { ascending: false });
  return (data as Product[]) ?? [];
}

export async function getResearch(): Promise<Research[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("research")
    .select("*, owner:profiles!research_owner_id_fkey(id,full_name)")
    .order("created_at", { ascending: false });
  return (data as Research[]) ?? [];
}

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("*, owner:profiles!leads_owner_id_fkey(id,full_name)")
    .order("created_at", { ascending: false });
  return (data as Lead[]) ?? [];
}

export async function getActivity(limit = 12): Promise<Activity[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("activity")
    .select("*, actor:profiles!activity_actor_id_fkey(id,full_name,avatar_gradient)")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Activity[]) ?? [];
}
