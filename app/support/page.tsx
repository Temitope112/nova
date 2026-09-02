"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  BaggageClaim,
  CircleHelp,
  Clock3,
  FileQuestion,
  Luggage,
  MapPin,
  MessageCircle,
  Plane,
  Search,
} from "lucide-react";

const supportTopics = [
  {
    number: "01",
    title: "Flights",
    description:
      "Flight status, departures, arrivals, gates and general flight information.",
    href: "/flights",
    icon: Plane,
  },
  {
    number: "02",
    title: "Baggage",
    description:
      "Information about baggage collection, allowances and baggage-related support.",
    href: "/support/baggage",
    icon: BaggageClaim,
  },
  {
    number: "03",
    title: "Lost & Found",
    description:
      "Lost something inside NOVA? Start here and tell us what happened.",
    href: "/support/lost-and-found",
    icon: Luggage,
  },
  {
    number: "04",
    title: "Accessibility",
    description:
      "Assistance and airport information for passengers who need additional support.",
    href: "/accessibility",
    icon: Accessibility,
  },
  {
    number: "05",
    title: "Airport Navigation",
    description:
      "Find terminals, gates, restaurants, lounges and other locations around NOVA.",
    href: "/airport/map",
    icon: MapPin,
  },
  {
    number: "06",
    title: "General Questions",
    description:
      "Can't find what you need? Get in touch with the NOVA passenger support team.",
    href: "/contact",
    icon: CircleHelp,
  },
];

const quickAnswers = [
  {
    question: "How early should I arrive?",
    answer:
      "We recommend arriving 3 hours before international departures and 2 hours before domestic departures.",
  },
  {
    question: "Where can I check my gate?",
    answer:
      "Your latest gate information is available through Flights, My Journey and airport departure displays.",
  },
  {
    question: "What if I lose something?",
    answer:
      "Use NOVA Lost & Found to submit information about the missing item and where you last saw it.",
  },
  {
    question: "Can I request passenger assistance?",
    answer:
      "Yes. Accessibility support is available for passengers who may need additional assistance through the airport.",
  },
];

export default function SupportPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section
        className="
          relative
          bg-[#f5f2eb]
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
            lg:pb-28
            lg:pt-24

            xl:px-16
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              NOVA / Help Centre
            </span>

            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[#111820]/35 sm:block">
              Passenger Support · 24/7
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
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              How can we help?
            </p>

            <h1
              className="
                mt-6
                max-w-[1050px]

                text-[clamp(4.5rem,10vw,10rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Find what
              <br />
              you need.
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-6 text-[#111820]/50">
              Get help with flights, baggage, airport navigation, lost items
              and your journey through NOVA.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.15,
            }}
            className="
              mt-16
              flex
              max-w-3xl
              items-center
              gap-4

              border-b
              border-[#111820]/25

              pb-5
            "
          >
            <Search
              size={20}
              strokeWidth={1.3}
              className="shrink-0 text-[#111820]/35"
            />

            <input
              type="search"
              placeholder="Search flights, baggage, assistance..."
              aria-label="Search NOVA help centre"
              className="
                w-full
                bg-transparent

                text-base
                outline-none

                placeholder:text-[#111820]/30

                sm:text-lg
              "
            />

            <span
              className="
                hidden

                text-[8px]
                uppercase
                tracking-[0.18em]
                text-[#111820]/25

                sm:block
              "
            >
              Search
            </span>
          </motion.div>
        </div>
      </section>

      {/* SUPPORT TOPICS */}
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
              Support / 01
            </span>

            <h2
              className="
                mt-5

                text-4xl
                font-medium
                leading-[0.95]
                tracking-[-0.055em]

                sm:text-5xl
              "
            >
              What do you
              <br />
              need help with?
            </h2>
          </div>

          <div className="border-t border-[#111820]/15">
            {supportTopics.map((topic, index) => {
              const Icon = topic.icon;

              return (
                <motion.article
                  key={topic.title}
                  initial={{
                    opacity: 0,
                    y: 20,
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

                    sm:grid-cols-[45px_45px_0.7fr_1fr_auto]
                    sm:items-center
                  "
                >
                  <span className="font-mono text-[9px] text-[#111820]/25">
                    {topic.number}
                  </span>

                  <Icon
                    size={17}
                    strokeWidth={1.3}
                    className="
                      text-[#315b78]

                      transition-transform
                      duration-300

                      group-hover:-translate-y-0.5
                    "
                  />

                  <h3 className="text-xl font-medium tracking-[-0.035em]">
                    {topic.title}
                  </h3>

                  <p className="max-w-md text-sm leading-6 text-[#111820]/45">
                    {topic.description}
                  </p>

                  <Link
                    href={topic.href}
                    aria-label={`Get help with ${topic.title}`}
                    className="
                      flex
                      size-10
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#111820]/15

                      transition-all
                      duration-300

                      group-hover:border-[#111820]
                      group-hover:bg-[#111820]
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.4}
                    />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK ANSWERS */}
      <section
        className="
          bg-[#e7eff2]

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
              gap-12

              lg:grid-cols-[0.5fr_1.5fr]
            "
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
                Answers / 02
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
                Before you
                <br />
                ask.
              </h2>
            </div>

            <div className="border-t border-[#111820]/15">
              {quickAnswers.map((item, index) => (
                <motion.div
                  key={item.question}
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
                    grid
                    gap-5

                    border-b
                    border-[#111820]/15

                    py-8

                    md:grid-cols-[0.75fr_1fr]
                  "
                >
                  <h3 className="text-xl font-medium tracking-[-0.035em]">
                    {item.question}
                  </h3>

                  <p className="max-w-lg text-sm leading-6 text-[#111820]/50">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE SUPPORT */}
      <section className="bg-[#111820] text-white">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12

            px-5
            py-20

            sm:px-8

            lg:grid-cols-[1fr_1fr]
            lg:items-end
            lg:px-12
            lg:py-28

            xl:px-16
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
              Support / 03
            </span>

            <h2
              className="
                mt-6

                text-[clamp(3.8rem,7vw,7rem)]
                font-medium
                leading-[0.85]
                tracking-[-0.07em]
              "
            >
              Still need
              <br />
              a hand?
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-md text-sm leading-6 text-white/45">
              Our passenger support team can help with questions that aren&apos;t
              covered in the Help Centre.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-4

                  bg-blue-600
                  rounded-full
                  px-5
                  py-4

                  text-xs
                  text-[#111820]
                "
              >
                <MessageCircle
                  size={15}
                  strokeWidth={1.4}
                />

                Contact NOVA

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <div
                className="
                  inline-flex
                  items-center
                  gap-3

                  border
                  border-white/15

                  px-5
                  py-4

                  text-xs
                  text-white/55
                "
              >
                <Clock3
                  size={15}
                  strokeWidth={1.4}
                />

                Support available 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK NAVIGATION */}
      <section className="bg-[#315b78] text-white">
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
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
            <div>
              <FileQuestion
                size={25}
                strokeWidth={1.2}
                className="text-white/40"
              />

              <p className="mt-5 text-[9px] uppercase tracking-[0.22em] text-white/40">
                Need something else?
              </p>
            </div>

            <Link
              href="/contact"
              className="
                group

                flex
                items-end
                justify-between
                gap-8

                border-b
                border-white/25

                pb-5
              "
            >
              <span
                className="
                  text-[clamp(2.8rem,5vw,5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                "
              >
                Ask NOVA.
              </span>

              <ArrowRight
                size={24}
                strokeWidth={1.2}
                className="
                  shrink-0

                  transition-transform
                  duration-300

                  group-hover:translate-x-2
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}