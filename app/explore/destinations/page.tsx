"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";

const destinations = [
  {
    city: "London",
    country: "United Kingdom",
    code: "LHR",
    region: "Europe",
    image: "/london.png",
    description:
      "Historic streets, global culture and one of the world’s busiest aviation hubs.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    code: "DXB",
    region: "Middle East",
    image: "/Dubai.png",
    description:
      "A global crossroads built around scale, speed and modern hospitality.",
  },
  {
    city: "Paris",
    country: "France",
    code: "CDG",
    region: "Europe",
    image: "/paris.png",
    description:
      "Art, architecture, food and streets made for wandering.",
  },
  {
    city: "Cape Town",
    country: "South Africa",
    code: "CPT",
    region: "Africa",
    image: "/cape-town.png",
    description:
      "Mountains, coastlines and one of Africa’s most visually striking cities.",
  },
  {
    city: "New York",
    country: "United States",
    code: "JFK",
    region: "North America",
    image: "/new-york.png",
    description:
      "Fast, dense and endlessly alive, with something happening in every direction.",
  },
  {
    city: "Tokyo",
    country: "Japan",
    code: "HND",
    region: "Asia",
    image: "/tokyo.png",
    description:
      "Precision, energy and tradition layered into one extraordinary city.",
  },
];

export default function DestinationsPage() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 80],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0.4],
  );

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section
        className="
          relative
          min-h-[90svh]
          overflow-hidden
          bg-[#111820]
          pt-[var(--navbar-height)]
          text-white
        "
      >
        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="absolute inset-0"
        >
          <Image
            src="/london.png"
            alt="London destination"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#111820]
              via-[#111820]/35
              to-[#111820]/10
            "
          />
        </motion.div>

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[calc(90svh-var(--navbar-height))]
            max-w-[1600px]
            flex-col
            justify-between
            px-5
            pb-10
            pt-10
            sm:px-8
            lg:px-12
            lg:pb-14
            lg:pt-14
            xl:px-16
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/45">
              NOVA / Destinations
            </span>

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/45">
              LOS · Global routes
            </span>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[1150px]"
          >
            <p className="mb-6 text-[9px] uppercase tracking-[0.22em] text-[#e8a735]">
              From Lagos to the world
            </p>

            <h1
              className="
                text-[clamp(4.5rem,11vw,11rem)]
                font-medium
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              Pick a
              <br />
              direction.
            </h1>
          </motion.div>

          <div
            className="
              flex
              flex-col
              gap-6
              border-t
              border-white/15
              pt-6
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <p className="max-w-md text-sm leading-6 text-white/50">
              Explore the cities connected to NOVA and find your next flight.
            </p>

            <a
              href="#destinations"
              className="
                group
                inline-flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.2em]
              "
            >
              Browse destinations

              <ArrowDown
                size={14}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              />
            </a>
          </div>
        </div>
      </section>

      {/* INTRO / SEARCH */}
      <section
        id="destinations"
        className="
          bg-[#f5f2eb]
          px-5
          py-20
          sm:px-8
          lg:px-12
          lg:py-28
          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12
            lg:grid-cols-[0.55fr_1.45fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              Destinations / 01
            </span>
          </div>

          <div>
            <h2
              className="
                max-w-4xl
                text-[clamp(3rem,6vw,6rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.065em]
              "
            >
              One airport.
              <br />
              A world of directions.
            </h2>

            <div
              className="
                mt-10
                flex
                items-center
                gap-4
                border-b
                border-[#111820]/20
                pb-4
              "
            >
              <Search
                size={17}
                strokeWidth={1.4}
                className="text-[#111820]/35"
              />

              <input
                type="text"
                placeholder="Search a city or airport"
                className="
                  w-full
                  bg-transparent
                  text-base
                  outline-none
                  placeholder:text-[#111820]/30
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION GRID */}
      <section
        className="
          bg-[#e9e0d2]
          px-5
          py-20
          sm:px-8
          lg:px-12
          lg:py-28
          xl:px-16
        "
      >
        <div className="mx-auto max-w-[1600px]">
          <div
            className="
              grid
              gap-4
              md:grid-cols-2
              lg:grid-cols-12
            "
          >
            {destinations.map((destination, index) => {
              const large =
                index === 0 ||
                index === 3 ||
                index === 4;

              return (
                <motion.article
                  key={destination.code}
                  initial={{
                    opacity: 0,
                    y: 32,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group
                    relative
                    min-h-[450px]
                    overflow-hidden
                    ${
                      large
                        ? "lg:col-span-7"
                        : "lg:col-span-5"
                    }
                  `}
                >
                  <Image
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="
                      object-cover
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-[1.04]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#111820]/90
                      via-[#111820]/10
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      p-6
                      text-white
                      sm:p-8
                    "
                  >
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <span className="text-[8px] uppercase tracking-[0.2em] text-white/50">
                          {destination.region} · {destination.code}
                        </span>

                        <h2
                          className="
                            mt-2
                            text-4xl
                            font-medium
                            tracking-[-0.055em]
                            sm:text-5xl
                          "
                        >
                          {destination.city}
                        </h2>

                        <p className="mt-3 max-w-sm text-xs leading-5 text-white/55">
                          {destination.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.3}
                        className="
                          shrink-0
                          text-white/50
                          transition-transform
                          duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROUTE STRIP */}
      <section className="bg-[#111820] text-white">
        <div
          className="
            mx-auto
            max-w-[1600px]
            px-5
            py-20
            sm:px-8
            lg:px-12
            lg:py-24
            xl:px-16
          "
        >
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.55fr_1.45fr]
              lg:items-end
            "
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                Routes / 02
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-6">
                <span className="text-sm text-white/50">
                  Lagos
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e8a735]">
                  LOS
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-6
                  py-10
                "
              >
                <span
                  className="
                    text-[clamp(3rem,7vw,7rem)]
                    font-medium
                    tracking-[-0.065em]
                  "
                >
                  LOS
                </span>

                <div className="relative h-px flex-1 bg-white/20">
                  <motion.span
                    initial={{
                      scaleX: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute
                      inset-0
                      origin-left
                      bg-[#e8a735]
                    "
                  />
                </div>

                <span
                  className="
                    text-[clamp(3rem,7vw,7rem)]
                    font-medium
                    tracking-[-0.065em]
                  "
                >
                  LHR
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-white/15 pt-6">
                <span className="text-sm text-white/50">
                  London
                </span>

                <Link
                  href="/flights"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  Find this flight

                  <ArrowRight
                    size={15}
                    strokeWidth={1.4}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="bg-[#315b78] text-white">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-10
            px-5
            py-20
            sm:px-8
            lg:grid-cols-[1.2fr_0.8fr]
            lg:items-end
            lg:px-12
            lg:py-28
            xl:px-16
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
              Ready when you are
            </span>

            <h2
              className="
                mt-6
                text-[clamp(4rem,8vw,8rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.07em]
              "
            >
              Choose the city.
              <br />
              We&apos;ll handle the route.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Search flights from NOVA and start planning the journey from Lagos
              to your next destination.
            </p>

            <Link
              href="/flights"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                border-b
                border-white/30
                pb-2
                text-sm
              "
            >
              Browse flights

              <ArrowUpRight
                size={16}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}