"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cookie,
  Settings2,
} from "lucide-react";

const cookieTypes = [
  {
    number: "01",
    title: "Essential",
    status: "Always active",
    description:
      "Cookies required for fundamental website functionality, security and navigation.",
  },
  {
    number: "02",
    title: "Preferences",
    status: "Optional",
    description:
      "Cookies that could remember choices such as language, terminal preferences or interface settings.",
  },
  {
    number: "03",
    title: "Analytics",
    status: "Optional",
    description:
      "Information that could help NOVA understand how passengers use its digital services and where the experience can be improved.",
  },
];

export default function CookiesPage() {
  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section className="relative bg-[#f5f2eb] pt-[var(--navbar-height)]">
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
            <Cookie
              size={25}
              strokeWidth={1.2}
              className="text-[#315b78]"
            />

            <p className="mt-8 text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              Legal / Cookies
            </p>

            <h1
              className="
                mt-6
                text-[clamp(4.5rem,10vw,10rem)]
                font-medium leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Small files.
              <br />
              Clear purpose.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-6 text-[#111820]/50">
              Cookies can help digital services work properly, remember
              preferences and understand how people use a website.
            </p>

            <p className="mt-10 text-[9px] uppercase tracking-[0.18em] text-[#111820]/30">
              Last updated · September 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* TYPES */}
      <section
        className="
          px-5 py-24
          sm:px-8
          lg:px-12 lg:py-32
          xl:px-16
        "
      >
        <div
          className="
            mx-auto grid max-w-[1600px] gap-14
            lg:grid-cols-[0.5fr_1.5fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/30">
              Cookies / 01
            </span>

            <h2
              className="
                mt-5
                text-[clamp(3rem,5vw,5rem)]
                font-medium leading-[0.9]
                tracking-[-0.06em]
              "
            >
              What they
              <br />
              would do.
            </h2>
          </div>

          <div className="border-t border-[#111820]/15">
            {cookieTypes.map((cookie, index) => (
              <motion.article
                key={cookie.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="
                  grid gap-6
                  border-b border-[#111820]/15
                  py-10
                  sm:grid-cols-[55px_0.7fr_1fr_auto]
                  sm:items-start
                "
              >
                <span className="font-mono text-[9px] text-[#315b78]">
                  {cookie.number}
                </span>

                <h3 className="text-2xl font-medium tracking-[-0.04em]">
                  {cookie.title}
                </h3>

                <p className="max-w-md text-sm leading-7 text-[#111820]/50">
                  {cookie.description}
                </p>

                <span
                  className="
                    w-fit
                    border border-[#111820]/15
                    px-3 py-2
                    text-[8px] uppercase
                    tracking-[0.16em]
                    text-[#111820]/45
                  "
                >
                  {cookie.status}
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTROL */}
      <section className="bg-[#111820] text-white">
        <div
          className="
            mx-auto grid max-w-[1600px] gap-12
            px-5 py-24
            sm:px-8
            lg:grid-cols-[0.6fr_1.4fr] lg:px-12 lg:py-28
            xl:px-16
          "
        >
          <div>
            <Settings2
              size={24}
              strokeWidth={1.2}
              className="text-[#e8a735]"
            />

            <p className="mt-7 text-[9px] uppercase tracking-[0.22em] text-white/30">
              Your control
            </p>
          </div>

          <div>
            <h2
              className="
                text-[clamp(3.5rem,6vw,6rem)]
                font-medium leading-[0.86]
                tracking-[-0.065em]
              "
            >
              Your browser.
              <br />
              Your choice.
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/45">
              Most browsers allow you to view, block or remove cookies through
              their privacy settings. Blocking essential cookies may affect how
              some digital services function.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-[#e7eff2]">
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
            Related information
          </span>

          <div className="mt-10 border-t border-[#111820]/15">
            <LegalLink
              href="/privacy"
              number="01"
              title="Privacy Notice"
            />

            <LegalLink
              href="/terms"
              number="02"
              title="Terms of Use"
            />

            <LegalLink
              href="/contact"
              number="03"
              title="Contact NOVA"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

interface LegalLinkProps {
  href: string;
  number: string;
  title: string;
}

function LegalLink({
  href,
  number,
  title,
}: LegalLinkProps) {
  return (
    <Link
      href={href}
      className="
        group grid gap-4
        border-b border-[#111820]/15
        py-7
        sm:grid-cols-[70px_1fr_auto]
        sm:items-center
      "
    >
      <span className="font-mono text-[9px] text-[#111820]/25">
        {number}
      </span>

      <span className="text-2xl font-medium tracking-[-0.04em]">
        {title}
      </span>

      <ArrowRight
        size={16}
        strokeWidth={1.4}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}