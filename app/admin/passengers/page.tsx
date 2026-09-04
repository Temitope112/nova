import { createClient } from "@/app/lib/supabase/server";

import PassengersClient from "./passengers-client";
import type {
  AdminPassenger,
  PassengerJourney,
} from "./types";

export default async function AdminPassengersPage() {
  const supabase = await createClient();

  const { data: profiles, error: profilesError } =
    await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        avatar_url,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      });

  if (profilesError) {
    console.error(
      "Admin passengers fetch error:",
      profilesError
    );
  }

  const { data: journeys, error: journeysError } =
    await supabase
      .from("journeys")
      .select(`
        id,
        user_id,
        status,
        created_at,
        flight_id,
        flight:flights (
          id,
          flight_number,
          origin_code,
          destination_code,
          departure_at,
          terminal,
          gate,
          status
        )
      `)
      .order("created_at", {
        ascending: false,
      });

  if (journeysError) {
    console.error(
      "Admin journeys fetch error:",
      journeysError
    );
  }

  const passengers: AdminPassenger[] =
    (profiles ?? []).map((profile) => {
      const passengerJourneys =
        (journeys ?? [])
          .filter(
            (journey) =>
              journey.user_id === profile.id
          )
          .map((journey) => ({
            id: journey.id,
            status: journey.status,
            created_at: journey.created_at,
            flight_id: journey.flight_id,
            flight:
              Array.isArray(journey.flight)
                ? journey.flight[0] ?? null
                : journey.flight ?? null,
          })) as PassengerJourney[];

      return {
        id: profile.id,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        created_at: profile.created_at,
        journeys: passengerJourneys,
      };
    });

  return (
    <PassengersClient
      passengers={passengers}
    />
  );
}