"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import HeroHeading from "./hero-heading";
import {
  HeroBottomMeta,
  HeroTopMeta,
} from "./hero-meta";
import HeroReveal from "./hero-reveal";
import HeroSearch from "./hero-search";
import HeroVisual from "./hero-visual";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.24, 0.48],
    [1, 1, 0],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.48],
    [0, -48],
  );

  const metaOpacity = useTransform(
    scrollYProgress,
    [0, 0.28],
    [1, 0],
  );

  return (
    <>
      <HeroReveal />

      <section
        ref={heroRef}
        className="relative h-[230svh] bg-[#f5f2eb] text-[#111820]"
      >
        <div
          className="
            sticky
            top-0
            h-svh
            overflow-hidden
            pt-[var(--navbar-height)]
          "
        >
          <HeroBackground />

          {/* Main hero content */}
          <div
            className="
              relative
              z-20
              mx-auto
              h-[calc(100svh-var(--navbar-height))]
              max-w-[1600px]
              px-5

              sm:px-8
              lg:px-12
              xl:px-16
            "
          >
            <motion.div
              style={{
                opacity: shouldReduceMotion
                  ? 1
                  : metaOpacity,
              }}
            >
              <HeroTopMeta />
            </motion.div>

            <motion.div
              style={{
                opacity: shouldReduceMotion
                  ? 1
                  : contentOpacity,
                y: shouldReduceMotion
                  ? 0
                  : contentY,
              }}
            >
              <HeroHeading />
            </motion.div>

            <motion.div
              style={{
                opacity: shouldReduceMotion
                  ? 1
                  : contentOpacity,
                y: shouldReduceMotion
                  ? 0
                  : contentY,
              }}
              className="
                relative
                z-30
                mx-auto
                mt-5
                w-full

                sm:mt-6
                lg:mt-7
              "
            >
              <HeroSearch />
            </motion.div>

            <motion.div
              style={{
                opacity: shouldReduceMotion
                  ? 1
                  : metaOpacity,
              }}
              className="
                absolute
                inset-x-5
                bottom-5
                z-30

                sm:inset-x-8
                lg:inset-x-12
                xl:inset-x-16
              "
            >
              <HeroBottomMeta />
            </motion.div>
          </div>

          {/* Important:
              Visual now belongs to the entire sticky viewport,
              NOT to a small grid row.
          */}
          <HeroVisual
            scrollProgress={scrollYProgress}
          />
        </div>
      </section>
    </>
  );
}

function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.035]

          [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
          [background-size:52px_52px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[28%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[#315b78]/5
          blur-[100px]

          lg:h-[650px]
          lg:w-[650px]
        "
      />
    </>
  );
}