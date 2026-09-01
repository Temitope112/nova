"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import FinalCtaLine from "./final-cta-line";

export default function FinalCta() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#315b78]
        text-white
      "
    >
      <FinalCtaBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1600px]

          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-12
          lg:py-32

          xl:px-16
          xl:py-36
        "
      >
        <div
          className="
            flex
            items-center
            gap-3

            text-[9px]
            uppercase
            tracking-[0.24em]
            text-white/40
          "
        >
          <span>NOVA / Your Journey</span>

          <span className="h-px w-8 bg-white/20" />

          <span>09</span>
        </div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 70,
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
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-8

            max-w-[1200px]

            text-[clamp(4.2rem,10vw,10rem)]
            font-medium
            leading-[0.78]
            tracking-[-0.08em]
          "
        >
          Ready when
          <br />
          you are.
        </motion.h2>

        <div
          className="
            mt-12
            grid
            gap-10

            lg:mt-16
            lg:grid-cols-[1fr_420px]
            lg:items-end
          "
        >
          <FinalCtaLine />

          <div>
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.65,
                delay: 0.15,
              }}
              className="
                max-w-[380px]

                text-sm
                leading-6
                text-white/60
              "
            >
              Find your flight, understand your route
              and move through NOVA with confidence.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.65,
                delay: 0.25,
              }}
              className="
                mt-8
                flex
                flex-wrap
                gap-4
              "
            >
              <PrimaryAction />

              <SecondaryAction />
            </motion.div>
          </div>
        </div>

        <FinalMeta />
      </div>
    </section>
  );
}

function PrimaryAction() {
  return (
    <button
      type="button"
      className="
        group

        inline-flex
        items-center
        gap-4

        bg-white

        px-6
        py-4

        text-sm
        font-medium
        text-[#111820]

        transition-transform
        duration-300

        hover:-translate-y-1
      "
    >
      Find my flight

      <ArrowUpRight
        size={17}
        strokeWidth={1.5}
        className="
          transition-transform
          duration-300

          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
      />
    </button>
  );
}

function SecondaryAction() {
  return (
    <button
      type="button"
      className="
        group

        inline-flex
        items-center
        gap-4

        border
        border-white/25

        px-6
        py-4

        text-sm
        text-white

        transition-colors
        duration-300

        hover:border-white/50
        hover:bg-white/5
      "
    >
      Plan my visit

      <ArrowUpRight
        size={17}
        strokeWidth={1.5}
        className="
          transition-transform
          duration-300

          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
      />
    </button>
  );
}

function FinalMeta() {
  return (
    <div
      className="
        mt-16

        flex
        flex-col
        gap-3

        border-t
        border-white/15

        pt-5

        text-[8px]
        uppercase
        tracking-[0.2em]
        text-white/35

        sm:flex-row
        sm:items-center
        sm:justify-between

        lg:mt-24
      "
    >
      <span>NOVA International Airport</span>

      <span>LOS · Nigeria</span>
    </div>
  );
}

function FinalCtaBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.05]

          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px)]
          [background-size:72px_100%]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-10%]
          top-[-20%]

          h-[650px]
          w-[650px]

          rounded-full
          bg-white/10
          blur-[160px]
        "
      />
    </>
  );
}