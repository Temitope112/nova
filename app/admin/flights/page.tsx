import { createClient } from "@/app/lib/supabase/server";

import FlightsClient from "./flights-client";
import type { AdminFlight } from "./types";

export default async function AdminFlightsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("flights")
    .select(`
      id,
      flight_number,
      airline_name,
      airline_code,
      origin_code,
      origin_city,
      destination_code,
      destination_city,
      departure_at,
      arrival_at,
      terminal,
      gate,
      status
    `)
    .order("departure_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Admin flights fetch error:",
      error
    );
  }

  const flights: AdminFlight[] =
    (data ?? []) as AdminFlight[];

  return (
    <FlightsClient flights={flights} />
  );
}