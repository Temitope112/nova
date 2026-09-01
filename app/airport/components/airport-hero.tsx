"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function AirportHero() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#f5f2eb]

        pt-[var(--navbar-height)]
      "
    >
      <HeroGrid />

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
            grid
            gap-12

            lg:grid-cols-[1.3fr_0.7fr]
            lg:items-end
          "
        >
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
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="
                flex
                items-center
                gap-3

                text-[9px]
                uppercase
                tracking-[0.24em]
                text-[#111820]/40
              "
            >
              <span>NOVA / At the Airport</span>

              <span className="h-px w-8 bg-[#111820]/15" />

              <span>LOS</span>
            </div>

            <h1
              className="
                mt-7

                max-w-[1100px]

                text-[clamp(4rem,9vw,9rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Find your
              <br />
              way through.
            </h1>
          </motion.div>

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
              max-w-[370px]

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
              Navigate terminals, find dining,
              lounges and services, and know
              exactly where you need to go.
            </p>

            <a
              href="#airport-directory"
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
              Explore airport

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

        <HeroWayfinding />
      </div>
    </section>
  );
}

function HeroWayfinding() {
  return (
    <div
      className="
        mt-16

        grid

        border-y
        border-[#111820]/10

        sm:grid-cols-3

        lg:mt-20
      "
    >
      <WayfindingItem
        number="01"
        title="Terminal 1"
        detail="Domestic / Regional"
      />

      <WayfindingItem
        number="02"
        title="Terminal 2"
        detail="International"
      />

      <WayfindingItem
        number="→"
        title="You are here"
        detail="NOVA / LOS"
      />
    </div>
  );
}

function WayfindingItem({
  number,
  title,
  detail,
}: {
  number: string;
  title: string;
  detail: string;
}) {
  return (
    <div
      className="
        border-b
        border-[#111820]/10

        py-5

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
          font-mono
          text-[8px]
          text-[#111820]/30
        "
      >
        {number}
      </span>

      <p
        className="
          mt-4

          text-xl
          font-medium
          tracking-[-0.035em]
        "
      >
        {title}
      </p>

      <span
        className="
          mt-1
          block

          text-[8px]
          uppercase
          tracking-[0.18em]
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

        opacity-[0.035]

        [background-image:linear-gradient(to_right,#111820_1px,transparent_1px)]
        [background-size:72px_100%]
      "
    />
  );
}