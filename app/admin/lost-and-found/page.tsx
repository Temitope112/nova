import { createClient } from "@/app/lib/supabase/server";

import LostFoundClient from "./lost-found-client";
import type {
  LostFoundPassenger,
  LostFoundReport,
} from "./types";

export default async function AdminLostFoundPage() {
  const supabase = await createClient();

  const [
    {
      data: reports,
      error: reportsError,
    },
    {
      data: profiles,
      error: profilesError,
    },
  ] = await Promise.all([
    supabase
      .from("lost_found_reports")
      .select(`
        id,
        user_id,
        item_name,
        description,
        location_lost,
        date_lost,
        status,
        created_at,
        updated_at
      `)
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        avatar_url
      `),
  ]);

  if (reportsError) {
    console.error(
      "Admin lost & found reports error:",
      reportsError
    );
  }

  if (profilesError) {
    console.error(
      "Admin lost & found profiles error:",
      profilesError
    );
  }

  const passengerMap = new Map<
    string,
    LostFoundPassenger
  >(
    (profiles ?? []).map((profile) => [
      profile.id,
      {
        id: profile.id,
        full_name: profile.full_name,
        avatar_url:
          profile.avatar_url,
      },
    ])
  );

  const lostFoundReports: LostFoundReport[] =
    (reports ?? []).map((report) => ({
      ...report,

      passenger: report.user_id
        ? passengerMap.get(
            report.user_id
          ) ?? null
        : null,
    })) as LostFoundReport[];

  return (
    <LostFoundClient
      reports={lostFoundReports}
    />
  );
}