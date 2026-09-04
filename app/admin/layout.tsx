import { redirect } from "next/navigation";

import { getCurrentUserWithRole } from "@/app/lib/auth/role";
import AdminShell from "./components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } =
    await getCurrentUserWithRole();

  if (!user) {
    redirect(
      "/auth/sign-in?redirect=/admin"
    );
  }

  if (role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}