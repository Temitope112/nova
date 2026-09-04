import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Plane,
  Star,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/server";

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

type SavedFlightRow = {
  id: string;
  flight_id: string | null;
  created_at: string;
};

type SavedFlight = {
  savedId: string;
  createdAt: string;
  flight: Flight;
};

export default async function SavedFlightsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // ----------------------------------------------
  // FETCH SAVED FLIGHT REFERENCES
  // ----------------------------------------------

  const {
    data: savedRows,
    error: savedRowsError,
  } = await supabase
    .from("saved_flights")
    .select(`
      id,
      flight_id,
      created_at
    `)
    .eq("user_id", user.id)
    .not("flight_id", "is", null)
    .order("created_at", { ascending: false });

  if (savedRowsError) {
    console.error(
      "Saved flights fetch error:",
      savedRowsError
    );
  }

  const rows = (savedRows ?? []) as SavedFlightRow[];

  // ----------------------------------------------
  // FETCH RELATED FLIGHTS
  // ----------------------------------------------

  let savedFlights: SavedFlight[] = [];

  if (rows.length > 0) {
    const flightIds = rows
      .map((row) => row.flight_id)
      .filter((id): id is string => Boolean(id));

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
      .in("id", flightIds);

    if (flightsError) {
      console.error(
        "Related flights fetch error:",
        flightsError
      );
    }

    const flightMap = new Map(
      (flights ?? []).map((flight) => [
        flight.id,
        flight,
      ])
    );

    savedFlights = rows
      .map((row) => {
        if (!row.flight_id) {
          return null;
        }

        const flight = flightMap.get(row.flight_id);

        if (!flight) {
          return null;
        }

        return {
          savedId: row.id,
          createdAt: row.created_at,
          flight,
        };
      })
      .filter(
        (item): item is SavedFlight =>
          item !== null
      );
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Saved Flights
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Flights you&apos;re watching.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            Keep important flights close and follow
            the latest departure, terminal and gate
            information from one place.
          </p>
        </div>

        <Link
          href="/flights"
          className="inline-flex items-center gap-2 self-start rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78] lg:self-auto"
        >
          Find a flight

          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* COUNT */}

      <div className="mt-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e0d2]">
          <Star className="h-4 w-4 text-[#315b78]" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#111820]">
            {savedFlights.length}
            {savedFlights.length === 1
              ? " saved flight"
              : " saved flights"}
          </p>

          <p className="text-xs text-[#111820]/55">
            Connected to live NOVA flight data.
          </p>
        </div>
      </div>

      {/* EMPTY STATE */}

      {savedFlights.length === 0 && (
        <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-[#111820]/10 bg-white/70 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#315b78]/10">
            <Plane className="h-5 w-5 text-[#315b78]" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-[#111820]">
            No saved flights yet.
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#111820]/65">
            Save flights you want to keep an eye on
            and they&apos;ll appear here.
          </p>

          <Link
            href="/flights"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78]"
          >
            Browse flights

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* SAVED FLIGHTS */}

      {savedFlights.length > 0 && (
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          {savedFlights.map(({ savedId, flight }) => {
            const departureDate = new Date(
              flight.departure_at
            );

            const formattedDate =
              new Intl.DateTimeFormat("en-NG", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(departureDate);

            const formattedTime =
              new Intl.DateTimeFormat("en-NG", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(departureDate);

            return (
              <article
                key={savedId}
                className="overflow-hidden rounded-[28px] border border-[#111820]/10 bg-white/70"
              >
                {/* TOP */}

                <div className="flex items-start justify-between gap-5 border-b border-[#111820]/10 p-6 sm:p-7">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#315b78]">
                      {flight.airline_name}
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111820]">
                      {flight.flight_number}
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#111820] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                    {flight.status.replaceAll("_", " ")}
                  </span>
                </div>

                {/* ROUTE */}

                <div className="p-6 sm:p-7">
                  <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
                    <div>
                      <p className="text-4xl font-semibold tracking-[-0.04em] text-[#111820]">
                        {flight.origin_code}
                      </p>

                      <p className="mt-2 text-xs font-medium text-[#111820]/60">
                        {flight.origin_city}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <div className="h-px w-10 bg-[#111820]/15 sm:w-14" />

                      <Plane className="mx-3 h-4 w-4 rotate-90 text-[#315b78]" />

                      <div className="h-px w-10 bg-[#111820]/15 sm:w-14" />
                    </div>

                    <div className="sm:text-right">
                      <p className="text-4xl font-semibold tracking-[-0.04em] text-[#111820]">
                        {flight.destination_code}
                      </p>

                      <p className="mt-2 text-xs font-medium text-[#111820]/60">
                        {flight.destination_city}
                      </p>
                    </div>
                  </div>

                  {/* DETAILS */}

                  <div className="mt-7 grid gap-3 border-t border-[#111820]/10 pt-5 text-xs font-medium text-[#111820]/65 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-[#315b78]" />

                      <span>
                        {formattedDate} · {formattedTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:justify-end">
                      <MapPin className="h-3.5 w-3.5 text-[#315b78]" />

                      <span>
                        {flight.terminal
                          ? `Terminal ${flight.terminal}`
                          : "Terminal TBA"}

                        {" · "}

                        {flight.gate
                          ? `Gate ${flight.gate}`
                          : "Gate TBA"}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-7 flex items-center justify-between">
                    <Link
                      href="/dashboard/journey"
                      className="inline-flex items-center gap-2 text-sm font-semibold !text-[#315b78] transition hover:!text-[#111820]"
                    >
                      Add to journey

                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#111820]/40">
                      Saved
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}