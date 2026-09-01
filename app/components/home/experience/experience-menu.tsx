"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { AirportExperience } from "../../../data/experiences";

interface ExperienceMenuProps {
  experiences: AirportExperience[];
  activeExperience: AirportExperience;

  onSelect: (
    experience: AirportExperience,
  ) => void;
}

export default function ExperienceMenu({
  experiences,
  activeExperience,
  onSelect,
}: ExperienceMenuProps) {
  return (
    <div
      className="
        border-t
        border-[#111820]/15
      "
    >
      {experiences.map(
        (experience, index) => {
          const active =
            experience.id ===
            activeExperience.id;

          return (
            <motion.button
              key={experience.id}
              type="button"
              onMouseEnter={() =>
                onSelect(experience)
              }
              onFocus={() =>
                onSelect(experience)
              }
              onClick={() =>
                onSelect(experience)
              }
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
              }}
              className="
                group
                relative
                w-full
                overflow-hidden

                border-b
                border-[#111820]/15

                py-5
                text-left

                sm:py-6
              "
            >
              {active && (
                <motion.span
                  layoutId="experience-active"
                  className="
                    absolute
                    inset-0
                    bg-[#111820]
                  "
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 28,
                  }}
                />
              )}

              <div
                className="
                  relative
                  z-10

                  grid
                  grid-cols-[40px_1fr_auto]
                  items-center
                  gap-4
                "
              >
                <span
                  className={`
                    font-mono
                    text-[9px]

                    transition-colors

                    ${
                      active
                        ? "text-white/35"
                        : "text-[#111820]/30"
                    }
                  `}
                >
                  {experience.number}
                </span>

                <div>
                  <span
                    className={`
                      block

                      text-[clamp(1.5rem,2.5vw,2.4rem)]
                      font-medium
                      tracking-[-0.04em]

                      transition-colors

                      ${
                        active
                          ? "text-white"
                          : "text-[#111820]"
                      }
                    `}
                  >
                    {experience.title}
                  </span>

                  <AnimatePresence>
                    {active && (
                      <motion.p
                        initial={{
                          height: 0,
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                        }}
                        className="
                          mt-3
                          max-w-[420px]
                          overflow-hidden

                          text-xs
                          leading-5
                          text-white/45
                        "
                      >
                        {
                          experience.description
                        }
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.4}
                  className={`
                    transition-all
                    duration-300

                    ${
                      active
                        ? "text-[#e8a735]"
                        : "text-[#111820]/25 group-hover:text-[#111820]"
                    }
                  `}
                />
              </div>
            </motion.button>
          );
        },
      )}
    </div>
  );
}