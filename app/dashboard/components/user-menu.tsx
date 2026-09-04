"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CircleUserRound,
  LogOut,
  Settings,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";

type UserMenuProps = {
  onClose: () => void;
};

export default function UserMenu({
  onClose,
}: UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/");
    router.refresh();
  };

  return (
    <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-[#111820]/10 bg-[#faf9f6] p-2 shadow-xl">
      <Link
        href="/dashboard/profile"
        onClick={onClose}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-[#111820]/5"
      >
        <CircleUserRound className="h-4 w-4" />
        Profile
      </Link>

      <Link
        href="/dashboard/settings"
        onClick={onClose}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-[#111820]/5"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>

      <div className="my-1 border-t border-[#111820]/10" />

      <button
        type="button"
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}