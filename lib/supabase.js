import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export function getSupabase() {
  const isTestEnvironment = process.env.NODE_ENV === 'test' || typeof window === 'undefined';
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || (isTestEnvironment ? 'https://supabase.co' : '');
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (isTestEnvironment ? 'dummy-key' : '');

  if (typeof window !== 'undefined') {
    console.log("LOGGED URL:", supabaseUrl);
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseInstance;
}
