"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  travelPhases,
  type TravelPhase,
} from "../../../data/travel-info";

import TravelTabs from "./travel-tabs";
import TravelDetail from "./travel-detail";

export default function TravelInfo() {
  const [activePhase, setActivePhase] =
    useState<TravelPhase>(travelPhases[0]);

  return (
    <section
      id="travel-info"
      className="
        relative
        overflow-hidden
        bg-[#e8eff1]
        text-[#111820]
      "
    >
      <TravelBackground />

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
        "
      >
        <TravelHeading />

        <div
          className="
            mt-14
            grid
            gap-10

            lg:mt-20
            lg:grid-cols-[0.78fr_1.22fr]
            lg:gap-0
          "
        >
          <TravelTabs
            phases={travelPhases}
            activePhase={activePhase}
            onSelect={setActivePhase}
          />

          <TravelDetail phase={activePhase} />
        </div>
      </div>
    </section>
  );
}

function TravelHeading() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        grid
        gap-8

        lg:grid-cols-[1fr_340px]
        lg:items-end
      "
    >
      <div>
        <div
          className="
            flex
            items-center
            gap-3

            text-[9px]
            uppercase
            tracking-[0.24em]
            text-[#111820]/35
          "
        >
          <span>NOVA / Travel Information</span>

          <span className="h-px w-8 bg-[#111820]/15" />

          <span>08</span>
        </div>

        <h2
          className="
            mt-5

            text-[clamp(3.8rem,8vw,8.7rem)]
            font-medium
            leading-[0.81]
            tracking-[-0.075em]
          "
        >
          Before you
          <br />
          leave home.
        </h2>
      </div>

      <p
        className="
          max-w-[340px]
          text-sm
          leading-6
          text-[#111820]/45
        "
      >
        The smoothest airport journey
        usually starts long before you
        reach the terminal.
      </p>
    </motion.div>
  );
}

function TravelBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.035]

          [background-image:linear-gradient(to_right,#111820_1px,transparent_1px)]
          [background-size:72px_100%]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-18%]
          bottom-[-15%]

          h-[650px]
          w-[650px]

          rounded-full
          bg-white/45
          blur-[160px]
        "
      />
    </>
  );
}