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

import type { AirportPlace } from "../../data/airport-places";

interface AirportLocationDetailProps {
  place: AirportPlace;
  places: AirportPlace[];

  onSelectPlace: (
    place: AirportPlace,
  ) => void;
}

export default function AirportLocationDetail({
  place,
  places,
  onSelectPlace,
}: AirportLocationDetailProps) {
  return (
    <aside
      className="
        bg-[#111820]
        text-white
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={place.id}
          initial={{
            opacity: 0,
            x: 25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -15,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            h-full
            min-h-[520px]
            flex-col

            p-6

            sm:p-8
            lg:p-10
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
            NOVA / Location
          </span>

          <div className="mt-12">
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-[#e8a735]
              "
            >
              {place.category}
            </p>

            <h2
              className="
                mt-3

                text-[clamp(2.8rem,4vw,4.5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              {place.name}
            </h2>

            <p
              className="
                mt-6

                max-w-[350px]

                text-sm
                leading-6
                text-white/45
              "
            >
              {place.description}
            </p>
          </div>

          <div
            className="
              mt-10

              border-y
              border-white/10
            "
          >
            <InfoRow
              icon={<MapPin size={14} />}
              label="Location"
              value={`${place.terminal} · ${place.level}`}
            />

            <InfoRow
              icon={<Clock3 size={14} />}
              label="Open"
              value={place.openingHours}
            />
          </div>

          {places.length > 1 && (
            <div className="mt-8">
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-white/25
                "
              >
                Other locations
              </span>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {places
                  .filter(
                    (item) =>
                      item.id !== place.id,
                  )
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        onSelectPlace(item)
                      }
                      className="
                        border
                        border-white/15

                        px-3
                        py-2

                        text-[8px]
                        uppercase
                        tracking-[0.15em]
                        text-white/50

                        transition-colors

                        hover:border-white/40
                        hover:text-white
                      "
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="
              group

              mt-auto
              pt-12

              flex
              items-center
              justify-between

              border-t
              border-white/10

              text-sm
            "
          >
            Get directions

            <ArrowUpRight
              size={16}
              strokeWidth={1.4}
              className="
                text-[#e8a735]

                transition-transform

                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </button>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5

        border-b
        border-white/10

        py-5

        last:border-b-0
      "
    >
      <div
        className="
          flex
          items-center
          gap-2

          text-white/30
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

      <span
        className="
          text-right
          text-xs
          text-white/65
        "
      >
        {value}
      </span>
    </div>
  );
}