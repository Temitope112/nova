import { Suspense } from "react";
import SignInClient from "./sign-in-client";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] text-[#111820]">
          <p className="text-sm text-[#111820]/50">
            Loading sign in...
          </p>
        </main>
      }
    >
      <SignInClient />
    </Suspense>
  );
}