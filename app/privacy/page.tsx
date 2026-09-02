"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";

const sections = [
  {
    id: "overview",
    number: "01",
    title: "Overview",
    content: [
      "This Privacy Notice explains how NOVA International Airport may collect, use and protect information when passengers interact with NOVA's digital services.",
      "NOVA is a fictional airport experience created as a frontend demonstration. The current website does not operate as a real airport service.",
    ],
  },
  {
    id: "information",
    number: "02",
    title: "Information we collect",
    content: [
      "A live airport platform may collect information you provide directly, including your name, email address, telephone number, flight details, support enquiries and lost property reports.",
      "Technical information such as device type, browser information and website interactions may also be processed to improve the digital experience.",
    ],
  },
  {
    id: "usage",
    number: "03",
    title: "How information is used",
    content: [
      "Information may be used to respond to passenger enquiries, provide requested assistance, process reports, improve airport services and communicate important journey information.",
      "Information should only be used where there is a legitimate operational, service or legal reason to do so.",
    ],
  },
  {
    id: "sharing",
    number: "04",
    title: "Sharing information",
    content: [
      "Where necessary, information may be shared with relevant airport teams, airlines, service providers or authorities in order to provide a requested service or meet legal obligations.",
      "Personal information should not be sold to third parties.",
    ],
  },
  {
    id: "security",
    number: "05",
    title: "Keeping information secure",
    content: [
      "Appropriate technical and organisational measures should be used to protect personal information against unauthorised access, loss, misuse or disclosure.",
      "No digital service can guarantee absolute security, but reasonable safeguards should be maintained throughout the information lifecycle.",
    ],
  },
  {
    id: "rights",
    number: "06",
    title: "Your choices & rights",
    content: [
      "Depending on applicable law, passengers may have rights relating to access, correction, deletion, restriction or objection to certain uses of their personal information.",
      "Questions about personal information can be directed to passenger support through the NOVA contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section className="relative bg-[#e7eff2] pt-[var(--navbar-height)]">
        <div
          aria-hidden="true"
          className="
            absolute inset-0 opacity-[0.035]
            [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <div
          className="
            relative mx-auto max-w-[1600px]
            px-5 pb-20 pt-12
            sm:px-8
            lg:px-12 lg:pb-28 lg:pt-20
            xl:px-16
          "
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#111820]/40"
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
            <ShieldCheck
              size={25}
              strokeWidth={1.2}
              className="text-[#315b78]"
            />

            <p className="mt-8 text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              Legal / Privacy
            </p>

            <h1
              className="
                mt-6
                text-[clamp(4.5rem,10vw,10rem)]
                font-medium leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Your information.
              <br />
              Handled with care.
            </h1>

            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-3 text-[9px] uppercase tracking-[0.18em] text-[#111820]/35">
              <span>Privacy Notice</span>
              <span>Last updated · September 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
        <div
          className="
            mx-auto grid max-w-[1600px] gap-16
            lg:grid-cols-[0.45fr_1.55fr]
          "
        >
          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/30">
              Contents
            </span>

            <nav className="mt-6 border-t border-[#111820]/15">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="
                    group flex items-center justify-between
                    border-b border-[#111820]/15
                    py-4 text-xs text-[#111820]/50
                    transition-colors hover:text-[#111820]
                  "
                >
                  <span>{section.title}</span>

                  <span className="font-mono text-[8px] text-[#111820]/25">
                    {section.number}
                  </span>
                </a>
              ))}
            </nav>
          </aside>

          {/* SECTIONS */}
          <div className="border-t border-[#111820]/15">
            {sections.map((section, index) => (
              <motion.article
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.03,
                }}
                className="
                  scroll-mt-28
                  grid gap-6
                  border-b border-[#111820]/15
                  py-10
                  md:grid-cols-[80px_0.7fr_1fr]
                  lg:py-14
                "
              >
                <span className="font-mono text-[9px] text-[#315b78]">
                  {section.number}
                </span>

                <h2 className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                  {section.title}
                </h2>

                <div className="space-y-5">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-xl text-sm leading-7 text-[#111820]/50"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#315b78] text-white">
        <div
          className="
            mx-auto grid max-w-[1600px] gap-10
            px-5 py-20
            sm:px-8
            lg:grid-cols-[1fr_1fr] lg:items-end lg:px-12 lg:py-24
            xl:px-16
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
              Privacy questions
            </span>

            <h2
              className="
                mt-6
                text-[clamp(3.5rem,6vw,6rem)]
                font-medium leading-[0.86]
                tracking-[-0.065em]
              "
            >
              Need to ask
              <br />
              us something?
            </h2>
          </div>

          <Link
            href="/contact"
            className="
              group flex items-center justify-between
              border-t border-white/25
              pt-5 text-sm
              lg:max-w-md lg:justify-self-end lg:w-full
            "
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