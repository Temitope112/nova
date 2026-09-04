"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import {
  Bell,
  Check,
  ChevronRight,
  Loader2,
  MailCheck,
  MailOpen,
  Plus,
  Search,
  Send,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { createClient } from "@/app/lib/supabase/client";

import {
  NOTIFICATION_TYPES,
  type NotificationType,
} from "./constants";

import type {
  AdminNotification,
  NotificationPassenger,
} from "./types";

export default function NotificationsClient({
  notifications,
  passengers,
}: {
  notifications: AdminNotification[];
  passengers: NotificationPassenger[];
}) {
  const router = useRouter();

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("all");

  const [composeOpen, setComposeOpen] =
    useState(false);

  const [
    selectedNotification,
    setSelectedNotification,
  ] =
    useState<AdminNotification | null>(
      null
    );

  const filteredNotifications =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return notifications.filter(
        (notification) => {
          const passengerName =
            notification.passenger
              ?.full_name
              ?.toLowerCase() ??
            "";

          const matchesSearch =
            !query ||
            notification.title
              .toLowerCase()
              .includes(query) ||
            notification.message
              .toLowerCase()
              .includes(query) ||
            passengerName.includes(
              query
            );

          const matchesType =
            type === "all" ||
            notification.type ===
              type;

          return (
            matchesSearch &&
            matchesType
          );
        }
      );
    }, [
      notifications,
      search,
      type,
    ]);

  const readCount =
    notifications.filter(
      (notification) =>
        notification.is_read
    ).length;

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.is_read
    ).length;

  const systemCount =
    notifications.filter(
      (notification) =>
        notification.type ===
        "system"
    ).length;

  return (
    <>
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
              Passenger Communication
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
              Notifications
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
              Send operational updates
              and review passenger
              notifications across NOVA.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setComposeOpen(true)
            }
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315b78] lg:self-auto"
          >
            <Plus className="h-4 w-4" />

            Compose notification
          </button>
        </div>

        {/* STATS */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Notifications"
            value={
              notifications.length
            }
            icon={Bell}
          />

          <StatCard
            label="Read"
            value={readCount}
            icon={MailCheck}
          />

          <StatCard
            label="Unread"
            value={unreadCount}
            icon={MailOpen}
          />

          <StatCard
            label="System"
            value={systemCount}
            icon={Send}
          />
        </section>

        {/* FILTERS */}
        <section className="mt-8 rounded-[24px] border border-[#111820]/10 bg-white/70 p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/40" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search notification or passenger"
                className="h-12 w-full rounded-xl border border-[#111820]/10 bg-[#f5f2eb] pl-11 pr-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/40 focus:border-[#315b78]/50"
              />
            </div>

            <select
              value={type}
              onChange={(event) =>
                setType(
                  event.target.value
                )
              }
              className="h-12 rounded-xl border border-[#111820]/10 bg-[#f5f2eb] px-4 text-sm font-medium text-[#111820] outline-none focus:border-[#315b78]/50"
            >
              <option value="all">
                All types
              </option>

              {NOTIFICATION_TYPES.map(
                (notificationType) => (
                  <option
                    key={
                      notificationType
                    }
                    value={
                      notificationType
                    }
                  >
                    {formatType(
                      notificationType
                    )}
                  </option>
                )
              )}
            </select>
          </div>
        </section>

        <p className="mt-6 text-xs font-medium text-[#111820]/50">
          Showing{" "}
          {
            filteredNotifications.length
          }{" "}
          of {notifications.length}{" "}
          notifications
        </p>

        {/* DESKTOP */}
        <section className="mt-4 hidden overflow-hidden rounded-[24px] border border-[#111820]/10 bg-white/70 lg:block">
          <div className="grid grid-cols-[1.3fr_1fr_150px_120px_60px] border-b border-[#111820]/10 bg-[#111820]/[0.025] px-6 py-4">
            <TableLabel label="Notification" />
            <TableLabel label="Passenger" />
            <TableLabel label="Type" />
            <TableLabel label="Read" />
            <span />
          </div>

          {filteredNotifications.length >
          0 ? (
            filteredNotifications.map(
              (notification) => (
                <NotificationRow
                  key={
                    notification.id
                  }
                  notification={
                    notification
                  }
                  onSelect={() =>
                    setSelectedNotification(
                      notification
                    )
                  }
                />
              )
            )
          ) : (
            <EmptyState />
          )}
        </section>

        {/* MOBILE */}
        <section className="mt-4 space-y-3 lg:hidden">
          {filteredNotifications.length >
          0 ? (
            filteredNotifications.map(
              (notification) => (
                <NotificationCard
                  key={
                    notification.id
                  }
                  notification={
                    notification
                  }
                  onSelect={() =>
                    setSelectedNotification(
                      notification
                    )
                  }
                />
              )
            )
          ) : (
            <div className="rounded-[24px] border border-[#111820]/10 bg-white/70">
              <EmptyState />
            </div>
          )}
        </section>
      </div>

      <ComposeModal
        open={composeOpen}
        passengers={passengers}
        onClose={() =>
          setComposeOpen(false)
        }
        onSuccess={() => {
          setComposeOpen(false);
          router.refresh();
        }}
      />

      <NotificationModal
        notification={
          selectedNotification
        }
        onClose={() =>
          setSelectedNotification(
            null
          )
        }
      />
    </>
  );
}

