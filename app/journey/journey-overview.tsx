"use client";

import {
  motion,
} from "framer-motion";

import {
  Clock3,
  DoorOpen,
  MapPin,
  Plane,
} from "lucide-react";

import type { Journey } from "../data/journeys";

interface JourneyOverviewProps {
  journey: Journey;
}

export default function JourneyOverview({
  journey,
}: JourneyOverviewProps) {
  const details = [
    {
      label: "Departure",
      value: journey.departureTime,
      icon: Clock3,
    },
    {
      label: "Terminal",
      value: journey.terminal,
      icon: DoorOpen,
    },
    {
      label: "Gate",
      value: journey.gate,
      icon: MapPin,
    },
    {
      label: "Aircraft",
      value: journey.aircraft,
      icon: Plane,
    },
  ];

  return (
    <section className="bg-[#e8eff1]">
      <div
        className="
          mx-auto
          max-w-[1600px]

          px-5

          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <motion.div
          key={journey.id}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            grid

            border-x
            border-[#111820]/10

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {details.map(
            (detail, index) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="
                    border-b
                    border-[#111820]/10

                    p-6

                    sm:border-r

                    lg:border-b-0
                    lg:p-8

                    lg:last:border-r-0
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-[#111820]/35
                    "
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.35}
                    />

                    <span
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                      "
                    >
                      {detail.label}
                    </span>
                  </div>

                  <p
                    className="
                      mt-5

                      text-xl
                      font-medium
                      tracking-[-0.04em]
                    "
                  >
                    {detail.value}
                  </p>
                </div>
              );
            },
          )}
        </motion.div>
      </div>
    </section>
  );
}