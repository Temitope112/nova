"use client";

import {
  motion,
} from "framer-motion";

import {
  ArrowUpRight,
} from "lucide-react";

import type { Journey } from "../../data/journeys";

interface JourneyNextActionProps {
  journey: Journey;
}

export default function JourneyNextAction({
  journey,
}: JourneyNextActionProps) {
  const activeStage =
    journey.stages.find(
      (stage) =>
        stage.status === "active",
    ) ?? journey.stages[0];

  return (
    <section
      className="
        bg-[#315b78]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]

          px-5
          py-20

          sm:px-8

          lg:px-12
          lg:py-28

          xl:px-16
        "
      >
        <motion.div
          key={journey.id}
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            grid
            gap-12

            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-end
          "
        >
          <div>
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/35
              "
            >
              What&apos;s next
            </span>

            <h2
              className="
                mt-6

                max-w-[850px]

                text-[clamp(3.5rem,7vw,7rem)]
                font-medium
                leading-[0.86]
                tracking-[-0.07em]
              "
            >
              {activeStage.title === "Explore"
                ? "You have time."
                : activeStage.title}
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p
              className="
                max-w-sm

                text-sm
                leading-6
                text-white/55
              "
            >
              {activeStage.description}
            </p>

            <button
              type="button"
              className="
                group

                mt-8

                inline-flex
                items-center
                gap-3

                border-b
                border-white/30

                pb-2

                text-sm
              "
            >
              Explore near your route

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
          </div>
        </motion.div>
      </div>
    </section>
  );
}