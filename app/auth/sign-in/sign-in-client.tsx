"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Plane } from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";

export default function SignInClient() {
  const supabase = createClient();

  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedRedirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setMessage(authError.message);
      setLoading(false);
      return;
    }

    const user = authData.user;

    if (!user) {
      setMessage("Unable to verify your account.");
      setLoading(false);
      return;
    }

    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleError || !roleData) {
      setMessage("Your account role could not be verified.");
      setLoading(false);
      return;
    }

    const role = roleData.role as "passenger" | "admin";

    const isAdminPath =
      requestedRedirect === "/admin" ||
      requestedRedirect?.startsWith("/admin/");

    const isPassengerPath =
      requestedRedirect === "/dashboard" ||
      requestedRedirect?.startsWith("/dashboard/");

    let destination: string;

    if (role === "admin") {
      destination =
        requestedRedirect && isAdminPath ? requestedRedirect : "/admin";
    } else {
      destination =
        requestedRedirect && isPassengerPath ? requestedRedirect : "/dashboard";
    }

    router.replace(destination);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#111820]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-[#111820] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -left-36 top-20 h-[420px] w-[420px] rounded-full bg-[#315b78]/25 blur-[130px]" />

          <div className="absolute -bottom-40 right-[-80px] h-[420px] w-[420px] rounded-full bg-[#e8a735]/10 blur-[130px]" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.18em] !text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <Plane className="h-4 w-4" />
              </span>
              NOVA
            </Link>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#e8a735]">
              Welcome back
            </p>

            <h2 className="mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.05em] xl:text-6xl">
              Your journey
              <br />
              picks up
              <br />
              where you left it.
            </h2>

            <p className="mt-7 max-w-md text-base leading-7 text-white/50">
              Sign in to view your saved flights, manage your journey and
              continue your personalized NOVA airport experience.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            <span>NOVA / LOS</span>
            <span>secure access</span>
          </div>
        </section>

        {/* FORM */}
        <section className="flex items-center justify-center px-6 py-28 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-[540px]">
            {/* MOBILE LOGO */}
            <div className="lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.16em] !text-[#111820]"
              >
                <Plane className="h-4 w-4" />
                NOVA
              </Link>
            </div>

            {/* HEADER */}
            <div className="mt-10 lg:mt-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#315b78]">
                NOVA sign in
              </p>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Sign in to NOVA.
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#111820]/55">
                New to NOVA?{" "}
                <Link
                  href={
                    requestedRedirect
                      ? `/auth/sign-up?redirect=${encodeURIComponent(
                          requestedRedirect,
                        )}`
                      : "/auth/sign-up"
                  }
                  className="font-medium !text-[#111820] underline decoration-[#111820]/30 underline-offset-4 transition hover:decoration-[#111820]"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSignIn} className="mt-10 space-y-6">
              {/* EMAIL */}
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

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-[0.12em] text-[#111820]/60"
                  >
                    Password
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-xs !text-[#315b78] transition hover:!text-[#111820]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
              </div>

              {/* REMEMBER ME */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-[#111820]"
                />

                <span className="text-xs text-[#111820]/55">
                  Keep me signed in
                </span>
              </label>

              {/* ERROR MESSAGE */}
              {message && (
                <div
                  role="alert"
                  className="border-l-2 border-red-500 bg-red-500/5 px-4 py-3 text-sm text-red-700"
                >
                  {message}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-between rounded-full bg-[#111820] px-6 py-4 text-sm font-medium !text-white transition hover:bg-[#315b78] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Signing you in..." : "Sign in"}</span>

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#111820]/35">
              Secure access · NOVA
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
