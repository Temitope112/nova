"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

export default function HeroHeading() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="
        relative z-20
        mx-auto
        max-w-[1200px]
        pt-10
        text-center

        sm:pt-14
        lg:pt-16
      "
    >
      <motion.p
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0 }
        }
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.7,
        }}
        className="
          mb-4
          text-[9px]
          font-medium
          uppercase
          tracking-[0.3em]
          text-[#111820]/40

          sm:text-[10px]
          lg:text-xs
        "
      >
        Lagos International Airport
      </motion.p>

      <HeadingLine
        text="Where are you"
        delay={0.72}
      />

      <HeadingLine
        text="headed?"
        delay={0.82}
      />
    </div>
  );
}

interface HeadingLineProps {
  text: string;
  delay: number;
}

function HeadingLine({
  text,
  delay,
}: HeadingLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <motion.span
        initial={
          shouldReduceMotion
            ? false
            : {
                y: "110%",
              }
        }
        animate={{
          y: 0,
        }}
        transition={{
          duration: 1.05,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          block
          text-[clamp(3.3rem,7.8vw,8rem)]
          font-medium
          leading-[0.84]
          tracking-[-0.065em]
        "
      >
        {text}
      </motion.span>
    </div>
  );
}