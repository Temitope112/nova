import {
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/server";

import ProfileForm from "./profile-form";

type Profile = {
  full_name: string | null;
  avatar_url: string | null;
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const {
    data: profile,
    error,
  } = await supabase
    .from("profiles")
    .select(`
      full_name,
      avatar_url
    `)
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "Profile fetch error:",
      error
    );
  }

  const userProfile =
    profile as Profile | null;

  const fullName =
    userProfile?.full_name ??
    user.user_metadata?.full_name ??
    "";

  const email =
    user.email ?? "";

  const initial =
    fullName
      .trim()
      .charAt(0)
      .toUpperCase() || "N";

  return (
    <div className="mx-auto max-w-[1000px]">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          Account
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
          Profile
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#111820]/65">
          Manage the personal information
          connected to your NOVA passenger
          account.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside
          className="
            self-start
            rounded-[28px]
            bg-[#111820]
            p-7
            text-white
          "
        >
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-full
              bg-[#faf9f6]

              text-2xl
              font-semibold
              text-[#111820]
            "
          >
            {userProfile?.avatar_url ? (
              <img
                src={userProfile.avatar_url}
                alt={fullName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            {fullName || "Passenger"}
          </h2>

          <p className="mt-1 break-all text-xs text-white/45">
            {email}
          </p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#e8a735]" />

              <div>
                <p className="text-xs font-semibold text-white">
                  Secure passenger account
                </p>

                <p className="mt-1 text-[11px] leading-5 text-white/40">
                  Authentication and account
                  security are managed securely
                  through NOVA.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <ProfileForm
          fullName={fullName}
          email={email}
        />
      </div>
    </div>
  );
}