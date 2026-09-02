import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerNavigation = [
  {
    title: "Travel",
    links: [
      {
        label: "Flights",
        href: "/flights",
      },
      {
        label: "My Journey",
        href: "/journey",
      },
      {
        label: "Plan Your Visit",
        href: "/plan",
      },
      {
        label: "Airport Map",
        href: "/airport/map",
      },
    ],
  },
  {
    title: "Airport",
    links: [
      {
        label: "At the Airport",
        href: "/airport",
      },
      {
        label: "Dining",
        href: "/airport/dining",
      },
      {
        label: "Shopping",
        href: "/airport/shopping",
      },
      {
        label: "Lounges",
        href: "/airport/lounges",
      },
    ],
  },
  {
    title: "Discover",
    links: [
      {
        label: "Explore",
        href: "/explore",
      },
      {
        label: "Destinations",
        href: "/explore/destinations",
      },
      {
        label: "Airport Experience",
        href: "/explore/experience",
      },
      {
        label: "Experience",
        href: "/experience",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Help Centre",
        href: "/support",
      },
      {
        label: "Accessibility",
        href: "/accessibility",
      },
      {
        label: "Lost & Found",
        href: "/support/lost-and-found",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111820] text-white">
      <div
        className="
          mx-auto
          max-w-[1600px]

          px-5
          py-14

          sm:px-8
          sm:py-16

          lg:px-12
          lg:py-20

          xl:px-16
        "
      >
        {/* Top */}
        <div
          className="
            grid
            gap-12

            lg:grid-cols-[1.15fr_2fr]
            lg:gap-20
          "
        >
          <FooterIntro />

          <FooterNavigation />
        </div>

        {/* Brand */}
        <div
          className="
            mt-16

            border-t
            border-white/10

            pt-8

            sm:mt-20
          "
        >
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
              <p
                className="
                  text-[clamp(3.8rem,11vw,10rem)]
                  font-medium
                  leading-none
                  tracking-[-0.075em]
                "
              >
                NOVA
              </p>

              <p
                className="
                  mt-3

                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-white/40

                  sm:text-xs
                "
              >
                LOS · 6°31′ N · 3°23′ E
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <SocialLink
                href="/"
                label="Instagram"
                icon={<FaInstagram size={17} />}
              />

              <SocialLink
                href="/"
                label="LinkedIn"
                icon={<FaLinkedinIn size={17} />}
              />
            </div>
          </div>

          {/* Bottom */}
          <div
            className="
              mt-10

              flex
              flex-col
              gap-6

              border-t
              border-white/10

              pt-6

              text-xs
              text-white/40

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* Legal */}
            <div className="flex flex-col gap-4">
              <p>
                © {new Date().getFullYear()} NOVA
                International Airport.
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  gap-x-6
                  gap-y-2
                "
              >
                <Link
                  href="/privacy"
                  className="
                    transition-colors
                    duration-300

                    hover:text-white
                  "
                >
                  Privacy
                </Link>

                <Link
                  href="/terms"
                  className="
                    transition-colors
                    duration-300

                    hover:text-white
                  "
                >
                  Terms
                </Link>

                <Link
                  href="/cookies"
                  className="
                    transition-colors
                    duration-300

                    hover:text-white
                  "
                >
                  Cookies
                </Link>
              </div>
            </div>

            {/* Portfolio Credit */}
            <Link
              href="https://temitope112.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Temitope's portfolio"
              className="
                group

                inline-flex
                w-fit
                items-center
                gap-2

                uppercase
                tracking-[0.18em]

                transition-colors
                duration-300

                hover:text-white
              "
            >
              <span
                className="
                  text-[8px]
                  text-white/30

                  transition-colors
                  duration-300

                  group-hover:text-white/50
                "
              >
                Crafted by
              </span>

              <span
                className="
                  relative

                  text-[9px]
                  font-medium
                  text-white/65

                  transition-colors
                  duration-300

                  group-hover:text-white
                "
              >
                Temitope

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0

                    h-px
                    w-0

                    bg-[#e8a735]

                    transition-all
                    duration-300

                    group-hover:w-full
                  "
                />
              </span>

              <ArrowUpRight
                size={12}
                strokeWidth={1.5}
                className="
                  text-white/30

                  transition-all
                  duration-300

                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:text-[#e8a735]
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIntro() {
  return (
    <div className="max-w-md">
      <p
        className="
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-white/40

          sm:text-xs
        "
      >
        NOVA / International Airport
      </p>

      <h2
        className="
          mt-5
          max-w-sm

          text-3xl
          font-medium
          leading-[1.05]
          tracking-[-0.04em]

          sm:text-4xl
          lg:text-5xl
        "
      >
        Every journey begins somewhere.
      </h2>

      <Link
        href="/flights"
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

          transition-colors
          duration-300

          hover:border-white
        "
      >
        Find your flight

        <ArrowUpRight
          size={16}
          strokeWidth={1.6}
          className="
            transition-transform
            duration-300

            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />
      </Link>
    </div>
  );
}

function FooterNavigation() {
  return (
    <div
      className="
        grid
        grid-cols-2

        gap-x-8
        gap-y-10

        sm:grid-cols-4
      "
    >
      {footerNavigation.map((section) => (
        <div key={section.title}>
          <p
            className="
              mb-5

              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            {section.title}
          </p>

          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-sm
                    text-white/65

                    transition-colors
                    duration-300

                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SocialLink({
  href,
  label,
  icon,
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        flex
        size-10
        items-center
        justify-center

        rounded-full

        border
        border-white/15

        text-white/60

        transition-all
        duration-300

        hover:border-white/40
        hover:text-white
      "
    >
      {icon}
    </Link>
  );
}