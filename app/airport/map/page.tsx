"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Navigation, MapPin } from "lucide-react";

export default function AirportMapPage() {
  return (
    <main className="min-h-screen bg-[#e9e0d2] pt-[var(--navbar-height)] text-[#111820]">
      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
        <Link
          href="/airport"
          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#111820]/40"
        >
          <ArrowLeft size={13} strokeWidth={1.4} />
          At the Airport
        </Link>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              Terminal Navigation / NOVA
            </span>

            <h1 className="mt-5 text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              Find your
              <br />
              way.
            </h1>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#111820]/50 lg:justify-self-end">
            Move through NOVA with a clear view of terminals, gates and key
            passenger locations.
          </p>
        </div>

        <div className="mt-16 grid overflow-hidden bg-[#f5f2eb] lg:grid-cols-[1.4fr_0.6fr]">
          <div className="relative min-h-[620px] overflow-hidden">
            <div
              aria-hidden="true"
              className="
                absolute inset-0 opacity-[0.05]
                [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
                [background-size:48px_48px]
              "
            />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d="
                  M8 76
                  H25
                  V62
                  H41
                  V48
                  H59
                  V35
                  H88
                  V67
                  H70
                  V80
                  H28
                  V88
                  H8
                  Z
                "
                fill="#ffffff"
                stroke="#111820"
                strokeOpacity="0.14"
                strokeWidth="0.45"
              />

              <motion.path
                d="
                  M14 82
                  C22 74 30 67 38 61
                  S52 50 60 45
                  S70 39 80 37
                "
                fill="none"
                stroke="#315b78"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="2 1.8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            <div className="absolute left-[14%] top-[82%]">
              <motion.span
                animate={{
                  scale: [1, 2.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="absolute size-3 rounded-full bg-[#315b78]"
              />

              <span className="relative block size-3 rounded-full bg-[#315b78]" />

              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.17em] text-[#315b78]">
                You are here
              </span>
            </div>

            <div className="absolute left-[80%] top-[37%] -translate-x-1/2 -translate-y-1/2">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#111820] text-[8px] font-medium text-white">
                B08
              </span>

              <span className="absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.17em] text-[#111820]/45">
                Gate B08
              </span>
            </div>

            <div className="absolute bottom-6 left-6 flex gap-2">
              <button
                type="button"
                className="border border-[#111820]/15 bg-[#faf9f6] px-4 py-3 text-[8px] uppercase tracking-[0.16em]"
              >
                T1
              </button>

              <button
                type="button"
                className="bg-[#111820] px-4 py-3 text-[8px] uppercase tracking-[0.16em] text-white"
              >
                T2
              </button>
            </div>
          </div>

          <aside className="flex flex-col justify-between bg-[#111820] p-7 text-white sm:p-10">
            <div>
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                Selected location
              </span>

              <div className="mt-6 flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.35}
                  className="mt-1 text-[#e8a735]"
                />

                <div>
                  <h2 className="text-4xl font-medium tracking-[-0.055em]">
                    Gate B08
                  </h2>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/35">
                    Terminal 2 · East Pier
                  </p>
                </div>
              </div>
            </div>

            <div className="my-16">
              <div className="flex items-center justify-between border-y border-white/10 py-5">
                <span className="text-[8px] uppercase tracking-[0.17em] text-white/30">
                  Walking time
                </span>

                <span className="text-sm">
                  12 min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-5">
                <span className="text-[8px] uppercase tracking-[0.17em] text-white/30">
                  Route
                </span>

                <span className="text-sm">
                  Blue
                </span>
              </div>
            </div>

            <button
              type="button"
              className="group flex items-center justify-between border-t border-white/15 pt-5 text-sm"
            >
              Start navigation

              <Navigation
                size={15}
                strokeWidth={1.4}
                className="text-[#e8a735] transition-transform group-hover:translate-x-1"
              />
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}