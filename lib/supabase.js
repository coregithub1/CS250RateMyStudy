import { createClient } from '@supabase/supabase-js';

let client;

export function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://syhisomqinocvhoyuczv.supabase.co';

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_gJ9jJb__OX5q1UbsSJ6EaA_QA27ogi5';

  if (!client) {
    client = createClient(url, key);
  }

  return client;
}