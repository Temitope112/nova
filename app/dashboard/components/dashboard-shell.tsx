"use client";

import { useState } from "react";

import DashboardSidebar from "./dashboard-sidebar";
import DashboardHeader from "./dashboard-header";

type DashboardShellProps = {
  children: React.ReactNode;
  fullName: string;
  avatarUrl: string | null;
  unreadNotifications: number;
};

export default function DashboardShell({
  children,
  fullName,
  avatarUrl,
  unreadNotifications,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#111820]">
      <DashboardSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[260px]">
        <DashboardHeader
          fullName={fullName}
          avatarUrl={avatarUrl}
          unreadNotifications={unreadNotifications}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}