"use client";

import { motion } from "framer-motion";

import type { TerminalLocation } from "../../../data/terminal-locations";

interface TerminalLocationProps {
  location: TerminalLocation;
  selected: boolean;
  onClick: () => void;
}

export default function TerminalLocationMarker({
  location,
  selected,
  onClick,
}: TerminalLocationProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
      }}
      className="
        group
        absolute
        z-30
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {selected && (
        <motion.span
          layoutId="terminal-active-marker"
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
          relative
          flex
          size-7
          items-center
          justify-center

          rounded-full
          border

          text-[7px]
          font-medium
          uppercase
          tracking-[0.08em]

          transition-all
          duration-300

          ${
            selected
              ? "border-[#111820] bg-[#111820] text-white"
              : "border-[#111820]/20 bg-[#faf9f6] text-[#111820]/60 hover:border-[#111820]"
          }
        `}
      >
        {location.type === "gate"
          ? location.shortName
          : ""}
      </span>

      <span
        className={`
          absolute
          left-1/2
          top-9

          -translate-x-1/2
          whitespace-nowrap

          text-[8px]
          uppercase
          tracking-[0.16em]

          transition-opacity
          duration-300

          ${
            selected
              ? "text-[#111820]"
              : "text-[#111820]/40 group-hover:text-[#111820]"
          }
        `}
      >
        {location.shortName}
      </span>
    </button>
  );
}