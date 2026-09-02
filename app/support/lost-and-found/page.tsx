"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  FileText,
  Luggage,
  MapPin,
  Search,
  Send,
} from "lucide-react";

const itemCategories = [
  "Bag / Luggage",
  "Phone",
  "Wallet",
  "Passport / Documents",
  "Electronics",
  "Clothing",
  "Other",
];

const airportLocations = [
  "Terminal 1",
  "Terminal 2",
  "Security",
  "Check-in",
  "Departure Gate",
  "Baggage Claim",
  "Restaurant / Lounge",
  "Airport Transport",
  "Not sure",
];

export default function LostAndFoundPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section className="relative bg-[#f5f2eb] pt-[var(--navbar-height)]">
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(to_right,#111820_1px,transparent_1px),linear-gradient(to_bottom,#111820_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1600px]
            px-5
            pb-20
            pt-12
            sm:px-8
            lg:px-12
            lg:pb-28
            lg:pt-20
            xl:px-16
          "
        >
          <Link
            href="/support"
            className="
              inline-flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#111820]/40
            "
          >
            <ArrowLeft size={13} strokeWidth={1.4} />
            Help Centre
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
            <div
              className="
                flex
                size-12
                items-center
                justify-center
                rounded-full
                border
                border-[#111820]/15
              "
            >
              <Luggage
                size={20}
                strokeWidth={1.3}
                className="text-[#315b78]"
              />
            </div>

            <p className="mt-8 text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
              NOVA / Lost & Found
            </p>

            <h1
              className="
                mt-6
                max-w-[1100px]
                text-[clamp(4.5rem,10vw,10rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Lost something?
              <br />
              Start here.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-6 text-[#111820]/50">
              Tell us what you lost and where you last remember having it.
              The more detail you provide, the easier it is to identify a
              possible match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        className="
          bg-[#111820]
          px-5
          py-14
          text-white
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-px
            bg-white/10
            md:grid-cols-3
          "
        >
          <div className="bg-[#111820] p-7">
            <FileText
              size={18}
              strokeWidth={1.3}
              className="text-[#e8a735]"
            />

            <span className="mt-8 block font-mono text-[8px] text-white/25">
              01
            </span>

            <h2 className="mt-3 text-xl font-medium tracking-[-0.035em]">
              Submit a report
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
              Describe the item and where you last saw it.
            </p>
          </div>

          <div className="bg-[#111820] p-7">
            <Search
              size={18}
              strokeWidth={1.3}
              className="text-[#e8a735]"
            />

            <span className="mt-8 block font-mono text-[8px] text-white/25">
              02
            </span>

            <h2 className="mt-3 text-xl font-medium tracking-[-0.035em]">
              We check for a match
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
              Lost property records are reviewed against your report.
            </p>
          </div>

          <div className="bg-[#111820] p-7">
            <Check
              size={18}
              strokeWidth={1.3}
              className="text-[#e8a735]"
            />

            <span className="mt-8 block font-mono text-[8px] text-white/25">
              03
            </span>

            <h2 className="mt-3 text-xl font-medium tracking-[-0.035em]">
              We contact you
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
              If there is a possible match, passenger support can follow up.
            </p>
          </div>
        </div>
      </section>

      {/* REPORT FORM */}
      <section
        className="
          bg-[#faf9f6]
          px-5
          py-24
          sm:px-8
          lg:px-12
          lg:py-32
          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-14
            lg:grid-cols-[0.55fr_1.45fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              Report / 01
            </span>

            <h2
              className="
                mt-5
                text-[clamp(3rem,5vw,5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Tell us
              <br />
              what happened.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-[#111820]/45">
              This is a frontend demo report flow. No information is sent to
              an actual airport database.
            </p>
          </div>

          <div>
            {submitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  flex
                  min-h-[560px]
                  flex-col
                  justify-between
                  bg-[#e7eff2]
                  p-7
                  sm:p-10
                  lg:p-14
                "
              >
                <div>
                  <div
                    className="
                      flex
                      size-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#315b78]
                      text-white
                    "
                  >
                    <Check size={19} strokeWidth={1.4} />
                  </div>

                  <p className="mt-12 text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
                    Report received
                  </p>

                  <h3
                    className="
                      mt-5
                      max-w-xl
                      text-[clamp(3rem,5vw,5.5rem)]
                      font-medium
                      leading-[0.9]
                      tracking-[-0.06em]
                    "
                  >
                    We&apos;ve got the details.
                  </h3>

                  <p className="mt-7 max-w-lg text-sm leading-6 text-[#111820]/50">
                    In a live system, this report would now be checked against
                    NOVA&apos;s lost property records.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="
                    mt-16
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#111820]/20
                    pt-5
                    text-sm
                  "
                >
                  Submit another report

                  <ArrowRight
                    size={16}
                    strokeWidth={1.4}
                  />
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border-t border-[#111820]/15"
              >
                <div
                  className="
                    grid
                    gap-6
                    border-b
                    border-[#111820]/15
                    py-8
                    md:grid-cols-2
                  "
                >
                  <Field label="First name">
                    <input
                      required
                      type="text"
                      placeholder="Your first name"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Last name">
                    <input
                      required
                      type="text"
                      placeholder="Your last name"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div
                  className="
                    grid
                    gap-6
                    border-b
                    border-[#111820]/15
                    py-8
                    md:grid-cols-2
                  "
                >
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Phone number">
                    <input
                      type="tel"
                      placeholder="+234"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div
                  className="
                    grid
                    gap-6
                    border-b
                    border-[#111820]/15
                    py-8
                    md:grid-cols-2
                  "
                >
                  <Field label="Item category">
                    <select required className={inputClass}>
                      <option value="">
                        Choose a category
                      </option>

                      {itemCategories.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Where did you lose it?">
                    <select required className={inputClass}>
                      <option value="">
                        Select a location
                      </option>

                      {airportLocations.map((location) => (
                        <option
                          key={location}
                          value={location}
                        >
                          {location}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div
                  className="
                    grid
                    gap-6
                    border-b
                    border-[#111820]/15
                    py-8
                    md:grid-cols-2
                  "
                >
                  <Field label="Date lost">
                    <input
                      required
                      type="date"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Flight number">
                    <input
                      type="text"
                      placeholder="e.g. BA075"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div
                  className="
                    border-b
                    border-[#111820]/15
                    py-8
                  "
                >
                  <Field label="Describe the item">
                    <textarea
                      required
                      rows={5}
                      placeholder="Colour, brand, size, distinguishing features..."
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                </div>

                <div className="flex justify-end pt-8">
                  <button
                    type="submit"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-5
                      bg-[#111820]
                      px-6
                      py-4
                      text-sm
                      text-white
                    "
                  >
                    Submit lost item report

                    <Send
                      size={15}
                      strokeWidth={1.4}
                      className="
                        text-[#e8a735]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* INFORMATION */}
      <section className="bg-[#e7eff2]">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-10
            px-5
            py-20
            sm:px-8
            lg:grid-cols-2
            lg:px-12
            lg:py-24
            xl:px-16
          "
        >
          <div className="border-t border-[#111820]/15 pt-6">
            <MapPin
              size={19}
              strokeWidth={1.3}
              className="text-[#315b78]"
            />

            <h2 className="mt-8 text-3xl font-medium tracking-[-0.05em]">
              Lost Property Desk
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#111820]/50">
              Terminal 2 · Arrivals Hall · Passenger Services
            </p>
          </div>

          <div className="border-t border-[#111820]/15 pt-6">
            <Clock3
              size={19}
              strokeWidth={1.3}
              className="text-[#315b78]"
            />

            <h2 className="mt-8 text-3xl font-medium tracking-[-0.05em]">
              Opening hours
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#111820]/50">
              Passenger support is available 24 hours a day for urgent
              enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#315b78] text-white">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-10
            px-5
            py-20
            sm:px-8
            lg:grid-cols-[1.2fr_0.8fr]
            lg:items-end
            lg:px-12
            lg:py-28
            xl:px-16
          "
        >
          <h2
            className="
              text-[clamp(3.8rem,7vw,7rem)]
              font-medium
              leading-[0.85]
              tracking-[-0.07em]
            "
          >
            Still need
            <br />
            help?
          </h2>

          <div className="lg:justify-self-end">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Contact NOVA passenger support for additional help with a lost
              property report.
            </p>

            <Link
              href="/contact"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                border-b
                border-white/30
                pb-2
                text-sm
              "
            >
              Contact NOVA

              <ArrowRight
                size={16}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({
  label,
  children,
}: FieldProps) {
  return (
    <label className="block">
      <span
        className="
          mb-3
          block
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-[#111820]/40
        "
      >
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass = `
  w-full
  border-0
  border-b
  border-[#111820]/20
  bg-transparent
  px-0
  py-3
  text-sm
  text-[#111820]
  outline-none
  transition-colors
  duration-300
  placeholder:text-[#111820]/25
  focus:border-[#315b78]
`;