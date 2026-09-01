"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import type { AirportExperience } from "../../../data/experiences";

interface ExperienceVisualProps {
  experience: AirportExperience;
}

export default function ExperienceVisual({
  experience,
}: ExperienceVisualProps) {
  return (
    <motion.div
      initial={{
        clipPath:
          "inset(12% 0% 12% 0%)",
      }}
      whileInView={{
        clipPath:
          "inset(0% 0% 0% 0%)",
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        min-h-[520px]
        overflow-hidden
        bg-[#111820]

        sm:min-h-[650px]

        lg:min-h-[760px]
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={experience.id}
          initial={{
            opacity: 0,
            scale: 1.06,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/65
              via-black/5
              to-black/10
            "
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          flex
          items-end
          justify-between
          gap-5

          p-6
          text-white

          sm:p-8
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={experience.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/50
              "
            >
              {experience.eyebrow}
            </span>

            <h3
              className="
                mt-3
                text-[clamp(2.8rem,5vw,5.5rem)]
                font-medium
                leading-none
                tracking-[-0.06em]
              "
            >
              {experience.title}
            </h3>
          </motion.div>
        </AnimatePresence>

        <span
          className="
            hidden
            text-right
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/45

            sm:block
          "
        >
          {experience.location}
        </span>
      </div>
    </motion.div>
  );
}