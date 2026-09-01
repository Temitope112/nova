"use client";

import { motion } from "framer-motion";

import {
  airportCategories,
  type AirportPlaceCategory,
} from "../../data/airport-places";

interface AirportNavigationProps {
  activeCategory: AirportPlaceCategory;
  onChange: (
    category: AirportPlaceCategory,
  ) => void;
}

export default function AirportNavigation({
  activeCategory,
  onChange,
}: AirportNavigationProps) {
  return (
    <section
      id="airport-directory"
      className="
        bg-[#111820]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]

          px-5

          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            flex
            items-center
            gap-6

            overflow-x-auto

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {airportCategories.map(
            (category) => {
              const active =
                activeCategory ===
                category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() =>
                    onChange(category.value)
                  }
                  className="
                    relative

                    shrink-0

                    py-7

                    text-sm
                    font-medium

                    sm:py-8
                  "
                >
                  <span
                    className={`
                      transition-colors
                      duration-300

                      ${
                        active
                          ? "text-white"
                          : "text-white/35 hover:text-white/70"
                      }
                    `}
                  >
                    {category.label}
                  </span>

                  {active && (
                    <motion.span
                      layoutId="airport-category"
                      className="
                        absolute
                        bottom-0
                        left-0

                        h-[3px]
                        w-full

                        bg-[#e8a735]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                      }}
                    />
                  )}
                </button>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}