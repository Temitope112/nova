"use client";

import { Search, X } from "lucide-react";

interface FlightSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FlightSearch({
  value,
  onChange,
}: FlightSearchProps) {
  return (
    <div
      className="
        group

        flex
        items-center
        gap-4

        border-b
        border-[#111820]/25

        pb-4

        transition-colors
        duration-300

        focus-within:border-[#111820]
      "
    >
      <Search
        size={20}
        strokeWidth={1.4}
        className="shrink-0 text-[#111820]/35"
      />

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Flight, destination or airline"
        aria-label="Search flights"
        className="
          min-w-0
          flex-1

          bg-transparent

          text-[clamp(1.2rem,2.5vw,2rem)]
          tracking-[-0.035em]

          outline-none

          placeholder:text-[#111820]/25
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear flight search"
          className="
            flex
            size-9
            shrink-0
            items-center
            justify-center

            rounded-full

            bg-[#111820]/5

            transition-colors
            hover:bg-[#111820]/10
          "
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}