import { createClient } from "@/app/lib/supabase/server";

import OperationsClient from "./operations-client";
import type {
  OperationsData,
  OperationsFlight,
  OperationsJourney,
} from "./types";

export default async function AdminOperationsPage() {
  const supabase = await createClient();

  const [
    { data: flights, error: flightsError },
    { data: journeys, error: journeysError },
  ] = await Promise.all([
    supabase
      .from("flights")
      .select(`
        id,
        flight_number,
        airline_name,
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
      }),

    supabase
      .from("journeys")
      .select(`
        id,
        user_id,
        flight_id,
        status
      `),
  ]);

  if (flightsError) {
    console.error(
      "Operations flights error:",
      flightsError
    );
  }

  if (journeysError) {
    console.error(
      "Operations journeys error:",
      journeysError
    );
  }

  const operationsData: OperationsData = {
    flights:
      (flights as OperationsFlight[] | null) ??
      [],
    journeys:
      (journeys as OperationsJourney[] | null) ??
      [],
  };

  return (
    <OperationsClient
      data={operationsData}
    />
  );
}