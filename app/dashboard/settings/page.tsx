import Link from "next/link";

import {
  ArrowUpRight,
  LockKeyhole,
  Settings2,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/server";

import SettingsForm from "./settings-form";

type UserPreferences = {
  flight_updates: boolean;
  gate_changes: boolean;
  journey_reminders: boolean;
  lost_found_updates: boolean;
};

const defaultPreferences: UserPreferences = {
  flight_updates: true,
  gate_changes: true,
  journey_reminders: true,
  lost_found_updates: true,
};

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase
    .from("user_preferences")
    .select(`
      flight_updates,
      gate_changes,
      journey_reminders,
      lost_found_updates
    `)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "Preferences fetch error:",
      error
    );
  }

  const preferences: UserPreferences =
    data ?? defaultPreferences;

  return (
    <div className="mx-auto max-w-[1000px]">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          Account
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
          Settings
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#111820]/65">
          Control how NOVA communicates with you
          and manage your account preferences.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        <SettingsForm
          flightUpdates={
            preferences.flight_updates
          }
          gateChanges={
            preferences.gate_changes
          }
          journeyReminders={
            preferences.journey_reminders
          }
          lostFoundUpdates={
            preferences.lost_found_updates
          }
        />

        <section
          className="
            rounded-[28px]
            border
            border-[#111820]/10
            bg-white/70
            p-6
            sm:p-8
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#e9e0d2]
                text-[#111820]
              "
            >
              <LockKeyhole className="h-4 w-4" />
            </div>

            <div className="flex-1">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#315b78]">
                Security
              </p>

              <h2 className="mt-2 text-xl font-semibold text-[#111820]">
                Password & account security
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#111820]/55">
                Your password and authentication
                details are managed separately from
                your passenger profile.
              </p>

              <Link
                href="/auth/forgot-password"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  !text-[#315b78]
                "
              >
                Change password

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <div
          className="
            flex
            items-start
            gap-3
            rounded-2xl
            bg-[#111820]/[0.035]
            px-5
            py-4
          "
        >
          <Settings2 className="mt-0.5 h-4 w-4 shrink-0 text-[#315b78]" />

          <p className="text-xs leading-5 text-[#111820]/50">
            These preferences are stored against
            your NOVA passenger account and remain
            available across sessions.
          </p>
        </div>
      </div>
    </div>
  );
}