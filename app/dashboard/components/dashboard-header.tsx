"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import UserMenu from "./user-menu";

type DashboardHeaderProps = {
  fullName: string;
  avatarUrl: string | null;
  unreadNotifications: number;
  onMenuClick: () => void;
};

export default function DashboardHeader({
  fullName,
  avatarUrl,
  unreadNotifications,
  onMenuClick,
}: DashboardHeaderProps) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const firstName = fullName.trim().split(" ")[0] || "Passenger";

  const initial = firstName.charAt(0).toUpperCase();

  const handleNotificationClick = () => {
    router.push("/dashboard/notifications");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#111820]/10 bg-[#f5f2eb]/90 px-6 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10 bg-white/60 transition hover:bg-white lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#315b78]">
            Passenger portal
          </p>

          <h1 className="mt-1 text-lg font-medium">
            Welcome back, {firstName}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          onClick={handleNotificationClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#111820]/10 bg-white/60 transition hover:bg-white"
          aria-label={
            unreadNotifications > 0
              ? `${unreadNotifications} unread notifications`
              : "Notifications"
          }
        >
          <Bell className="h-4 w-4" />

          {unreadNotifications > 0 && (
            <>
              <span className="absolute right-1.5 top-1.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#e8a735] px-1 text-[9px] font-semibold text-[#111820]">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            </>
          )}
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-full border border-[#111820]/10 bg-white/60 p-1.5 pr-3 transition hover:bg-white"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${fullName}'s profile`}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111820] text-xs font-semibold text-white">
                {initial}
              </div>
            )}

            <span className="hidden text-sm font-medium sm:block">
              {firstName}
            </span>

            <ChevronDown
              className={`h-4 w-4 text-[#111820]/45 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && <UserMenu onClose={() => setMenuOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
