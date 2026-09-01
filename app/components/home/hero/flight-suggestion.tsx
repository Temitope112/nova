import type { Flight } from "../../../types/flight";

interface FlightSuggestionProps {
  flight: Flight;
}

const statusStyles: Record<Flight["status"], string> = {
  boarding: "text-emerald-700",
  "on-time": "text-[#111820]/45",
  delayed: "text-amber-700",
  "gate-closing": "text-red-700",
};

function getFlightDisplayValue(flight: Flight) {
  if (flight.status === "boarding") {
    return "Boarding";
  }

  if (flight.status === "gate-closing") {
    return "Gate closing";
  }

  if (flight.status === "delayed") {
    return "Delayed";
  }

  return flight.departureTime;
}

export default function FlightSuggestion({
  flight,
}: FlightSuggestionProps) {
  return (
    <button
      type="button"
      className="
        group grid w-full
        grid-cols-[72px_1fr_auto]
        items-center gap-3
        border-b border-[#111820]/10
        py-3.5 text-left

        transition-opacity duration-300
        hover:opacity-55

        sm:grid-cols-[100px_1fr_130px]
        sm:gap-5
        sm:py-4
      "
    >
      <span
        className="
          text-xs font-medium
          tracking-[0.12em]
          sm:text-sm
        "
      >
        {flight.flightNumber}
      </span>

      <div className="flex min-w-0 items-baseline gap-2">
        <span className="truncate text-sm sm:text-base">
          {flight.destination}
        </span>

        <span
          className="
            hidden text-[10px]
            uppercase tracking-[0.16em]
            text-[#111820]/35
            sm:inline
          "
        >
          {flight.airportCode}
        </span>
      </div>

      <span
        className={`
          text-right
          text-[10px] font-medium
          uppercase tracking-[0.12em]
          sm:text-xs

          ${statusStyles[flight.status]}
        `}
      >
        {getFlightDisplayValue(flight)}
      </span>
    </button>
  );
}