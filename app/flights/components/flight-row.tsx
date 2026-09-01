"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type {
  Flight,
  FlightStatus,
} from "../../data/flights";

interface FlightRowProps {
  flight: Flight;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

const statusLabels: Record<
  FlightStatus,
  string
> = {
  "on-time": "On time",
  boarding: "Boarding",
  "gate-closing": "Gate closing",
  delayed: "Delayed",
  landed: "Landed",
  scheduled: "Scheduled",
};

export default function FlightRow({
  flight,
  index,
  selected,
  onSelect,
}: FlightRowProps) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onSelect}
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.035,
      }}
      className={`
        group
        relative

        grid
        w-full
        gap-5

        border-b
        border-white/10

        px-5
        py-6

        text-left

        transition-colors
        duration-300

        md:grid-cols-[90px_1.5fr_0.8fr_80px_70px_130px]
        md:items-center
        md:gap-0
        md:px-6

        ${
          selected
            ? "bg-white/[0.09]"
            : "hover:bg-white/[0.045]"
        }
      `}
    >
      {selected && (
        <motion.span
          layoutId="selected-flight"
          className="
            absolute
            left-0
            top-0

            h-full
            w-[3px]

            bg-[#e8a735]
          "
        />
      )}

      <div>
        <MobileLabel>Time</MobileLabel>

        <span
          className="
            text-xl
            font-medium
            tracking-[-0.04em]
          "
        >
          {flight.scheduledTime}
        </span>

        {flight.estimatedTime && (
          <span
            className="
              mt-1
              block

              text-[9px]
              text-[#e8a735]
            "
          >
            Est. {flight.estimatedTime}
          </span>
        )}
      </div>

      <div>
        <MobileLabel>
          {flight.type === "departure"
            ? "Destination"
            : "From"}
        </MobileLabel>

        <p
          className="
            text-lg
            font-medium
            tracking-[-0.03em]
          "
        >
          {flight.city}
        </p>

        <p
          className="
            mt-1
            text-[9px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          {flight.airportCode}
        </p>
      </div>

      <div>
        <MobileLabel>Flight</MobileLabel>

        <p className="text-sm">
          {flight.flightNumber}
        </p>

        <p
          className="
            mt-1
            text-[9px]
            text-white/30
          "
        >
          {flight.airline}
        </p>
      </div>

      <FlightValue
        label="Terminal"
        value={flight.terminal}
      />

      <FlightValue
        label="Gate"
        value={flight.gate}
      />

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <MobileLabel>Status</MobileLabel>

          <Status status={flight.status} />
        </div>

        <ArrowRight
          size={15}
          strokeWidth={1.4}
          className="
            text-white/20

            transition-all
            duration-300

            group-hover:translate-x-1
            group-hover:text-white/60

            md:hidden
          "
        />
      </div>
    </motion.button>
  );
}

function FlightValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <MobileLabel>{label}</MobileLabel>

      <span className="text-sm text-white/70">
        {value}
      </span>
    </div>
  );
}

function MobileLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        mb-1
        block

        text-[8px]
        uppercase
        tracking-[0.18em]
        text-white/25

        md:hidden
      "
    >
      {children}
    </span>
  );
}

function Status({
  status,
}: {
  status: FlightStatus;
}) {
  const urgent =
    status === "boarding" ||
    status === "gate-closing";

  const delayed = status === "delayed";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2

        text-[9px]
        uppercase
        tracking-[0.14em]

        ${
          delayed
            ? "text-[#e8a735]"
            : urgent
              ? "text-white"
              : "text-white/45"
        }
      `}
    >
      {urgent && (
        <span className="relative flex size-1.5">
          <motion.span
            animate={{
              scale: [1, 2.2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="
              absolute
              inset-0

              rounded-full
              bg-[#e8a735]
            "
          />

          <span
            className="
              relative
              size-1.5

              rounded-full
              bg-[#e8a735]
            "
          />
        </span>
      )}

      {statusLabels[status]}
    </span>
  );
}