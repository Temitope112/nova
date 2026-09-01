"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  airportExperiences,
  type AirportExperience,
} from "../../../data/experiences";

import ExperienceVisual from "./experience-visual";
import ExperienceMenu from "./experience-menu";

export default function Experience() {
  const [activeExperience, setActiveExperience] =
    useState<AirportExperience>(airportExperiences[0]);

  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "10%"],
  );

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        bg-[#f1f2f2]
        text-[#111820]
      "
    >
      <motion.div
        style={{ y: backgroundY }}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[15%]
          top-[10%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#e8eff1]
          blur-[150px]
        "
      />

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
        <ExperienceHeading />

        <div
          className="
            mt-14
            grid
            gap-10

            lg:mt-20
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-14

            xl:gap-20
          "
        >
          <ExperienceVisual
            experience={activeExperience}
          />

          <ExperienceMenu
            experiences={airportExperiences}
            activeExperience={activeExperience}
            onSelect={setActiveExperience}
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceHeading() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
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
          <span>NOVA / Experience</span>

          <span className="h-px w-8 bg-[#111820]/15" />

          <span>05</span>
        </div>

        <h2
          className="
            mt-5

            text-[clamp(3.7rem,8vw,8.5rem)]
            font-medium
            leading-[0.82]
            tracking-[-0.075em]
          "
        >
          More than somewhere
          <br />
          you wait.
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
        Time at NOVA is part of the journey.
        Eat, discover, work, recharge or simply
        slow down before departure.
      </p>
    </motion.div>
  );
}