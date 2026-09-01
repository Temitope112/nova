"use client";

import {
  Search,
} from "lucide-react";

import type { Journey } from "../../data/journeys";

interface JourneyFlightSearchProps {
  journey: Journey;
  journeys: Journey[];
  onJourneyChange: (journey: Journey) => void;
}

export default function JourneyFlightSearch({
  journey,
  journeys,
  onJourneyChange,
}: JourneyFlightSearchProps) {
  return (
    <div
      className="
        border-t
        border-white/15

        pt-6
      "
    >
      <div
        className="
          flex
          items-center
          gap-3

          text-white/40
        "
      >
        <Search
          size={15}
          strokeWidth={1.4}
        />

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.18em]
          "
        >
          Find your flight
        </span>
      </div>

      <div
        className="
          mt-5
          space-y-2
        "
      >
        {journeys.map((item) => {
          const active =
            item.id === journey.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onJourneyChange(item)
              }
              className={`
                flex
                w-full
                items-center
                justify-between

                border

                px-4
                py-4

                text-left

                transition-colors
                duration-300

                ${
                  active
                    ? "border-white bg-white text-[#111820]"
                    : "border-white/15 text-white hover:border-white/35"
                }
              `}
            >
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                  "
                >
                  {item.flightNumber}
                </p>

                <span
                  className={`
                    mt-1
                    block

                    text-[8px]
                    uppercase
                    tracking-[0.15em]

                    ${
                      active
                        ? "text-[#111820]/40"
                        : "text-white/30"
                    }
                  `}
                >
                  {item.destination.city}
                </span>
              </div>

              <span
                className="
                  text-xs
                  font-medium
                "
              >
                {item.departureTime}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}