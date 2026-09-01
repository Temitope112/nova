"use client";

import {
  motion,
} from "framer-motion";

import type { Journey } from "../../data/journeys";

import JourneyStage from "./journey-stage";

interface JourneyTimelineProps {
  journey: Journey;
}

export default function JourneyTimeline({
  journey,
}: JourneyTimelineProps) {
  const completed =
    journey.stages.filter(
      (stage) =>
        stage.status === "complete",
    ).length;

  const activeIndex =
    journey.stages.findIndex(
      (stage) =>
        stage.status === "active",
    );

  const progress =
    activeIndex >= 0
      ? activeIndex /
        (journey.stages.length - 1)
      : completed /
        journey.stages.length;

  return (
    <section
      className="
        bg-[#faf9f6]

        px-5
        py-24

        sm:px-8

        lg:px-12
        lg:py-32

        xl:px-16
      "
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.55fr_1.45fr]
          "
        >
          <div>
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#111820]/35
              "
            >
              Journey / 01
            </span>

            <h2
              className="
                mt-5

                text-[clamp(3.5rem,6vw,6rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.065em]
              "
            >
              From entrance
              <br />
              to aircraft.
            </h2>
          </div>

          <div className="relative">
            <div
              className="
                absolute
                bottom-0
                left-[14px]
                top-0

                w-px

                bg-[#111820]/10

                lg:left-[21px]
              "
            />

            <motion.div
              key={journey.id}
              initial={{
                scaleY: 0,
              }}
              animate={{
                scaleY: progress,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "top",
              }}
              className="
                absolute
                left-[14px]
                top-0

                h-full
                w-px

                bg-[#315b78]

                lg:left-[21px]
              "
            />

            <div>
              {journey.stages.map(
                (stage, index) => (
                  <JourneyStage
                    key={`${journey.id}-${stage.id}`}
                    stage={stage}
                    index={index}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}