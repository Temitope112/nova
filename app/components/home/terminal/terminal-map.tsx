"use client";

import { motion } from "framer-motion";

import type { TerminalLocation } from "../../../data/terminal-locations";

import TerminalLocationMarker from "./terminal-location";

interface TerminalMapProps {
  selectedLocation: TerminalLocation;
  locations: TerminalLocation[];
  onSelectLocation: (
    location: TerminalLocation,
  ) => void;
}

interface MapMarkersProps {
  locations: TerminalLocation[];
  selectedLocation: TerminalLocation;
  onSelectLocation: (
    location: TerminalLocation,
  ) => void;
}

export default function TerminalMap({
  selectedLocation,
  locations,
  onSelectLocation,
}: TerminalMapProps) {
  return (
    <div
      className="
        relative
        min-h-[520px]
        overflow-hidden

        border
        border-[#111820]/10

        bg-[#e9e0d2]

        sm:min-h-[620px]
        lg:min-h-[720px]
      "
    >
      <MapArchitecture />

      <div
        className="
          absolute
          left-[18%]
          top-[78%]
          z-30
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <YouAreHere />
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          h-full
          w-full
        "
      >
        <motion.path
          key={selectedLocation.id}
          d={selectedLocation.path}
          fill="none"
          stroke="#111820"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeDasharray="2.2 1.5"
          vectorEffect="non-scaling-stroke"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      <MapMarkers
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={onSelectLocation}
      />

      <MapMeta />
    </div>
  );
}

function MapMarkers({
  locations,
  selectedLocation,
  onSelectLocation,
}: MapMarkersProps) {
  return (
    <>
      {locations.map((location) => (
        <TerminalLocationMarker
          key={location.id}
          location={location}
          selected={
            selectedLocation.id ===
            location.id
          }
          onClick={() =>
            onSelectLocation(location)
          }
        />
      ))}
    </>
  );
}

function YouAreHere() {
  return (
    <div className="relative flex items-center">
      <motion.span
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.25, 0, 0.25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          size-6
          rounded-full
          bg-[#315b78]
        "
      />

      <span
        className="
          relative
          size-3
          rounded-full
          border-2
          border-[#faf9f6]
          bg-[#315b78]
        "
      />

      <span
        className="
          absolute
          left-5
          whitespace-nowrap

          text-[8px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-[#111820]/55
        "
      >
        You are here
      </span>
    </div>
  );
}

function MapMeta() {
  return (
    <>
      <div
        className="
          absolute
          left-5
          top-5
          z-30

          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/40

          sm:left-7
          sm:top-7
        "
      >
        Terminal 2 / Level 02
      </div>

      <div
        className="
          absolute
          bottom-5
          right-5
          z-30

          text-right
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/35

          sm:bottom-7
          sm:right-7
        "
      >
        <span className="block">
          NOVA / LOS
        </span>

        <span className="mt-1 block">
          Scale · 1:1200
        </span>
      </div>
    </>
  );
}

function MapArchitecture() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="
        absolute
        inset-0
        h-full
        w-full
      "
    >
      <path
        d="
          M8 82
          L24 82
          L29 71
          L44 71
          L49 61
          L72 61
          L72 52
          L88 52
          L88 25
          L67 25
          L62 36
          L43 36
          L37 49
          L22 49
          L17 62
          L8 62
          Z
        "
        fill="rgba(250,249,246,0.65)"
        stroke="rgba(17,24,32,0.15)"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M29 71 L29 49"
        stroke="rgba(17,24,32,0.08)"
        strokeWidth="0.25"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M49 61 L49 36"
        stroke="rgba(17,24,32,0.08)"
        strokeWidth="0.25"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M72 52 L72 25"
        stroke="rgba(17,24,32,0.08)"
        strokeWidth="0.25"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}