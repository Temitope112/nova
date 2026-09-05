"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  Bell,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  Menu,
  PackageSearch,
  Plane,
  Radio,
  Route,
  Send,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  createClient,
} from "@/app/lib/supabase/client";

type AdminHeaderProps = {
  onOpenNavigation: () => void;
};

type HeaderNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

const operationLinks = [
  {
    label: "Overview",
    description:
      "Airport control summary",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Operations",
    description:
      "Live airport movement",
    href: "/admin/operations",
    icon: Radio,
  },
  {
    label: "Flights",
    description:
      "Manage flight records",
    href: "/admin/flights",
    icon: Plane,
  },
  {
    label: "Passengers",
    description:
      "Passenger journey context",
    href: "/admin/passengers",
    icon: Users,
  },
  {
    label: "Lost & Found",
    description:
      "Assistance and reports",
    href: "/admin/lost-and-found",
    icon: PackageSearch,
  },
];

export default function AdminHeader({
  onOpenNavigation,
}: AdminHeaderProps) {
  const pathname = usePathname();

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const [
    operationsOpen,
    setOperationsOpen,
  ] = useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState<
    HeaderNotification[]
  >([]);

  const [
    loadingNotifications,
    setLoadingNotifications,
  ] = useState(true);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const operationsRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications =
      async () => {
        setLoadingNotifications(
          true
        );

        const supabase =
          createClient();

        const {
          data,
          error,
        } = await supabase
          .from("notifications")
          .select(`
            id,
            title,
            message,
            type,
            is_read,
            created_at
          `)
          .order("created_at", {
            ascending: false,
          })
          .limit(5);

        if (error) {
          console.error(
            "Admin header notification error:",
            error
          );

          setLoadingNotifications(
            false
          );

          return;
        }

        setNotifications(
          (data ??
            []) as HeaderNotification[]
        );

        setLoadingNotifications(
          false
        );
      };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          target
        )
      ) {
        setNotificationOpen(
          false
        );
      }

      if (
        operationsRef.current &&
        !operationsRef.current.contains(
          target
        )
      ) {
        setOperationsOpen(
          false
        );
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    setNotificationOpen(false);
    setOperationsOpen(false);
  }, [pathname]);

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.is_read
    ).length;

  return (
    <header className="sticky top-0 z-30 border-b border-[#111820]/10 bg-[#f5f2eb]/90 backdrop-blur-2xl">
      <div className="flex min-h-[88px] items-center px-5 sm:px-8 lg:px-10">
        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={
            onOpenNavigation
          }
          aria-label="Open admin navigation"
          className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#111820]/10 bg-white/55 text-[#111820] transition hover:bg-white lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* LEFT */}
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111820] sm:flex">
            <Plane className="h-4 w-4 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-[#315b78] sm:text-[9px]">
                NOVA / Airport Operations
              </p>

              <span className="hidden h-1 w-1 rounded-full bg-[#111820]/25 sm:block" />

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-[#111820]/35 md:block">
                Control Environment
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-[#111820] sm:text-base">
                Lagos International
                Airport
              </h2>

              <div className="hidden items-center gap-1.5 rounded-full bg-emerald-500/[0.08] px-2.5 py-1 sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />

                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>

                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AIRPORT */}
          <div className="hidden xl:block">
            <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-[#111820]/35">
              Airport
            </p>

            <p className="mt-1 text-xs font-semibold text-[#111820]">
              LOS
            </p>
          </div>

          <div className="mx-2 hidden h-8 w-px bg-[#111820]/10 xl:block" />

          {/* OPERATIONS DROPDOWN */}
          <div
            ref={operationsRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setOperationsOpen(
                  (current) =>
                    !current
                );

                setNotificationOpen(
                  false
                );
              }}
              aria-expanded={
                operationsOpen
              }
              className="group hidden items-center gap-3 rounded-full border border-[#111820]/10 bg-white/55 py-1.5 pl-1.5 pr-3 transition hover:bg-white md:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315b78]/10">
                <Radio className="h-3.5 w-3.5 text-[#315b78]" />
              </span>

              <div className="text-left">
                <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-[#111820]/35">
                  Control
                </p>

                <p className="mt-0.5 text-xs font-semibold text-[#111820]">
                  Operations
                </p>
              </div>

              <ChevronDown
                className={`h-3.5 w-3.5 text-[#111820]/35 transition-transform duration-200 ${
                  operationsOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {operationsOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-[330px] overflow-hidden rounded-[22px] border border-[#111820]/10 bg-[#faf9f6] p-2 shadow-[0_24px_70px_rgba(17,24,32,0.16)]">
                <div className="px-3 pb-3 pt-2">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-[#315b78]">
                    Operations Control
                  </p>

                  <p className="mt-1 text-xs text-[#111820]/50">
                    Navigate operational
                    workspaces.
                  </p>
                </div>

                <div className="space-y-1">
                  {operationLinks.map(
                    ({
                      label,
                      description,
                      href,
                      icon:
                        Icon,
                    }) => {
                      const active =
                        href ===
                        "/admin"
                          ? pathname ===
                            "/admin"
                          : pathname.startsWith(
                              href
                            );

                      return (
                        <Link
                          key={href}
                          href={href}
                          className={`flex items-center gap-3 rounded-[16px] px-3 py-3 transition ${
                            active
                              ? "bg-[#111820] !text-white"
                              : "!text-[#111820] hover:bg-[#111820]/5"
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              active
                                ? "bg-white/10"
                                : "bg-[#315b78]/10"
                            }`}
                          >
                            <Icon
                              className={`h-3.5 w-3.5 ${
                                active
                                  ? "text-white"
                                  : "text-[#315b78]"
                              }`}
                            />
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold">
                              {
                                label
                              }
                            </p>

                            <p
                              className={`mt-1 text-[10px] ${
                                active
                                  ? "text-white/45"
                                  : "text-[#111820]/45"
                              }`}
                            >
                              {
                                description
                              }
                            </p>
                          </div>

                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e8a735]" />
                          )}
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICATION BELL */}
          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setNotificationOpen(
                  (current) =>
                    !current
                );

                setOperationsOpen(
                  false
                );
              }}
              aria-label="Open notifications"
              aria-expanded={
                notificationOpen
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10 bg-white/55 text-[#111820]/65 transition hover:bg-white hover:text-[#111820]"
            >
              <Bell className="h-4 w-4" />

              {unreadCount > 0 && (
                <>
                  <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full bg-[#e8a735] ring-2 ring-[#f5f2eb]" />

                  <span className="sr-only">
                    {unreadCount} unread
                    notifications
                  </span>
                </>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-[min(380px,calc(100vw-32px))] overflow-hidden rounded-[24px] border border-[#111820]/10 bg-[#faf9f6] shadow-[0_24px_70px_rgba(17,24,32,0.16)]">
                {/* PANEL HEADER */}
                <div className="flex items-center justify-between border-b border-[#111820]/10 px-5 py-4">
                  <div>
                    <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-[#315b78]">
                      Communications
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-[#111820]">
                      Recent
                      notifications
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(
                        false
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#111820]/40 transition hover:bg-[#111820]/5 hover:text-[#111820]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* NOTIFICATIONS */}
                <div className="max-h-[390px] overflow-y-auto">
                  {loadingNotifications ? (
                    <div className="flex min-h-[180px] items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#315b78]/20 border-t-[#315b78]" />
                    </div>
                  ) : notifications.length >
                    0 ? (
                    notifications.map(
                      (
                        notification
                      ) => (
                        <Link
                          key={
                            notification.id
                          }
                          href="/admin/notifications"
                          className="group flex gap-3 border-b border-[#111820]/[0.07] px-5 py-4 !text-[#111820] transition last:border-b-0 hover:bg-[#111820]/[0.025]"
                        >
                          <span
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              notification.is_read
                                ? "bg-[#111820]/5"
                                : "bg-[#315b78]/10"
                            }`}
                          >
                            <Send
                              className={`h-3.5 w-3.5 ${
                                notification.is_read
                                  ? "text-[#111820]/35"
                                  : "text-[#315b78]"
                              }`}
                            />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p className="truncate text-xs font-semibold">
                                {
                                  notification.title
                                }
                              </p>

                              {!notification.is_read && (
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a735]" />
                              )}
                            </div>

                            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-[#111820]/50">
                              {
                                notification.message
                              }
                            </p>

                            <div className="mt-2 flex items-center gap-1.5">
                              <Clock3 className="h-3 w-3 text-[#111820]/25" />

                              <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#111820]/35">
                                {formatNotificationTime(
                                  notification.created_at
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                      )
                    )
                  ) : (
                    <div className="flex min-h-[190px] flex-col items-center justify-center px-6 text-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#315b78]/10">
                        <Bell className="h-4 w-4 text-[#315b78]" />
                      </span>

                      <p className="mt-3 text-xs font-semibold text-[#111820]">
                        No notifications
                        yet
                      </p>

                      <p className="mt-1 text-[10px] text-[#111820]/45">
                        Recent passenger
                        communications
                        will appear here.
                      </p>
                    </div>
                  )}
                </div>

                {/* PANEL FOOTER */}
                <div className="border-t border-[#111820]/10 p-3">
                  <Link
                    href="/admin/notifications"
                    className="flex h-10 items-center justify-center rounded-full bg-[#111820] text-xs font-semibold !text-white transition hover:bg-[#315b78] hover:!text-white"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ADMIN IDENTITY */}
          <Link
            href="/admin/settings"
            className="group flex items-center gap-3 rounded-full border border-[#111820]/10 bg-white/55 p-1.5 pr-3 !text-[#111820] transition hover:bg-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111820]">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </span>

            <div className="hidden text-left lg:block">
              <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-[#111820]/35">
                Admin
              </p>

              <p className="mt-0.5 text-xs font-semibold">
                Control
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* STATUS STRIP */}
      <div className="flex h-[28px] items-center justify-between border-t border-[#111820]/[0.06] bg-[#111820]/[0.018] px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-5 overflow-hidden">
          <SystemStatus
            label="Flights"
            value="Monitoring"
          />

          <SystemStatus
            label="Passengers"
            value="Connected"
          />

          <SystemStatus
            label="Operations"
            value="Normal"
            hiddenOnMobile
          />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Route className="h-3 w-3 text-[#111820]/25" />

          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#111820]/30">
            NOVA Airport Control
            System
          </p>
        </div>
      </div>
    </header>
  );
}

function SystemStatus({
  label,
  value,
  hiddenOnMobile = false,
}: {
  label: string;
  value: string;
  hiddenOnMobile?: boolean;
}) {
  return (
    <div
      className={`items-center gap-2 ${
        hiddenOnMobile
          ? "hidden sm:flex"
          : "flex"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

      <p className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.14em] text-[#111820]/40">
        {label}

        <span className="ml-1.5 font-semibold text-[#111820]/65">
          {value}
        </span>
      </p>
    </div>
  );
}

function formatNotificationTime(
  value: string
) {
  const date = new Date(value);

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}