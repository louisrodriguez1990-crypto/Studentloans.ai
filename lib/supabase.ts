import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser/public client — limited to anon role permissions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only admin client — full access, never expose to browser
export function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// ─── Schema (for reference) ──────────────────────────────────────────────────
//
// Table: assessments
//   id            uuid primary key default gen_random_uuid()
//   session_id    text not null
//   engine_version text not null
//   policy_version text not null
//   intake_data   jsonb not null
//   result_data   jsonb not null
//   created_at    timestamptz not null default now()
//
// Table: subscribers
//   id            uuid primary key default gen_random_uuid()
//   email         text not null unique
//   session_id    text
//   segment       text
//   created_at    timestamptz not null default now()
