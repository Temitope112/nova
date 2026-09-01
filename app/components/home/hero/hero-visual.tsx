"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import HeroFlightPath from "./hero-flight-path";

interface HeroVisualProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroVisual({
  scrollProgress,
}: HeroVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 75,
    damping: 22,
    mass: 0.65,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 75,
    damping: 22,
    mass: 0.65,
  });

  const imageX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-8, 8],
  );

  const imageY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-5, 5],
  );

  /*
   * Image starts as a cinematic strip.
   * It then expands horizontally.
   */
  const visualWidth = useTransform(
    scrollProgress,
    [0, 0.18, 0.58],
    ["84%", "92%", "100vw"],
  );

  /*
   * This is the main fix.
   *
   * Because the visual is anchored to bottom: 0,
   * increasing its height makes it grow UPWARD.
   *
   * At 100svh it fills the entire viewport.
   */
  const visualHeight = useTransform(
    scrollProgress,
    [0, 0.18, 0.58],
    ["30svh", "34svh", "100svh"],
  );

  const visualRadius = useTransform(
    scrollProgress,
    [0, 0.2, 0.56],
    [42, 42, 0],
  );

  const imageScale = useTransform(
    scrollProgress,
    [0, 0.58],
    [1.04, 1],
  );

  const imageBrightness = useTransform(
    scrollProgress,
    [0, 0.58, 0.8],
    [1, 1, 0.62],
  );

  const imageFilter = useTransform(
    imageBrightness,
    (value) => `brightness(${value})`,
  );

  const metadataOpacity = useTransform(
    scrollProgress,
    [0, 0.22, 0.44],
    [1, 1, 0],
  );

  const overlayOpacity = useTransform(
    scrollProgress,
    [0.62, 0.82],
    [0, 0.5],
  );

  const handlePointerMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (shouldReduceMotion) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const normalizedX =
      (event.clientX - bounds.left) /
        bounds.width -
      0.5;

    const normalizedY =
      (event.clientY - bounds.top) /
        bounds.height -
      0.5;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{
        width: shouldReduceMotion
          ? "84%"
          : visualWidth,

        height: shouldReduceMotion
          ? "30svh"
          : visualHeight,

        borderRadius: shouldReduceMotion
          ? 42
          : visualRadius,
      }}
      className="
        absolute
        bottom-0
        left-1/2
        z-10
        -translate-x-1/2
        overflow-hidden
        bg-[#111820]
      "
    >
      <motion.div
        style={{
          x: shouldReduceMotion
            ? 0
            : imageX,

          y: shouldReduceMotion
            ? 0
            : imageY,

          scale: shouldReduceMotion
            ? 1
            : imageScale,

          filter: shouldReduceMotion
            ? "brightness(1)"
            : imageFilter,
        }}
        className="absolute inset-0"
      >
        <Image
          src="/airport-hero.png"
          alt="Aircraft beside a modern international airport terminal"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
            lg:object-[center_58%]
          "
        />
      </motion.div>

      {/* Subtle resting gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-10
          bg-gradient-to-t
          from-[#111820]/30
          via-transparent
          to-black/[0.03]
        "
      />

      {/* Live indicator */}
      <motion.div
        style={{
          opacity: shouldReduceMotion
            ? 1
            : metadataOpacity,
        }}
        className="
          absolute
          left-4
          top-4
          z-20

          rounded-full
          border
          border-white/20
          bg-black/10

          px-3
          py-2

          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/80

          backdrop-blur-md

          sm:left-6
          sm:top-6
          sm:text-[9px]
        "
      >
        Live / NOVA
      </motion.div>

      {/* Image metadata */}
      <motion.div
        style={{
          opacity: shouldReduceMotion
            ? 1
            : metadataOpacity,
        }}
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          flex
          items-end
          justify-between
          gap-5

          p-5
          text-white

          sm:p-6
          lg:p-8
        "
      >
        <VisualMeta
          label="Current conditions"
          value="Clear · 28°C"
        />

        <VisualMeta
          label="Terminal status"
          value="T1 · T2"
          align="right"
        />
      </motion.div>

      <HeroFlightPath
        scrollProgress={scrollProgress}
      />

      {/* Transition shade */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity: shouldReduceMotion
            ? 0
            : overlayOpacity,
        }}
        className="
          pointer-events-none
          absolute inset-0
          z-40
          bg-[#111820]
        "
      />
    </motion.div>
  );
}

interface VisualMetaProps {
  label: string;
  value: string;
  align?: "left" | "right";
}

function VisualMeta({
  label,
  value,
  align = "left",
}: VisualMetaProps) {
  return (
    <div
      className={
        align === "right"
          ? "text-right"
          : "text-left"
      }
    >
      <span
        className="
          block
          text-[8px]
          uppercase
          tracking-[0.2em]
          text-white/55

          sm:text-[9px]
        "
      >
        {label}
      </span>

      <span
        className="
          mt-1
          block
          text-sm
          font-medium

          sm:text-base
          lg:text-lg
        "
      >
        {value}
      </span>
    </div>
  );
}