"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { destinations } from "../../../data/destinations";

import DestinationCard from "./destination-card";
import DestinationsMarquee from "./destinations-marquee";

export default function Destinations() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.45],
    [90, 0],
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.22],
    [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="
        relative
        overflow-hidden
        bg-[#e9e0d2]
        text-[#111820]
      "
    >
      <DestinationBackground />

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
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          <DestinationHeading />
        </motion.div>

        <div
          className="
            mt-14
            grid
            gap-5

            sm:grid-cols-2

            lg:mt-20
            lg:grid-cols-12
            lg:gap-6
          "
        >
          <div
            className="
              sm:col-span-2

              lg:col-span-7
              lg:row-span-2
            "
          >
            <DestinationCard
              destination={
                destinations[0]
              }
              index={0}
              featured
            />
          </div>

          <div
            className="
              lg:col-span-5
            "
          >
            <DestinationCard
              destination={
                destinations[1]
              }
              index={1}
            />
          </div>

          <div
            className="
              lg:col-span-5
            "
          >
            <DestinationCard
              destination={
                destinations[2]
              }
              index={2}
            />
          </div>

          <div
            className="
              lg:col-span-4
            "
          >
            <DestinationCard
              destination={
                destinations[3]
              }
              index={3}
            />
          </div>

          <div
            className="
              lg:col-span-4
            "
          >
            <DestinationCard
              destination={
                destinations[4]
              }
              index={4}
            />
          </div>

          <div
            className="
              sm:col-span-2

              lg:col-span-4
            "
          >
            <DestinationCard
              destination={
                destinations[5]
              }
              index={5}
            />
          </div>
        </div>

        <DestinationsMarquee />
      </div>
    </section>
  );
}

function DestinationHeading() {
  return (
    <div
      className="
        grid
        gap-8

        lg:grid-cols-[1fr_340px]
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
            text-[#111820]/35
          "
        >
          <span>
            NOVA / Destinations
          </span>

          <span
            className="
              h-px
              w-8
              bg-[#111820]/15
            "
          />

          <span>04</span>
        </div>

        <h2
          className="
            mt-5

            text-[clamp(3.7rem,8.4vw,8.5rem)]
            font-medium
            leading-[0.81]
            tracking-[-0.075em]
          "
        >
          Where will NOVA
          <br />
          take you?
        </h2>
      </div>

      <p
        className="
          max-w-[340px]
          text-sm
          leading-6
          text-[#111820]/45
        "
      >
        From familiar cities to
        somewhere entirely new. Explore
        destinations connected through
        NOVA.
      </p>
    </div>
  );
}

function DestinationBackground() {
  return (
    <>
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

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[12%]

          h-[650px]
          w-[650px]

          rounded-full
          bg-white/35
          blur-[160px]
        "
      />
    </>
  );
}