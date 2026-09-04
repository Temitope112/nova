import { createClient } from "@/app/lib/supabase/server";

import FlightsPage from "./components/flights-page";

import type {
  Flight,
  FlightStatus,
  FlightType,
} from "../data/flights";

type DatabaseFlight = {
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

type SavedFlightRow = {
  flight_id: string | null;
};

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data,
    error,
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
    .order("departure_at", {
      ascending: true,
    });

  if (error) {
    console.error("Flights fetch error:", error);
  }

  const databaseFlights =
    (data ?? []) as DatabaseFlight[];

  const flights: Flight[] =
    databaseFlights.map((flight) =>
      transformFlight(flight)
    );

  let initialSavedFlightIds: string[] = [];

  if (user) {
    const {
      data: savedFlights,
      error: savedFlightsError,
    } = await supabase
      .from("saved_flights")
      .select("flight_id")
      .eq("user_id", user.id)
      .not("flight_id", "is", null);

    if (savedFlightsError) {
      console.error(
        "Saved flights fetch error:",
        savedFlightsError
      );
    }

    const savedRows =
      (savedFlights ?? []) as SavedFlightRow[];

    initialSavedFlightIds = savedRows
      .map((row) => row.flight_id)
      .filter(
        (id): id is string =>
          id !== null
      );
  }

  return (
    <FlightsPage
      flights={flights}
      initialSavedFlightIds={
        initialSavedFlightIds
      }
      isAuthenticated={Boolean(user)}
    />
  );
}

function transformFlight(
  flight: DatabaseFlight
): Flight {
  const type: FlightType =
    flight.origin_code === "LOS"
      ? "departure"
      : "arrival";

  const relevantDate =
    type === "departure"
      ? flight.departure_at
      : flight.arrival_at ??
        flight.departure_at;

  const relevantCity =
    type === "departure"
      ? flight.destination_city
      : flight.origin_city;

  const relevantAirportCode =
    type === "departure"
      ? flight.destination_code
      : flight.origin_code;

  return {
    id: flight.id,

    type,

    flightNumber: flight.flight_number,

    airline: flight.airline_name,

    city: relevantCity,

    airport: relevantCity,

    airportCode: relevantAirportCode,

    scheduledTime:
      formatFlightTime(relevantDate),

    terminal:
      normalizeTerminal(flight.terminal),

    gate: flight.gate ?? "TBA",

    status:
      transformStatus(flight.status),
  };
}

function formatFlightTime(
  date: string
) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  ).format(new Date(date));
}

function normalizeTerminal(
  terminal: string | null
): "T1" | "T2" {
  if (terminal === "T2") {
    return "T2";
  }

  return "T1";
}

function transformStatus(
  status: string
): FlightStatus {
  switch (status) {
    case "boarding":
      return "boarding";

    case "check_in":
      return "on-time";

    case "delayed":
      return "delayed";

    case "cancelled":
      return "cancelled";

    case "arrived":
      return "landed";

    case "departed":
      return "landed";

    case "scheduled":
    default:
      return "scheduled";
  }
}