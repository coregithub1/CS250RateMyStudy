import { createClient } from '@supabase/supabase-js';

let client;

export function getSupabase() {
  const url = 'https://syhisomqinocvhoyuczv.supabase.co' || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = 'sb_publishable_gJ9jJb__OX5q1UbsSJ6EaA_QA27ogi5' || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!client) {
    client = createClient(url, key);
  }

  return client;
}