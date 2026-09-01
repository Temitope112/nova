"use client";

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
  Bus,
  CarFront,
  Check,
  Clock3,
  Luggage,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  checklist,
  planItems,
  transportOptions,
} from "./data";

const transportIcons = {
  car: CarFront,
  ride: Sparkles,
  bus: Bus,
  transfer: ArrowRight,
};

export default function PlanPage() {
  const { scrollYProgress } = useScroll();

  const heroNumberY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 120],
  );

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#e8eff1]

          pt-[var(--navbar-height)]
        "
      >
        <HeroGrid />

        <motion.span
          aria-hidden="true"
          style={{
            y: heroNumberY,
          }}
          className="
            pointer-events-none

            absolute
            -right-5
            bottom-[-8vw]

            select-none

            text-[clamp(13rem,34vw,34rem)]
            font-medium
            leading-none
            tracking-[-0.09em]
            text-[#111820]/[0.035]
          "
        >
          LOS
        </motion.span>

        <div
          className="
            relative
            z-10

            mx-auto
            max-w-[1600px]

            px-5
            pb-16
            pt-14

            sm:px-8
            sm:pb-20
            sm:pt-16

            lg:px-12
            lg:pb-24
            lg:pt-20

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
              text-[#111820]/40
            "
          >
            <span>NOVA / Plan Your Visit</span>

            <span>LOS · Nigeria</span>
          </div>

          <div
            className="
              mt-14

              grid
              gap-12

              lg:mt-20
              lg:grid-cols-[1.35fr_0.65fr]
              lg:items-end
            "
          >
            <motion.h1
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
              className="
                max-w-[1050px]

                text-[clamp(4.5rem,10vw,10rem)]
                font-medium
                leading-[0.79]
                tracking-[-0.08em]
              "
            >
              Arrive
              <br />
              prepared.
            </motion.h1>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="
                max-w-sm

                lg:justify-self-end
              "
            >
              <p
                className="
                  text-sm
                  leading-6
                  text-[#111820]/50
                "
              >
                Everything worth knowing before you
                leave home — from when to arrive to
                baggage, transport and airport access.
              </p>

              <a
                href="#prepare"
                className="
                  group

                  mt-8

                  inline-flex
                  items-center
                  gap-3

                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                "
              >
                Start planning

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
            </motion.div>
          </div>

          {/* QUICK META */}
          <div
            className="
              mt-16

              grid

              border-y
              border-[#111820]/10

              sm:grid-cols-3

              lg:mt-24
            "
          >
            <QuickMeta
              number="03H"
              label="International"
              detail="Recommended arrival"
            />

            <QuickMeta
              number="02H"
              label="Domestic"
              detail="Recommended arrival"
            />

            <QuickMeta
              number="24/7"
              label="Passenger support"
              detail="Across NOVA"
            />
          </div>
        </div>
      </section>

      {/* PREPARATION */}
      <section
        id="prepare"
        className="
          bg-[#faf9f6]

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
              grid
              gap-10

              lg:grid-cols-[0.45fr_1.55fr]
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
                Prepare / 01
              </span>
            </div>

            <div>
              <h2
                className="
                  max-w-[1000px]

                  text-[clamp(3rem,6vw,6rem)]
                  font-medium
                  leading-[0.92]
                  tracking-[-0.065em]
                "
              >
                A smoother journey starts
                before you reach NOVA.
              </h2>
            </div>
          </div>

          <div
            className="
              mt-16

              border-t
              border-[#111820]/15

              lg:mt-24
            "
          >
            {planItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 25,
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
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                className="
                  grid
                  gap-7

                  border-b
                  border-[#111820]/15

                  py-10

                  lg:grid-cols-[100px_0.8fr_1.2fr]
                  lg:gap-12
                  lg:py-14
                "
              >
                <span
                  className="
                    font-mono
                    text-[9px]
                    text-[#111820]/30
                  "
                >
                  {item.number}
                </span>

                <div>
                  <span
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-[#111820]/35
                    "
                  >
                    {item.eyebrow}
                  </span>

                  <h3
                    className="
                      mt-4

                      max-w-md

                      text-3xl
                      font-medium
                      leading-[1]
                      tracking-[-0.05em]

                      lg:text-4xl
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p
                    className="
                      max-w-xl

                      text-sm
                      leading-6
                      text-[#111820]/50
                    "
                  >
                    {item.description}
                  </p>

                  <div
                    className="
                      mt-7

                      border-t
                      border-[#111820]/10
                    "
                  >
                    {item.details.map((detail) => (
                      <div
                        key={detail}
                        className="
                          flex
                          items-start
                          gap-3

                          border-b
                          border-[#111820]/10

                          py-4
                        "
                      >
                        <Check
                          size={13}
                          strokeWidth={1.5}
                          className="
                            mt-0.5
                            shrink-0
                            text-[#315b78]
                          "
                        />

                        <span
                          className="
                            text-xs
                            leading-5
                            text-[#111820]/55
                          "
                        >
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GETTING TO NOVA */}
      <section
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
            py-24

            sm:px-8

            lg:px-12
            lg:py-32

            xl:px-16
          "
        >
          <div
            className="
              grid
              gap-12

              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            <div>
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-white/30
                "
              >
                Getting here / 02
              </span>

              <h2
                className="
                  mt-6

                  text-[clamp(3.5rem,7vw,7rem)]
                  font-medium
                  leading-[0.85]
                  tracking-[-0.07em]
                "
              >
                Your route
                <br />
                to NOVA.
              </h2>

              <p
                className="
                  mt-8
                  max-w-md

                  text-sm
                  leading-6
                  text-white/45
                "
              >
                Lagos moves quickly. Plan your route,
                leave room for traffic and know where
                your airport journey begins.
              </p>
            </div>

            <div
              className="
                border-t
                border-white/15
              "
            >
              {transportOptions.map(
                (option, index) => {
                  const Icon =
                    transportIcons[
                      option.id as keyof typeof transportIcons
                    ];

                  return (
                    <motion.div
                      key={option.id}
                      initial={{
                        opacity: 0,
                        x: 25,
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
                        delay: index * 0.05,
                      }}
                      className="
                        group

                        grid
                        gap-6

                        border-b
                        border-white/15

                        py-8

                        sm:grid-cols-[50px_1fr_auto]
                        sm:items-center
                      "
                    >
                      <div
                        className="
                          flex
                          size-10
                          items-center
                          justify-center

                          rounded-full

                          border
                          border-white/15

                          text-white/45

                          transition-colors

                          group-hover:border-[#e8a735]
                          group-hover:text-[#e8a735]
                        "
                      >
                        {Icon && (
                          <Icon
                            size={16}
                            strokeWidth={1.35}
                          />
                        )}
                      </div>

                      <div>
                        <h3
                          className="
                            text-xl
                            font-medium
                            tracking-[-0.035em]
                          "
                        >
                          {option.name}
                        </h3>

                        <p
                          className="
                            mt-2
                            max-w-lg

                            text-xs
                            leading-5
                            text-white/40
                          "
                        >
                          {option.description}
                        </p>
                      </div>

                      <span
                        className="
                          text-[8px]
                          uppercase
                          tracking-[0.18em]
                          text-white/30
                        "
                      >
                        {option.time}
                      </span>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PARKING / ACCESS */}
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
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-6

            lg:grid-cols-2
          "
        >
          <motion.article
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              flex
              min-h-[460px]
              flex-col
              justify-between

              bg-[#315b78]

              p-7
              text-white

              sm:p-10
            "
          >
            <div>
              <CarFront
                size={21}
                strokeWidth={1.3}
              />

              <span
                className="
                  mt-10
                  block

                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-white/45
                "
              >
                Parking
              </span>

              <h3
                className="
                  mt-4

                  max-w-md

                  text-4xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.055em]

                  sm:text-5xl
                "
              >
                Park close.
                <br />
                Move easily.
              </h3>
            </div>

            <div>
              <p
                className="
                  max-w-sm

                  text-sm
                  leading-6
                  text-white/50
                "
              >
                Short-stay, long-stay and accessible
                parking areas connect directly with
                NOVA terminals.
              </p>

              <Link
                href="/airport"
                className="
                  group

                  mt-7

                  inline-flex
                  items-center
                  gap-3

                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                "
              >
                Explore airport services

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="
                    transition-transform

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </motion.article>

          <motion.article
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.08,
            }}
            className="
              flex
              min-h-[460px]
              flex-col
              justify-between

              bg-[#f5f2eb]

              p-7

              sm:p-10
            "
          >
            <div>
              <ShieldCheck
                size={21}
                strokeWidth={1.3}
              />

              <span
                className="
                  mt-10
                  block

                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-[#111820]/35
                "
              >
                Assistance
              </span>

              <h3
                className="
                  mt-4

                  max-w-md

                  text-4xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.055em]

                  sm:text-5xl
                "
              >
                Support when
                <br />
                you need it.
              </h3>
            </div>

            <div>
              <p
                className="
                  max-w-sm

                  text-sm
                  leading-6
                  text-[#111820]/50
                "
              >
                Passenger assistance is available
                across both terminals for accessibility,
                families and travellers who need
                additional support.
              </p>

              <Link
                href="/airport"
                className="
                  group

                  mt-7

                  inline-flex
                  items-center
                  gap-3

                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                "
              >
                Passenger assistance

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="
                    transition-transform

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* CHECKLIST */}
      <section
        className="
          bg-[#faf9f6]

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
              grid
              gap-10

              lg:grid-cols-[0.75fr_1.25fr]
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
                Before you go / 03
              </span>

              <h2
                className="
                  mt-5

                  text-[clamp(3.5rem,6vw,6rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.065em]
                "
              >
                Five things.
                <br />
                Then go.
              </h2>
            </div>

            <div
              className="
                border-t
                border-[#111820]/15
              "
            >
              {checklist.map(
                (item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.04,
                    }}
                    className="
                      grid
                      gap-4

                      border-b
                      border-[#111820]/15

                      py-7

                      sm:grid-cols-[50px_1fr_1fr]
                      sm:items-start
                    "
                  >
                    <span
                      className="
                        flex
                        size-7
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-[#111820]/15

                        font-mono
                        text-[8px]
                        text-[#111820]/40
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <p
                      className="
                        text-lg
                        font-medium
                        tracking-[-0.035em]
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        max-w-sm

                        text-xs
                        leading-5
                        text-[#111820]/45
                      "
                    >
                      {item.description}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
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

              lg:grid-cols-[1.25fr_0.75fr]
              lg:items-end
            "
          >
            <div>
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/35
                "
              >
                Ready / NOVA
              </span>

              <h2
                className="
                  mt-6

                  text-[clamp(3.5rem,7vw,7rem)]
                  font-medium
                  leading-[0.86]
                  tracking-[-0.07em]
                "
              >
                Now find
                <br />
                your flight.
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p
                className="
                  max-w-sm

                  text-sm
                  leading-6
                  text-white/50
                "
              >
                You&apos;ve planned the route. Now
                check your departure and start your
                journey through NOVA.
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
                Find my flight

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.4}
                  className="
                    transition-transform

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

function QuickMeta({
  number,
  label,
  detail,
}: {
  number: string;
  label: string;
  detail: string;
}) {
  return (
    <div
      className="
        border-b
        border-[#111820]/10

        py-6

        last:border-b-0

        sm:border-b-0
        sm:border-r
        sm:px-6

        sm:first:pl-0
        sm:last:border-r-0
      "
    >
      <span
        className="
          text-3xl
          font-medium
          tracking-[-0.05em]
        "
      >
        {number}
      </span>

      <p
        className="
          mt-4
          text-sm
          font-medium
        "
      >
        {label}
      </p>

      <span
        className="
          mt-1
          block

          text-[8px]
          uppercase
          tracking-[0.16em]
          text-[#111820]/35
        "
      >
        {detail}
      </span>
    </div>
  );
}

function HeroGrid() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0

        opacity-[0.04]

        [background-image:linear-gradient(to_right,#111820_1px,transparent_1px)]
        [background-size:72px_100%]
      "
    />
  );
}