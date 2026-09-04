"use client";

import { useState } from "react";

import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#111820]">
      <AdminSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="lg:pl-[260px]">
        <AdminHeader
          onOpenNavigation={() =>
            setMobileNavOpen(true)
          }
        />

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}