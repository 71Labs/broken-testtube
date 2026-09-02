-- 71Labs company panel — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run.

-- ─────────────────────────────────────────────────────────── enums ──
do $$ begin
  create type user_role as enum ('admin', 'worker');
exception when duplicate_object then null; end $$;

do $$ begin
  create type task_status as enum ('todo', 'in_progress', 'done');
exception when duplicate_object then null; end $$;

do $$ begin
  create type task_priority as enum ('low', 'medium', 'high');
exception when duplicate_object then null; end $$;

-- ──────────────────────────────────────────────────────── profiles ──
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null default 'New teammate',
  role        user_role not null default 'worker',
  title       text,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────── projects ──
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  color       text not null default '#71717a',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────── tasks ──
create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  status      task_status not null default 'todo',
  priority    task_priority not null default 'medium',
  project_id  uuid references public.projects (id) on delete set null,
  assignee_id uuid references public.profiles (id) on delete set null,
  created_by  uuid references public.profiles (id) on delete set null,
  due_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────── activity ──
create table if not exists public.activity (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references public.profiles (id) on delete set null,
  task_id     uuid references public.tasks (id) on delete cascade,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────── helper: role ──
-- SECURITY DEFINER so RLS policies can call it without recursive checks.
create or replace function public.current_role()
returns user_role language sql security definer stable as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$;

-- ─────────────────────────────────────── auto-create profile on signup ──
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ──────────────────────────────────────────── keep updated_at fresh ──
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists tasks_touch on public.tasks;
create trigger tasks_touch before update on public.tasks
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────────────────── RLS ──
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.tasks    enable row level security;
alter table public.activity enable row level security;

-- profiles: everyone signed in can read the team; you edit your own; admins edit anyone.
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated using (true);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

-- projects: all read; only admins write.
drop policy if exists projects_read on public.projects;
create policy projects_read on public.projects for select to authenticated using (true);

drop policy if exists projects_admin on public.projects;
create policy projects_admin on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- tasks: all read (shared board); workers update tasks assigned to them; admins do anything.
drop policy if exists tasks_read on public.tasks;
create policy tasks_read on public.tasks for select to authenticated using (true);

drop policy if exists tasks_insert on public.tasks;
create policy tasks_insert on public.tasks for insert to authenticated
  with check (public.is_admin() or created_by = auth.uid());

drop policy if exists tasks_update on public.tasks;
create policy tasks_update on public.tasks for update to authenticated
  using (public.is_admin() or assignee_id = auth.uid())
  with check (public.is_admin() or assignee_id = auth.uid());

drop policy if exists tasks_delete on public.tasks;
create policy tasks_delete on public.tasks for delete to authenticated
  using (public.is_admin() or created_by = auth.uid());

-- activity: all read; insert your own entries.
drop policy if exists activity_read on public.activity;
create policy activity_read on public.activity for select to authenticated using (true);

drop policy if exists activity_insert on public.activity;
create policy activity_insert on public.activity for insert to authenticated
  with check (actor_id = auth.uid());

-- ─────────────────────────────────────────────────── seed projects ──
insert into public.projects (name, slug, color) values
  ('Talise', 'talise', '#3c9a4e'),
  ('Utsuro', 'utsuro', '#e8681e'),
  ('Studio', 'studio', '#71717a')
on conflict (slug) do nothing;

-- ═══════════════════════════════ organization structure ═══════════════════
-- Departments / teams, reporting lines (manager), and a per-department lead.

create table if not exists public.departments (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  color       text not null default '#71717a',
  description text,
  lead_id     uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Attach people to a department and a manager (reporting line).
alter table public.profiles
  add column if not exists department_id uuid references public.departments (id) on delete set null;
alter table public.profiles
  add column if not exists manager_id uuid references public.profiles (id) on delete set null;

alter table public.departments enable row level security;

drop policy if exists departments_read on public.departments;
create policy departments_read on public.departments for select to authenticated using (true);

drop policy if exists departments_admin on public.departments;
create policy departments_admin on public.departments for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Admins may set anyone's department / manager; the profiles_update_self policy
-- (id = auth.uid() OR is_admin()) already covers these column updates.

-- ─────────────────────────────────────────────── seed departments ──
insert into public.departments (name, slug, color, description) values
  ('Talise', 'talise', '#3c9a4e', 'Consumer stablecoin payments on Sui.'),
  ('Utsuro', 'utsuro', '#e8681e', 'AI image and video generation.'),
  ('Studio', 'studio', '#1a1a1a', 'Design, brand, and shared platform.'),
  ('Operations', 'operations', '#5b8def', 'People, finance, and growth.')
on conflict (slug) do nothing;

-- ─────────────────────────────────────── make yourself an admin ──
-- After you sign up in the panel once, run this with your email to get admin:
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'you@71labs.xyz');
