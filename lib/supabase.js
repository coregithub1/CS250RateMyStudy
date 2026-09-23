import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export function getSupabase() {
  const isTestEnvironment =
    process.env.NODE_ENV === 'test' || typeof window === 'undefined';

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    (isTestEnvironment ? 'https://supabase.co' : '');

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    (isTestEnvironment ? 'dummy-key' : '');

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }

  return supabaseInstance;
}