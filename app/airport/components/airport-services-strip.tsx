"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  BriefcaseBusiness,
  CircleHelp,
  Wifi,
} from "lucide-react";

const services = [
  {
    id: "wifi",
    title: "Free Wi-Fi",
    detail: "Airport-wide",
    icon: Wifi,
  },
  {
    id: "assistance",
    title: "Accessibility",
    detail: "Passenger assistance",
    icon: Accessibility,
  },
  {
    id: "business",
    title: "Business",
    detail: "Work between flights",
    icon: BriefcaseBusiness,
  },
  {
    id: "help",
    title: "Need help?",
    detail: "Speak to NOVA",
    icon: CircleHelp,
  },
];

export default function AirportServicesStrip() {
  return (
    <section
      className="
        bg-[#315b78]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]

          px-5

          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            grid

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {services.map(
            (service, index) => {
              const Icon = service.icon;

              return (
                <motion.button
                  key={service.id}
                  type="button"
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
                    duration: 0.55,
                    delay: index * 0.07,
                  }}
                  className="
                    group

                    flex
                    items-center
                    gap-4

                    border-b
                    border-white/15

                    py-7

                    text-left

                    sm:border-r
                    sm:px-6

                    lg:border-b-0

                    sm:first:pl-0
                    lg:last:border-r-0
                  "
                >
                  <div
                    className="
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/20

                      transition-colors

                      group-hover:bg-white
                      group-hover:text-[#315b78]
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.4}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-medium
                      "
                    >
                      {service.title}
                    </p>

                    <span
                      className="
                        mt-1
                        block

                        text-[8px]
                        uppercase
                        tracking-[0.16em]
                        text-white/40
                      "
                    >
                      {service.detail}
                    </span>
                  </div>
                </motion.button>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}