"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import type {
  JourneyStepItem,
  JourneyStepStatus,
} from "./journey-progress";

interface JourneyStepProps {
  step: JourneyStepItem;
  index: number;
}

export default function JourneyStep({
  step,
  index,
}: JourneyStepProps) {
  return (
    <motion.div
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
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        grid
        grid-cols-[16px_1fr_auto]
        gap-5
        py-6

        first:pt-0
        last:pb-0
      "
    >
      <JourneyNode status={step.status} />

      <div
        className="
          min-w-0
          border-b
          border-[#111820]/10
          pb-6

          group-last:border-none
        "
      >
        <div
          className="
            flex
            flex-col
            gap-1

            sm:flex-row
            sm:items-baseline
            sm:gap-3
          "
        >
          <span
            className="
              text-xl
              font-medium
              tracking-[-0.035em]
            "
          >
            {step.label}
          </span>

          {step.status === "active" && (
            <span
              className="
                w-fit
                bg-[#111820]
                px-2
                py-1

                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white
              "
            >
              You are here
            </span>
          )}
        </div>

        <p
          className="
            mt-2
            text-sm
            text-[#111820]/45
          "
        >
          {step.meta}
        </p>
      </div>

      <span
        className="
          font-mono
          text-sm
          text-[#111820]/55
        "
      >
        {step.time}
      </span>
    </motion.div>
  );
}

interface JourneyNodeProps {
  status: JourneyStepStatus;
}

function JourneyNode({
  status,
}: JourneyNodeProps) {
  if (status === "complete") {
    return (
      <span
        className="
          relative
          z-10

          flex
          size-4
          items-center
          justify-center

          rounded-full
          bg-[#111820]
          text-white
        "
      >
        <Check
          size={9}
          strokeWidth={2}
        />
      </span>
    );
  }

  if (status === "active") {
    return (
      <span
        className="
          relative
          z-10
          flex
          size-4
          items-center
          justify-center
        "
      >
        <motion.span
          animate={{
            scale: [1, 1.9, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
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
            size-2.5
            rounded-full
            bg-[#e8a735]
          "
        />
      </span>
    );
  }

  return (
    <span
      className="
        relative
        z-10
        size-4
        rounded-full
        border
        border-[#111820]/25
        bg-[#e8eff1]
      "
    />
  );
}