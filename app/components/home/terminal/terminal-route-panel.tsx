"use client";

import {
  ArrowUpRight,
  Clock3,
  MoveRight,
} from "lucide-react";

import type { TerminalLocation } from "../../../data/terminal-locations";

interface TerminalRoutePanelProps {
  selectedLocation: TerminalLocation;
  locations: TerminalLocation[];

  onSelectLocation: (
    location: TerminalLocation,
  ) => void;
}

export default function TerminalRoutePanel({
  selectedLocation,
  locations,
  onSelectLocation,
}: TerminalRoutePanelProps) {
  return (
    <aside
      className="
        flex
        flex-col
        justify-between

        border
        border-[#111820]/10

        bg-[#111820]
        p-6
        text-white

        lg:border-l-0
        lg:p-8
      "
    >
      <div>
        <div
          className="
            flex
            items-center
            justify-between

            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/35
          "
        >
          <span>Route</span>
          <span>Active</span>
        </div>

        <div className="mt-10">
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/30
            "
          >
            Destination
          </span>

          <h3
            className="
              mt-3
              text-[clamp(2.3rem,4vw,4rem)]
              font-medium
              leading-none
              tracking-[-0.055em]
            "
          >
            {selectedLocation.name}
          </h3>

          <p
            className="
              mt-4
              max-w-[280px]
              text-sm
              leading-6
              text-white/40
            "
          >
            {selectedLocation.description}
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-2
            gap-5

            border-y
            border-white/10

            py-6
          "
        >
          <RouteFact
            label="Walk"
            value={`${selectedLocation.walkTime} min`}
            icon={<Clock3 size={14} />}
          />

          <RouteFact
            label="Floor"
            value={selectedLocation.level}
          />
        </div>

        <div className="mt-8">
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/30
            "
          >
            Navigate to
          </span>

          <div className="mt-4 space-y-1">
            {locations.map((location) => {
              const isSelected =
                location.id ===
                selectedLocation.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() =>
                    onSelectLocation(location)
                  }
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    justify-between

                    border-b
                    border-white/10

                    py-3

                    text-left
                    text-sm

                    transition-colors
                    duration-300

                    ${
                      isSelected
                        ? "text-white"
                        : "text-white/35 hover:text-white"
                    }
                  `}
                >
                  <span>
                    {location.name}
                  </span>

                  <MoveRight
                    size={14}
                    strokeWidth={1.4}
                    className={`
                      transition-transform
                      duration-300

                      ${
                        isSelected
                          ? "translate-x-0 text-[#e8a735]"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
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
          border-white/10

          pt-6

          text-sm
        "
      >
        Open full terminal map

        <ArrowUpRight
          size={17}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300

            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />
      </button>
    </aside>
  );
}

interface RouteFactProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function RouteFact({
  label,
  value,
  icon,
}: RouteFactProps) {
  return (
    <div>
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-white/30
        "
      >
        {label}
      </span>

      <span
        className="
          mt-2
          flex
          items-center
          gap-2

          text-base
          font-medium
        "
      >
        {icon}
        {value}
      </span>
    </div>
  );
}