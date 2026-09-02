"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const moments = [
  {
    number: "01",
    title: "See the city before you leave it.",
    description:
      "Architecture, food, language and local rhythm are woven into the terminal experience.",
  },
  {
    number: "02",
    title: "Find calm inside the movement.",
    description:
      "Quiet spaces, natural light and considered wayfinding make the airport feel less overwhelming.",
  },
  {
    number: "03",
    title: "Stay curious while you wait.",
    description:
      "Art, retail and cultural touchpoints give passengers something worth noticing before departure.",
  },
];

const highlights = [
  {
    title: "Art at NOVA",
    category: "Culture",
    image: "/art.png",
    description:
      "Rotating installations and visual stories shaped by Lagos and contemporary African creativity.",
  },
  {
    title: "The quiet side",
    category: "Rest",
    image: "/quiet.png",
    description:
      "Soft spaces, daylight and calmer corners designed to help passengers slow down.",
  },
  {
    title: "Taste of Lagos",
    category: "Food",
    image: "/food.png",
    description:
      "Local flavours and modern dining experiences that bring a little of the city into the terminal.",
  },
];

export default function AirportExperiencePage() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 80],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0.35],
  );

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#111820]">
      {/* HERO */}
      <section
        className="
          relative
          min-h-svh
          overflow-hidden
          bg-[#111820]
          pt-[var(--navbar-height)]
          text-white
        "
      >
        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="absolute inset-0"
        >
          <Image
            src="/airport-experience.png"
            alt="NOVA airport experience"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#111820]
              via-[#111820]/30
              to-[#111820]/10
            "
          />
        </motion.div>

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[calc(100svh-var(--navbar-height))]
            max-w-[1600px]
            flex-col
            justify-between
            px-5
            pb-8
            pt-10
            sm:px-8
            sm:pb-10
            lg:px-12
            lg:pb-12
            lg:pt-14
            xl:px-16
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/45
            "
          >
            <span>NOVA / Airport Experience</span>

            <span>LOS · Nigeria</span>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[1200px]"
          >
            <p
              className="
                mb-6
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#e8a735]
              "
            >
              More than transit
            </p>

            <h1
              className="
                text-[clamp(4.5rem,10vw,10rem)]
                font-medium
                leading-[0.8]
                tracking-[-0.08em]
              "
            >
              The airport
              <br />
              becomes part
              <br />
              of the story.
            </h1>
          </motion.div>

          <div
            className="
              flex
              flex-col
              gap-6
              border-t
              border-white/15
              pt-6
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <p className="max-w-md text-sm leading-6 text-white/50">
              Discover the spaces, culture and small moments that make NOVA feel
              like more than somewhere you simply pass through.
            </p>

            <a
              href="#story"
              className="
                group
                inline-flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.2em]
              "
            >
              Enter the experience

              <ArrowDown
                size={14}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-1
                "
              />
            </a>
          </div>
        </div>
      </section>

      {/* STORY INTRO */}
      <section
        id="story"
        className="
          bg-[#f5f2eb]
          px-5
          py-24
          sm:px-8
          lg:px-12
          lg:py-36
          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-12
            lg:grid-cols-[0.55fr_1.45fr]
          "
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
              Experience / 01
            </span>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <h2
              className="
                max-w-[1000px]
                text-[clamp(3rem,6vw,6rem)]
                font-medium
                leading-[0.92]
                tracking-[-0.065em]
              "
            >
              The moments between flights deserve some thought too.
            </h2>

            <p
              className="
                mt-8
                max-w-xl
                text-base
                leading-7
                text-[#111820]/50
              "
            >
              NOVA is designed around the idea that an airport should give you
              more than instructions. It should give you a sense of place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MOMENTS */}
      <section
        className="
          bg-[#faf9f6]
          px-5
          py-20
          sm:px-8
          lg:px-12
          lg:py-28
          xl:px-16
        "
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="border-t border-[#111820]/15">
            {moments.map((moment, index) => (
              <motion.article
                key={moment.number}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                }}
                className="
                  grid
                  gap-6
                  border-b
                  border-[#111820]/15
                  py-10
                  sm:grid-cols-[80px_1fr]
                  lg:grid-cols-[100px_1fr_0.7fr]
                  lg:items-start
                  lg:py-14
                "
              >
                <span className="font-mono text-[9px] text-[#111820]/30">
                  {moment.number}
                </span>

                <h3
                  className="
                    max-w-2xl
                    text-3xl
                    font-medium
                    leading-[0.98]
                    tracking-[-0.05em]
                    lg:text-5xl
                  "
                >
                  {moment.title}
                </h3>

                <p className="max-w-md text-sm leading-6 text-[#111820]/45">
                  {moment.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MOMENT */}
      <section className="bg-[#111820] text-white">
        <div
          className="
            grid
            w-full
            lg:min-h-[820px]
            lg:grid-cols-2
          "
        >
          <div
            className="
              relative
              min-h-[560px]
              w-full
              overflow-hidden
              lg:min-h-[820px]
            "
          >
            <Image
              src="/culture.png"
              alt="Culture inside NOVA"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#111820]/10" />
          </div>

          <div
            className="
              flex
              min-h-[560px]
              flex-col
              justify-between
              px-5
              py-16
              sm:px-8
              lg:min-h-[820px]
              lg:px-12
              lg:py-20
              xl:px-16
            "
          >
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
              Experience / 02
            </span>

            <div className="my-20 lg:my-0">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#e8a735]">
                Culture
              </p>

              <h2
                className="
                  mt-6
                  text-[clamp(3.8rem,7vw,7rem)]
                  font-medium
                  leading-[0.84]
                  tracking-[-0.07em]
                "
              >
                You should know
                <br />
                where you landed.
              </h2>

              <p className="mt-8 max-w-md text-sm leading-6 text-white/45">
                Local stories, materials, design and creative work give the
                terminal a character that belongs to Lagos.
              </p>
            </div>

            <Link
              href="/explore"
              className="
                group
                flex
                items-center
                justify-between
                border-t
                border-white/15
                pt-5
                text-sm
              "
            >
              Explore NOVA

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

      {/* HIGHLIGHTS */}
      <section
        className="
          bg-[#e9e0d2]
          px-5
          py-24
          sm:px-8
          lg:px-12
          lg:py-32
          xl:px-16
        "
      >
        <div className="mx-auto max-w-[1600px]">
          <div
            className="
              flex
              flex-col
              gap-8
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#111820]/35">
                Highlights / 03
              </span>

              <h2
                className="
                  mt-5
                  text-[clamp(3.5rem,7vw,7rem)]
                  font-medium
                  leading-[0.86]
                  tracking-[-0.07em]
                "
              >
                Notice
                <br />
                the details.
              </h2>
            </div>
          </div>

          <div
            className="
              mt-14
              grid
              gap-4
              md:grid-cols-2
              lg:mt-20
              lg:grid-cols-3
            "
          >
            {highlights.map((highlight, index) => (
              <motion.article
                key={highlight.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                }}
                className="group"
              >
                <div
                  className="
                    relative
                    min-h-[500px]
                    overflow-hidden
                  "
                >
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="
                      object-cover
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-[1.04]
                    "
                  />
                </div>

                <div className="border-b border-[#111820]/15 py-6">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#111820]/35">
                    {highlight.category}
                  </span>

                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">
                    {highlight.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#111820]/45">
                    {highlight.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
              Keep exploring
            </span>

            <h2
              className="
                mt-6
                text-[clamp(4rem,8vw,8rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.07em]
              "
            >
              There&apos;s more
              <br />
              beyond the gate.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Discover destinations, airport spaces and the stories that shape
              every journey through NOVA.
            </p>

            <Link
              href="/explore"
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
              Back to Explore

              <ArrowUpRight
                size={16}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}