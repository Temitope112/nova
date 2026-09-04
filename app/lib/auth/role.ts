import { createClient } from "@/app/lib/supabase/server";

export type UserRole = "passenger" | "admin";

export async function getCurrentUserWithRole() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      role: null,
    };
  }

  const { data: roleData, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Unable to read user role:", error.message);

    return {
      user,
      role: null,
    };
  }

  return {
    user,
    role: (roleData?.role as UserRole | undefined) ?? null,
  };
}