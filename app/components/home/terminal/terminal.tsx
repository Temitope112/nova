"use client";

import { useState } from "react";

import {
  terminalLocations,
  type TerminalLocation,
} from "../../../data/terminal-locations";

import TerminalMap from "./terminal-map";
import TerminalRoutePanel from "./terminal-route-panel";

export default function Terminal() {
  const [selectedLocation, setSelectedLocation] =
    useState<TerminalLocation>(
      terminalLocations[0],
    );

  return (
    <section
      id="terminal"
      className="
        relative
        overflow-hidden
        bg-[#faf9f6]
        text-[#111820]
      "
    >
      <TerminalGrid />

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
        <TerminalHeading />

        <div
          className="
            mt-12
            grid
            gap-8

            lg:mt-16
            lg:grid-cols-[1.55fr_0.65fr]
            lg:gap-0

            xl:grid-cols-[1.7fr_0.6fr]
          "
        >
          <TerminalMap
  locations={terminalLocations}
  selectedLocation={selectedLocation}
  onSelectLocation={setSelectedLocation}
/>

          <TerminalRoutePanel
            selectedLocation={selectedLocation}
            locations={terminalLocations}
            onSelectLocation={
              setSelectedLocation
            }
          />
        </div>
      </div>
    </section>
  );
}

function TerminalHeading() {
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
          <span>Terminal / Wayfinding</span>

          <span
            className="
              h-px
              w-8
              bg-[#111820]/15
            "
          />

          <span>03</span>
        </div>

        <h2
          className="
            mt-5
            max-w-[1000px]

            text-[clamp(3.5rem,8vw,8rem)]
            font-medium
            leading-[0.82]
            tracking-[-0.07em]
          "
        >
          Know exactly
          <br />
          where you&apos;re going.
        </h2>
      </div>

      <p
        className="
          text-sm
          leading-6
          text-[#111820]/45
        "
      >
        Navigate NOVA with clear,
        real-time wayfinding from your
        current position to gates,
        lounges, dining and services.
      </p>
    </div>
  );
}

function TerminalGrid() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0

        opacity-[0.035]

        [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
        [background-size:72px_72px]
      "
    />
  );
}