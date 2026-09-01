"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import {
  airportPulse,
  terminalActivity,
} from "../../../data/airport-pulse";

import PulseClock from "./pulse-clock";
import PulseMetric from "./pulse-metric";
import PulseTerminal from "./pulse-terminal";

export default function Pulse() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.35],
    [70, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="airport-pulse"
      className="
        relative
        overflow-hidden
        bg-[#111820]
        text-white
      "
    >
      <PulseBackground />

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
          lg:py-32

          xl:px-16
        "
      >
        <motion.div
          style={{
            y: headingY,
          }}
        >
          <PulseHeading />
        </motion.div>

        <div
          className="
            mt-14

            border-y
            border-white/10

            lg:mt-20
          "
        >
          <div
            className="
              grid

              lg:grid-cols-[0.8fr_1.2fr_0.8fr]
            "
          >
            <Security />

            <TerminalConditions />

            <Weather />
          </div>

          <div
            className="
              grid
              border-t
              border-white/10

              lg:grid-cols-[1fr_1fr]
            "
          >
            <Parking />

            <Operations />
          </div>
        </div>

        <PulseFooter />
      </div>
    </section>
  );
}

function PulseHeading() {
  return (
    <div
      className="
        grid
        gap-10

        lg:grid-cols-[1fr_auto]
        lg:items-end
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
            text-white/35
          "
        >
          <span>NOVA / Live Conditions</span>

          <span className="h-px w-8 bg-white/15" />

          <span>06</span>
        </div>

        <h2
          className="
            mt-5

            text-[clamp(4rem,9vw,9rem)]
            font-medium
            leading-[0.8]
            tracking-[-0.075em]
          "
        >
          NOVA,
          <br />
          right now.
        </h2>
      </div>

      <div
        className="
          flex
          flex-col
          items-start

          lg:items-end
        "
      >
        <span
          className="
            mb-3
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/30
          "
        >
          Local time / LOS
        </span>

        <PulseClock />
      </div>
    </div>
  );
}

function Security() {
  const {
    waitTime,
    previousWaitTime,
  } = airportPulse.security;

  const improvement =
    previousWaitTime - waitTime;

  return (
    <PulseMetric
      label="Security"
      value={`${waitTime}`}
      suffix="min"
      description={`${improvement} min faster than 30 minutes ago`}
    >
      <ActivityBar percentage={38} />
    </PulseMetric>
  );
}

function Weather() {
  const { temperature, condition, wind } =
    airportPulse.weather;

  return (
    <PulseMetric
      label="Weather / LOS"
      value={`${temperature}°`}
      description={condition}
    >
      <div className="mt-8">
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Wind
        </span>

        <p className="mt-2 text-sm text-white/65">
          {wind}
        </p>
      </div>
    </PulseMetric>
  );
}

function TerminalConditions() {
  return (
    <div
      className="
        border-y
        border-white/10

        py-8

        lg:border-x
        lg:border-y-0
        lg:px-8
        lg:py-10

        xl:px-10
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/30
        "
      >
        Terminal activity
      </span>

      <div className="mt-8 space-y-10">
        {terminalActivity.map(
          (terminal, index) => (
            <PulseTerminal
              key={terminal.id}
              terminal={terminal}
              index={index}
            />
          ),
        )}
      </div>
    </div>
  );
}

function Parking() {
  const { p1, p2 } = airportPulse.parking;

  return (
    <div
      className="
        px-0
        py-8

        lg:border-r
        lg:border-white/10
        lg:px-8
        lg:py-10

        xl:px-10
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/30
        "
      >
        Parking availability
      </span>

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-8
        "
      >
        <ParkingValue
          label="P1"
          value={p1}
        />

        <ParkingValue
          label="P2"
          value={p2}
        />
      </div>
    </div>
  );
}

function ParkingValue({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <span
        className="
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-white/35
        "
      >
        {label}
      </span>

      <motion.span
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
          duration: 0.6,
        }}
        className="
          mt-3
          block

          text-[clamp(2.8rem,5vw,5rem)]
          font-medium
          leading-none
          tracking-[-0.055em]
        "
      >
        {value}
      </motion.span>

      <span
        className="
          mt-2
          block

          text-[9px]
          uppercase
          tracking-[0.16em]
          text-white/30
        "
      >
        spaces
      </span>
    </div>
  );
}

function Operations() {
  const { status, activeFlights } =
    airportPulse.operations;

  return (
    <div
      className="
        border-t
        border-white/10

        py-8

        lg:border-t-0
        lg:px-8
        lg:py-10

        xl:px-10
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/30
        "
      >
        Airport operations
      </span>

      <div
        className="
          mt-8
          flex
          items-end
          justify-between
          gap-8
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <LiveDot />

            <span
              className="
                text-xl
                font-medium
                tracking-[-0.035em]
              "
            >
              {status}
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              text-white/35
            "
          >
            All terminals operating normally.
          </p>
        </div>

        <div className="text-right">
          <span
            className="
              block
              text-3xl
              font-medium
              tracking-[-0.05em]
            "
          >
            {activeFlights}
          </span>

          <span
            className="
              mt-1
              block
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            active flights
          </span>
        </div>
      </div>
    </div>
  );
}

function ActivityBar({
  percentage,
}: {
  percentage: number;
}) {
  return (
    <div className="mt-8">
      <div className="h-[3px] overflow-hidden bg-white/10">
        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${percentage}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-full
            bg-[#e8a735]
          "
        />
      </div>
    </div>
  );
}

function LiveDot() {
  return (
    <span
      className="
        relative
        flex
        size-2
      "
    >
      <motion.span
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          inset-0
          rounded-full
          bg-emerald-400
        "
      />

      <span
        className="
          relative
          size-2
          rounded-full
          bg-emerald-400
        "
      />
    </span>
  );
}

function PulseFooter() {
  return (
    <div
      className="
        mt-6

        flex
        flex-col
        gap-3

        text-[8px]
        uppercase
        tracking-[0.18em]
        text-white/25

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <span>
        Conditions update automatically
      </span>

      <span>
        LOS · 6°31&apos;N · 3°23&apos;E
      </span>
    </div>
  );
}

function PulseBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.035]

          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px)]
          [background-size:72px_100%]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-10%]
          top-[15%]

          h-[600px]
          w-[600px]

          rounded-full
          bg-[#315b78]/20
          blur-[160px]
        "
      />
    </>
  );
}