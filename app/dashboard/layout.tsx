import { redirect } from "next/navigation";

import { createClient } from "@/app/lib/supabase/server";
import { getCurrentUserWithRole } from "@/app/lib/auth/role";
import DashboardShell from "./components/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } =
    await getCurrentUserWithRole();

  if (!user) {
    redirect(
      "/auth/sign-in?redirect=/dashboard"
    );
  }

  if (role === "admin") {
    redirect("/admin");
  }

  if (role !== "passenger") {
    redirect("/auth/sign-in");
  }

  const supabase = await createClient();

  const [profileResult, notificationsResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single(),

      supabase
        .from("notifications")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id)
        .eq("is_read", false),
    ]);

  const profile = profileResult.data;

  return (
    <DashboardShell
      fullName={
        profile?.full_name ?? "Passenger"
      }
      avatarUrl={
        profile?.avatar_url ?? null
      }
      unreadNotifications={
        notificationsResult.count ?? 0
      }
    >
      {children}
    </DashboardShell>
  );
}