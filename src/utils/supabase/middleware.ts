import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

function hasSupabaseConfig() {
  if (!supabaseUrl || !supabaseKey) {
    return false;
  }

  try {
    const url = new URL(supabaseUrl);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (!hasSupabaseConfig()) {
    return supabaseResponse;
  }

  const url = supabaseUrl;
  const key = supabaseKey;

  if (!url || !key) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      url,
      key,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      },
    );

    // Keep this close to client creation so Supabase session refresh stays predictable.
    await supabase.auth.getUser();
  } catch (error) {
    console.warn("Supabase session refresh skipped:", error);
    return supabaseResponse;
  }

  return supabaseResponse;
};
