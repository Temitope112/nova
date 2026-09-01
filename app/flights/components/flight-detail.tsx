"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Plane,
} from "lucide-react";

import type { Flight } from "../../data/flights";

interface FlightDetailProps {
  flight: Flight | null;
}

export default function FlightDetail({
  flight,
}: FlightDetailProps) {
  return (
    <aside
      className="
        relative

        min-h-[460px]

        bg-[#e8eff1]

        p-6

        sm:p-8

        lg:min-h-full
        lg:p-8
      "
    >
      <AnimatePresence mode="wait">
        {flight ? (
          <FlightInformation
            key={flight.id}
            flight={flight}
          />
        ) : (
          <EmptyDetail key="empty" />
        )}
      </AnimatePresence>
    </aside>
  );
}

function FlightInformation({
  flight,
}: {
  flight: Flight;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -15,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/35
        "
      >
        Flight / {flight.flightNumber}
      </span>

      <div className="mt-8">
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#111820]/35
          "
        >
          {flight.type === "departure"
            ? "LOS →"
            : "→ LOS"}
        </span>

        <h2
          className="
            mt-2

            text-[clamp(3rem,5vw,5rem)]
            font-medium
            leading-[0.88]
            tracking-[-0.065em]
          "
        >
          {flight.city}
        </h2>

        <p
          className="
            mt-3
            text-sm
            text-[#111820]/45
          "
        >
          {flight.airport}
        </p>
      </div>

      <div
        className="
          mt-10

          border-y
          border-[#111820]/10
        "
      >
        <DetailRow
          icon={<Clock3 size={14} />}
          label="Scheduled"
          value={flight.scheduledTime}
        />

        <DetailRow
          icon={<MapPin size={14} />}
          label="Terminal / Gate"
          value={`${flight.terminal} · ${flight.gate}`}
        />

        <DetailRow
          icon={<Plane size={14} />}
          label="Aircraft"
          value={flight.aircraft ?? "—"}
        />
      </div>

      <button
        type="button"
        className="
          group

          mt-10

          flex
          w-full
          items-center
          justify-between

          border-t
          border-[#111820]/15

          pt-5

          text-sm
          font-medium
        "
      >
        View flight journey

        <ArrowUpRight
          size={16}
          strokeWidth={1.4}
          className="
            transition-transform

            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
        />
      </button>
    </motion.div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5

        border-b
        border-[#111820]/10

        py-5

        last:border-b-0
      "
    >
      <div
        className="
          flex
          items-center
          gap-2

          text-[#111820]/35
        "
      >
        {icon}

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.16em]
          "
        >
          {label}
        </span>
      </div>

      <span
        className="
          text-right
          text-sm
          font-medium
        "
      >
        {value}
      </span>
    </div>
  );
}

function EmptyDetail() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="
        flex
        min-h-[400px]
        flex-col
        justify-between
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/30
        "
      >
        Flight information
      </span>

      <div>
        <p
          className="
            max-w-[270px]

            text-3xl
            font-medium
            leading-[1]
            tracking-[-0.05em]
          "
        >
          Select a flight to see the journey.
        </p>

        <p
          className="
            mt-4
            max-w-[280px]

            text-sm
            leading-6
            text-[#111820]/40
          "
        >
          Gate, terminal, aircraft and journey
          information will appear here.
        </p>
      </div>

      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-[#111820]/25
        "
      >
        NOVA / LOS
      </span>
    </motion.div>
  );
}