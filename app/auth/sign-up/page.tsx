"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Plane,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";

export default function SignUpPage() {
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    }),
    [password]
  );

  const passwordIsValid = Object.values(passwordChecks).every(Boolean);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!passwordIsValid) {
      setMessage("Your password does not meet all the requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setMessage("Please accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111820] px-6 py-24 text-white">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#315b78]/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-[#e8a735]/10 blur-[120px]" />

        <div className="relative z-10 w-full max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Check className="h-6 w-6 text-[#e8a735]" />
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-[#e8a735]">
            Account created
          </p>

          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Check your inbox.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/55 sm:text-base">
            We sent a confirmation link to{" "}
            <span className="text-white">{email}</span>. Confirm your email to
            activate your NOVA account.
          </p>

          <Link
            href="/auth/sign-in"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#f5f2eb] px-6 py-3 text-sm font-medium text-[#111820] transition hover:bg-white"
          >
            Continue to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#111820]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#111820] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -left-36 top-20 h-[420px] w-[420px] rounded-full bg-[#315b78]/25 blur-[130px]" />
          <div className="absolute -bottom-40 right-[-80px] h-[420px] w-[420px] rounded-full bg-[#e8a735]/10 blur-[130px]" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.18em]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <Plane className="h-4 w-4" />
              </span>

              NOVA
            </Link>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#e8a735]">
              Your journey starts here
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.05em] xl:text-6xl">
              One account.
              <br />
              Your airport,
              <br />
              remembered.
            </h2>

            <p className="mt-7 max-w-md text-base leading-7 text-white/50">
              Save flights, manage journeys and keep the parts of your airport
              experience that matter to you in one place.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            <span>NOVA / LOS</span>
            <span>Building the journey around you</span>
          </div>
        </section>

        {/* FORM SIDE */}
        <section className="flex items-center justify-center px-6 py-28 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-[540px]">
            <div className="lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.16em]"
              >
                <Plane className="h-4 w-4" />
                NOVA
              </Link>
            </div>

            <div className="mt-10 lg:mt-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#315b78]">
                Passenger account
              </p>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Create your account.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#111820]/55">
                Already travelling with NOVA?{" "}
                <Link
                  href="/auth/sign-in"
                  className="font-medium text-[#111820] underline decoration-[#111820]/30 underline-offset-4 transition hover:decoration-[#111820]"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSignUp} className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#111820]/60"
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full border-0 border-b border-[#111820]/20 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-[#111820]/30 focus:border-[#315b78]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#111820]/60"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full border-0 border-b border-[#111820]/20 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-[#111820]/30 focus:border-[#315b78]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#111820]/60"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="w-full border-0 border-b border-[#111820]/20 bg-transparent py-3 pr-12 text-base outline-none transition placeholder:text-[#111820]/30 focus:border-[#315b78]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#111820]/45 transition hover:text-[#111820]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {password && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <PasswordCheck
                      valid={passwordChecks.length}
                      label="8+ characters"
                    />

                    <PasswordCheck
                      valid={passwordChecks.uppercase}
                      label="Uppercase letter"
                    />

                    <PasswordCheck
                      valid={passwordChecks.lowercase}
                      label="Lowercase letter"
                    />

                    <PasswordCheck
                      valid={passwordChecks.number}
                      label="Number"
                    />
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#111820]/60"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password again"
                    required
                    className="w-full border-0 border-b border-[#111820]/20 bg-transparent py-3 pr-12 text-base outline-none transition placeholder:text-[#111820]/30 focus:border-[#315b78]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#111820]/45 transition hover:text-[#111820]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-2 text-xs text-red-600">
                    Passwords do not match.
                  </p>
                )}

                {confirmPassword && password === confirmPassword && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                    Passwords match.
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#111820]"
                />

                <span className="text-xs leading-5 text-[#111820]/55">
                  I agree to NOVA&apos;s{" "}
                  <Link
                    href="/terms"
                    className="text-[#111820] underline underline-offset-2"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#111820] underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {message && (
                <div
                  role="alert"
                  className="border-l-2 border-red-500 bg-red-500/5 px-4 py-3 text-sm text-red-700"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-between rounded-full bg-[#111820] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>
                  {loading ? "Creating your account..." : "Create account"}
                </span>

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#111820]/35">
              Secure passenger access · Powered by NOVA
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function PasswordCheck({
  valid,
  label,
}: {
  valid: boolean;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs transition ${
        valid ? "text-emerald-700" : "text-[#111820]/40"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          valid
            ? "border-emerald-600 bg-emerald-600 text-white"
            : "border-[#111820]/20"
        }`}
      >
        {valid && <Check className="h-2.5 w-2.5" />}
      </span>

      {label}
    </div>
  );
}