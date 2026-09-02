"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";

const sections = [
  {
    number: "01",
    title: "About these terms",
    content:
      "These terms describe the conditions that would apply when using NOVA's website and digital passenger services.",
  },
  {
    number: "02",
    title: "Using NOVA digital services",
    content:
      "Users should use NOVA's digital services lawfully and should not attempt to interfere with, damage or gain unauthorised access to the website, systems or information.",
  },
  {
    number: "03",
    title: "Flight information",
    content:
      "Flight times, gates, statuses and other operational information may change. Passengers should always confirm important journey information with their airline and official airport displays.",
  },
  {
    number: "04",
    title: "Third-party services",
    content:
      "Some services may involve airlines, transport providers, retailers or other independent organisations. Their own terms and policies may apply when using those services.",
  },
  {
    number: "05",
    title: "Website availability",
    content:
      "NOVA would aim to keep its digital services available and accurate, but uninterrupted access cannot be guaranteed. Services may occasionally be changed, suspended or unavailable.",
  },
  {
    number: "06",
    title: "Intellectual property",
    content:
      "The NOVA name, interface, visual system and original website materials are part of this fictional project and may not be represented as an actual airport service.",
  },
  {
    number: "07",
    title: "Changes to these terms",
    content:
      "These terms may be updated as digital services evolve. The latest version would be made available on this page.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section className="bg-[#111820] pt-[var(--navbar-height)] text-white">
        <div
          className="
            mx-auto max-w-[1600px]
            px-5 pb-20 pt-12
            sm:px-8
            lg:px-12 lg:pb-28 lg:pt-20
            xl:px-16
          "
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40"
          >
            <ArrowLeft size={13} strokeWidth={1.4} />
            Back to NOVA
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-20"
          >
            <FileText
              size={25}
              strokeWidth={1.2}
              className="text-[#e8a735]"
            />

            <p className="mt-8 text-[9px] uppercase tracking-[0.22em] text-[#e8a735]">
              Legal / Terms
            </p>

            <h1
              className="
                mt-6
                text-[clamp(4.5rem,10vw,10rem)]
                font-medium leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Clear terms.
              <br />
              No turbulence.
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-6 text-white/45">
              The terms that would govern the use of NOVA&apos;s website and
              digital passenger services.
            </p>

            <p className="mt-10 text-[9px] uppercase tracking-[0.18em] text-white/30">
              Last updated · September 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
        <div
          className="
            mx-auto grid max-w-[1600px] gap-14
            lg:grid-cols-[0.45fr_1.55fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/30">
              Terms / 01—07
            </span>

            <h2
              className="
                mt-5
                text-[clamp(3rem,5vw,5rem)]
                font-medium leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Using NOVA
              <br />
              responsibly.
            </h2>
          </div>

          <div className="border-t border-[#111820]/15">
            {sections.map((section, index) => (
              <motion.article
                key={section.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.03,
                }}
                className="
                  grid gap-6
                  border-b border-[#111820]/15
                  py-10
                  md:grid-cols-[70px_0.8fr_1fr]
                  lg:py-12
                "
              >
                <span className="font-mono text-[9px] text-[#315b78]">
                  {section.number}
                </span>

                <h3 className="text-2xl font-medium tracking-[-0.04em]">
                  {section.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-[#111820]/50">
                  {section.content}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-[#e9e0d2]">
        <div
          className="
            mx-auto max-w-[1600px]
            px-5 py-20
            sm:px-8
            lg:px-12 lg:py-24
            xl:px-16
          "
        >
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
            Important
          </span>

          <h2
            className="
              mt-6 max-w-5xl
              text-[clamp(3rem,5vw,5rem)]
              font-medium leading-[0.9]
              tracking-[-0.06em]
            "
          >
            NOVA International Airport
            <br />
            is a fictional digital experience.
          </h2>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-[#111820]/50">
            Flight schedules, gates, passenger information, airport locations,
            operational data and services displayed throughout this project are
            mock information created for demonstration purposes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#315b78] text-white">
        <div
          className="
            mx-auto flex max-w-[1600px]
            flex-col gap-10
            px-5 py-20
            sm:px-8
            lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-24
            xl:px-16
          "
        >
          <h2
            className="
              text-[clamp(3.5rem,6vw,6rem)]
              font-medium leading-[0.86]
              tracking-[-0.065em]
            "
          >
            Questions about
            <br />
            these terms?
          </h2>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border-b border-white/30 pb-2 text-sm"
          >
            Contact NOVA

            <ArrowUpRight
              size={16}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}