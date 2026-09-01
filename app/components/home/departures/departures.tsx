"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";

import {
  departures,
  type Departure,
} from "../../../data/departures";

import DepartureRow from "./departure-row";
import DeparturesControls from "./departure-control";

export default function Departures() {
  const [query, setQuery] = useState("");
  const [activeTerminal, setActiveTerminal] =
    useState("All");

  const filteredDepartures = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    return departures.filter((departure) => {
      const matchesTerminal =
        activeTerminal === "All" ||
        departure.terminal === activeTerminal;

      const matchesSearch =
        !normalizedQuery ||
        departure.destination
          .toLowerCase()
          .includes(normalizedQuery) ||
        departure.airportCode
          .toLowerCase()
          .includes(normalizedQuery) ||
        departure.flightNumber
          .toLowerCase()
          .includes(normalizedQuery) ||
        departure.airline
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTerminal && matchesSearch;
    });
  }, [query, activeTerminal]);

  return (
    <motion.section
      id="departures"
      initial={{
        opacity: 0.96,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        relative
        z-20
        -mt-px
        overflow-hidden
        bg-[#111820]
        text-white
      "
    >
      <DepartureAtmosphere />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-32
          bg-gradient-to-b
          from-black/20
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1600px]
          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-12
          lg:py-28

          xl:px-16
        "
      >
        <DeparturesHeading />

        <div className="mt-12 lg:mt-16">
          <DeparturesControls
            query={query}
            activeTerminal={activeTerminal}
            onQueryChange={setQuery}
            onTerminalChange={
              setActiveTerminal
            }
          />

          <DepartureTable
            departures={filteredDepartures}
          />

          <DeparturesFooter />
        </div>
      </div>
    </motion.section>
  );
}

function DeparturesHeading() {
  return (
    <div
      className="
        grid
        gap-8

        lg:grid-cols-[1fr_auto]
        lg:items-end
      "
    >
      <div>
        <div
          className="
            flex
            items-center
            gap-3

            text-[9px]
            uppercase
            tracking-[0.24em]
            text-white/30
          "
        >
          <span>LOS / Departures</span>

          <span className="h-px w-8 bg-white/15" />

          <span>01</span>
        </div>

        <h2
          className="
            mt-5
            text-[clamp(4rem,9vw,9rem)]
            font-medium
            leading-[0.78]
            tracking-[-0.075em]
          "
        >
          Moving
          <br />
          through NOVA.
        </h2>
      </div>

      <div
        className="
          max-w-[320px]
          lg:pb-2
        "
      >
        <p
          className="
            text-sm
            leading-6
            text-white/45
          "
        >
          Live departure information across
          NOVA terminals. Gates and timings
          may update as your journey moves.
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            gap-2

            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/35
          "
        >
          <span className="relative flex size-2">
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-emerald-400
                opacity-40
              "
            />

            <span
              className="
                relative
                inline-flex
                size-2
                rounded-full
                bg-emerald-400
              "
            />
          </span>

          Live operations
        </div>
      </div>
    </div>
  );
}

interface DepartureTableProps {
  departures: Departure[];
}

function DepartureTable({
  departures,
}: DepartureTableProps) {
  return (
    <div>
      <div
        className="
          hidden
          grid-cols-[110px_1.5fr_140px_100px_100px_150px_32px]
          gap-5
          border-b
          border-white/10
          px-3
          py-4

          text-[8px]
          uppercase
          tracking-[0.22em]
          text-white/25

          lg:grid
        "
      >
        <span>Time</span>
        <span>Destination</span>
        <span>Flight</span>
        <span>Terminal</span>
        <span>Gate</span>
        <span>Status</span>
        <span />
      </div>

      {departures.length > 0 ? (
        departures.map(
          (departure, index) => (
            <DepartureRow
              key={departure.id}
              departure={departure}
              index={index}
            />
          ),
        )
      ) : (
        <EmptyDepartureState />
      )}
    </div>
  );
}

function EmptyDepartureState() {
  return (
    <div
      className="
        flex
        min-h-[260px]
        items-center
        justify-center
        border-b
        border-white/10
        text-center
      "
    >
      <div>
        <p
          className="
            text-xl
            tracking-[-0.03em]
            text-white
          "
        >
          No matching departures
        </p>

        <p
          className="
            mt-2
            text-sm
            text-white/35
          "
        >
          Try another flight number,
          destination or terminal.
        </p>
      </div>
    </div>
  );
}

function DeparturesFooter() {
  return (
    <div
      className="
        mt-8
        flex
        flex-col
        gap-6

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div
        className="
          flex
          items-center
          gap-3

          text-[9px]
          uppercase
          tracking-[0.18em]
          text-white/25
        "
      >
        <Clock3
          size={14}
          strokeWidth={1.5}
        />

        All times local · LOS
      </div>

      <button
        type="button"
        className="
          group
          inline-flex
          items-center
          gap-3
          text-sm
          text-white
        "
      >
        View all flights

        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300

            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />
      </button>
    </div>
  );
}

function DepartureAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.035]

          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px)]
          [background-size:72px_100%]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[10%]
          top-[10%]

          h-[500px]
          w-[500px]

          rounded-full
          bg-[#315b78]/10
          blur-[130px]
        "
      />
    </>
  );
}