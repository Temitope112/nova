"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/lib/supabase/server";

export async function createLostFoundReport(
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const itemName = String(
    formData.get("item_name") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  const locationLost = String(
    formData.get("location_lost") ?? ""
  ).trim();

  const dateLost = String(
    formData.get("date_lost") ?? ""
  ).trim();

  if (!itemName) {
    throw new Error("Item name is required.");
  }

  const { error } = await supabase
    .from("lost_found_reports")
    .insert({
      user_id: user.id,
      item_name: itemName,
      description: description || null,
      location_lost: locationLost || null,
      date_lost: dateLost || null,
      status: "submitted",
    });

  if (error) {
    console.error(
      "Create lost and found report error:",
      error
    );

    throw new Error(
      "Unable to submit your report."
    );
  }

  revalidatePath(
    "/dashboard/lost-and-found"
  );

  revalidatePath("/dashboard");
}