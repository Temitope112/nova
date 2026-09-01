"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Departure } from "../../../data/departures";
import DepartureStatusBadge from "./departure-status";

interface DepartureRowProps {
  departure: Departure;
  index: number;
}

export default function DepartureRow({
  departure,
  index,
}: DepartureRowProps) {
  return (
    <motion.button
      type="button"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-70px",
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: 28,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="
        group
        relative
        grid
        w-full
        grid-cols-[72px_1fr_auto]
        items-center
        gap-4
        overflow-hidden
        border-b
        border-white/10
        py-5
        text-left
        transition-colors
        duration-300

        hover:bg-white/[0.035]

        sm:grid-cols-[90px_1fr_auto]
        sm:py-6

        lg:grid-cols-[110px_1.5fr_140px_100px_100px_150px_32px]
        lg:gap-5
        lg:px-3
        lg:py-7
      "
    >
      <div
        className="
          absolute
          inset-y-0
          left-0
          w-[2px]
          origin-center
          scale-y-0
          bg-[#e8a735]
          transition-transform
          duration-300

          group-hover:scale-y-100
        "
      />

      <FlapValue
        value={departure.time}
        className="
          font-mono
          text-lg
          tracking-[-0.04em]
          text-white

          sm:text-xl
          lg:text-2xl
        "
      />

      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <FlapValue
            value={departure.destination}
            className="
              truncate
              text-xl
              font-medium
              tracking-[-0.035em]
              text-white

              sm:text-2xl
              lg:text-[2rem]
            "
          />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white/25
            "
          >
            {departure.airportCode}
          </span>
        </div>

        <div
          className="
            mt-1
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-white/25

            lg:hidden
          "
        >
          {departure.flightNumber}
          {" · "}
          {departure.terminal}
          {" · "}
          Gate {departure.gate}
        </div>
      </div>

      <div className="text-right lg:hidden">
        <DepartureStatusBadge
          status={departure.status}
        />
      </div>

      <FlapValue
        value={departure.flightNumber}
        className="
          hidden
          text-sm
          text-white/50

          lg:block
        "
      />

      <FlapValue
        value={departure.terminal}
        className="
          hidden
          text-sm
          text-white/50

          lg:block
        "
      />

      <FlapValue
        value={departure.gate}
        className="
          hidden
          font-mono
          text-sm
          text-white/70

          lg:block
        "
      />

      <div className="hidden lg:block">
        <DepartureStatusBadge
          status={departure.status}
        />
      </div>

      <ArrowUpRight
        size={17}
        strokeWidth={1.5}
        className="
          hidden
          text-white/20
          transition-all
          duration-300

          group-hover:-translate-y-1
          group-hover:translate-x-1
          group-hover:text-white

          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-1/2
          h-px
          bg-black/20
          opacity-0
          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />
    </motion.button>
  );
}

interface FlapValueProps {
  value: string;
  className?: string;
}

function FlapValue({
  value,
  className = "",
}: FlapValueProps) {
  return (
    <span
      className={`
        relative
        inline-block
        overflow-hidden

        ${className}
      `}
    >
      <motion.span
        initial={{
          y: "100%",
          opacity: 0,
        }}
        whileInView={{
          y: "0%",
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="block"
      >
        {value}
      </motion.span>
    </span>
  );
}