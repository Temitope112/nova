"use client";

import { motion } from "framer-motion";

import FlightSearch from "./flight-search";

interface FlightsHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function FlightsHero({
  query,
  onQueryChange,
}: FlightsHeroProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f5f2eb]

        pt-[var(--navbar-height)]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.035]

          [background-image:linear-gradient(to_right,#111820_1px,transparent_1px)]
          [background-size:72px_100%]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[1600px]

          px-5
          pb-16
          pt-14

          sm:px-8
          sm:pb-20
          sm:pt-16

          lg:px-12
          lg:pb-24
          lg:pt-20

          xl:px-16
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="
              flex
              items-center
              gap-3

              text-[9px]
              uppercase
              tracking-[0.24em]
              text-[#111820]/40
            "
          >
            <span>NOVA / Flights</span>

            <span className="h-px w-8 bg-[#111820]/15" />

            <span>LOS</span>
          </div>

          <h1
            className="
              mt-7

              max-w-[1100px]

              text-[clamp(4rem,9vw,9rem)]
              font-medium
              leading-[0.8]
              tracking-[-0.075em]
            "
          >
            Where are you
            <br />
            flying?
          </h1>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-12
            max-w-[900px]

            lg:mt-16
          "
        >
          <FlightSearch
            value={query}
            onChange={onQueryChange}
          />
        </motion.div>
      </div>
    </section>
  );
}