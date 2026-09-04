import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

import SettingsClient from "./settings-client";
import type {
  AdminSettingsProfile,
} from "./types";

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const {
    data: profile,
    error,
  } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      avatar_url
    `)
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "Admin settings profile error:",
      error
    );
  }

  const adminProfile: AdminSettingsProfile = {
    id: user.id,
    full_name:
      profile?.full_name ?? null,
    avatar_url:
      profile?.avatar_url ?? null,
  };

  return (
    <SettingsClient
      profile={adminProfile}
      email={user.email ?? ""}
    />
  );
}