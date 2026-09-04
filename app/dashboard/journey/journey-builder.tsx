"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Plane,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/app/lib/supabase/client";

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

type JourneyBuilderProps = {
  flights?: Flight[];
  mode?: "create" | "change";
  currentJourneyId?: string | null;
  currentFlightId?: string | null;
};

export default function JourneyBuilder({
  flights = [],
  mode = "create",
  currentJourneyId = null,
  currentFlightId = null,
}: JourneyBuilderProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedFlight, setSelectedFlight] =
    useState<Flight | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isChangeMode = mode === "change";

  // --------------------------------------------------
  // FILTER FLIGHTS
  // --------------------------------------------------

  const filteredFlights = useMemo(() => {
    const safeFlights = flights ?? [];
    const query = search.trim().toLowerCase();

    if (!query) {
      return safeFlights;
    }

    return safeFlights.filter((flight) => {
      return (
        flight.flight_number.toLowerCase().includes(query) ||
        flight.airline_name.toLowerCase().includes(query) ||
        flight.origin_code.toLowerCase().includes(query) ||
        flight.destination_code.toLowerCase().includes(query) ||
        flight.origin_city.toLowerCase().includes(query) ||
        flight.destination_city.toLowerCase().includes(query)
      );
    });
  }, [flights, search]);

  // --------------------------------------------------
  // CREATE OR CHANGE JOURNEY
  // --------------------------------------------------

  const saveJourney = async () => {
    if (!selectedFlight || loading) {
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Your session has expired. Please sign in again.");
      setLoading(false);
      return;
    }

    // ----------------------------------------------
    // CHANGE EXISTING JOURNEY
    // ----------------------------------------------

    if (isChangeMode) {
      if (!currentJourneyId) {
        setError("We could not find your current journey.");
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("journeys")
        .update({
          flight_id: selectedFlight.id,
          status: "upcoming",
        })
        .eq("id", currentJourneyId)
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Journey update error:", updateError);

        setError(updateError.message);
        setLoading(false);
        return;
      }

      router.replace("/dashboard/journey");
      router.refresh();
      return;
    }

    // ----------------------------------------------
    // CREATE NEW JOURNEY
    // ----------------------------------------------

    const { error: insertError } = await supabase
      .from("journeys")
      .insert({
        user_id: user.id,
        flight_id: selectedFlight.id,
        status: "upcoming",
      });

    if (insertError) {
      console.error("Journey insert error:", insertError);

      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.replace("/dashboard/journey");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* HEADER */}

      <div>
        {isChangeMode && (
          <Link
            href="/dashboard/journey"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold !text-[#111820]/65 transition hover:!text-[#315b78]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to journey
          </Link>
        )}

        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          My Journey
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
          {isChangeMode
            ? "Choose a different flight."
            : "Let’s find your flight."}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
          {isChangeMode
            ? "Select another flight and NOVA will update your journey."
            : "Search your flight and add it to NOVA to build your personalized airport journey."}
        </p>
      </div>

      {/* SEARCH */}

      <div className="relative mt-10 max-w-2xl">
        <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/50" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Flight number, airline or destination"
          className="w-full rounded-full border border-[#111820]/10 bg-white px-12 py-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/45 focus:border-[#315b78]"
        />
      </div>

      {/* FLIGHTS */}

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {filteredFlights.map((flight) => {
          const selected = selectedFlight?.id === flight.id;
          const current =
            isChangeMode && currentFlightId === flight.id;

          return (
            <button
              key={flight.id}
              type="button"
              disabled={current}
              onClick={() => {
                if (current) {
                  return;
                }

                setSelectedFlight(flight);
                setError("");
              }}
              className={`relative rounded-[24px] border p-6 text-left transition-all duration-200 ${
                selected
                  ? "border-[#315b78] bg-[#315b78]/10 shadow-md ring-1 ring-[#315b78]/20"
                  : current
                    ? "cursor-default border-[#111820]/10 bg-[#111820]/5 opacity-70"
                    : "border-[#111820]/10 bg-white/70 hover:border-[#315b78]/40 hover:bg-white"
              }`}
            >
              {/* BADGES */}

              {selected && (
                <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-[#315b78] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                  <Check className="h-3 w-3" />
                  Selected
                </span>
              )}

              {current && (
                <span className="absolute right-5 top-5 rounded-full bg-[#111820] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                  Current flight
                </span>
              )}

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#315b78]">
                    {flight.airline_name}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-[#111820]">
                    {flight.flight_number}
                  </h2>
                </div>

                {!selected && !current && (
                  <span className="rounded-full bg-[#111820]/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#111820]/70">
                    {flight.status.replaceAll("_", " ")}
                  </span>
                )}
              </div>

              {/* ROUTE */}

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-[#111820]">
                    {flight.origin_code}
                  </p>

                  <p className="mt-1 text-xs text-[#111820]/60">
                    {flight.origin_city}
                  </p>
                </div>

                <div className="flex flex-1 items-center px-5">
                  <div className="h-px flex-1 bg-[#111820]/15" />

                  <Plane className="mx-3 h-4 w-4 rotate-90 text-[#315b78]" />

                  <div className="h-px flex-1 bg-[#111820]/15" />
                </div>

                <div className="text-right">
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-[#111820]">
                    {flight.destination_code}
                  </p>

                  <p className="mt-1 text-xs text-[#111820]/60">
                    {flight.destination_city}
                  </p>
                </div>
              </div>

              {/* INFO */}

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#111820]/10 pt-5 text-xs font-medium text-[#111820]/65">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" />

                  {new Intl.DateTimeFormat("en-NG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(flight.departure_at))}
                </span>

                {flight.terminal && (
                  <span>Terminal {flight.terminal}</span>
                )}

                {flight.gate && <span>Gate {flight.gate}</span>}
              </div>
            </button>
          );
        })}
      </section>

      {/* EMPTY */}

      {filteredFlights.length === 0 && (
        <div className="mt-8 rounded-[24px] border border-[#111820]/10 bg-white/70 px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#315b78]/10">
            <Plane className="h-5 w-5 text-[#315b78]" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-[#111820]">
            No flights found.
          </h2>

          <p className="mt-2 text-sm text-[#111820]/65">
            Try another flight number, airline or destination.
          </p>
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="mt-6 rounded-[18px] border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* CTA */}

      <div className="sticky bottom-5 z-20 mt-8 flex flex-col justify-between gap-5 rounded-[24px] border border-white/10 bg-[#111820] p-5 text-white shadow-2xl sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium text-white/55">
            {isChangeMode
              ? "New flight"
              : "Selected flight"}
          </p>

          {selectedFlight ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="font-semibold text-white">
                {selectedFlight.flight_number}
              </p>

              <span className="text-white/30">·</span>

              <p className="text-sm font-medium text-white/75">
                {selectedFlight.origin_code}
                {" → "}
                {selectedFlight.destination_code}
              </p>
            </div>
          ) : (
            <p className="mt-1 text-sm font-medium text-white/65">
              {isChangeMode
                ? "Select a different flight above."
                : "Select one of the flights above to continue."}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={saveJourney}
          disabled={!selectedFlight || loading}
          className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-[#f5f2eb] px-5 py-3 text-sm font-semibold !text-[#111820] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#111820]/20 border-t-[#111820]" />

              {isChangeMode
                ? "Updating journey..."
                : "Building journey..."}
            </>
          ) : (
            <>
              {isChangeMode
                ? "Update journey"
                : "Add to my journey"}

              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}