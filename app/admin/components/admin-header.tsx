"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Plane,
  Radio,
  ShieldCheck,
} from "lucide-react";

type AdminHeaderProps = {
  onOpenNavigation: () => void;
};

export default function AdminHeader({
  onOpenNavigation,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#111820]/10 bg-[#f5f2eb]/90 backdrop-blur-2xl">
      <div className="flex min-h-[88px] items-center px-5 sm:px-8 lg:px-10">
        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={onOpenNavigation}
          aria-label="Open admin navigation"
          className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#111820]/10 bg-white/50 text-[#111820] transition hover:bg-white lg:hidden"
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

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-[#111820]/35 sm:block">
                Control Environment
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-[#111820] sm:text-base">
                Lagos International Airport
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
        <div className="flex items-center gap-3 sm:gap-4">
          {/* OPERATIONS META */}
          <div className="hidden items-center gap-6 xl:flex">
            <HeaderMeta
              label="Airport"
              value="LOS"
            />

            <div className="h-8 w-px bg-[#111820]/10" />

            <HeaderMeta
              label="Terminal"
              value="All"
            />

            <div className="h-8 w-px bg-[#111820]/10" />

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315b78]/10">
                <Radio className="h-3.5 w-3.5 text-[#315b78]" />
              </span>

              <div>
                <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-[#111820]/35">
                  Network
                </p>

                <p className="mt-1 text-xs font-semibold text-[#111820]">
                  Live
                </p>
              </div>
            </div>
          </div>

          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10 bg-white/55 text-[#111820]/65 transition hover:bg-white hover:text-[#111820]"
          >
            <Bell className="h-4 w-4" />

            <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#e8a735] ring-2 ring-[#f5f2eb]" />
          </button>

          {/* ADMIN IDENTITY */}
          <button
            type="button"
            className="group flex items-center gap-3 rounded-full border border-[#111820]/10 bg-white/55 p-1.5 pr-3 transition hover:bg-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111820] text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>

            <div className="hidden text-left md:block">
              <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-[#111820]/35">
                Admin
              </p>

              <p className="mt-0.5 text-xs font-semibold text-[#111820]">
                Operations
              </p>
            </div>

            <ChevronDown className="hidden h-3.5 w-3.5 text-[#111820]/35 transition group-hover:text-[#111820] md:block" />
          </button>
        </div>
      </div>

      {/* LOWER STATUS STRIP */}
      <div className="flex h-[28px] items-center justify-between border-t border-[#111820]/[0.06] bg-[#111820]/[0.018] px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-5 overflow-hidden">
          <StatusText
            label="Flights"
            value="Monitoring"
          />

          <StatusText
            label="Passengers"
            value="Connected"
          />

          <StatusText
            label="Operations"
            value="Normal"
            className="hidden sm:flex"
          />
        </div>

        <p className="hidden font-mono text-[7px] uppercase tracking-[0.15em] text-[#111820]/30 md:block">
          NOVA Airport Control System
        </p>
      </div>
    </header>
  );
}

function HeaderMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-[#111820]/35">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-[#111820]">
        {value}
      </p>
    </div>
  );
}

function StatusText({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`items-center gap-2 ${className || "flex"}`}
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