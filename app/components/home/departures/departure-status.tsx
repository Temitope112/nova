"use client";

import { motion } from "framer-motion";

import type { DepartureStatus } from "../../../data/departures";

interface DepartureStatusProps {
  status: DepartureStatus;
}

const labels: Record<DepartureStatus, string> = {
  boarding: "Boarding",
  "on-time": "On time",
  delayed: "Delayed",
  "gate-closing": "Gate closing",
};

const styles: Record<DepartureStatus, string> = {
  boarding: "text-emerald-400",
  "on-time": "text-white/45",
  delayed: "text-[#e8a735]",
  "gate-closing": "text-red-400",
};

export default function DepartureStatusBadge({
  status,
}: DepartureStatusProps) {
  const isUrgent =
    status === "boarding" ||
    status === "gate-closing";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2

        text-[9px]
        font-medium
        uppercase
        tracking-[0.18em]

        sm:text-[10px]

        ${styles[status]}
      `}
    >
      {isUrgent && (
        <span className="relative flex size-1.5">
          <motion.span
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0
              rounded-full
              bg-current
            "
          />

          <span
            className="
              relative
              size-1.5
              rounded-full
              bg-current
            "
          />
        </span>
      )}

      {labels[status]}
    </span>
  );
}