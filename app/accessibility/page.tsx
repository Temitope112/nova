"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Ear,
  Eye,
  HeartHandshake,
  PersonStanding,
  Plane,
  Route,
  Volume2,
} from "lucide-react";

const assistanceOptions = [
  {
    number: "01",
    title: "Mobility Assistance",
    description:
      "Support for passengers who need help moving through the terminal, reaching gates or boarding.",
    icon: Accessibility,
  },
  {
    number: "02",
    title: "Visual Assistance",
    description:
      "Wayfinding and passenger support for travellers with partial or complete visual impairment.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Hearing Assistance",
    description:
      "Clear communication support and accessible passenger information across the airport.",
    icon: Ear,
  },
  {
    number: "04",
    title: "Hidden Disabilities",
    description:
      "Additional understanding and assistance for passengers whose support needs may not be immediately visible.",
    icon: HeartHandshake,
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Before you arrive",
    description:
      "Request assistance through your airline where possible and allow additional time before departure.",
  },
  {
    number: "02",
    title: "At the terminal",
    description:
      "Use a designated assistance point or speak with a NOVA passenger support team member.",
  },
  {
    number: "03",
    title: "Through the airport",
    description:
      "Assistance can continue through check-in, security, terminal navigation and the journey to your gate.",
  },
  {
    number: "04",
    title: "Boarding",
    description:
      "Where required, support continues through boarding in coordination with your airline.",
  },
];

