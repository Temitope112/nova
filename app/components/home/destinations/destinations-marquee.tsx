"use client";

import { motion } from "framer-motion";

const cities = [
  "London",
  "Dubai",
  "Paris",
  "Cape Town",
  "New York",
  "Tokyo",
  "Amsterdam",
  "Doha",
];

export default function DestinationsMarquee() {
  const marquee = [...cities, ...cities];

  return (
    <div
      className="
        mt-16
        overflow-hidden

        border-y
        border-[#111820]/15

        py-6

        lg:mt-24
      "
    >
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          flex
          w-max
          items-center
        "
      >
        {marquee.map((city, index) => (
          <div
            key={`${city}-${index}`}
            className="
              flex
              items-center
            "
          >
            <span
              className="
                whitespace-nowrap

                text-[clamp(1rem,2vw,1.5rem)]
                uppercase
                tracking-[0.16em]
                text-[#111820]/45
              "
            >
              {city}
            </span>

            <span
              className="
                mx-7
                size-1
                rounded-full
                bg-[#e8a735]

                lg:mx-10
              "
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}