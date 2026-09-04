"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/lib/supabase/server";

export async function updateProfile(
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const fullName = String(
    formData.get("full_name") ?? ""
  ).trim();

  if (!fullName) {
    throw new Error("Full name is required.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
    })
    .eq("id", user.id);

  if (error) {
    console.error(
      "Profile update error:",
      error
    );

    throw new Error(
      "Unable to update profile."
    );
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
}