export default function AccessibilityPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section
        className="
          relative
          bg-[#e7eff2]
          pt-[var(--navbar-height)]
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            opacity-[0.035]

            [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1600px]

            px-5
            pb-20
            pt-16

            sm:px-8
            sm:pb-24

            lg:px-12
            lg:pb-32
            lg:pt-24

            xl:px-16
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              NOVA / Accessibility
            </span>

            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[#111820]/35 sm:block">
              Passenger Assistance
            </span>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-20 lg:mt-28"
          >
            <div
              className="
                flex
                size-12
                items-center
                justify-center
                rounded-full
                border
                border-[#111820]/15
              "
            >
              <Accessibility
                size={20}
                strokeWidth={1.35}
                className="text-[#315b78]"
              />
            </div>

            <h1
              className="
                mt-8
                max-w-[1100px]

                text-[clamp(4.5rem,10vw,10rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Travel with
              <br />
              confidence.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-6 text-[#111820]/50">
              NOVA is designed to make the airport easier to navigate for
              passengers who may need additional assistance throughout their
              journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ASSISTANCE */}
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
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12

            lg:grid-cols-[0.5fr_1.5fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              Assistance / 01
            </span>

            <h2
              className="
                mt-5
                text-[clamp(3rem,5vw,5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Support built
              <br />
              around you.
            </h2>
          </div>

          <div className="border-t border-[#111820]/15">
            {assistanceOptions.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 22,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.04,
                  }}
                  className="
                    group
                    grid
                    gap-5

                    border-b
                    border-[#111820]/15

                    py-8

                    sm:grid-cols-[45px_45px_0.8fr_1fr]
                    sm:items-start
                  "
                >
                  <span className="font-mono text-[9px] text-[#111820]/25">
                    {item.number}
                  </span>

                  <Icon
                    size={18}
                    strokeWidth={1.3}
                    className="text-[#315b78]"
                  />

                  <h3 className="text-2xl font-medium tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <p className="max-w-md text-sm leading-6 text-[#111820]/45">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="bg-[#111820] text-white">
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
              lg:grid-cols-[0.5fr_1.5fr]
            "
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                Your Journey / 02
              </span>

              <h2
                className="
                  mt-5
                  text-[clamp(3rem,5vw,5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                "
              >
                Assistance
                <br />
                from start
                <br />
                to gate.
              </h2>
            </div>

            <div className="relative">
              <div
                className="
                  absolute
                  left-[7px]
                  top-3
                  hidden
                  h-[calc(100%-24px)]
                  w-px
                  bg-white/15

                  sm:block
                "
              />

              <div className="space-y-0">
                {journeySteps.map((step, index) => (
                  <motion.div
                    key={step.number}
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
                      delay: index * 0.05,
                    }}
                    className="
                      relative
                      grid
                      gap-5

                      border-b
                      border-white/10

                      py-8

                      sm:grid-cols-[45px_0.75fr_1fr]
                    "
                  >
                    <div className="relative z-10">
                      <span
                        className="
                          flex
                          size-[15px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[#e8a735]
                        "
                      />

                      <span className="mt-3 block font-mono text-[8px] text-white/25">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium tracking-[-0.04em]">
                      {step.title}
                    </h3>

                    <p className="max-w-md text-sm leading-6 text-white/45">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAYFINDING */}
      <section className="bg-[#e9e0d2]">
        <div
          className="
            grid
            w-full

            lg:min-h-[720px]
            lg:grid-cols-2
          "
        >
          {/* MAP */}
          <div
            className="
              relative
              min-h-[520px]
              overflow-hidden
              bg-[#f5f2eb]

              lg:min-h-[720px]
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                inset-0
                opacity-[0.05]

                [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
                [background-size:50px_50px]
              "
            />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d="
                  M8 72
                  H28
                  V60
                  H46
                  V42
                  H70
                  V30
                  H91
                "
                fill="none"
                stroke="#111820"
                strokeOpacity="0.16"
                strokeWidth="0.5"
              />

              <motion.path
                d="
                  M12 77
                  C24 71 29 63 39 58
                  S54 46 65 42
                  S77 34 88 31
                "
                fill="none"
                stroke="#315b78"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeDasharray="2 1.5"
                initial={{
                  pathLength: 0,
                }}
                whileInView={{
                  pathLength: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            {/* Assistance Point */}
            <div className="absolute left-[12%] top-[77%]">
              <span className="block size-3 rounded-full bg-[#315b78]" />

              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.17em] text-[#315b78]">
                Assistance Point
              </span>
            </div>

            {/* Gate */}
            <div className="absolute right-[10%] top-[28%]">
              <span
                className="
                  flex
                  size-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#111820]
                  text-white
                "
              >
                <Plane
                  size={16}
                  strokeWidth={1.3}
                />
              </span>

              <span className="mt-3 block text-center text-[8px] uppercase tracking-[0.17em] text-[#111820]/40">
                Gate
              </span>
            </div>
          </div>

          {/* WAYFINDING CONTENT */}
          <div
            className="
              flex
              min-h-[520px]
              flex-col
              justify-between

              px-5
              py-16

              sm:px-8

              lg:min-h-[720px]
              lg:px-12
              lg:py-20

              xl:px-16
            "
          >
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              Wayfinding / 03
            </span>

            <div className="my-16">
              <Route
                size={26}
                strokeWidth={1.2}
                className="text-[#315b78]"
              />

              <h2
                className="
                  mt-7
                  text-[clamp(3.5rem,6vw,6rem)]
                  font-medium
                  leading-[0.86]
                  tracking-[-0.065em]
                "
              >
                A clearer
                <br />
                way through.
              </h2>

              <p className="mt-8 max-w-md text-sm leading-6 text-[#111820]/50">
                NOVA&apos;s navigation system is designed around clear routes,
                recognisable landmarks and assistance points throughout the
                terminal.
              </p>
            </div>

            <Link
              href="/airport/map"
              className="
                group
                flex
                items-center
                justify-between

                border-t
                border-[#111820]/20

                pt-5

                text-sm
              "
            >
              Open airport map

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
        </div>
      </section>

      {/* COMMUNICATION */}
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
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12

            lg:grid-cols-[0.5fr_1.5fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              Information / 04
            </span>

            <h2
              className="
                mt-5
                text-[clamp(3rem,5vw,5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Information
              <br />
              you can use.
            </h2>
          </div>

          <div className="grid gap-px bg-[#111820]/10 sm:grid-cols-2">
            <div className="bg-[#faf9f6] p-8 sm:p-10">
              <Volume2
                size={22}
                strokeWidth={1.25}
                className="text-[#315b78]"
              />

              <h3 className="mt-10 text-2xl font-medium tracking-[-0.04em]">
                Passenger announcements
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[#111820]/45">
                Important flight and operational information is communicated
                through terminal displays and public announcements.
              </p>
            </div>

            <div className="bg-[#faf9f6] p-8 sm:p-10">
              <PersonStanding
                size={22}
                strokeWidth={1.25}
                className="text-[#315b78]"
              />

              <h3 className="mt-10 text-2xl font-medium tracking-[-0.04em]">
                Passenger assistance points
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-[#111820]/45">
                Clearly marked assistance locations are available throughout
                the terminal for passengers who need additional support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#315b78] text-white">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12

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
              Need assistance?
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
              Tell us what
              <br />
              you need.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Contact NOVA passenger support if you need help planning
              assistance for your journey.
            </p>

            <Link
              href="/contact"
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
              Contact passenger support

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