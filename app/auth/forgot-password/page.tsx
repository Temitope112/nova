"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Plane,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Enter your email address.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();

    const redirectTo =
      `${window.location.origin}/auth/reset-password`;

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo,
        },
      );

    if (resetError) {
      console.error(
        "Password recovery error:",
        resetError,
      );

      setError(
        "We couldn't process your recovery request right now. Please try again.",
      );

      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-5 py-8 text-[#111820] sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1400px] items-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#111820]/10 bg-[#faf9f6] shadow-[0_30px_100px_rgba(17,24,32,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT */}
          <section className="relative hidden min-h-[720px] overflow-hidden bg-[#111820] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-8 top-20 h-52 w-52 rounded-full border border-white/[0.06]" />
            <div className="absolute bottom-24 left-16 h-px w-[70%] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

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

            <div className="relative z-10 max-w-[470px]">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#e8a735]">
                Account recovery
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] xl:text-6xl">
                Access,
                <br />
                restored.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
                Request a secure recovery link and return to your NOVA journey.
              </p>
            </div>

            <p className="relative z-10 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              Find · Prepare · Navigate · Experience
            </p>
          </section>

          {/* RIGHT */}
          <section className="flex min-h-[650px] items-center px-6 py-12 sm:px-10 lg:min-h-[720px] lg:px-14 xl:px-20">
            <div className="mx-auto w-full max-w-[470px]">
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center gap-2 text-xs font-semibold !text-[#111820]/55 transition hover:!text-[#111820]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to sign in
              </Link>

              {!success ? (
                <>
                  <div className="mt-10">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                      Password recovery
                    </p>

                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#111820] sm:text-5xl">
                      Forgot your password?
                    </h2>

                    <p className="mt-4 max-w-md text-sm leading-6 text-[#111820]/55">
                      Enter the email connected to your NOVA account and we’ll
                      send you a secure reset link.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-9"
                  >
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-[#111820]/65">
                        Email address
                      </span>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/30" />

                        <input
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                          placeholder="you@example.com"
                          className="h-[52px] w-full rounded-[16px] border border-[#111820]/10 bg-white py-3.5 pl-11 pr-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/30 focus:border-[#315b78]/50 focus:ring-2 focus:ring-[#315b78]/10"
                        />
                      </div>
                    </label>

                    {error && (
                      <div className="mt-4 rounded-[14px] border border-red-500/15 bg-red-500/[0.07] px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-sm font-semibold !text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send recovery email"
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-xs text-[#111820]/45">
                    Remembered your password?{" "}
                    <Link
                      href="/auth/sign-in"
                      className="font-semibold !text-[#315b78]"
                    >
                      Sign in
                    </Link>
                  </p>
                </>
              ) : (
                <div className="mt-16">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </span>

                  <p className="mt-7 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                    Recovery requested
                  </p>

                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820]">
                    Password reset link sent.
                  </h2>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#111820]/55">
                    Check your inbox for instructions to reset your password.
                  </p>

                  <div className="mt-8 rounded-[20px] border border-[#111820]/10 bg-white/60 p-5">
                    <p className="text-xs leading-6 text-[#111820]/50">
                      Follow the link in the recovery email to create a new
                      password. If you don&apos;t see the email, check your spam
                      or junk folder.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSuccess(false);
                        setError("");
                        setEmail("");
                      }}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-[#111820]/10 bg-white px-6 text-sm font-semibold text-[#111820] transition hover:bg-[#111820]/5"
                    >
                      Try another email
                    </button>

                    <Link
                      href="/auth/sign-in"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#111820] px-6 text-sm font-semibold !text-white transition hover:bg-[#315b78]"
                    >
                      Return to sign in
                    </Link>
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