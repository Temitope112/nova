"use client";

import {
  motion,
} from "framer-motion";

import type { JourneyStage as JourneyStageType } from "../../data/journeys";

interface JourneyStageProps {
  stage: JourneyStageType;
  index: number;
}

export default function JourneyStage({
  stage,
  index,
}: JourneyStageProps) {
  const complete =
    stage.status === "complete";

  const active =
    stage.status === "active";

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: 24,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
      }}
      className="
        relative

        grid
        gap-5

        border-b
        border-[#111820]/10

        py-8
        pl-12

        lg:grid-cols-[90px_1fr_0.8fr]
        lg:items-start
        lg:gap-8
        lg:pl-16
        lg:py-10
      "
    >
      <div
        className="
          absolute
          left-[6px]
          top-[34px]

          lg:left-[13px]
          lg:top-[43px]
        "
      >
        {active && (
          <motion.span
            animate={{
              scale: [1, 2.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="
              absolute
              inset-0

              size-4

              rounded-full

              bg-[#e8a735]
            "
          />
        )}

        <span
          className={`
            relative

            flex
            size-4
            items-center
            justify-center

            rounded-full

            border

            ${
              active
                ? "border-[#e8a735] bg-[#e8a735]"
                : complete
                  ? "border-[#315b78] bg-[#315b78]"
                  : "border-[#111820]/20 bg-[#faf9f6]"
            }
          `}
        >
          <span
            className={`
              size-1
              rounded-full

              ${
                active || complete
                  ? "bg-white"
                  : "bg-[#111820]/25"
              }
            `}
          />
        </span>
      </div>

      <div>
        <span
          className="
            font-mono
            text-[8px]
            text-[#111820]/30
          "
        >
          {stage.number}
        </span>

        <p
          className="
            mt-2

            text-xs
            font-medium
          "
        >
          {stage.time}
        </p>
      </div>

      <div>
        <span
          className={`
            text-[8px]
            uppercase
            tracking-[0.18em]

            ${
              active
                ? "text-[#e8a735]"
                : "text-[#111820]/35"
            }
          `}
        >
          {active
            ? "Now"
            : stage.status}
        </span>

        <h3
          className="
            mt-2

            text-3xl
            font-medium
            tracking-[-0.05em]
          "
        >
          {stage.title}
        </h3>

        <p
          className="
            mt-2

            text-xs
            uppercase
            tracking-[0.12em]
            text-[#111820]/35
          "
        >
          {stage.detail}
        </p>
      </div>

      <p
        className="
          max-w-md

          text-sm
          leading-6
          text-[#111820]/45
        "
      >
        {stage.description}
      </p>
    </motion.article>
  );
}