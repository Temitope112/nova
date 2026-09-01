"use client";

import {
  motion,
  MotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

interface HeroFlightPathProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroFlightPath({
  scrollProgress,
}: HeroFlightPathProps) {
  const shouldReduceMotion = useReducedMotion();

  const pathLength = useTransform(
    scrollProgress,
    [0.24, 0.57],
    [0, 1],
  );

  const opacity = useTransform(
    scrollProgress,
    [0.2, 0.28, 0.58, 0.66],
    [0, 1, 1, 0],
  );

  const planeX = useTransform(
    scrollProgress,
    [0.24, 0.57],
    ["12%", "88%"],
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      style={{ opacity }}
      className="
        pointer-events-none
        absolute inset-0
        z-30
      "
    >
      <svg
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="
          absolute inset-0
          h-full w-full
        "
      >
        <motion.path
          d="M100 280 C330 90 680 80 900 180"
          fill="none"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="1.25"
          strokeDasharray="4 8"
          style={{
            pathLength,
          }}
        />
      </svg>

      <motion.div
        style={{
          left: planeX,
        }}
        className="
          absolute
          top-[44%]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <div
          className="
            flex items-center gap-2
            text-white
          "
        >
          <span
            className="
              block size-2
              rounded-full
              bg-white

              shadow-[0_0_18px_rgba(255,255,255,0.9)]
            "
          />

          <span
            className="
              hidden
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-white/65

              sm:block
            "
          >
            LOS → LHR
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}