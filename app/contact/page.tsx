"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const enquiryTypes = [
  "General enquiry",
  "Flight information",
  "Accessibility assistance",
  "Lost & Found",
  "Airport services",
  "Feedback",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section className="relative bg-[#111820] pt-[var(--navbar-height)] text-white">
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            opacity-[0.05]
            [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1600px]
            px-5
            pb-20
            pt-16
            sm:px-8
            lg:px-12
            lg:pb-28
            lg:pt-24
            xl:px-16
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">
              NOVA / Contact
            </span>

            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/35 sm:block">
              Passenger Support · 24/7
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-20 lg:mt-28"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#e8a735]">
              Talk to NOVA
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
              We&apos;re here
              <br />
              when you need us.
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-6 text-white/45">
              Questions about your journey, assistance or the airport?
              Send us a message and passenger support can point you in the
              right direction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="bg-[#e7eff2]">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-px
            bg-[#111820]/10
            md:grid-cols-3
          "
        >
          <ContactMethod
            icon={Phone}
            eyebrow="Call"
            title="+234 1 555 0660"
            description="Passenger support available 24 hours a day."
          />

          <ContactMethod
            icon={Mail}
            eyebrow="Email"
            title="hello@nova-airport.com"
            description="For general enquiries and passenger support."
          />

          <ContactMethod
            icon={MapPin}
            eyebrow="Visit"
            title="Passenger Services"
            description="Terminal 2 · Arrivals Hall · NOVA International Airport."
          />
        </div>
      </section>

      {/* CONTACT FORM */}
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
              Contact / 01
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
              Send us
              <br />
              a message.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-[#111820]/45">
              Tell us what you need help with and include any flight details
              that could help us understand your enquiry.
            </p>
          </div>

          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    <Check
                      size={19}
                      strokeWidth={1.4}
                    />
                  </div>

                  <p className="mt-12 text-[9px] uppercase tracking-[0.22em] text-[#315b78]">
                    Message received
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
                    Thanks for getting in touch.
                  </h3>

                  <p className="mt-7 max-w-lg text-sm leading-6 text-[#111820]/50">
                    In a live NOVA system, your message would now be routed to
                    the appropriate passenger support team.
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
                  Send another message

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
                  <Field label="Enquiry type">
                    <select
                      required
                      className={inputClass}
                    >
                      <option value="">
                        Select enquiry
                      </option>

                      {enquiryTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>
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
                  <Field label="Your message">
                    <textarea
                      required
                      rows={6}
                      placeholder="How can we help?"
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
                    Send message

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

      {/* RESPONSE */}
      <section className="bg-[#e9e0d2]">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12
            px-5
            py-20
            sm:px-8
            lg:grid-cols-[0.55fr_1.45fr]
            lg:px-12
            lg:py-24
            xl:px-16
          "
        >
          <div>
            <Clock3
              size={22}
              strokeWidth={1.25}
              className="text-[#315b78]"
            />

            <p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              Response times
            </p>
          </div>

          <div>
            <h2
              className="
                max-w-4xl
                text-[clamp(3rem,5vw,5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              Urgent at the airport?
              <br />
              Speak to us in person.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-6 text-[#111820]/50">
              For immediate assistance inside the terminal, visit a passenger
              support point or speak to a NOVA team member rather than waiting
              for an email response.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="bg-[#315b78] text-white">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12
            px-5
            py-20
            sm:px-8
            lg:grid-cols-[1fr_1fr]
            lg:items-end
            lg:px-12
            lg:py-28
            xl:px-16
          "
        >
          <div>
            <MessageCircle
              size={24}
              strokeWidth={1.2}
              className="text-white/40"
            />

            <h2
              className="
                mt-7
                text-[clamp(3.8rem,7vw,7rem)]
                font-medium
                leading-[0.85]
                tracking-[-0.07em]
              "
            >
              Maybe the answer
              <br />
              is already there.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Find answers about flights, baggage, lost property,
              accessibility and airport navigation.
            </p>

            <Link
              href="/support"
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
              Visit Help Centre

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

interface ContactMethodProps {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description: string;
}

function ContactMethod({
  icon: Icon,
  eyebrow,
  title,
  description,
}: ContactMethodProps) {
  return (
    <article className="bg-[#e7eff2] p-7 sm:p-9 lg:p-10">
      <Icon
        size={19}
        strokeWidth={1.3}
        className="text-[#315b78]"
      />

      <span className="mt-10 block text-[8px] uppercase tracking-[0.2em] text-[#111820]/35">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-xl font-medium tracking-[-0.035em] sm:text-2xl">
        {title}
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-6 text-[#111820]/45">
        {description}
      </p>
    </article>
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