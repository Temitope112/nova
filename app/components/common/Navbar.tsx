"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const navigationLinks = [
  {
    label: "Flights",
    href: "/flights",
  },
  {
    label: "At the Airport",
    href: "/airport",
  },
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "Plan Your Visit",
    href: "/plan",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-black/10
        bg-[#f5f2eb]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto flex h-[72px] max-w-[1600px]
          items-center justify-between
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="NOVA Airport home"
          className="flex items-center gap-2"
        >
          <span
            className="
              text-sm font-semibold uppercase
              tracking-[0.22em]
              text-[#111820]
            "
          >
            NOVA
          </span>

          <span className="text-xs text-black/40">
            / LOS
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  group relative py-2 text-sm
                  transition-colors duration-300

                  ${
                    isActive
                      ? "text-[#111820]"
                      : "text-[#111820]/55 hover:text-[#111820]"
                  }
                `}
              >
                {link.label}

                <span
                  className={`
                    absolute bottom-0 left-0 h-px
                    bg-[#111820]
                    transition-all duration-300

                    ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/dashboard/journey"
          className="
            group hidden items-center gap-2
            rounded-full bg-white/90
            border border-black/10
            transition-colors duration-300
            hover:bg-white
            px-5 py-3
            text-sm text-black
            transition-transform duration-300
            hover:-translate-y-0.5
            lg:flex
          "
        >
          My Journey

          <ArrowUpRight
            size={16}
            strokeWidth={1.6}
            className="
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          className="
            flex size-10 items-center justify-center
            rounded-full border border-black/10
            text-[#111820]
            transition-colors duration-300
            hover:bg-black/5
            lg:hidden
          "
        >
          {isMenuOpen ? (
            <X size={19} strokeWidth={1.6} />
          ) : (
            <Menu size={19} strokeWidth={1.6} />
          )}
        </button>
      </div>

      <MobileNavigation
        pathname={pathname}
        isOpen={isMenuOpen}
        onNavigate={closeMenu}
      />
    </header>
  );
}

interface MobileNavigationProps {
  pathname: string;
  isOpen: boolean;
  onNavigate: () => void;
}

function MobileNavigation({
  pathname,
  isOpen,
  onNavigate,
}: MobileNavigationProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="mobile-navigation"
      className="
        border-t border-black/10
        bg-[#f5f2eb]
        px-5 pb-6 pt-3
        sm:px-8
        lg:hidden
      "
    >
      <nav
        aria-label="Mobile navigation"
        className="flex flex-col"
      >
        {navigationLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="
                flex items-center justify-between
                border-b border-black/10
                py-4 text-lg
              "
            >
              <span
                className={
                  isActive
                    ? "text-[#111820]"
                    : "text-[#111820]/60"
                }
              >
                {link.label}
              </span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-[#111820]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard/journey"
        onClick={onNavigate}
        className="
          mt-6 flex items-center justify-between
          rounded-full bg-white/90
          border border-black/10
          transition-colors duration-300
          hover:bg-white
          px-5 py-4
          text-sm text-black
        "
      >
        My Journey

        <ArrowUpRight
          size={17}
          strokeWidth={1.6}
        />
      </Link>
    </div>
  );
}