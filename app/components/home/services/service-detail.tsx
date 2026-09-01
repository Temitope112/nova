"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
} from "lucide-react";

import type { AirportService } from "../../../data/services";

interface ServiceDetailProps {
  service: AirportService;
}

export default function ServiceDetail({
  service,
}: ServiceDetailProps) {
  return (
    <aside
      className="
        relative
        min-h-[480px]
        overflow-hidden

        bg-[#e8eff1]

        p-6

        sm:p-8

        lg:min-h-full
        lg:p-10

        xl:p-12
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-80px]
          top-[-80px]

          size-[260px]
          rounded-full
          border
          border-[#111820]/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-25px]
          top-[-25px]

          size-[160px]
          rounded-full
          border
          border-[#111820]/10
        "
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10

            flex
            h-full
            flex-col
            justify-between
          "
        >
          <div>
            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-[#111820]/35
              "
            >
              Service / {service.number}
            </span>

            <h3
              className="
                mt-8

                text-[clamp(3rem,5vw,5.5rem)]
                font-medium
                leading-[0.88]
                tracking-[-0.065em]
              "
            >
              {service.title}
            </h3>

            <p
              className="
                mt-6
                max-w-[420px]

                text-sm
                leading-6
                text-[#111820]/50
              "
            >
              {service.description}
            </p>

            <div
              className="
                mt-10
                grid
                gap-6

                border-y
                border-[#111820]/10

                py-6

                sm:grid-cols-2
              "
            >
              <ServiceFact
                icon={<MapPin size={15} />}
                label="Location"
                value={service.location}
              />

              <ServiceFact
                icon={<Clock3 size={15} />}
                label="Availability"
                value={service.availability}
              />
            </div>
          </div>

          <button
            type="button"
            className="
              group
              mt-12

              flex
              items-center
              justify-between

              border-t
              border-[#111820]/15

              pt-5

              text-sm
              font-medium
            "
          >
            View service details

            <ArrowUpRight
              size={17}
              strokeWidth={1.4}
              className="
                transition-transform
                duration-300

                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </button>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

interface ServiceFactProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ServiceFact({
  icon,
  label,
  value,
}: ServiceFactProps) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-2

          text-[#111820]/35
        "
      >
        {icon}

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.18em]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-3
          text-sm
          font-medium
          text-[#111820]/70
        "
      >
        {value}
      </p>
    </div>
  );
}