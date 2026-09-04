"use client";

import {
  Bell,
  Check,
  Info,
  MapPin,
  Plane,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/app/lib/supabase/client";

type NotificationType =
  | "flight_update"
  | "gate_change"
  | "journey"
  | "lost_found"
  | "system";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type NotificationsListProps = {
  notifications: Notification[];
};

export default function NotificationsList({
  notifications,
}: NotificationsListProps) {
  const router = useRouter();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  );

  const markAsRead = async (id: string) => {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
  };

  const markAllAsRead = async () => {
    const supabase = createClient();

    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("is_read", false);

    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
  };

  if (notifications.length === 0) {
    return (
      <div className="mt-10 rounded-[28px] border border-[#111820]/10 bg-white/70 px-6 py-20 text-center">
        <Bell className="mx-auto h-7 w-7 text-[#315b78]" />

        <h2 className="mt-5 text-2xl font-semibold text-[#111820]">
          You&apos;re all caught up.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#111820]/65">
          Important flight updates, journey reminders and passenger
          notifications will appear here.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[#111820]/70">
          {unreadNotifications.length} unread
        </p>

        {unreadNotifications.length > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-sm font-semibold text-[#315b78] transition hover:text-[#111820]"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#111820]/10 bg-white/70">
        {notifications.map((notification, index) => {
          const Icon = getNotificationIcon(notification.type);

          return (
            <article
              key={notification.id}
              className={`flex gap-4 px-5 py-6 sm:px-7 ${
                index !== notifications.length - 1
                  ? "border-b border-[#111820]/10"
                  : ""
              } ${
                notification.is_read
                  ? "bg-transparent"
                  : "bg-[#315b78]/[0.04]"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  notification.is_read
                    ? "bg-[#111820]/5 text-[#111820]/60"
                    : "bg-[#315b78]/10 text-[#315b78]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold text-[#111820]">
                        {notification.title}
                      </h2>

                      {!notification.is_read && (
                        <span className="h-2 w-2 rounded-full bg-[#e8a735]" />
                      )}
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#111820]/70">
                      {notification.message}
                    </p>
                  </div>

                  <time className="shrink-0 text-xs font-medium text-[#111820]/50">
                    {formatNotificationDate(notification.created_at)}
                  </time>
                </div>

                {!notification.is_read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#315b78] transition hover:text-[#111820]"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark as read
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "flight_update":
      return Plane;

    case "gate_change":
      return MapPin;

    case "journey":
      return Bell;

    case "lost_found":
      return Search;

    default:
      return Info;
  }
}

function formatNotificationDate(date: string) {
  const notificationDate = new Date(date);

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(notificationDate);
}