"use client";

import { motion } from "framer-motion";

import type { FlightType } from "../../data/flights";

interface FlightTabsProps {
  activeType: FlightType;
  onChange: (type: FlightType) => void;
}

const tabs: {
  label: string;
  value: FlightType;
}[] = [
  {
    label: "Departures",
    value: "departure",
  },
  {
    label: "Arrivals",
    value: "arrival",
  },
];

export default function FlightTabs({
  activeType,
  onChange,
}: FlightTabsProps) {
  return (
    <div
      className="
        flex
        border-b
        border-[#111820]/15
      "
    >
      {tabs.map((tab) => {
        const active =
          tab.value === activeType;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className="
              relative

              flex-1

              py-7

              text-left

              sm:py-8
            "
          >
            <span
              className={`
                text-[clamp(1.6rem,3vw,3rem)]
                font-medium
                tracking-[-0.05em]

                transition-colors
                duration-300

                ${
                  active
                    ? "text-[#111820]"
                    : "text-[#111820]/25 hover:text-[#111820]/55"
                }
              `}
            >
              {tab.label}
            </span>

            {active && (
              <motion.span
                layoutId="flight-tab"
                className="
                  absolute
                  bottom-[-1px]
                  left-0

                  h-[3px]
                  w-full

                  bg-[#e8a735]
                "
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 30,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}