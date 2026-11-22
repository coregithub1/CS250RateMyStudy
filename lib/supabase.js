import { createClient } from '@supabase/supabase-js';

let client;

export function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!client) {
    client = createClient(url, key);
  }

  return client;
}