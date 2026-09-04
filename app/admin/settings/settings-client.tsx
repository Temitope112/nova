"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Bell,
  CheckCircle2,
  Loader2,
  Monitor,
  Save,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";

import type {
  AdminSettingsProfile,
} from "./types";

type SettingsClientProps = {
  profile: AdminSettingsProfile;
  email: string;
};

export default function SettingsClient({
  profile,
  email,
}: SettingsClientProps) {
  const [fullName, setFullName] =
    useState(
      profile.full_name ?? ""
    );

  const [
    compactTables,
    setCompactTables,
  ] = useState(false);

  const [
    operationSounds,
    setOperationSounds,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    const storedCompact =
      localStorage.getItem(
        "nova-admin-compact-tables"
      );

    const storedSounds =
      localStorage.getItem(
        "nova-admin-operation-sounds"
      );

    setCompactTables(
      storedCompact === "true"
    );

    setOperationSounds(
      storedSounds === "true"
    );
  }, []);

  const handleProfileSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setLoading(true);
      setError("");
      setSuccess("");

      if (!fullName.trim()) {
        setError(
          "Enter your full name."
        );
        setLoading(false);
        return;
      }

      const supabase =
        createClient();

      const { error: updateError } =
        await supabase
          .from("profiles")
          .update({
            full_name:
              fullName.trim(),
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", profile.id);

      if (updateError) {
        console.error(
          "Admin profile update error:",
          updateError
        );

        setError(
          updateError.message
        );

        setLoading(false);
        return;
      }

      setSuccess(
        "Profile updated successfully."
      );

      setLoading(false);
    };

  const handleCompactTables =
    (value: boolean) => {
      setCompactTables(value);

      localStorage.setItem(
        "nova-admin-compact-tables",
        String(value)
      );
    };

  const handleOperationSounds =
    (value: boolean) => {
      setOperationSounds(value);

      localStorage.setItem(
        "nova-admin-operation-sounds",
        String(value)
      );
    };

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* HEADER */}
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          System
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
          Settings
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
          Manage your NOVA admin
          profile and interface
          preferences.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {/* PROFILE */}
        <section className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111820]">
              <UserRound className="h-4 w-4 text-white" />
            </span>

            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                Administrator
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
                Profile
              </h2>

              <p className="mt-2 text-sm text-[#111820]/55">
                Update the identity
                associated with your
                NOVA admin account.
              </p>
            </div>
          </div>

          <form
            onSubmit={
              handleProfileSubmit
            }
            className="mt-8"
          >
            <Field
              label="Full name"
              required
            >
              <input
                required
                value={fullName}
                onChange={(event) =>
                  setFullName(
                    event.target.value
                  )
                }
                placeholder="Administrator name"
                className={
                  inputStyles
                }
              />
            </Field>

            <div className="mt-5">
              <Field label="Email">
                <input
                  value={email}
                  readOnly
                  className={`${inputStyles} cursor-not-allowed bg-[#111820]/[0.035] text-[#111820]/55`}
                />
              </Field>

              <p className="mt-2 text-xs leading-5 text-[#111820]/45">
                Email is managed by
                your authentication
                account and cannot be
                changed here yet.
              </p>
            </div>

            <div className="mt-5">
              <Field label="Role">
                <div className="flex h-12 items-center gap-2 rounded-xl border border-[#111820]/10 bg-[#111820]/[0.035] px-4">
                  <ShieldCheck className="h-4 w-4 text-[#315b78]" />

                  <span className="text-sm font-semibold text-[#111820]/70">
                    Administrator
                  </span>
                </div>
              </Field>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.07] px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.07] px-4 py-3 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />

                {success}
              </div>
            )}

            <div className="mt-7 flex justify-end border-t border-[#111820]/10 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111820] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* INTERFACE */}
          <section className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                  Interface
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#111820]">
                  Workspace preferences
                </h2>
              </div>

              <Monitor className="h-5 w-5 text-[#315b78]" />
            </div>

            <div className="mt-6 divide-y divide-[#111820]/10">
              <PreferenceRow
                icon={Settings2}
                title="Compact tables"
                description="Use tighter spacing for data-heavy admin views."
                checked={
                  compactTables
                }
                onChange={
                  handleCompactTables
                }
              />

              <PreferenceRow
                icon={Bell}
                title="Operation sounds"
                description="Prepare the admin interface for operational alert sounds."
                checked={
                  operationSounds
                }
                onChange={
                  handleOperationSounds
                }
              />
            </div>
          </section>

          {/* SECURITY */}
          <section className="rounded-[28px] bg-[#111820] p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e8a735]">
                  Access Control
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                  Admin security
                </h2>
              </div>

              <ShieldCheck className="h-5 w-5 text-white/50" />
            </div>

            <p className="mt-4 text-sm leading-6 text-white/55">
              Administrative access
              is determined by your
              authenticated NOVA
              account and assigned
              admin role.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.05] p-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <div>
                <p className="text-sm font-semibold">
                  Admin access active
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Protected by
                  server-side role
                  checks and database
                  policies.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: typeof Settings2;
  title: string;
  description: string;
  checked: boolean;
  onChange: (
    value: boolean
  ) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0">
      <div className="flex gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#315b78]/10">
          <Icon className="h-4 w-4 text-[#315b78]" />
        </span>

        <div>
          <p className="text-sm font-semibold text-[#111820]">
            {title}
          </p>

          <p className="mt-1 max-w-[320px] text-xs leading-5 text-[#111820]/50">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked
            ? "bg-[#315b78]"
            : "bg-[#111820]/15"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
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

const inputStyles =
  "h-12 w-full rounded-xl border border-[#111820]/10 bg-white px-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/35 focus:border-[#315b78]/50 focus:ring-2 focus:ring-[#315b78]/10";