"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { TravelPhase } from "../../../data/travel-info";

interface TravelDetailProps {
  phase: TravelPhase;
}

export default function TravelDetail({
  phase,
}: TravelDetailProps) {
  return (
    <div
      className="
        min-h-[560px]
        bg-[#faf9f6]

        p-6

        sm:p-8

        lg:p-10

        xl:p-12
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -20,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            h-full
            flex-col
            justify-between
          "
        >
          <div>
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[#111820]/35
              "
            >
              {phase.eyebrow}
            </span>

            <h3
              className="
                mt-5

                max-w-[700px]

                text-[clamp(2.8rem,5vw,5.5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.065em]
              "
            >
              {phase.label}
            </h3>

            <p
              className="
                mt-6
                max-w-[540px]

                text-sm
                leading-6
                text-[#111820]/50
              "
            >
              {phase.description}
            </p>

            <div
              className="
                mt-10

                border-t
                border-[#111820]/10
              "
            >
              {phase.items.map(
                (item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        0.1 + index * 0.08,
                    }}
                    className="
                      grid
                      gap-3

                      border-b
                      border-[#111820]/10

                      py-6

                      sm:grid-cols-[160px_1fr]
                      sm:gap-8
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-medium
                        tracking-[-0.02em]
                      "
                    >
                      {item.title}
                    </span>

                    <p
                      className="
                        max-w-[520px]
                        text-sm
                        leading-6
                        text-[#111820]/45
                      "
                    >
                      {item.description}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <button
            type="button"
            className="
              group
              mt-12

              flex
              items-center
              justify-between

              border-t
              border-[#111820]/15

              pt-5

              text-sm
              font-medium
            "
          >
            View complete travel guide

            <ArrowUpRight
              size={17}
              strokeWidth={1.4}
              className="
                transition-transform
                duration-300

                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}