"use client";

import {
  motion,
} from "framer-motion";

import type { Journey } from "../../data/journeys";

import JourneyFlightSearch from "./journey-flight-search";

interface JourneyHeroProps {
  journey: Journey;
  journeys: Journey[];
  onJourneyChange: (journey: Journey) => void;
}

export default function JourneyHero({
  journey,
  journeys,
  onJourneyChange,
}: JourneyHeroProps) {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#111820]
        text-white

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

          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px)]
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
        <div
          className="
            flex
            items-center
            justify-between

            text-[9px]
            uppercase
            tracking-[0.22em]
            text-white/35
          "
        >
          <span>NOVA / My Journey</span>

          <span>
            {journey.flightNumber}
          </span>
        </div>

        <div
          className="
            mt-16

            grid
            gap-14

            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-end
          "
        >
          <motion.div
            key={journey.id}
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#e8a735]
              "
            >
              Your journey
            </span>

            <div
              className="
                mt-5

                flex
                items-end
                gap-5

                sm:gap-8
              "
            >
              <h1
                className="
                  text-[clamp(4.5rem,11vw,11rem)]
                  font-medium
                  leading-[0.78]
                  tracking-[-0.08em]
                "
              >
                {journey.origin.code}
              </h1>

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.2,
                }}
                className="
                  mb-[0.6em]

                  h-px
                  min-w-10
                  flex-1

                  origin-left
                  bg-white/25
                "
              />

              <h1
                className="
                  text-[clamp(4.5rem,11vw,11rem)]
                  font-medium
                  leading-[0.78]
                  tracking-[-0.08em]
                "
              >
                {journey.destination.code}
              </h1>
            </div>

            <p
              className="
                mt-6

                text-sm
                text-white/45
              "
            >
              {journey.origin.city} →{" "}
              {journey.destination.city}
            </p>
          </motion.div>

          <JourneyFlightSearch
            journey={journey}
            journeys={journeys}
            onJourneyChange={onJourneyChange}
          />
        </div>
      </div>
    </section>
  );
}