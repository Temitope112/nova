import type { TerminalFilter } from "./flights-page";

interface FlightFiltersProps {
  terminal: TerminalFilter;
  onTerminalChange: (
    terminal: TerminalFilter,
  ) => void;
  resultCount: number;
}

const terminalFilters: {
  label: string;
  value: TerminalFilter;
}[] = [
  {
    label: "All terminals",
    value: "all",
  },
  {
    label: "Terminal 1",
    value: "T1",
  },
  {
    label: "Terminal 2",
    value: "T2",
  },
];

export default function FlightFilters({
  terminal,
  onTerminalChange,
  resultCount,
}: FlightFiltersProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-5

        py-6

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex flex-wrap gap-2">
        {terminalFilters.map((filter) => {
          const active =
            terminal === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                onTerminalChange(filter.value)
              }
              className={`
                border

                px-4
                py-2

                text-[9px]
                uppercase
                tracking-[0.16em]

                transition-colors
                duration-300

                ${
                  active
                    ? "border-[#111820] bg-[#111820] text-white"
                    : "border-[#111820]/15 text-[#111820]/50 hover:border-[#111820]/40 hover:text-[#111820]"
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <span
        className="
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-[#111820]/35
        "
      >
        {resultCount} flights
      </span>
    </div>
  );
}