import { createClient } from "@/app/lib/supabase/server";
import NotificationsList from "./notifications-list";

export default async function NotificationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <div className="mx-auto max-w-[1100px]">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          Passenger updates
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
          Notifications
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
          Flight updates, journey reminders and important information related
          to your NOVA experience.
        </p>
      </div>

      <NotificationsList notifications={notifications ?? []} />
    </div>
  );
}