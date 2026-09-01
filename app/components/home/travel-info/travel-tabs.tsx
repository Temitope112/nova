"use client";

import { motion } from "framer-motion";

import type { TravelPhase } from "../../../data/travel-info";

interface TravelTabsProps {
  phases: TravelPhase[];
  activePhase: TravelPhase;
  onSelect: (phase: TravelPhase) => void;
}

export default function TravelTabs({
  phases,
  activePhase,
  onSelect,
}: TravelTabsProps) {
  return (
    <div
      className="
        border-t
        border-[#111820]/15

        lg:border-r
      "
    >
      {phases.map((phase, index) => {
        const active =
          activePhase.id === phase.id;

        return (
          <motion.button
            key={phase.id}
            type="button"
            onClick={() => onSelect(phase)}
            onMouseEnter={() => onSelect(phase)}
            onFocus={() => onSelect(phase)}
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.07,
            }}
            className="
              group
              relative

              grid
              w-full
              grid-cols-[42px_1fr]
              gap-4

              overflow-hidden

              border-b
              border-[#111820]/15

              py-6
              pr-5

              text-left

              sm:grid-cols-[56px_1fr]
            "
          >
            {active && (
              <motion.span
                layoutId="active-travel-phase"
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-[3px]
                  bg-[#e8a735]
                "
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
              />
            )}

            <span
              className="
                font-mono
                text-[9px]
                text-[#111820]/30
              "
            >
              {phase.number}
            </span>

            <div>
              <span
                className={`
                  block

                  text-[clamp(1.45rem,2.6vw,2.5rem)]
                  font-medium
                  tracking-[-0.045em]

                  transition-colors

                  ${
                    active
                      ? "text-[#111820]"
                      : "text-[#111820]/45 group-hover:text-[#111820]"
                  }
                `}
              >
                {phase.label}
              </span>

              <motion.div
                animate={{
                  width: active ? 48 : 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="
                  mt-4
                  h-px
                  bg-[#111820]
                "
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}