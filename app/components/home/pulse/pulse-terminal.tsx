"use client";

import { motion } from "framer-motion";

import type { TerminalActivity } from "../../../data/airport-pulse";

interface PulseTerminalProps {
  terminal: TerminalActivity;
  index: number;
}

export default function PulseTerminal({
  terminal,
  index,
}: PulseTerminalProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
    >
      <div
        className="
          flex
          items-end
          justify-between
          gap-6
        "
      >
        <div>
          <span
            className="
              text-lg
              font-medium
              tracking-[-0.035em]
            "
          >
            {terminal.terminal}
          </span>

          <p
            className="
              mt-1
              text-[9px]
              text-white/30
            "
          >
            {terminal.description}
          </p>
        </div>

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-white/45
          "
        >
          {terminal.level}
        </span>
      </div>

      <div
        className="
          mt-5
          h-[3px]
          overflow-hidden
          bg-white/10
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${terminal.percentage}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
            delay: 0.15 + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-full
            bg-white/65
          "
        />
      </div>
    </motion.div>
  );
}