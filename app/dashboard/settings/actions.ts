"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/lib/supabase/server";

export async function updatePreferences(
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const flightUpdates =
    formData.get("flight_updates") === "on";

  const gateChanges =
    formData.get("gate_changes") === "on";

  const journeyReminders =
    formData.get("journey_reminders") === "on";

  const lostFoundUpdates =
    formData.get("lost_found_updates") === "on";

  const { error } = await supabase
    .from("user_preferences")
    .upsert(
      {
        user_id: user.id,
        flight_updates: flightUpdates,
        gate_changes: gateChanges,
        journey_reminders: journeyReminders,
        lost_found_updates: lostFoundUpdates,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

  if (error) {
    console.error(
      "Preferences update error:",
      error
    );

    throw new Error(
      "Unable to update preferences."
    );
  }

  revalidatePath("/dashboard/settings");
}