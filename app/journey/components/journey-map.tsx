"use client";

import {
  motion,
} from "framer-motion";

import {
  Navigation,
} from "lucide-react";

import type { Journey } from "../../data/journeys";

interface JourneyMapProps {
  journey: Journey;
}

export default function JourneyMap({
  journey,
}: JourneyMapProps) {
  return (
    <section
      className="
        bg-[#e9e0d2]

        px-5
        py-24

        sm:px-8

        lg:px-12
        lg:py-32

        xl:px-16
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1600px]
          overflow-hidden

          bg-[#f5f2eb]

          lg:grid-cols-[1.35fr_0.65fr]
        "
      >
        <div
          className="
            relative

            min-h-[520px]

            overflow-hidden

            sm:min-h-[620px]
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              opacity-[0.05]

              [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
              [background-size:48px_48px]
            "
          />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="
              absolute
              inset-0

              h-full
              w-full
            "
          >
            <path
              d="
                M8 77
                H27
                V62
                H43
                V48
                H61
                V34
                H89
                V67
                H72
                V81
                H28
                V88
                H8
                Z
              "
              fill="#ffffff"
              stroke="#111820"
              strokeOpacity="0.12"
              strokeWidth="0.45"
            />

            <motion.path
              key={journey.id}
              d="
                M14 82
                C22 75 27 69 34 65
                S48 55 55 50
                S67 41 79 38
              "
              fill="none"
              stroke="#315b78"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2 1.8"
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>

          <div
            className="
              absolute
              left-[14%]
              top-[82%]
            "
          >
            <motion.span
              animate={{
                scale: [1, 2.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="
                absolute

                size-3

                rounded-full

                bg-[#315b78]
              "
            />

            <span
              className="
                relative
                block

                size-3

                rounded-full

                bg-[#315b78]
              "
            />

            <span
              className="
                absolute
                left-5
                top-1/2

                -translate-y-1/2

                whitespace-nowrap

                text-[8px]
                uppercase
                tracking-[0.17em]
                text-[#315b78]
              "
            >
              You are here
            </span>
          </div>

          <div
            className="
              absolute
              left-[79%]
              top-[38%]

              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <span
              className="
                flex
                size-7
                items-center
                justify-center

                rounded-full

                bg-[#111820]

                text-[8px]
                font-medium
                text-white
              "
            >
              {journey.gate}
            </span>

            <span
              className="
                absolute
                left-1/2
                top-10

                -translate-x-1/2

                whitespace-nowrap

                text-[8px]
                uppercase
                tracking-[0.17em]
                text-[#111820]/45
              "
            >
              Your gate
            </span>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            justify-between

            bg-[#111820]

            p-7
            text-white

            sm:p-10
          "
        >
          <div>
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              Route / Gate
            </span>

            <h2
              className="
                mt-6

                text-[clamp(3rem,5vw,5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Gate
              <br />
              {journey.gate}.
            </h2>
          </div>

          <div className="my-16">
            <div
              className="
                flex
                items-center
                justify-between

                border-y
                border-white/10

                py-5
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.17em]
                  text-white/30
                "
              >
                Walking time
              </span>

              <span className="text-sm">
                {journey.walkToGate}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-white/10

                py-5
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.17em]
                  text-white/30
                "
              >
                Boarding
              </span>

              <span className="text-sm">
                {journey.boardingTime}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="
              group

              flex
              items-center
              justify-between

              border-t
              border-white/15

              pt-5

              text-sm
            "
          >
            Start navigation

            <Navigation
              size={15}
              strokeWidth={1.4}
              className="
                text-[#e8a735]

                transition-transform

                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
}