import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import JourneyPage from "./components/journey-page";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
  redirect("/auth/sign-in?redirect=/dashboard/journey");
}

  return <JourneyPage />;
}