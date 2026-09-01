"use client";

import { useMemo, useState } from "react";

import {
  flights,
  type Flight,
  type FlightType,
} from "../../data/flights";

import FlightsHero from "./flights-hero";
import FlightTabs from "./flight-tabs";
import FlightFilters from "./flight-filters";
import FlightsBoard from "./flights-board";
import FlightDetail from "./flight-detail";

export type TerminalFilter = "all" | "T1" | "T2";

export default function FlightsPage() {
  const [flightType, setFlightType] =
    useState<FlightType>("departure");

  const [terminal, setTerminal] =
    useState<TerminalFilter>("all");

  const [query, setQuery] = useState("");

  const [selectedFlight, setSelectedFlight] =
    useState<Flight | null>(null);

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
  }, [flightType, terminal, query]);

  const handleTypeChange = (
    type: FlightType,
  ) => {
    setFlightType(type);
    setSelectedFlight(null);
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
            onSelectFlight={setSelectedFlight}
          />

          <FlightDetail
            flight={selectedFlight}
          />
        </div>
      </section>
    </main>
  );
}