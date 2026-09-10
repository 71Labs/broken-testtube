export type Role = "admin" | "worker";
export type TaskStatus = "todo" | "in_progress" | "in_review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Profile = {
  id: string;
  full_name: string;
  role: Role;
  title: string | null;
  department_id: string | null;
  manager_id: string | null;
  avatar_gradient: number | null;
  created_at: string;
  department?: Pick<Department, "name" | "slug" | "color"> | null;
  manager?: Pick<Profile, "id" | "full_name"> | null;
};

/** Curated avatar gradients. Index stored on the profile; null → derived from id. */
export const AVATAR_GRADIENTS: { from: string; to: string }[] = [
  { from: "#ff9ec4", to: "#d6247a" }, // pink → magenta
  { from: "#b39dfb", to: "#6d28d9" }, // lavender → violet
  { from: "#7cc0ff", to: "#1e40af" }, // sky → deep blue
  { from: "#5eead4", to: "#0d9488" }, // aqua → teal
  { from: "#9ff0a8", to: "#16a34a" }, // mint → green
  { from: "#fdba74", to: "#ea580c" }, // peach → orange
  { from: "#fca5a5", to: "#dc2626" }, // coral → red
  { from: "#a5b4fc", to: "#3730a3" }, // periwinkle → indigo
  { from: "#7dd3fc", to: "#0891b2" }, // cyan → deep cyan
  { from: "#fcd34d", to: "#d97706" }, // gold → amber
  { from: "#fda4af", to: "#be123c" }, // rose → crimson
  { from: "#c4b5fd", to: "#4338ca" }, // violet → royal
];

/** Stable index from a string seed (e.g., profile id). */
export function gradientIndex(seed: string, override?: number | null): number {
  if (override !== null && override !== undefined) {
    return ((override % AVATAR_GRADIENTS.length) + AVATAR_GRADIENTS.length) % AVATAR_GRADIENTS.length;
  }
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % AVATAR_GRADIENTS.length;
}

export type Department = {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string | null;
  lead_id: string | null;
  created_at: string;
  lead?: Pick<Profile, "id" | "full_name"> | null;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
};

export type JobStatus = "draft" | "open" | "closed";

export type Job = {
  id: string;
  title: string;
  slug: string;
  department_id: string | null;
  location: string;
  employment_type: string;
  description: string;
  status: JobStatus;
  created_at: string;
  department?: Pick<Department, "name" | "slug" | "color"> | null;
};

export const JOB_STATUS_META: Record<JobStatus, { label: string; dot: string }> = {
  draft: { label: "Draft", dot: "#949494" },
  open: { label: "Open", dot: "#3c9a4e" },
  closed: { label: "Closed", dot: "#c4c4c4" },
};

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

/* ─────────────────── operating system: products / research / leads ─────── */

type OwnerRef = Pick<Profile, "id" | "full_name"> | null;

export type ProductStage =
  | "idea" | "research" | "validation" | "building" | "market" | "revenue" | "scale" | "killed";
export type ResearchStage =
  | "question" | "experiment" | "findings" | "documented" | "applied" | "dropped";
export type LeadType = "client" | "grant" | "partnership" | "hackathon" | "investor";
export type LeadStage =
  | "identified" | "contacted" | "pitched" | "demo" | "won" | "lost";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  owner_id: string | null;
  stage: ProductStage;
  roi_note: string | null;
  created_at: string;
  owner?: OwnerRef;
};

export type Research = {
  id: string;
  title: string;
  owner_id: string | null;
  stage: ResearchStage;
  notes: string | null;
  outcome: string | null;
  created_at: string;
  owner?: OwnerRef;
};

export type Lead = {
  id: string;
  name: string;
  type: LeadType;
  owner_id: string | null;
  stage: LeadStage;
  value_note: string | null;
  next_action: string | null;
  created_at: string;
  owner?: OwnerRef;
};

export const PRODUCT_STAGES: ProductStage[] = [
  "idea", "research", "validation", "building", "market", "revenue", "scale", "killed",
];
export const PRODUCT_STAGE_META: Record<ProductStage, { label: string; dot: string }> = {
  idea: { label: "Idea", dot: "#949494" },
  research: { label: "Research", dot: "#5b8def" },
  validation: { label: "Validation", dot: "#8b5cf6" },
  building: { label: "Building", dot: "#e8681e" },
  market: { label: "Market test", dot: "#eab308" },
  revenue: { label: "Revenue", dot: "#3c9a4e" },
  scale: { label: "Scale", dot: "#0ea5e9" },
  killed: { label: "Killed", dot: "#c4c4c4" },
};

export const RESEARCH_STAGES: ResearchStage[] = [
  "question", "experiment", "findings", "documented", "applied", "dropped",
];
export const RESEARCH_STAGE_META: Record<ResearchStage, { label: string; dot: string }> = {
  question: { label: "Question", dot: "#5b8def" },
  experiment: { label: "Experiment", dot: "#e8681e" },
  findings: { label: "Findings", dot: "#eab308" },
  documented: { label: "Documented", dot: "#8b5cf6" },
  applied: { label: "Applied", dot: "#3c9a4e" },
  dropped: { label: "Dropped", dot: "#c4c4c4" },
};

export const LEAD_STAGES: LeadStage[] = [
  "identified", "contacted", "pitched", "demo", "won", "lost",
];
export const LEAD_STAGE_META: Record<LeadStage, { label: string; dot: string }> = {
  identified: { label: "Identified", dot: "#949494" },
  contacted: { label: "Contacted", dot: "#5b8def" },
  pitched: { label: "Pitched", dot: "#eab308" },
  demo: { label: "Demo", dot: "#8b5cf6" },
  won: { label: "Won", dot: "#3c9a4e" },
  lost: { label: "Lost", dot: "#c4c4c4" },
};

export const LEAD_TYPES: LeadType[] = [
  "client", "grant", "partnership", "hackathon", "investor",
];
export const LEAD_TYPE_META: Record<LeadType, string> = {
  client: "Client",
  grant: "Grant",
  partnership: "Partnership",
  hackathon: "Hackathon",
  investor: "Investor",
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  project_id: string | null;
  assignee_id: string | null;
  created_by: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  project?: Pick<Project, "name" | "slug" | "color"> | null;
  assignee?: Pick<Profile, "id" | "full_name" | "avatar_gradient"> | null;
};

export type Activity = {
  id: string;
  actor_id: string | null;
  task_id: string | null;
  message: string;
  created_at: string;
  actor?: Pick<Profile, "id" | "full_name" | "avatar_gradient"> | null;
};

export const STATUS_META: Record<TaskStatus, { label: string; dot: string }> = {
  todo: { label: "To do", dot: "#a1a1aa" },
  in_progress: { label: "In Progress", dot: "#e8681e" },
  in_review: { label: "In Review", dot: "#8b5cf6" },
  done: { label: "Completed", dot: "#3c9a4e" },
};

/** Board column order + a derived progress % for each stage's cards. */
export const TASK_COLUMNS: TaskStatus[] = ["todo", "in_progress", "in_review", "done"];
export const STATUS_PROGRESS: Record<TaskStatus, number> = {
  todo: 8,
  in_progress: 45,
  in_review: 75,
  done: 100,
};

export const PRIORITY_META: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-emerald-50 text-emerald-600" },
  medium: { label: "Medium", className: "bg-amber-50 text-amber-600" },
  high: { label: "High", className: "bg-red-50 text-red-600" },
};

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
