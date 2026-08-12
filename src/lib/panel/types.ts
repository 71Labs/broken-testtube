export type Role = "admin" | "worker";
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Profile = {
  id: string;
  full_name: string;
  role: Role;
  title: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
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
  assignee?: Pick<Profile, "full_name"> | null;
};

export type Activity = {
  id: string;
  actor_id: string | null;
  task_id: string | null;
  message: string;
  created_at: string;
  actor?: Pick<Profile, "full_name"> | null;
};

export const STATUS_META: Record<TaskStatus, { label: string; dot: string }> = {
  todo: { label: "To do", dot: "#a1a1aa" },
  in_progress: { label: "In progress", dot: "#e8681e" },
  done: { label: "Done", dot: "#3c9a4e" },
};

export const PRIORITY_META: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-neutral-100 text-neutral-500" },
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
