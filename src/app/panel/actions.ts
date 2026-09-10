"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type {
  JobStatus, LeadStage, LeadType, ProductStage, ResearchStage, TaskStatus,
} from "@/lib/panel/types";
import { STATUS_META } from "@/lib/panel/types";

/* --------------------------------- auth ----------------------------------- */

export async function signIn(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect("/panel");
}

export async function signUp(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const full_name = String(formData.get("full_name") ?? "").trim();
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });
  if (error) return { error: error.message };
  redirect("/panel");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/panel/login");
}

/* --------------------------------- helpers -------------------------------- */

async function me() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

async function log(taskId: string, message: string) {
  const { supabase, user } = await me();
  if (!user) return;
  await supabase.from("activity").insert({ actor_id: user.id, task_id: taskId, message });
}

/* --------------------------------- tasks ---------------------------------- */

export async function createTask(_prev: unknown, formData: FormData) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "A title is required." };

  const payload = {
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    project_id: (formData.get("project_id") as string) || null,
    assignee_id: (formData.get("assignee_id") as string) || user.id,
    priority: (formData.get("priority") as string) || "medium",
    due_date: (formData.get("due_date") as string) || null,
    created_by: user.id,
    status: "todo" as TaskStatus,
  };

  const { data, error } = await supabase.from("tasks").insert(payload).select("id").single();
  if (error) return { error: error.message };
  if (data) await log(data.id, `created “${title}”`);

  revalidatePath("/panel", "layout");
  return { ok: true };
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const { supabase } = await me();
  const { error } = await supabase.from("tasks").update({ status }).eq("id", taskId);
  if (!error) {
    await log(taskId, `moved to ${STATUS_META[status].label}`);
    revalidatePath("/panel", "layout");
  }
  return { error: error?.message };
}

export async function assignTask(taskId: string, assigneeId: string | null) {
  const { supabase } = await me();
  const { error } = await supabase.from("tasks").update({ assignee_id: assigneeId }).eq("id", taskId);
  if (!error) {
    await log(taskId, "was reassigned");
    revalidatePath("/panel", "layout");
  }
  return { error: error?.message };
}

export async function deleteTask(taskId: string) {
  const { supabase } = await me();
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

/* ------------------------------- projects --------------------------------- */

export async function createProject(_prev: unknown, formData: FormData) {
  const { supabase } = await me();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required." };
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const color = String(formData.get("color") ?? "#71717a");
  const { error } = await supabase.from("projects").insert({ name, slug, color });
  if (error) return { error: error.message };
  revalidatePath("/panel", "layout");
  return { ok: true };
}

/* --------------------------------- jobs ----------------------------------- */

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createJob(_prev: unknown, formData: FormData) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "A role title is required." };

  let slug = slugify(title);
  const { data: clash } = await supabase.from("jobs").select("id").eq("slug", slug).maybeSingle();
  if (clash) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;

  const payload = {
    title,
    slug,
    department_id: (formData.get("department_id") as string) || null,
    location: String(formData.get("location") ?? "").trim() || "Remote / Global",
    employment_type: String(formData.get("employment_type") ?? "Full-time"),
    description: String(formData.get("description") ?? "").trim(),
    status: (formData.get("status") as JobStatus) || "draft",
  };

  const { error } = await supabase.from("jobs").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/panel", "layout");
  revalidatePath("/careers");
  return { ok: true };
}

export async function setJobStatus(jobId: string, status: JobStatus) {
  const { supabase } = await me();
  const { error } = await supabase.from("jobs").update({ status }).eq("id", jobId);
  if (!error) {
    revalidatePath("/panel", "layout");
    revalidatePath("/careers");
  }
  return { error: error?.message };
}

export async function deleteJob(jobId: string) {
  const { supabase } = await me();
  const { error } = await supabase.from("jobs").delete().eq("id", jobId);
  if (!error) {
    revalidatePath("/panel", "layout");
    revalidatePath("/careers");
  }
  return { error: error?.message };
}

/* ---------------------- products / research / leads ----------------------- */

