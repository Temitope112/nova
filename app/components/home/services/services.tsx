"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  airportServices,
  type AirportService,
} from "../../../data/services";

import ServiceDirectory from "./service-directory";
import ServiceDetail from "./service-detail";

export default function Services() {
  const [activeService, setActiveService] =
    useState<AirportService>(airportServices[0]);

  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#f7f5f0]
        text-[#111820]
      "
    >
      <ServicesBackground />

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
        <ServicesHeading />

        <div
          className="
            mt-14
            grid
            gap-10

            lg:mt-20
            lg:grid-cols-[1.25fr_0.75fr]
            lg:gap-0
          "
        >
          <ServiceDirectory
            services={airportServices}
            activeService={activeService}
            onSelect={setActiveService}
          />

          <ServiceDetail
            service={activeService}
          />
        </div>
      </div>
    </section>
  );
}

function ServicesHeading() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 55,
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
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
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
          <span>NOVA / Services</span>

          <span className="h-px w-8 bg-[#111820]/15" />

          <span>07</span>
        </div>

        <h2
          className="
            mt-5

            text-[clamp(3.8rem,8.5vw,8.8rem)]
            font-medium
            leading-[0.81]
            tracking-[-0.075em]
          "
        >
          Everything you need,
          <br />
          within reach.
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
        From arrival to departure,
        the practical things should feel
        just as effortless as the journey itself.
      </p>
    </motion.div>
  );
}

function ServicesBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.03]

          [background-image:linear-gradient(to_right,#111820_1px,transparent_1px)]
          [background-size:72px_100%]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-15%]
          bottom-[-20%]

          h-[650px]
          w-[650px]

          rounded-full
          bg-[#e8eff1]
          blur-[170px]
        "
      />
    </>
  );
}