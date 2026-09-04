"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CircleUserRound,
  Compass,
  House,
  LogOut,
  Map,
  Plane,
  Search,
  Settings,
  Star,
  X,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";

type DashboardSidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

const sections = [
  {
    label: "Overview",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: House,
      },
    ],
  },
  {
    label: "Travel",
    items: [
      {
        label: "My Journey",
        href: "/dashboard/journey",
        icon: Map,
      },
      {
        label: "Saved Flights",
        href: "/dashboard/saved-flights",
        icon: Star,
      },
      {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
    ],
  },
  {
    label: "Assistance",
    items: [
      {
        label: "Lost & Found",
        href: "/dashboard/lost-and-found",
        icon: Search,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: CircleUserRound,
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function DashboardSidebar({
  mobileOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#101820] text-white shadow-2xl transition-transform duration-300 ease-out lg:w-[260px] lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* BRAND */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-6 lg:px-7 lg:py-7">
          <Link
            href="/"
            onClick={onClose}
            className="inline-flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05]">
              <Plane className="h-4 w-4 text-white" />
            </span>

            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-white">
                NOVA
              </p>

              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/55">
                Passenger Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/75 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {sections.map((section) => (
            <div key={section.label} className="mb-7 last:mb-0">
              <p className="mb-2 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-white/55">
                {section.label}
              </p>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between rounded-xl px-3.5 py-3.5 text-sm transition-all duration-200 ${
                        active
                          ? "bg-[#f5f2eb] shadow-sm"
                          : "hover:bg-white/[0.07]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          className={`h-[17px] w-[17px] shrink-0 transition ${
                            active
                              ? "text-[#315b78]"
                              : "text-white/65 group-hover:text-white"
                          }`}
                        />

                        <span
                          className={`font-semibold ${
                            active
                              ? "!text-[#111820]"
                              : "!text-white/90 group-hover:!text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>

                      {active && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a735]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/[0.07] p-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium !text-white/85 transition hover:bg-white/[0.07] hover:!text-white"
          >
            <Compass className="h-4 w-4 text-white/65" />
            Return to airport
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium !text-white/85 transition hover:bg-red-500/10 hover:!text-red-300"
          >
            <LogOut className="h-4 w-4 text-white/65" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}