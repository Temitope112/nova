"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";

import type { Destination } from "../../../data/destinations";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  featured?: boolean;
}

export default function DestinationCard({
  destination,
  index,
  featured = false,
}: DestinationCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 24,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 24,
  });

  const imageX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-10, 10],
  );

  const imageY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-8, 8],
  );

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const bounds =
      event.currentTarget.getBoundingClientRect();

    pointerX.set(
      (event.clientX - bounds.left) /
        bounds.width -
        0.5,
    );

    pointerY.set(
      (event.clientY - bounds.top) /
        bounds.height -
        0.5,
    );
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group
        relative
        overflow-hidden
        bg-[#111820]

        ${
          featured
            ? "min-h-[520px] lg:min-h-[720px]"
            : "min-h-[380px] lg:min-h-[345px]"
        }
      `}
    >
      <motion.div
        style={{
          x: imageX,
          y: imageY,
        }}
        className="
          absolute
          -inset-3
        "
      >
        <Image
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 1024px) 100vw, 40vw"
          }
          className="
            object-cover

            transition-transform
            duration-700

            group-hover:scale-[1.035]
          "
        />
      </motion.div>

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/75
          via-black/10
          to-black/5
        "
      />

      <div
        className="
          absolute
          inset-0

          flex
          flex-col
          justify-between

          p-5
          text-white

          sm:p-6

          lg:p-8
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/55
            "
          >
            {destination.country}
          </span>

          <span
            className="
              border
              border-white/20
              px-3
              py-2

              font-mono
              text-[9px]
              tracking-[0.16em]

              backdrop-blur-md
            "
          >
            {destination.airportCode}
          </span>
        </div>

        <div>
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 44,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay:
                0.35 + index * 0.05,
            }}
            className="
              mb-5
              h-px
              bg-white/60
            "
          />

          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <h3
                className={`
                  font-medium
                  leading-none
                  tracking-[-0.055em]

                  ${
                    featured
                      ? "text-[clamp(3rem,6vw,6rem)]"
                      : "text-[clamp(2.3rem,4vw,4rem)]"
                  }
                `}
              >
                {destination.city}
              </h3>

              <div
                className="
                  mt-4
                  flex
                  gap-5

                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-white/50
                "
              >
                <span>
                  {destination.flightTime}
                </span>

                <span>
                  {destination.terminal}
                </span>
              </div>
            </div>

            <span
              className="
                flex
                size-11
                shrink-0
                items-center
                justify-center

                rounded-full
                border
                border-white/25

                transition-all
                duration-300

                group-hover:bg-white
                group-hover:text-[#111820]
              "
            >
              <ArrowUpRight
                size={17}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300

                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}