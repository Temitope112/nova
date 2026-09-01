"use client";

import { motion } from "framer-motion";

import type { AirportPlace } from "../../data/airport-places";

interface AirportMapProps {
  places: AirportPlace[];
  selectedPlace: AirportPlace;
  onSelectPlace: (
    place: AirportPlace,
  ) => void;
}

export default function AirportMap({
  places,
  selectedPlace,
  onSelectPlace,
}: AirportMapProps) {
  return (
    <div
      className="
        relative

        min-h-[560px]

        overflow-hidden

        bg-[#e9e0d2]

        sm:min-h-[650px]
        lg:min-h-[720px]
      "
    >
      <MapGrid />

      <MapLabels />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0

          h-full
          w-full
        "
        aria-hidden="true"
      >
        <TerminalArchitecture />

        <motion.path
          key={selectedPlace.id}
          d={createRoute(selectedPlace)}
          fill="none"
          stroke="#315b78"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="2 2"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      <YouAreHere />

      {places.map((place) => {
        const active =
          selectedPlace.id === place.id;

        return (
          <button
            key={place.id}
            type="button"
            onClick={() =>
              onSelectPlace(place)
            }
            aria-label={`Show ${place.name}`}
            style={{
              left: `${place.x}%`,
              top: `${place.y}%`,
            }}
            className="
              group

              absolute
              z-20

              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <motion.span
              animate={{
                scale: active ? 1.15 : 1,
              }}
              className={`
                relative

                flex
                size-5

                items-center
                justify-center

                rounded-full

                border

                transition-colors

                ${
                  active
                    ? "border-[#111820] bg-[#111820]"
                    : "border-[#111820]/30 bg-[#f5f2eb]"
                }
              `}
            >
              {active && (
                <motion.span
                  layoutId="airport-map-marker"
                  className="
                    absolute
                    -inset-2

                    rounded-full
                    border
                    border-[#111820]/20
                  "
                />
              )}

              <span
                className={`
                  size-1.5
                  rounded-full

                  ${
                    active
                      ? "bg-[#e8a735]"
                      : "bg-[#111820]/50"
                  }
                `}
              />
            </motion.span>

            <span
              className={`
                absolute
                left-1/2
                top-8

                -translate-x-1/2

                whitespace-nowrap

                bg-[#f5f2eb]

                px-2
                py-1

                text-[7px]
                uppercase
                tracking-[0.15em]

                shadow-sm

                transition-opacity

                ${
                  active
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }
              `}
            >
              {place.name}
            </span>
          </button>
        );
      })}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-20

          bg-[#f5f2eb]/90

          px-4
          py-3

          backdrop-blur-md

          sm:bottom-7
          sm:left-7
        "
      >
        <span
          className="
            text-[7px]
            uppercase
            tracking-[0.18em]
            text-[#111820]/35
          "
        >
          Selected destination
        </span>

        <p
          className="
            mt-1

            text-sm
            font-medium
          "
        >
          {selectedPlace.name}
        </p>
      </div>
    </div>
  );
}

function createRoute(
  place: AirportPlace,
) {
  return `
    M 13 84
    C 18 76, 24 72, 31 68
    S 45 58, ${place.x} ${place.y}
  `;
}

function YouAreHere() {
  return (
    <div
      style={{
        left: "13%",
        top: "84%",
      }}
      className="
        absolute
        z-20

        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <span className="relative flex size-3">
        <motion.span
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
          }}
          className="
            absolute
            inset-0

            rounded-full
            bg-[#315b78]
          "
        />

        <span
          className="
            relative
            size-3

            rounded-full
            bg-[#315b78]
          "
        />
      </span>

      <span
        className="
          absolute
          left-5
          top-1/2

          -translate-y-1/2

          whitespace-nowrap

          text-[7px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-[#315b78]
        "
      >
        You are here
      </span>
    </div>
  );
}

function TerminalArchitecture() {
  return (
    <>
      <path
        d="
          M14 76
          L14 36
          C14 30 18 27 24 27
          H44
          V38
          H56
          V25
          H82
          C87 25 90 29 90 34
          V72
          H70
          V82
          H31
          V76
          Z
        "
        fill="#f5f2eb"
        stroke="#111820"
        strokeOpacity="0.12"
        strokeWidth="0.4"
      />

      <path
        d="M44 27 V82"
        stroke="#111820"
        strokeOpacity="0.08"
        strokeWidth="0.4"
      />

      <path
        d="M56 25 V82"
        stroke="#111820"
        strokeOpacity="0.08"
        strokeWidth="0.4"
      />

      <path
        d="M14 51 H90"
        stroke="#111820"
        strokeOpacity="0.08"
        strokeWidth="0.4"
      />

      <path
        d="M31 68 H70"
        stroke="#111820"
        strokeOpacity="0.08"
        strokeWidth="0.4"
      />
    </>
  );
}

function MapGrid() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0

        opacity-[0.045]

        [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
        [background-size:48px_48px]
      "
    />
  );
}

function MapLabels() {
  return (
    <>
      <span
        className="
          absolute
          left-[22%]
          top-[20%]

          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/25
        "
      >
        Terminal 1
      </span>

      <span
        className="
          absolute
          right-[15%]
          top-[18%]

          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/25
        "
      >
        Terminal 2
      </span>
    </>
  );
}