import { createClient } from "@/app/lib/supabase/server";
import ActiveJourney from "./active-journey";
import JourneyBuilder from "./journey-builder";

type Flight = {
  id: string;
  flight_number: string;
  airline_name: string;
  airline_code: string | null;
  origin_code: string;
  origin_city: string;
  destination_code: string;
  destination_city: string;
  departure_at: string;
  arrival_at: string | null;
  terminal: string | null;
  gate: string | null;
  status: string;
};

type JourneyWithFlight = {
  id: string;
  status: string;
  created_at: string;
  flight: Flight;
};

type JourneyPageProps = {
  searchParams: Promise<{
    change?: string;
  }>;
};

export default async function JourneyPage({
  searchParams,
}: JourneyPageProps) {
  const supabase = await createClient();

  const { change } = await searchParams;
  const isChangingJourney = change === "true";

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  // --------------------------------------------------
  // GET CURRENT JOURNEY
  // --------------------------------------------------

  const {
    data: journeyData,
    error: journeyError,
  } = await supabase
    .from("journeys")
    .select(`
      id,
      flight_id,
      status,
      created_at
    `)
    .eq("user_id", user.id)
    .in("status", ["upcoming", "active"])
    .not("flight_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (journeyError) {
    console.error("Journey fetch error:", journeyError);
  }

  // --------------------------------------------------
  // NORMAL MODE
  // SHOW ACTIVE JOURNEY
  // --------------------------------------------------

  if (journeyData?.flight_id && !isChangingJourney) {
    const {
      data: flight,
      error: flightError,
    } = await supabase
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
      .eq("id", journeyData.flight_id)
      .maybeSingle();

    if (flightError) {
      console.error("Flight fetch error:", flightError);
    }

    if (flight) {
      const journey: JourneyWithFlight = {
        id: journeyData.id,
        status: journeyData.status,
        created_at: journeyData.created_at,
        flight,
      };

      return <ActiveJourney journey={journey} />;
    }
  }

  // --------------------------------------------------
  // NO JOURNEY OR CHANGE MODE
  // FETCH AVAILABLE FLIGHTS
  // --------------------------------------------------

  const {
    data: flights,
    error: flightsError,
  } = await supabase
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
    .gte("departure_at", new Date().toISOString())
    .neq("status", "cancelled")
    .order("departure_at", { ascending: true });

  if (flightsError) {
    console.error("Flights fetch error:", flightsError);
  }

  return (
    <JourneyBuilder
      flights={flights ?? []}
      mode={isChangingJourney ? "change" : "create"}
      currentJourneyId={journeyData?.id ?? null}
      currentFlightId={journeyData?.flight_id ?? null}
    />
  );
}