function ComposeModal({
  open,
  passengers,
  onClose,
  onSuccess,
}: {
  open: boolean;
  passengers: NotificationPassenger[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [recipient, setRecipient] =
    useState("");

  const [notificationType, setNotificationType] =
    useState<NotificationType>(
      "system"
    );

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open) return null;

  const resetForm = () => {
    setRecipient("");
    setNotificationType(
      "system"
    );
    setTitle("");
    setMessage("");
    setError("");
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    if (!recipient) {
      setError(
        "Select a passenger or all passengers."
      );
      setLoading(false);
      return;
    }

    if (
      !title.trim() ||
      !message.trim()
    ) {
      setError(
        "Enter a title and message."
      );
      setLoading(false);
      return;
    }

    const supabase =
      createClient();

    if (recipient === "all") {
      if (
        passengers.length === 0
      ) {
        setError(
          "There are no passengers to notify."
        );
        setLoading(false);
        return;
      }

      const payload =
        passengers.map(
          (passenger) => ({
            user_id:
              passenger.id,
            type: notificationType,
            title:
              title.trim(),
            message:
              message.trim(),
            is_read: false,
          })
        );

      const { error: insertError } =
        await supabase
          .from("notifications")
          .insert(payload);

      if (insertError) {
        console.error(
          "Broadcast notification error:",
          insertError
        );

        setError(
          insertError.message
        );
        setLoading(false);
        return;
      }
    } else {
      const { error: insertError } =
        await supabase
          .from("notifications")
          .insert({
            user_id: recipient,
            type: notificationType,
            title: title.trim(),
            message:
              message.trim(),
            is_read: false,
          });

      if (insertError) {
        console.error(
          "Send notification error:",
          insertError
        );

        setError(
          insertError.message
        );
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    resetForm();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close notification composer"
        onClick={handleClose}
        className="absolute inset-0 bg-[#111820]/65 backdrop-blur-[3px]"
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-[28px] bg-[#f5f2eb] shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#111820]/10 p-6 sm:p-8">
          <div className="flex gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111820]">
              <Send className="h-4 w-4 text-white" />
            </span>

            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                Communications
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
                Compose notification
              </h2>

              <p className="mt-2 text-sm text-[#111820]/55">
                Send an operational
                message to NOVA
                passengers.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10 hover:bg-[#111820]/5 disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Recipient"
              required
            >
              <select
                required
                value={recipient}
                onChange={(event) =>
                  setRecipient(
                    event.target.value
                  )
                }
                className={
                  inputStyles
                }
              >
                <option
                  value=""
                  disabled
                >
                  Select recipient
                </option>

                <option value="all">
                  All passengers
                </option>

                {passengers.map(
                  (passenger) => (
                    <option
                      key={
                        passenger.id
                      }
                      value={
                        passenger.id
                      }
                    >
                      {passenger.full_name ??
                        "NOVA Passenger"}
                    </option>
                  )
                )}
              </select>
            </Field>

            <Field
              label="Notification type"
              required
            >
              <select
                required
                value={
                  notificationType
                }
                onChange={(
                  event
                ) =>
                  setNotificationType(
                    event.target
                      .value as NotificationType
                  )
                }
                className={
                  inputStyles
                }
              >
                {NOTIFICATION_TYPES.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {formatType(
                        type
                      )}
                    </option>
                  )
                )}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field
              label="Title"
              required
            >
              <input
                required
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                placeholder="Gate change for NOV 204"
                className={
                  inputStyles
                }
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field
              label="Message"
              required
            >
              <textarea
                required
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                placeholder="Your flight will now depart from Gate A12..."
                rows={6}
                className="w-full resize-none rounded-[18px] border border-[#111820]/10 bg-white px-4 py-4 text-sm leading-6 text-[#111820] outline-none placeholder:text-[#111820]/35 focus:border-[#315b78]/50 focus:ring-2 focus:ring-[#315b78]/10"
              />
            </Field>
          </div>

          {recipient === "all" && (
            <div className="mt-5 flex gap-3 rounded-[18px] bg-[#e8a735]/10 p-4">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#9a6515]" />

              <p className="text-xs leading-5 text-[#111820]/65">
                This creates an
                individual notification
                for every passenger
                currently in NOVA.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.07] px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#111820]/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-full border border-[#111820]/15 px-5 py-3 text-sm font-semibold text-[#111820] hover:bg-[#111820]/5 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111820] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send notification
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NotificationRow({
  notification,
  onSelect,
}: {
  notification: AdminNotification;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group grid w-full grid-cols-[1.3fr_1fr_150px_120px_60px] items-center border-b border-[#111820]/10 px-6 py-5 text-left transition last:border-b-0 hover:bg-[#111820]/[0.025]"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#111820]">
          {notification.title}
        </p>

        <p className="mt-1 truncate text-xs text-[#111820]/45">
          {notification.message}
        </p>
      </div>

      <p className="truncate text-sm text-[#111820]/65">
        {notification.passenger
          ?.full_name ??
          "NOVA Passenger"}
      </p>

      <TypeBadge
        type={notification.type}
      />

      <ReadBadge
        read={notification.is_read}
      />

      <div className="flex justify-end">
        <ChevronRight className="h-4 w-4 text-[#111820]/30 transition group-hover:translate-x-1" />
      </div>
    </button>
  );
}

function NotificationCard({
  notification,
  onSelect,
}: {
  notification: AdminNotification;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-[22px] border border-[#111820]/10 bg-white/70 p-5 text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-[#111820]">
            {notification.title}
          </p>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#111820]/50">
            {notification.message}
          </p>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-[#111820]/30" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#111820]/10 pt-4">
        <TypeBadge
          type={notification.type}
        />

        <ReadBadge
          read={notification.is_read}
        />
      </div>
    </button>
  );
}

function NotificationModal({
  notification,
  onClose,
}: {
  notification:
    | AdminNotification
    | null;
  onClose: () => void;
}) {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-[#111820]/65 backdrop-blur-[3px]"
      />

      <div className="relative z-10 w-full max-w-[620px] rounded-[28px] bg-[#f5f2eb] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <TypeBadge
              type={
                notification.type
              }
            />

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
              {notification.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-[20px] border border-[#111820]/10 bg-white/65 p-5">
          <p className="text-sm leading-7 text-[#111820]/70">
            {notification.message}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <MetaCard
            label="Passenger"
            value={
              notification.passenger
                ?.full_name ??
              "NOVA Passenger"
            }
          />

          <MetaCard
            label="Status"
            value={
              notification.is_read
                ? "Read"
                : "Unread"
            }
          />

          <MetaCard
            label="Sent"
            value={formatDate(
              notification.created_at
            )}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Bell;
}) {
  return (
    <div className="rounded-[24px] border border-[#111820]/10 bg-white/70 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-[#111820]/45">
            {label}
          </p>

          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#111820]">
            {value}
          </p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#315b78]/10">
          <Icon className="h-4 w-4 text-[#315b78]" />
        </span>
      </div>
    </div>
  );
}

function TypeBadge({
  type,
}: {
  type: NotificationType;
}) {
  return (
    <span className="inline-flex w-fit rounded-full bg-[#315b78]/10 px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#315b78]">
      {formatType(type)}
    </span>
  );
}

function ReadBadge({
  read,
}: {
  read: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${
        read
          ? "bg-emerald-500/10 text-emerald-700"
          : "bg-[#e8a735]/15 text-[#8a641d]"
      }`}
    >
      {read && (
        <Check className="h-3 w-3" />
      )}

      {read ? "Read" : "Unread"}
    </span>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#111820]/65">
        {label}

        {required && (
          <span className="ml-1 text-[#e8a735]">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function MetaCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] bg-white/60 p-4">
      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#111820]/40">
        {label}
      </p>

      <p className="mt-2 truncate text-xs font-semibold text-[#111820]">
        {value}
      </p>
    </div>
  );
}

function TableLabel({
  label,
}: {
  label: string;
}) {
  return (
    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#111820]/45">
      {label}
    </p>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
      <Bell className="h-6 w-6 text-[#315b78]" />

      <h3 className="mt-4 text-lg font-semibold text-[#111820]">
        No notifications found
      </h3>

      <p className="mt-2 text-sm text-[#111820]/55">
        Notifications sent to
        passengers will appear here.
      </p>
    </div>
  );
}

const inputStyles =
  "h-12 w-full rounded-xl border border-[#111820]/10 bg-white px-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/35 focus:border-[#315b78]/50 focus:ring-2 focus:ring-[#315b78]/10";

function formatType(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(value));
}