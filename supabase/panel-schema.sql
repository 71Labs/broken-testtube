-- 71Labs company panel — Supabase schema, isolated in the `panel` schema.
-- This database is SHARED with another app that owns the `public` schema.
-- Everything here lives in `panel` so it can NEVER collide with public.*.
-- Safe to re-run.

create schema if not exists panel;

-- ─────────────────────────────────────────────────────────── enums ──
do $$ begin
  create type panel.user_role as enum ('admin', 'worker');
exception when duplicate_object then null; end $$;

do $$ begin
  create type panel.task_status as enum ('todo', 'in_progress', 'done');
exception when duplicate_object then null; end $$;

do $$ begin
  create type panel.task_priority as enum ('low', 'medium', 'high');
exception when duplicate_object then null; end $$;

do $$ begin
  create type panel.job_status as enum ('draft', 'open', 'closed');
exception when duplicate_object then null; end $$;

-- ──────────────────────────────────────────────────────── profiles ──
create table if not exists panel.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null default 'New teammate',
  role        panel.user_role not null default 'worker',
  title       text,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────── projects ──
create table if not exists panel.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  color       text not null default '#71717a',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────── tasks ──
create table if not exists panel.tasks (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  status      panel.task_status not null default 'todo',
  priority    panel.task_priority not null default 'medium',
  project_id  uuid references panel.projects (id) on delete set null,
  assignee_id uuid references panel.profiles (id) on delete set null,
  created_by  uuid references panel.profiles (id) on delete set null,
  due_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────── activity ──
create table if not exists panel.activity (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references panel.profiles (id) on delete set null,
  task_id     uuid references panel.tasks (id) on delete cascade,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────── organization structure ──
create table if not exists panel.departments (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  color       text not null default '#71717a',
  description text,
  lead_id     uuid references panel.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

alter table panel.profiles
  add column if not exists department_id uuid references panel.departments (id) on delete set null;
alter table panel.profiles
  add column if not exists manager_id uuid references panel.profiles (id) on delete set null;

-- ─────────────────────────────────────────── careers / job openings ──
-- Managed by admins in /panel/jobs; `open` rows are public on /careers.
create table if not exists panel.jobs (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text unique not null,
  department_id   uuid references panel.departments (id) on delete set null,
  location        text not null default 'Remote / Global',
  employment_type text not null default 'Full-time',
  description     text not null default '',
  status          panel.job_status not null default 'draft',
  created_at      timestamptz not null default now()
);

-- ──────────────────────────────────────────────── helper: is_admin ──
create or replace function panel.is_admin()
returns boolean language sql security definer stable set search_path = '' as $$
  select coalesce((select role = 'admin' from panel.profiles where id = auth.uid()), false);
$$;

-- ─────────────────────────────────────── auto-create profile on signup ──
-- Only OUR auth.users trigger; the other app uses NextAuth (public.users), not
-- Supabase auth, and auth.users is otherwise unused.
create or replace function panel.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into panel.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created_panel on auth.users;
create trigger on_auth_user_created_panel
  after insert on auth.users
  for each row execute function panel.handle_new_user();

-- ──────────────────────────────────────────── keep updated_at fresh ──
create or replace function panel.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists tasks_touch on panel.tasks;
create trigger tasks_touch before update on panel.tasks
  for each row execute function panel.touch_updated_at();

-- ─────────────────────────────────────────────────────────── RLS ──
alter table panel.profiles    enable row level security;
alter table panel.projects    enable row level security;
alter table panel.tasks       enable row level security;
alter table panel.activity    enable row level security;
alter table panel.departments enable row level security;

drop policy if exists profiles_read on panel.profiles;
create policy profiles_read on panel.profiles for select to authenticated using (true);

drop policy if exists profiles_update_self on panel.profiles;
create policy profiles_update_self on panel.profiles for update to authenticated
  using (id = auth.uid() or panel.is_admin()) with check (id = auth.uid() or panel.is_admin());

drop policy if exists projects_read on panel.projects;
create policy projects_read on panel.projects for select to authenticated using (true);

drop policy if exists projects_admin on panel.projects;
create policy projects_admin on panel.projects for all to authenticated
  using (panel.is_admin()) with check (panel.is_admin());

drop policy if exists tasks_read on panel.tasks;
create policy tasks_read on panel.tasks for select to authenticated using (true);

drop policy if exists tasks_insert on panel.tasks;
create policy tasks_insert on panel.tasks for insert to authenticated
  with check (panel.is_admin() or created_by = auth.uid());

drop policy if exists tasks_update on panel.tasks;
create policy tasks_update on panel.tasks for update to authenticated
  using (panel.is_admin() or assignee_id = auth.uid())
  with check (panel.is_admin() or assignee_id = auth.uid());

drop policy if exists tasks_delete on panel.tasks;
create policy tasks_delete on panel.tasks for delete to authenticated
  using (panel.is_admin() or created_by = auth.uid());

drop policy if exists activity_read on panel.activity;
create policy activity_read on panel.activity for select to authenticated using (true);

drop policy if exists activity_insert on panel.activity;
create policy activity_insert on panel.activity for insert to authenticated
  with check (actor_id = auth.uid());

drop policy if exists departments_read on panel.departments;
create policy departments_read on panel.departments for select to authenticated using (true);

drop policy if exists departments_admin on panel.departments;
create policy departments_admin on panel.departments for all to authenticated
  using (panel.is_admin()) with check (panel.is_admin());

alter table panel.jobs enable row level security;

-- Public (anon) sees only OPEN roles; admins see & manage everything.
drop policy if exists jobs_read on panel.jobs;
create policy jobs_read on panel.jobs for select to anon, authenticated
  using (status = 'open' or panel.is_admin());

drop policy if exists jobs_admin on panel.jobs;
create policy jobs_admin on panel.jobs for all to authenticated
  using (panel.is_admin()) with check (panel.is_admin());

-- ────────────────────────────────────────── grants (PostgREST access) ──
grant usage on schema panel to anon, authenticated, service_role;
grant all on all tables in schema panel to anon, authenticated, service_role;
grant all on all sequences in schema panel to anon, authenticated, service_role;
grant all on all routines in schema panel to anon, authenticated, service_role;
alter default privileges in schema panel grant all on tables to anon, authenticated, service_role;
alter default privileges in schema panel grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema panel grant all on routines to anon, authenticated, service_role;

-- ─────────────────────────────────────────────────────────── seed ──
insert into panel.projects (name, slug, color) values
  ('Talise', 'talise', '#3c9a4e'),
  ('Utsuro', 'utsuro', '#e8681e'),
  ('Studio', 'studio', '#71717a')
on conflict (slug) do nothing;

insert into panel.departments (name, slug, color, description) values
  ('Talise', 'talise', '#3c9a4e', 'Consumer stablecoin payments on Sui.'),
  ('Utsuro', 'utsuro', '#e8681e', 'AI image and video generation.'),
  ('Studio', 'studio', '#1a1a1a', 'Design, brand, and shared platform.'),
  ('Operations', 'operations', '#5b8def', 'People, finance, and growth.')
on conflict (slug) do nothing;
