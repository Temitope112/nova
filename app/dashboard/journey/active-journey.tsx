import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Plane,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { removeJourney } from "./actions";

type Flight = {
  id: string;
  flight_number: string;
  airline_name: string;
  airline_code: string | null;
  origin_code: string;
  origin_city: string;
  destination_code: string;
  destination_city: string;
  departure_at: string;
  arrival_at: string | null;
  terminal: string | null;
  gate: string | null;
  status: string;
};

type Journey = {
  id: string;
  status: string;
  created_at: string;
  flight: Flight;
};

type ActiveJourneyProps = {
  journey: Journey;
};

export default function ActiveJourney({
  journey,
}: ActiveJourneyProps) {
  const { flight } = journey;

  const departureDate = new Date(flight.departure_at);

  const formattedDate = new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(departureDate);

  const formattedTime = new Intl.DateTimeFormat("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(departureDate);

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            My Journey
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Your journey is in motion.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            Follow your flight, terminal and gate information from one place.
          </p>
        </div>

        <span className="inline-flex self-start rounded-full bg-[#111820] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white lg:self-auto">
          {flight.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* MAIN FLIGHT CARD */}
      <section className="mt-10 overflow-hidden rounded-[32px] bg-[#111820] text-white">
        <div className="border-b border-white/10 px-7 py-6 sm:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-white/65">
                {flight.airline_name}
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white">
                {flight.flight_number}
              </h2>
            </div>

            <div className="sm:text-right">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                Departure
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {formattedDate}
              </p>

              <p className="mt-1 text-sm text-white/70">
                {formattedTime}
              </p>
            </div>
          </div>
        </div>

        <div className="px-7 py-10 sm:px-10 sm:py-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <p className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {flight.origin_code}
              </p>

              <p className="mt-3 text-sm font-medium text-white/70">
                {flight.origin_city}
              </p>
            </div>

            <div className="flex items-center md:w-[240px]">
              <div className="h-px flex-1 bg-white/20" />

              <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <Plane className="h-4 w-4 rotate-90 text-[#e8a735]" />
              </div>

              <div className="h-px flex-1 bg-white/20" />
            </div>

            <div className="md:text-right">
              <p className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {flight.destination_code}
              </p>

              <p className="mt-3 text-sm font-medium text-white/70">
                {flight.destination_city}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY DETAILS */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <JourneyDetail
          label="Terminal"
          value={flight.terminal ?? "TBA"}
          icon={Navigation}
        />

        <JourneyDetail
          label="Gate"
          value={flight.gate ?? "TBA"}
          icon={MapPin}
        />

        <JourneyDetail
          label="Departure"
          value={formattedTime}
          icon={Clock3}
        />

        <JourneyDetail
          label="Travel date"
          value={formattedDate}
          icon={CalendarDays}
        />
      </section>

      {/* NEXT ACTION + STATUS */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-7 sm:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Next action
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-[#111820]">
            {getNextActionTitle(flight.status)}
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#111820]/70">
            {getNextActionDescription(
              flight.status,
              flight.terminal,
              flight.gate
            )}
          </p>

          <Link
            href="/airport/map"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78]"
          >
            Open terminal map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[28px] bg-[#e9e0d2] p-7 sm:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Journey status
          </p>

          <p className="mt-5 text-3xl font-semibold capitalize tracking-[-0.03em] text-[#111820]">
            {journey.status}
          </p>

          <p className="mt-3 text-sm leading-6 text-[#111820]/70">
            NOVA keeps this journey connected to the latest flight
            information.
          </p>

          {/* JOURNEY CONTROLS */}
          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/dashboard/journey?change=true"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111820]/15 bg-white/40 px-5 py-3 text-sm font-semibold !text-[#111820] transition hover:border-[#315b78] hover:bg-white/70 hover:!text-[#315b78]"
            >
              <RefreshCw className="h-4 w-4" />
              Change journey
            </Link>

            <form action={removeJourney.bind(null, journey.id)}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Remove journey
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function JourneyDetail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-[24px] border border-[#111820]/10 bg-white/70 p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#111820]/65">
          {label}
        </p>

        <Icon className="h-4 w-4 text-[#315b78]" />
      </div>

      <p className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
        {value}
      </p>
    </div>
  );
}

function getNextActionTitle(status: string) {
  switch (status) {
    case "check_in":
      return "Check-in is open.";

    case "boarding":
      return "Head towards your gate.";

    case "delayed":
      return "Your flight has been delayed.";

    case "cancelled":
      return "Your flight has been cancelled.";

    case "departed":
      return "Your flight has departed.";

    case "arrived":
      return "You’ve arrived.";

    default:
      return "Prepare for your journey.";
  }
}

function getNextActionDescription(
  status: string,
  terminal: string | null,
  gate: string | null
) {
  switch (status) {
    case "check_in":
      return `Proceed to ${
        terminal ? `Terminal ${terminal}` : "your departure terminal"
      } and complete check-in before heading through security.`;

    case "boarding":
      return `Boarding is underway${
        gate ? ` at Gate ${gate}` : ""
      }. Make your way to the gate and keep your travel documents ready.`;

    case "delayed":
      return "Stay close to NOVA for updated timing, gate information and further flight notices.";

    case "cancelled":
      return "Check with your airline for rebooking or additional assistance.";

    case "departed":
      return "This journey is now in flight. NOVA will continue showing relevant status information.";

    case "arrived":
      return "Your flight has arrived. Follow airport signage for baggage claim and onward travel.";

    default:
      return `Your flight is scheduled${
        terminal ? ` from Terminal ${terminal}` : ""
      }${gate ? `, Gate ${gate}` : ""}. Keep checking NOVA as your departure approaches.`;
  }
}