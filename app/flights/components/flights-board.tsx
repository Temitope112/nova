"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import type { Flight } from "../../data/flights";

import FlightRow from "./flight-row";

interface FlightsBoardProps {
  flights: Flight[];
  selectedFlight: Flight | null;
  savedFlightIds: Set<string>;
  savingFlightId: string | null;

  onSelectFlight: (
    flight: Flight
  ) => void;

  onToggleSaved: (
    flight: Flight
  ) => void;
}

export default function FlightsBoard({
  flights,
  selectedFlight,
  savedFlightIds,
  savingFlightId,
  onSelectFlight,
  onToggleSaved,
}: FlightsBoardProps) {
  return (
    <div
      className="
        overflow-hidden
        bg-[#111820]
        text-white
      "
    >
      <div
        className="
          hidden

          grid-cols-[90px_1.5fr_0.8fr_80px_70px_130px_50px]

          border-b
          border-white/10

          px-6
          py-4

          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/30

          md:grid
        "
      >
        <span>Time</span>
        <span>Destination</span>
        <span>Flight</span>
        <span>Terminal</span>
        <span>Gate</span>
        <span>Status</span>
        <span className="text-right">
          Save
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightRow
              key={flight.id}
              flight={flight}
              index={index}
              selected={
                selectedFlight?.id ===
                flight.id
              }
              saved={savedFlightIds.has(
                flight.id
              )}
              saving={
                savingFlightId ===
                flight.id
              }
              onSelect={() =>
                onSelectFlight(flight)
              }
              onToggleSaved={() =>
                onToggleSaved(flight)
              }
            />
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              flex
              min-h-[380px]
              items-center
              justify-center

              px-6
              text-center
            "
          >
            <div>
              <p
                className="
                  text-2xl
                  font-medium
                  tracking-[-0.04em]
                "
              >
                No flights found.
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/35
                "
              >
                Try another destination,
                airline or terminal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}