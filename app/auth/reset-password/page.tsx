"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Plane,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  createClient,
} from "@/app/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );

      setLoading(false);
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      setLoading(false);
      return;
    }

    const supabase =
      createClient();

    const {
      error: updateError,
    } =
      await supabase.auth.updateUser({
        password,
      });

    if (updateError) {
      console.error(
        "Password update error:",
        updateError
      );

      setError(
        updateError.message
      );

      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.replace(
        "/auth/sign-in"
      );
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-5 py-8 text-[#111820] sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1400px] items-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#111820]/10 bg-[#faf9f6] shadow-[0_30px_100px_rgba(17,24,32,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT */}
          <section className="relative hidden min-h-[720px] overflow-hidden bg-[#111820] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="absolute -left-20 top-32 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute left-16 top-52 h-40 w-40 rounded-full border border-white/[0.06]" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-3 !text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                  <Plane className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-sm font-semibold tracking-[0.18em]">
                    NOVA
                  </p>

                  <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.2em] text-white/35">
                    Airport Experience
                  </p>
                </div>
              </Link>
            </div>

            <div className="relative z-10 max-w-[480px]">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#e8a735]">
                Secure recovery
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] xl:text-6xl">
                A new key
                <br />
                to your journey.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
                Choose a new password
                to restore secure
                access to your NOVA
                account.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <LockKeyhole className="h-4 w-4 text-[#e8a735]" />

              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                Protected account recovery
              </p>
            </div>
          </section>

          {/* RIGHT */}
          <section className="flex min-h-[650px] items-center px-6 py-12 sm:px-10 lg:min-h-[720px] lg:px-14 xl:px-20">
            <div className="mx-auto w-full max-w-[470px]">
              {!success ? (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#315b78]/10">
                    <KeyRound className="h-5 w-5 text-[#315b78]" />
                  </span>

                  <div className="mt-7">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                      Reset password
                    </p>

                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#111820] sm:text-5xl">
                      Choose a new
                      password.
                    </h2>

                    <p className="mt-4 max-w-md text-sm leading-6 text-[#111820]/55">
                      Use a strong
                      password you
                      haven’t used for
                      this account
                      before.
                    </p>
                  </div>

                  <form
                    onSubmit={
                      handleSubmit
                    }
                    className="mt-9"
                  >
                    <PasswordField
                      label="New password"
                      value={password}
                      onChange={
                        setPassword
                      }
                      visible={
                        showPassword
                      }
                      onToggle={() =>
                        setShowPassword(
                          (current) =>
                            !current
                        )
                      }
                    />

                    <div className="mt-5">
                      <PasswordField
                        label="Confirm password"
                        value={
                          confirmPassword
                        }
                        onChange={
                          setConfirmPassword
                        }
                        visible={
                          showConfirmPassword
                        }
                        onToggle={() =>
                          setShowConfirmPassword(
                            (current) =>
                              !current
                          )
                        }
                      />
                    </div>

                    <PasswordRules
                      password={
                        password
                      }
                    />

                    {error && (
                      <div className="mt-5 rounded-[14px] border border-red-500/15 bg-red-500/[0.07] px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-sm font-semibold !text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update password"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </span>

                  <p className="mt-7 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                    Password updated
                  </p>

                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820]">
                    You’re ready to fly.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#111820]/55">
                    Your password has
                    been changed
                    successfully.
                    Redirecting you
                    back to sign in.
                  </p>

                  <div className="mt-8 h-1 overflow-hidden rounded-full bg-[#111820]/10">
                    <div className="h-full w-full origin-left animate-pulse bg-[#315b78]" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function PasswordField({
  label,
  value,
  visible,
  onChange,
  onToggle,
}: {
  label: string;
  value: string;
  visible: boolean;
  onChange: (
    value: string
  ) => void;
  onToggle: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#111820]/65">
        {label}
      </span>

      <div className="relative">
        <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/30" />

        <input
          type={
            visible
              ? "text"
              : "password"
          }
          required
          minLength={8}
          autoComplete="new-password"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder="••••••••"
          className="h-[52px] w-full rounded-[16px] border border-[#111820]/10 bg-white pl-11 pr-12 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/25 focus:border-[#315b78]/50 focus:ring-2 focus:ring-[#315b78]/10"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#111820]/35 transition hover:bg-[#111820]/5 hover:text-[#111820]"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </label>
  );
}

function PasswordRules({
  password,
}: {
  password: string;
}) {
  const rules = [
    {
      label:
        "At least 8 characters",
      passed:
        password.length >= 8,
    },
    {
      label:
        "Contains a number",
      passed: /\d/.test(
        password
      ),
    },
    {
      label:
        "Contains upper and lowercase",
      passed:
        /[A-Z]/.test(
          password
        ) &&
        /[a-z]/.test(
          password
        ),
    },
  ];

  return (
    <div className="mt-5 rounded-[18px] border border-[#111820]/10 bg-white/55 p-4">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
        Password strength
      </p>

      <div className="mt-3 space-y-2">
        {rules.map(
          (rule) => (
            <div
              key={
                rule.label
              }
              className="flex items-center gap-2"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  rule.passed
                    ? "bg-emerald-500"
                    : "bg-[#111820]/15"
                }`}
              />

              <p
                className={`text-[10px] ${
                  rule.passed
                    ? "font-medium text-emerald-700"
                    : "text-[#111820]/40"
                }`}
              >
                {rule.label}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}