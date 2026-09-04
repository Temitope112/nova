import { createClient } from "@/app/lib/supabase/server";

import NotificationsClient from "./notifications-client";

import type {
  AdminNotification,
  NotificationPassenger,
} from "./types";

export default async function AdminNotificationsPage() {
  const supabase = await createClient();

  const [
    {
      data: notifications,
      error: notificationsError,
    },
    {
      data: profiles,
      error: profilesError,
    },
  ] = await Promise.all([
    supabase
      .from("notifications")
      .select(`
        id,
        user_id,
        type,
        title,
        message,
        is_read,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        avatar_url
      `)
      .order("full_name", {
        ascending: true,
      }),
  ]);

  if (notificationsError) {
    console.error(
      "Admin notifications fetch error:",
      notificationsError
    );
  }

  if (profilesError) {
    console.error(
      "Admin notification profiles error:",
      profilesError
    );
  }

  const passengers: NotificationPassenger[] =
    (profiles ?? []).map(
      (profile) => ({
        id: profile.id,
        full_name:
          profile.full_name,
        avatar_url:
          profile.avatar_url,
      })
    );

  const passengerMap = new Map(
    passengers.map(
      (passenger) => [
        passenger.id,
        passenger,
      ]
    )
  );

  const adminNotifications: AdminNotification[] =
    (notifications ?? []).map(
      (notification) => ({
        ...notification,

        passenger:
          passengerMap.get(
            notification.user_id
          ) ?? null,
      })
    ) as AdminNotification[];

  return (
    <NotificationsClient
      notifications={
        adminNotifications
      }
      passengers={passengers}
    />
  );
}