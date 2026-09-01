"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PulseMetricProps {
  label: string;
  value: string;
  suffix?: string;
  description: string;
  children?: ReactNode;
}

export default function PulseMetric({
  label,
  value,
  suffix,
  description,
  children,
}: PulseMetricProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        px-0
        py-8

        lg:px-8
        lg:py-10

        xl:px-10
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/30
        "
      >
        {label}
      </span>

      <div
        className="
          mt-7
          flex
          items-end
          gap-2
        "
      >
        <span
          className="
            text-[clamp(3.5rem,6vw,6.5rem)]
            font-medium
            leading-[0.8]
            tracking-[-0.07em]
          "
        >
          {value}
        </span>

        {suffix && (
          <span
            className="
              mb-1
              text-sm
              uppercase
              tracking-[0.12em]
              text-white/40
            "
          >
            {suffix}
          </span>
        )}
      </div>

      <p
        className="
          mt-5
          text-xs
          leading-5
          text-white/35
        "
      >
        {description}
      </p>

      {children}
    </motion.div>
  );
}