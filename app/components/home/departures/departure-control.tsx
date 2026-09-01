"use client";

import { Search } from "lucide-react";

interface DeparturesControlsProps {
  query: string;
  activeTerminal: string;
  onQueryChange: (value: string) => void;
  onTerminalChange: (value: string) => void;
}

const terminals = ["All", "T1", "T2"];

export default function DeparturesControls({
  query,
  activeTerminal,
  onQueryChange,
  onTerminalChange,
}: DeparturesControlsProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-6

        border-y
        border-white/10

        py-5

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div className="flex items-center gap-2">
        {terminals.map((terminal) => {
          const isActive =
            terminal === activeTerminal;

          return (
            <button
              key={terminal}
              type="button"
              onClick={() =>
                onTerminalChange(terminal)
              }
              className={`
                rounded-full
                border

                px-4
                py-2

                text-[9px]
                uppercase
                tracking-[0.18em]

                transition-all
                duration-300

                ${
                  isActive
                    ? "border-white bg-white text-[#111820]"
                    : "border-white/15 text-white/40 hover:border-white/30 hover:text-white"
                }
              `}
            >
              {terminal}
            </button>
          );
        })}
      </div>

      <label
        className="
          flex
          w-full
          items-center
          gap-3

          border-b
          border-white/20

          pb-2

          md:w-[300px]
        "
      >
        <Search
          size={15}
          strokeWidth={1.5}
          className="text-white/30"
        />

        <span className="sr-only">
          Search departures
        </span>

        <input
          type="search"
          value={query}
          onChange={(event) =>
            onQueryChange(event.target.value)
          }
          placeholder="Flight or destination"
          className="
            min-w-0
            flex-1

            bg-transparent

            text-sm
            text-white

            outline-none

            placeholder:text-white/25

            [&::-webkit-search-cancel-button]:hidden
          "
        />
      </label>
    </div>
  );
}