"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Coffee,
  BriefcaseBusiness,
  ShoppingBag,
  UsersRound,
  Sparkles,
} from "lucide-react";

const experiences = [
  {
    number: "01",
    title: "Dining",
    description:
      "From Lagos flavours to familiar favourites, take your time or grab something before boarding.",
    href: "/airport/dining",
    icon: Coffee,
  },
  {
    number: "02",
    title: "Lounges",
    description:
      "Quiet spaces designed for rest, work and everything between one flight and the next.",
    href: "/airport/lounges",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Shopping",
    description:
      "International retail, travel essentials and a curated selection of things made closer to home.",
    href: "/airport/shopping",
    icon: ShoppingBag,
  },
  {
    number: "04",
    title: "Family",
    description:
      "Spaces that give families room to slow down, reset and make travelling together easier.",
    href: "/airport",
    icon: UsersRound,
  },
  {
    number: "05",
    title: "Work",
    description:
      "Stay connected with quiet workspaces, charging points and places designed for focus.",
    href: "/airport",
    icon: BriefcaseBusiness,
  },
];

export default function ExperiencePage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* Hero */}
      <section className="relative min-h-svh bg-[#111820] text-white">
        <div className="absolute inset-0">
          <Image
            src="/airport-experience.jpg"
            alt="NOVA International Airport interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#111820]/55" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111820] via-transparent to-[#111820]/20" />
        </div>

        <div
          className="
            relative z-10
            mx-auto
            flex
            min-h-svh
            max-w-[1600px]
            flex-col
            justify-between

            px-5
            pb-10
            pt-[calc(var(--navbar-height)+3rem)]

            sm:px-8
            sm:pb-12

            lg:px-12
            lg:pb-16

            xl:px-16
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/45">
              NOVA / Experience
            </p>

            <p className="hidden text-[9px] uppercase tracking-[0.22em] text-white/45 sm:block">
              Lagos · Nigeria
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="my-auto py-20"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#e8a735]">
              Before the destination
            </p>

            <h1
              className="
                mt-6
                max-w-6xl

                text-[clamp(4.2rem,10vw,10rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Make the wait
              <br />
              part of the journey.
            </h1>
          </motion.div>

          <div className="flex items-end justify-between gap-10">
            <p className="max-w-md text-sm leading-6 text-white/55">
              Eat. Rest. Work. Explore. NOVA is designed so the time before your
              flight feels less like waiting.
            </p>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden sm:block"
            >
              <ArrowDown
                size={18}
                strokeWidth={1.3}
                className="text-white/45"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-[#f5f2eb]">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12

            px-5
            py-24

            sm:px-8

            lg:grid-cols-[0.55fr_1.45fr]
            lg:px-12
            lg:py-32

            xl:px-16
          "
        >
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              01 / Between flights
            </p>
          </div>

          <div>
            <h2
              className="
                max-w-5xl

                text-[clamp(3.4rem,6.5vw,7rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.065em]
              "
            >
              Airports don&apos;t have to feel like places you escape from.
            </h2>

            <div className="mt-12 grid gap-8 border-t border-[#111820]/15 pt-8 sm:grid-cols-2">
              <p className="max-w-md text-sm leading-6 text-[#111820]/50">
                NOVA brings food, retail, culture, workspaces and places to
                breathe into one passenger experience.
              </p>

              <p className="max-w-md text-sm leading-6 text-[#111820]/50">
                Whether you have twenty minutes or four hours, there should
                always be somewhere worth going before your gate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Directory */}
      <section className="bg-[#faf9f6]">
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
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
                02 / Discover NOVA
              </p>

              <h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-5xl">
                Spend your
                <br />
                time well.
              </h2>
            </div>

            <div className="border-t border-[#111820]/15">
              {experiences.map((experience, index) => {
                const Icon = experience.icon;

                return (
                  <motion.article
                    key={experience.title}
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
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      group
                      grid
                      gap-6

                      border-b
                      border-[#111820]/15

                      py-8

                      sm:grid-cols-[50px_50px_1fr_auto]
                      sm:items-center

                      lg:py-10
                    "
                  >
                    <span className="font-mono text-[9px] text-[#111820]/30">
                      {experience.number}
                    </span>

                    <Icon
                      size={18}
                      strokeWidth={1.3}
                      className="
                        text-[#315b78]

                        transition-transform
                        duration-300

                        group-hover:-translate-y-1
                      "
                    />

                    <div className="grid gap-3 lg:grid-cols-[0.65fr_1fr] lg:items-center">
                      <h3 className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                        {experience.title}
                      </h3>

                      <p className="max-w-md text-sm leading-6 text-[#111820]/45">
                        {experience.description}
                      </p>
                    </div>

                    <Link
                      href={experience.href}
                      aria-label={`Explore ${experience.title}`}
                      className="
                        flex
                        size-11
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
                      <ArrowUpRight size={15} strokeWidth={1.4} />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Feature */}
      <section className="bg-[#e9e0d2]">
        <div
          className="
      grid
      w-full

      lg:min-h-[800px]
      lg:grid-cols-2
    "
        >
          {/* Image */}
          <div className="relative min-h-[500px] w-full lg:min-h-full">
            <Image
              src="/lounge.png"
              alt="NOVA airport lounge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute left-5 top-5 bg-[#faf9f6] px-4 py-3 sm:left-8 sm:top-8">
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#111820]/50">
                Terminal 2 · West Wing
              </p>
            </div>
          </div>

          {/* Content */}
          <div
            className="
        flex
        min-h-[500px]
        flex-col
        justify-between

        px-5
        py-16

        sm:px-8

        lg:min-h-[800px]
        lg:px-12
        lg:py-20

        xl:px-16
      "
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              03 / Slow down
            </p>

            <div className="my-20">
              <h2
                className="
            text-[clamp(3.5rem,6vw,6.5rem)]
            font-medium
            leading-[0.86]
            tracking-[-0.065em]
          "
              >
                Your gate can
                <br />
                wait a minute.
              </h2>

              <p className="mt-8 max-w-md text-sm leading-6 text-[#111820]/50">
                Find a quieter corner, get something to eat or finish the work
                you didn&apos;t quite leave at the office.
              </p>
            </div>

            <Link
              href="/airport/lounges"
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
              Discover NOVA Lounges
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

      {/* Final CTA */}
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
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">
              Find your way
            </p>

            <h2
              className="
                mt-6

                text-[clamp(4rem,8vw,8rem)]
                font-medium
                leading-[0.83]
                tracking-[-0.07em]
              "
            >
              Know what&apos;s
              <br />
              around you.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Find restaurants, lounges, shops, services and your next gate
              across NOVA.
            </p>

            <Link
              href="/airport/map"
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

                transition-colors
                hover:border-white
              "
            >
              Open airport map
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
