"use client";

import { motion } from "framer-motion";

import JourneyStep from "./journey-step";

export type JourneyStepStatus =
  | "complete"
  | "active"
  | "upcoming";

export interface JourneyStepItem {
  id: string;
  label: string;
  time: string;
  meta: string;
  status: JourneyStepStatus;
}

interface JourneyProgressProps {
  steps: JourneyStepItem[];
}

export default function JourneyProgress({
  steps,
}: JourneyProgressProps) {
  const activeIndex = steps.findIndex(
    (step) => step.status === "active",
  );

  const progress =
    activeIndex <= 0
      ? 0
      : (activeIndex / (steps.length - 1)) * 100;

  return (
    <div
      className="
        relative
        border-t
        border-[#111820]/15
        pt-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          text-[9px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/35
        "
      >
        <span>Journey progress</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="relative mt-10">
        <div
          className="
            absolute
            left-[7px]
            top-4
            h-[calc(100%-32px)]
            w-px
            bg-[#111820]/15
          "
        />

        <motion.div
          initial={{
            height: 0,
          }}
          whileInView={{
            height: `${progress}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            left-[7px]
            top-4
            w-px
            bg-[#111820]
          "
        />

        <div className="space-y-0">
          {steps.map((step, index) => (
            <JourneyStep
              key={step.id}
              step={step}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}