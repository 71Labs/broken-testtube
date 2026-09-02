#!/usr/bin/env bash
# Applies the panel schema to the running local Supabase and seeds the 71Labs
# team (Eromonsele / Priest / Chocolate), then writes .env.local.
#
# Prereqs: Docker Desktop running + `supabase start` already succeeded.
# Run from the project root:  bash scripts/setup-panel.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Reading local Supabase status..."
eval "$(supabase status -o env | sed 's/^/export /')"   # API_URL, ANON_KEY, SERVICE_ROLE_KEY, DB_URL

DB="${DB_URL:-postgresql://postgres:postgres@127.0.0.1:54322/postgres}"
API="${API_URL:?run 'supabase start' first}"
PW="labs2026!"   # shared local dev password for the seeded accounts

echo "→ Applying schema (supabase/schema.sql)..."
psql "$DB" -v ON_ERROR_STOP=1 -f supabase/schema.sql >/dev/null

create_user () {  # email  full_name
  curl -s -X POST "$API/auth/v1/admin/users" \
    -H "apikey: $SERVICE_ROLE_KEY" -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$1\",\"password\":\"$PW\",\"email_confirm\":true,\"user_metadata\":{\"full_name\":\"$2\"}}" \
    >/dev/null || true
}

echo "→ Creating team accounts (password: $PW)..."
create_user "eromonsele@71labs.xyz" "Eromonsele Odigie"
create_user "priest@71labs.xyz"     "Priest"
create_user "chocolate@71labs.xyz"  "Chocolate"

echo "→ Setting titles, roles, departments, and reporting lines..."
psql "$DB" -v ON_ERROR_STOP=1 <<'SQL'
update public.profiles p set role='admin', title='Founder',
  department_id=(select id from public.departments where slug='studio')
  from auth.users u where u.id=p.id and u.email='eromonsele@71labs.xyz';

update public.profiles p set title='Designer',
  department_id=(select id from public.departments where slug='studio'),
  manager_id=(select id from auth.users where email='eromonsele@71labs.xyz')
  from auth.users u where u.id=p.id and u.email='priest@71labs.xyz';

update public.profiles p set title='Social Media Manager',
  department_id=(select id from public.departments where slug='operations'),
  manager_id=(select id from auth.users where email='eromonsele@71labs.xyz')
  from auth.users u where u.id=p.id and u.email='chocolate@71labs.xyz';

update public.departments set lead_id=(select id from auth.users where email='eromonsele@71labs.xyz') where slug='studio';
update public.departments set lead_id=(select id from auth.users where email='chocolate@71labs.xyz') where slug='operations';
SQL

echo "→ Writing .env.local..."
cat > .env.local <<ENV
NEXT_PUBLIC_SUPABASE_URL=$API
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
ENV

echo "✓ Done. Restart the dev server, then sign in at /panel/login as"
echo "  eromonsele@71labs.xyz / $PW  (admin)."
