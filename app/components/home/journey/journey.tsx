"use client";

import { ArrowUpRight } from "lucide-react";

import JourneyProgress from "./journey-progress";

const journeySteps = [
  {
    id: "check-in",
    label: "Check-in",
    time: "09:20",
    meta: "Zone C · Counter 18",
    status: "complete" as const,
  },
  {
    id: "security",
    label: "Security",
    time: "09:42",
    meta: "Estimated wait · 6 min",
    status: "complete" as const,
  },
  {
    id: "explore",
    label: "Explore",
    time: "10:00",
    meta: "Dining · Lounge · Retail",
    status: "active" as const,
  },
  {
    id: "gate",
    label: "Gate",
    time: "10:08",
    meta: "B08 · 12 min walk",
    status: "upcoming" as const,
  },
  {
    id: "boarding",
    label: "Boarding",
    time: "10:15",
    meta: "BA075 · London",
    status: "upcoming" as const,
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      className="
        relative
        overflow-hidden
        bg-[#e8eff1]
        text-[#111820]
      "
    >
      <JourneyBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1600px]
          px-5
          py-20

          sm:px-8
          sm:py-24

          lg:px-12
          lg:py-28

          xl:px-16
        "
      >
        <JourneyHeader />

        <div
          className="
            mt-14
            grid
            gap-10

            lg:mt-20
            lg:grid-cols-[0.85fr_1.5fr]
            lg:gap-16
          "
        >
          <JourneyOverview />

          <JourneyProgress
            steps={journeySteps}
          />
        </div>
      </div>
    </section>
  );
}

function JourneyHeader() {
  return (
    <div
      className="
        flex
        flex-col
        gap-6

        lg:flex-row
        lg:items-end
        lg:justify-between
      "
    >
      <div>
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
          <span>Your Journey</span>
          <span className="h-px w-8 bg-[#111820]/15" />
          <span>02</span>
        </div>

        <h2
          className="
            mt-5
            max-w-[900px]

            text-[clamp(3.6rem,8vw,8rem)]
            font-medium
            leading-[0.82]
            tracking-[-0.07em]
          "
        >
          From entrance
          <br />
          to aircraft.
        </h2>
      </div>

      <p
        className="
          max-w-[360px]
          text-sm
          leading-6
          text-[#111820]/50
        "
      >
        One journey, one clear path. Track each
        step through NOVA without losing sight
        of what comes next.
      </p>
    </div>
  );
}

function JourneyOverview() {
  return (
    <div
      className="
        flex
        flex-col
        justify-between
        gap-10

        border-t
        border-[#111820]/15

        pt-6
      "
    >
      <div>
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.22em]
            text-[#111820]/40
          "
        >
          Current journey
        </p>

        <div className="mt-6">
          <div
            className="
              flex
              items-start
              justify-between
              gap-6
            "
          >
            <div>
              <span
                className="
                  block
                  text-[clamp(2.8rem,5vw,5rem)]
                  font-medium
                  leading-none
                  tracking-[-0.06em]
                "
              >
                LOS
              </span>

              <span
                className="
                  mt-2
                  block
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#111820]/40
                "
              >
                Lagos
              </span>
            </div>

            <div
              className="
                mt-5
                h-px
                flex-1
                bg-[#111820]/20
              "
            />

            <div className="text-right">
              <span
                className="
                  block
                  text-[clamp(2.8rem,5vw,5rem)]
                  font-medium
                  leading-none
                  tracking-[-0.06em]
                "
              >
                LHR
              </span>

              <span
                className="
                  mt-2
                  block
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#111820]/40
                "
              >
                London
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-6
            border-t
            border-[#111820]/10
            pt-6
          "
        >
          <JourneyFact
            label="Flight"
            value="BA075"
          />

          <JourneyFact
            label="Terminal"
            value="T2"
          />

          <JourneyFact
            label="Gate"
            value="B08"
          />

          <JourneyFact
            label="Boarding"
            value="10:15"
          />
        </div>
      </div>

      <button
        type="button"
        className="
          group
          inline-flex
          w-fit
          items-center
          gap-3

          border-b
          border-[#111820]

          pb-2

          text-sm
          font-medium
        "
      >
        Open my journey

        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300

            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />
      </button>
    </div>
  );
}

interface JourneyFactProps {
  label: string;
  value: string;
}

function JourneyFact({
  label,
  value,
}: JourneyFactProps) {
  return (
    <div>
      <span
        className="
          block
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-[#111820]/35
        "
      >
        {label}
      </span>

      <span
        className="
          mt-2
          block
          text-lg
          font-medium
          tracking-[-0.03em]
        "
      >
        {value}
      </span>
    </div>
  );
}

function JourneyBackground() {
  return (
    <>
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

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[10%]
          top-[20%]

          h-[520px]
          w-[520px]

          rounded-full
          bg-white/40
          blur-[140px]
        "
      />
    </>
  );
}