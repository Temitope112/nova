"use client";

import { motion } from "framer-motion";

export default function FinalCtaLine() {
  return (
    <div
      className="
        relative
        hidden
        h-[110px]

        lg:block
      "
    >
      <div
        className="
          absolute
          left-0
          top-1/2

          h-px
          w-full

          -translate-y-1/2

          bg-white/15
        "
      />

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 1.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "left",
        }}
        className="
          absolute
          left-0
          top-1/2

          h-px
          w-full

          -translate-y-1/2

          bg-white/65
        "
      />

      <motion.span
        initial={{
          left: "0%",
          opacity: 0,
        }}
        whileInView={{
          left: "100%",
          opacity: [0, 1, 1, 0],
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.35,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          top-1/2

          size-2

          -translate-x-1/2
          -translate-y-1/2

          rounded-full
          bg-[#e8a735]
        "
      />

      <span
        className="
          absolute
          left-0
          top-[calc(50%+14px)]

          font-mono
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-white/30
        "
      >
        LOS
      </span>

      <span
        className="
          absolute
          right-0
          top-[calc(50%+14px)]

          font-mono
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-white/30
        "
      >
        Your next departure
      </span>
    </div>
  );
}