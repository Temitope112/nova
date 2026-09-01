"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

import type { AirportService } from "../../../data/services";

interface ServiceDirectoryProps {
  services: AirportService[];
  activeService: AirportService;

  onSelect: (
    service: AirportService,
  ) => void;
}

export default function ServiceDirectory({
  services,
  activeService,
  onSelect,
}: ServiceDirectoryProps) {
  return (
    <div
      className="
        border-t
        border-[#111820]/15

        lg:border-r
      "
    >
      {services.map((service, index) => {
        const active =
          service.id === activeService.id;

        return (
          <motion.button
            key={service.id}
            type="button"
            onMouseEnter={() =>
              onSelect(service)
            }
            onFocus={() =>
              onSelect(service)
            }
            onClick={() =>
              onSelect(service)
            }
            initial={{
              opacity: 0,
              x: -24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.04,
            }}
            className="
              group
              relative

              grid
              w-full
              grid-cols-[42px_1fr_auto]
              items-center
              gap-4

              overflow-hidden

              border-b
              border-[#111820]/15

              py-5
              pr-5

              text-left

              sm:grid-cols-[56px_1fr_auto]
              sm:py-6
            "
          >
            {active && (
              <motion.span
                layoutId="active-service"
                className="
                  absolute
                  inset-0
                  bg-[#111820]
                "
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                }}
              />
            )}

            <span
              className={`
                relative
                z-10

                font-mono
                text-[9px]

                ${
                  active
                    ? "text-white/30"
                    : "text-[#111820]/30"
                }
              `}
            >
              {service.number}
            </span>

            <span
              className={`
                relative
                z-10

                text-[clamp(1.35rem,2.4vw,2.25rem)]
                font-medium
                tracking-[-0.04em]

                transition-colors

                ${
                  active
                    ? "text-white"
                    : "text-[#111820]"
                }
              `}
            >
              {service.title}
            </span>

            <MoveRight
              size={18}
              strokeWidth={1.4}
              className={`
                relative
                z-10

                transition-all
                duration-300

                ${
                  active
                    ? "translate-x-0 text-[#e8a735]"
                    : "-translate-x-2 text-[#111820]/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }
              `}
            />
          </motion.button>
        );
      })}
    </div>
  );
}