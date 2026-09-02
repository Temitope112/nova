"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  MapPin,
  Plane,
} from "lucide-react";

const quickRoutes = [
  {
    label: "Flights",
    href: "/flights",
    code: "FLT",
  },
  {
    label: "Airport Map",
    href: "/airport/map",
    code: "MAP",
  },
  {
    label: "My Journey",
    href: "/journey",
    code: "JNY",
  },
  {
    label: "Help Centre",
    href: "/support",
    code: "HLP",
  },
];

export default function NotFound() {
  return (
    <main
      className="
        relative
        min-h-svh
        overflow-hidden
        bg-[#111820]
        pt-[var(--navbar-height)]
        text-white
      "
    >
      {/* GRID */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          opacity-[0.04]

          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* LARGE 404 */}
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="
          pointer-events-none
          absolute
          -right-[2vw]
          top-[8%]

          select-none

          text-[clamp(13rem,34vw,38rem)]
          font-medium
          leading-none
          tracking-[-0.1em]
          text-white/[0.025]
        "
      >
        404
      </motion.div>

      {/* FLIGHT PATH */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[18%]
          h-[55%]
          w-full
          opacity-60
        "
      >
        <motion.path
          d="M-40 390 C 160 350, 210 180, 430 230 S 690 390, 1040 90"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          strokeDasharray="5 8"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 2,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      {/* PLANE */}
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
          x: -30,
          y: 15,
          rotate: -10,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: -18,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
        className="
          absolute
          right-[10%]
          top-[27%]

          hidden

          lg:block
        "
      >
        <Plane
          size={30}
          strokeWidth={1}
          className="text-[#e8a735]"
        />
      </motion.div>

      {/* CONTENT */}
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

          lg:px-12
          lg:pb-10
          lg:pt-14

          xl:px-16
        "
      >
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="
                flex
                size-2
                rounded-full
                bg-[#e8a735]
              "
            />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">
              Navigation Error
            </span>
          </div>

          <span
            className="
              hidden

              font-mono
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/25

              sm:block
            "
          >
            NOVA · ERR 404
          </span>
        </div>

        {/* MAIN MESSAGE */}
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
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            my-20
            max-w-[1050px]

            lg:my-16
          "
        >
          <div className="flex items-center gap-3">
            <Compass
              size={17}
              strokeWidth={1.2}
              className="text-[#e8a735]"
            />

            <p className="text-[9px] uppercase tracking-[0.22em] text-[#e8a735]">
              Route unavailable
            </p>
          </div>

          <h1
            className="
              mt-7

              text-[clamp(4.5rem,10vw,10rem)]
              font-medium
              leading-[0.8]
              tracking-[-0.075em]
            "
          >
            You&apos;ve gone
            <br />
            off route.
          </h1>

          <div
            className="
              mt-9

              flex
              flex-col
              gap-7

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <p className="max-w-md text-sm leading-6 text-white/45">
              This destination doesn&apos;t exist, may have moved, or the route
              you followed is no longer available.
            </p>

            <Link
              href="/"
              className="
                group

                inline-flex
                w-fit
                items-center
                gap-5

                bg-blue-500/5

                px-5
                py-4

                text-sm
                text-[#111820]
              "
            >
              <Home
                size={15}
                strokeWidth={1.4}
              />

              Return to NOVA

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
        </motion.div>

        {/* ROUTES */}
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
            duration: 0.6,
            delay: 0.35,
          }}
        >
          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-white/15

              pb-4
            "
          >
            <div className="flex items-center gap-3">
              <MapPin
                size={13}
                strokeWidth={1.3}
                className="text-white/35"
              />

              <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                Suggested routes
              </span>
            </div>

            <span className="font-mono text-[8px] text-white/20">
              LOS
            </span>
          </div>

          <div
            className="
              grid

              sm:grid-cols-2

              lg:grid-cols-4
            "
          >
            {quickRoutes.map((route, index) => (
              <Link
                key={route.href}
                href={route.href}
                className={`
                  group

                  flex
                  items-center
                  justify-between
                  gap-5

                  border-white/10

                  py-5

                  transition-colors
                  duration-300

                  hover:text-[#e8a735]

                  sm:px-5

                  ${
                    index !== quickRoutes.length - 1
                      ? "border-b sm:border-b-0 sm:border-r"
                      : ""
                  }

                  ${index === 0 ? "sm:pl-0" : ""}
                `}
              >
                <div>
                  <span className="font-mono text-[8px] text-white/20">
                    {route.code}
                  </span>

                  <p className="mt-1 text-sm text-white/65 transition-colors group-hover:text-white">
                    {route.label}
                  </p>
                </div>

                <ArrowRight
                  size={14}
                  strokeWidth={1.3}
                  className="
                    text-white/25

                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:text-[#e8a735]
                  "
                />
              </Link>
            ))}
          </div>

          {/* BOTTOM META */}
          <div
            className="
              mt-3

              flex
              items-center
              justify-between

              border-t
              border-white/10

              pt-4

              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/20
            "
          >
            <span>NOVA International Airport</span>

            <span className="hidden sm:block">
              LOS · 6°31′ N · 3°23′ E
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}