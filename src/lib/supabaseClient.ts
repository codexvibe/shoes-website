import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

// Create a safe client that won't crash during SSR/build when env vars are missing
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith("http")) {
    console.warn(
      "Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local"
    );
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

export { getSupabaseClient };
