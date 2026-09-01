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
} from "lucide-react";

import {
  exploreDestinations,
  exploreStories,
} from "./data";

export default function ExplorePage() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 90],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0.35],
  );

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section
        className="
          relative
          min-h-svh
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
          className="
            absolute
            inset-0
          "
        >
          <Image
            src="/cape-town.png"
            alt="Explore destinations from NOVA"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              opacity-55
            "
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
            min-h-[calc(100svh-var(--navbar-height))]
            max-w-[1600px]
            flex-col
            justify-between

            px-5
            pb-8
            pt-10

            sm:px-8
            sm:pb-10

            lg:px-12
            lg:pb-12
            lg:pt-14

            xl:px-16
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/45
            "
          >
            <span>NOVA / Explore</span>

            <span>LOS · Nigeria</span>
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
            <p
              className="
                mb-6

                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/50
              "
            >
              Beyond the terminal
            </p>

            <h1
              className="
                text-[clamp(4.5rem,11vw,11rem)]
                font-medium
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              Go somewhere
              <br />
              worth remembering.
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
            <p
              className="
                max-w-md

                text-sm
                leading-6
                text-white/50
              "
            >
              Discover destinations, experiences
              and the stories that begin at NOVA.
            </p>

            <a
              href="#discover"
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
              Start exploring

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

      {/* INTRO */}
      <section
        id="discover"
        className="
          bg-[#f5f2eb]

          px-5
          py-24

          sm:px-8

          lg:px-12
          lg:py-36

          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12

            lg:grid-cols-[0.6fr_1.4fr]
          "
        >
          <div>
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#111820]/35
              "
            >
              Explore / 01
            </span>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <h2
              className="
                max-w-[950px]

                text-[clamp(2.8rem,6vw,6rem)]
                font-medium
                leading-[0.95]
                tracking-[-0.065em]
              "
            >
              An airport is not only
              where journeys end and begin.
            </h2>

            <p
              className="
                mt-8
                max-w-xl

                text-base
                leading-7
                text-[#111820]/50
              "
            >
              It is the first impression of a city,
              the last view before departure, and the
              point where thousands of stories cross
              every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORIES */}
      <section
        className="
          bg-[#faf9f6]

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
              border-t
              border-[#111820]/15
            "
          >
            {exploreStories.map(
              (story, index) => (
                <motion.div
                  key={story.number}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                  }}
                  className="
                    group

                    grid
                    gap-5

                    border-b
                    border-[#111820]/15

                    py-9

                    sm:grid-cols-[80px_160px_1fr]
                    sm:items-start

                    lg:grid-cols-[110px_210px_1fr]
                    lg:py-12
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      text-[#111820]/30
                    "
                  >
                    {story.number}
                  </span>

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[#111820]/35
                    "
                  >
                    {story.category}
                  </span>

                  <div
                    className="
                      grid
                      gap-5

                      lg:grid-cols-[1fr_0.7fr]
                    "
                  >
                    <h3
                      className="
                        max-w-xl

                        text-3xl
                        font-medium
                        leading-[1]
                        tracking-[-0.05em]

                        lg:text-4xl
                      "
                    >
                      {story.title}
                    </h3>

                    <p
                      className="
                        max-w-md

                        text-sm
                        leading-6
                        text-[#111820]/45
                      "
                    >
                      {story.description}
                    </p>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        className="
          bg-[#e9e0d2]

          px-5
          py-24

          sm:px-8

          lg:px-12
          lg:py-32

          xl:px-16
        "
      >
        <div className="mx-auto max-w-[1600px]">
          <div
            className="
              flex
              flex-col
              gap-8

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-[#111820]/35
                "
              >
                Destinations / 02
              </span>

              <h2
                className="
                  mt-5

                  text-[clamp(3.5rem,7vw,7rem)]
                  font-medium
                  leading-[0.85]
                  tracking-[-0.07em]
                "
              >
                Pick a
                <br />
                direction.
              </h2>
            </div>

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
              View all flights

              <ArrowUpRight
                size={15}
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

          <div
            className="
              mt-14

              grid
              gap-4

              md:grid-cols-2

              lg:mt-20
              lg:grid-cols-12
            "
          >
            {exploreDestinations.map(
              (destination, index) => {
                const large =
                  index === 0 || index === 3;

                return (
                  <motion.article
                    key={destination.code}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.05,
                    }}
                    className={`
                      group
                      relative

                      min-h-[430px]

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

                        group-hover:scale-[1.045]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-[#111820]/85
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
                      <div
                        className="
                          flex
                          items-end
                          justify-between
                          gap-6
                        "
                      >
                        <div>
                          <span
                            className="
                              text-[8px]
                              uppercase
                              tracking-[0.2em]
                              text-white/50
                            "
                          >
                            {destination.country} ·{" "}
                            {destination.code}
                          </span>

                          <h3
                            className="
                              mt-2

                              text-4xl
                              font-medium
                              tracking-[-0.055em]

                              sm:text-5xl
                            "
                          >
                            {destination.city}
                          </h3>

                          <p
                            className="
                              mt-3
                              max-w-sm

                              text-xs
                              leading-5
                              text-white/55
                            "
                          >
                            {destination.caption}
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
              },
            )}
          </div>
        </div>
      </section>

      {/* LAGOS */}
      <section
        className="
          bg-[#111820]
          text-white
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]

            lg:min-h-[760px]
            lg:grid-cols-2
          "
        >
          <div
            className="
              flex
              flex-col
              justify-between

              px-5
              py-16

              sm:px-8

              lg:px-12
              lg:py-20

              xl:px-16
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/30
              "
            >
              Lagos / 03
            </span>

            <div className="my-20 lg:my-0">
              <p
                className="
                  text-[clamp(3.5rem,7vw,7.5rem)]
                  font-medium
                  leading-[0.82]
                  tracking-[-0.075em]
                "
              >
                Welcome
                <br />
                to Lagos.
              </p>

              <p
                className="
                  mt-8
                  max-w-md

                  text-sm
                  leading-6
                  text-white/45
                "
              >
                Fast, expressive and always moving.
                NOVA is your gateway into one of
                Africa&apos;s most dynamic cities.
              </p>
            </div>

            <Link
              href="/plan"
              className="
                group

                flex
                items-center
                justify-between

                border-t
                border-white/15

                pt-5

                text-sm
              "
            >
              Plan your arrival

              <ArrowRight
                size={16}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          <div
            className="
              relative

              min-h-[520px]

              lg:min-h-full
            "
          >
            <Image
              src="/lagos.png"
              alt="Lagos"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section
        className="
          bg-[#315b78]
          text-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1600px]

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
              grid
              gap-10

              lg:grid-cols-[1.3fr_0.7fr]
              lg:items-end
            "
          >
            <h2
              className="
                max-w-[900px]

                text-[clamp(3.5rem,7vw,7rem)]
                font-medium
                leading-[0.86]
                tracking-[-0.07em]
              "
            >
              Your next story
              <br />
              starts here.
            </h2>

            <div
              className="
                lg:justify-self-end
              "
            >
              <p
                className="
                  max-w-sm

                  text-sm
                  leading-6
                  text-white/55
                "
              >
                Find a destination, choose your
                flight and start planning what comes
                next.
              </p>

              <Link
                href="/flights"
                className="
                  group

                  mt-7

                  inline-flex
                  items-center
                  gap-3

                  border-b
                  border-white/30

                  pb-2

                  text-sm
                "
              >
                Find a flight

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
        </div>
      </section>
    </main>
  );
}