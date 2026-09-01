"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";

import { featuredFlights } from "../../../data/featured-flights";

import FlightSuggestion from "./flight-suggestion";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const filteredFlights = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    if (!normalizedQuery) {
      return featuredFlights;
    }

    return featuredFlights.filter((flight) => {
      return (
        flight.flightNumber
          .toLowerCase()
          .includes(normalizedQuery) ||
        flight.destination
          .toLowerCase()
          .includes(normalizedQuery) ||
        flight.airportCode
          .toLowerCase()
          .includes(normalizedQuery)
      );
    });
  }, [query]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    console.log("Search:", trimmedQuery);
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mx-auto
        w-full
        max-w-[760px]
      "
    >
      <form
        onSubmit={handleSubmit}
        role="search"
        className="relative"
      >
        <div
          className={`
            relative flex items-center
            border-b
            transition-colors duration-500

            ${
              isFocused
                ? "border-[#111820]"
                : "border-[#111820]/35"
            }
          `}
        >
          <motion.div
            animate={{
              opacity: isFocused ? 1 : 0.5,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              mr-3 flex shrink-0
              items-center justify-center
            "
          >
            <Search
              aria-hidden="true"
              size={19}
              strokeWidth={1.5}
            />
          </motion.div>

          <label
            htmlFor="flight-search"
            className="sr-only"
          >
            Search by flight, destination or airline
          </label>

          <input
            id="flight-search"
            type="search"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Enter flight, city or airport"
            autoComplete="off"
            className="
              min-w-0 flex-1
              appearance-none
              bg-transparent
              py-4

              text-[15px]
              text-[#111820]
              outline-none

              placeholder:text-[#111820]/35

              [&::-webkit-search-cancel-button]:hidden

              sm:py-5
              sm:text-lg
            "
          />

          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.8,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  mr-2
                  flex size-8 shrink-0
                  items-center justify-center
                  rounded-full

                  text-[#111820]/40

                  transition-colors duration-300

                  hover:bg-[#111820]/5
                  hover:text-[#111820]
                "
              >
                <X
                  size={15}
                  strokeWidth={1.6}
                />
              </motion.button>
            )}
          </AnimatePresence>

          <button
            type="submit"
            aria-label="Search flights"
            className="
              group ml-2
              flex size-11 shrink-0
              items-center justify-center
              rounded-full
              bg-[#111820]
              text-white

              transition-all duration-300

              hover:scale-105
              hover:bg-[#263238]

              active:scale-95
            "
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="
                transition-transform duration-300

                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </button>

          <motion.div
            aria-hidden="true"
            animate={{
              scaleX: isFocused ? 1 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              -bottom-px left-0
              h-px w-full
              origin-left
              bg-[#111820]
            "
          />
        </div>
      </form>

      <div className="mt-5">
        <SearchMeta
          query={query}
          resultCount={filteredFlights.length}
        />

        <AnimatePresence mode="popLayout">
          {filteredFlights.length > 0 ? (
            <motion.div
              key="results"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.08,
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {filteredFlights.map((flight) => (
                <motion.div
                  key={flight.id}
                  layout
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 12,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,

                      transition: {
                        duration: 0.5,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,

                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <FlightSuggestion
                    flight={flight}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptySearchState key="empty" />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface SearchMetaProps {
  query: string;
  resultCount: number;
}

function SearchMeta({
  query,
  resultCount,
}: SearchMetaProps) {
  if (!query.trim()) {
    return (
      <div
        className="
          mb-1
          flex items-center justify-between

          text-[8px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-[#111820]/35

          sm:text-[9px]
        "
      >
        <span>Suggested departures</span>

        <span>Live / LOS</span>
      </div>
    );
  }

  return (
    <div
      className="
        mb-1
        flex items-center justify-between

        text-[8px]
        font-medium
        uppercase
        tracking-[0.18em]
        text-[#111820]/35

        sm:text-[9px]
      "
    >
      <span>
        {resultCount}{" "}
        {resultCount === 1
          ? "result"
          : "results"}
      </span>

      <span>
        “{query}”
      </span>
    </div>
  );
}

function EmptySearchState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        flex min-h-[120px]
        items-center justify-between
        border-b border-[#111820]/10
        py-7
      "
    >
      <div>
        <p
          className="
            text-sm font-medium
            text-[#111820]
          "
        >
          No matching flights
        </p>

        <p
          className="
            mt-1
            text-xs
            text-[#111820]/45
          "
        >
          Try a flight number, city or airport code.
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          text-[10px]
          uppercase
          tracking-[0.18em]
          text-[#111820]/25
        "
      >
        00
      </span>
    </motion.div>
  );
}