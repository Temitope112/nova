"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/app/lib/supabase/client";

import type {
  Flight,
  FlightType,
} from "../../data/flights";

import FlightsHero from "./flights-hero";
import FlightTabs from "./flight-tabs";
import FlightFilters from "./flight-filters";
import FlightsBoard from "./flights-board";
import FlightDetail from "./flight-detail";

export type TerminalFilter =
  | "all"
  | "T1"
  | "T2";

type FlightsPageProps = {
  flights: Flight[];
  initialSavedFlightIds: string[];
  isAuthenticated: boolean;
};

export default function FlightsPage({
  flights,
  initialSavedFlightIds,
  isAuthenticated,
}: FlightsPageProps) {
  const router = useRouter();

  const [flightType, setFlightType] =
    useState<FlightType>("departure");

  const [terminal, setTerminal] =
    useState<TerminalFilter>("all");

  const [query, setQuery] =
    useState("");

  const [selectedFlight, setSelectedFlight] =
    useState<Flight | null>(null);

  const [savedFlightIds, setSavedFlightIds] =
    useState<Set<string>>(
      () => new Set(initialSavedFlightIds)
    );

  const [savingFlightId, setSavingFlightId] =
    useState<string | null>(null);

  const filteredFlights = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return flights.filter((flight) => {
      const matchesType =
        flight.type === flightType;

      const matchesTerminal =
        terminal === "all" ||
        flight.terminal === terminal;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        flight.flightNumber
          .toLowerCase()
          .includes(normalizedQuery) ||
        flight.airline
          .toLowerCase()
          .includes(normalizedQuery) ||
        flight.city
          .toLowerCase()
          .includes(normalizedQuery) ||
        flight.airportCode
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesType &&
        matchesTerminal &&
        matchesQuery
      );
    });
  }, [
    flights,
    flightType,
    terminal,
    query,
  ]);

  const handleTypeChange = (
    type: FlightType
  ) => {
    setFlightType(type);
    setSelectedFlight(null);
  };

  const handleToggleSaved = async (
    flight: Flight
  ) => {
    if (!isAuthenticated) {
      router.push(
        `/auth/sign-in?redirect=${encodeURIComponent(
          "/flights"
        )}`
      );

      return;
    }

    if (savingFlightId) {
      return;
    }

    const supabase = createClient();

    setSavingFlightId(flight.id);

    const alreadySaved =
      savedFlightIds.has(flight.id);

    if (alreadySaved) {
      const { error } = await supabase
        .from("saved_flights")
        .delete()
        .eq("flight_id", flight.id);

      if (error) {
        console.error(
          "Remove saved flight error:",
          error
        );

        setSavingFlightId(null);
        return;
      }

      setSavedFlightIds((current) => {
        const next = new Set(current);

        next.delete(flight.id);

        return next;
      });
    } else {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push(
          `/auth/sign-in?redirect=${encodeURIComponent(
            "/flights"
          )}`
        );

        setSavingFlightId(null);
        return;
      }

      const { error } = await supabase
        .from("saved_flights")
        .insert({
          user_id: user.id,
          flight_id: flight.id,
        });

      if (error) {
        console.error(
          "Save flight error:",
          error
        );

        setSavingFlightId(null);
        return;
      }

      setSavedFlightIds((current) => {
        const next = new Set(current);

        next.add(flight.id);

        return next;
      });
    }

    setSavingFlightId(null);

    router.refresh();
  };

  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      <FlightsHero
        query={query}
        onQueryChange={setQuery}
      />

      <section
        className="
          mx-auto
          max-w-[1600px]
          px-5
          pb-24
          sm:px-8
          lg:px-12
          lg:pb-32
          xl:px-16
        "
      >
        <FlightTabs
          activeType={flightType}
          onChange={handleTypeChange}
        />

        <FlightFilters
          terminal={terminal}
          onTerminalChange={setTerminal}
          resultCount={filteredFlights.length}
        />

        <div
          className="
            grid
            gap-0
            lg:grid-cols-[1fr_390px]
          "
        >
          <FlightsBoard
            flights={filteredFlights}
            selectedFlight={selectedFlight}
            savedFlightIds={savedFlightIds}
            savingFlightId={savingFlightId}
            onSelectFlight={setSelectedFlight}
            onToggleSaved={handleToggleSaved}
          />

          <FlightDetail
            flight={selectedFlight}
          />
        </div>
      </section>
    </main>
  );
}