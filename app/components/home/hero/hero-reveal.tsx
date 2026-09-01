"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroReveal() {
  const [isVisible, setIsVisible] =
    useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 850);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            fixed inset-0
            z-[100]
            flex items-center
            justify-center
            bg-[#111820]
            text-white
          "
        >
          <div className="text-center">
            <div className="overflow-hidden">
              <motion.p
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-3xl
                  font-medium
                  tracking-[-0.05em]

                  sm:text-4xl
                "
              >
                NOVA
              </motion.p>
            </div>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.55,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mx-auto mt-4
                h-px w-24
                origin-left
                bg-white/35
              "
            />

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                delay: 0.25,
              }}
              className="
                mt-4
                text-[8px]
                uppercase
                tracking-[0.35em]
                text-white/45
              "
            >
              LOS · International
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}