export async function createProduct(_prev: unknown, formData: FormData) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "A name is required." };
  const { error } = await supabase.from("products").insert({
    name,
    description: String(formData.get("description") ?? "").trim() || null,
    owner_id: (formData.get("owner_id") as string) || null,
    stage: (formData.get("stage") as ProductStage) || "idea",
    roi_note: String(formData.get("roi_note") ?? "").trim() || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/panel", "layout");
  return { ok: true };
}

export async function setProductStage(id: string, stage: ProductStage) {
  const { supabase } = await me();
  const { error } = await supabase.from("products").update({ stage }).eq("id", id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function deleteProduct(id: string) {
  const { supabase } = await me();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function createResearch(_prev: unknown, formData: FormData) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "A research question is required." };
  const { error } = await supabase.from("research").insert({
    title,
    owner_id: (formData.get("owner_id") as string) || null,
    stage: (formData.get("stage") as ResearchStage) || "question",
    notes: String(formData.get("notes") ?? "").trim() || null,
    outcome: String(formData.get("outcome") ?? "").trim() || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/panel", "layout");
  return { ok: true };
}

export async function setResearchStage(id: string, stage: ResearchStage) {
  const { supabase } = await me();
  const { error } = await supabase.from("research").update({ stage }).eq("id", id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function deleteResearch(id: string) {
  const { supabase } = await me();
  const { error } = await supabase.from("research").delete().eq("id", id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function createLead(_prev: unknown, formData: FormData) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "A name is required." };
  const { error } = await supabase.from("leads").insert({
    name,
    type: (formData.get("type") as LeadType) || "client",
    owner_id: (formData.get("owner_id") as string) || null,
    stage: (formData.get("stage") as LeadStage) || "identified",
    value_note: String(formData.get("value_note") ?? "").trim() || null,
    next_action: String(formData.get("next_action") ?? "").trim() || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/panel", "layout");
  return { ok: true };
}

export async function setLeadStage(id: string, stage: LeadStage) {
  const { supabase } = await me();
  const { error } = await supabase.from("leads").update({ stage }).eq("id", id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function deleteLead(id: string) {
  const { supabase } = await me();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

/* -------------------------------- profiles -------------------------------- */

export async function updateProfile(_prev: unknown, formData: FormData) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };
  const full_name = String(formData.get("full_name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim() || null;
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, title })
    .eq("id", user.id);
  if (error) return { error: error.message };
  revalidatePath("/panel", "layout");
  return { ok: true };
}

export async function setAvatarGradient(index: number | null) {
  const { supabase, user } = await me();
  if (!user) return { error: "Not signed in." };
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_gradient: index })
    .eq("id", user.id);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function setRole(profileId: string, role: "admin" | "worker") {
  const { supabase } = await me();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", profileId);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

/* ------------------------------ organization ------------------------------ */

export async function createDepartment(_prev: unknown, formData: FormData) {
  const { supabase } = await me();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required." };
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const color = String(formData.get("color") ?? "#71717a");
  const description = String(formData.get("description") ?? "").trim() || null;
  const { error } = await supabase
    .from("departments")
    .insert({ name, slug, color, description });
  if (error) return { error: error.message };
  revalidatePath("/panel", "layout");
  return { ok: true };
}

export async function setDepartment(profileId: string, departmentId: string | null) {
  const { supabase } = await me();
  const { error } = await supabase
    .from("profiles")
    .update({ department_id: departmentId })
    .eq("id", profileId);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function setManager(profileId: string, managerId: string | null) {
  const { supabase } = await me();
  // Guard against self-reporting.
  const mgr = managerId === profileId ? null : managerId;
  const { error } = await supabase
    .from("profiles")
    .update({ manager_id: mgr })
    .eq("id", profileId);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}

export async function setDepartmentLead(departmentId: string, leadId: string | null) {
  const { supabase } = await me();
  const { error } = await supabase
    .from("departments")
    .update({ lead_id: leadId })
    .eq("id", departmentId);
  if (!error) revalidatePath("/panel", "layout");
  return { error: error?.message };
}
