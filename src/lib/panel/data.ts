import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type {
  Activity, ChatUser, Conversation, Department, Job, Lead, Product, Profile, Project, Research, Task,
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

export async function getConversations(): Promise<Conversation[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: mems } = await supabase
    .from("conversation_members")
    .select("conversation_id,last_read_at")
    .eq("profile_id", user.id);
  const rows = (mems ?? []) as { conversation_id: string; last_read_at: string }[];
  const ids = rows.map((m) => m.conversation_id);
  if (!ids.length) return [];
  const lastRead: Record<string, string> = {};
  rows.forEach((m) => (lastRead[m.conversation_id] = m.last_read_at));

  const { data: convs } = await supabase
    .from("conversations")
    .select(
      "id,title,is_group,created_by,created_at,last_message_at, members:conversation_members(profile:profiles!conversation_members_profile_id_fkey(id,full_name,avatar_gradient))",
    )
    .in("id", ids)
    .order("last_message_at", { ascending: false });

  const { data: msgs } = await supabase
    .from("messages")
    .select("conversation_id,body,created_at,sender_id")
    .in("conversation_id", ids)
    .order("created_at", { ascending: false });

  const byConv: Record<string, { body: string; created_at: string; sender_id: string | null }[]> = {};
  ((msgs ?? []) as { conversation_id: string; body: string; created_at: string; sender_id: string | null }[]).forEach(
    (m) => (byConv[m.conversation_id] ??= []).push(m),
  );

  return ((convs ?? []) as unknown as {
    id: string; title: string | null; is_group: boolean; created_by: string | null;
    created_at: string; last_message_at: string;
    members: { profile: ChatUser | null }[];
  }[]).map((c) => {
    const list = byConv[c.id] ?? [];
    const lr = lastRead[c.id];
    const unread = list.filter((m) => m.sender_id !== user.id && (!lr || m.created_at > lr)).length;
    return {
      id: c.id,
      title: c.title,
      is_group: c.is_group,
      created_by: c.created_by,
      created_at: c.created_at,
      last_message_at: c.last_message_at,
      members: (c.members ?? []).map((m) => m.profile).filter((p): p is ChatUser => !!p),
      lastMessage: list[0] ?? null,
      unread,
    };
  });
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
