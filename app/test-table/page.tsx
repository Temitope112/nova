import { createClient } from "../lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-[#111820] p-10 text-white">
      <h1 className="text-3xl font-semibold">
        NOVA × Supabase
      </h1>

      <div className="mt-6">
        {error ? (
          <p>Connection error: {error.message}</p>
        ) : user ? (
          <p>Connected. Signed in as {user.email}</p>
        ) : (
          <p>Connected. No authenticated user yet.</p>
        )}
      </div>
    </main>
  );
}