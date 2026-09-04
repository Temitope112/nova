"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Plane,
  Radio,
  Users,
} from "lucide-react";

import type { OperationsData, OperationsFlight } from "./types";

export default function OperationsClient({ data }: { data: OperationsData }) {
  const activeFlights = useMemo(
    () =>
      data.flights.filter((flight) =>
        ["scheduled", "check_in", "boarding", "delayed"].includes(
          flight.status,
        ),
      ),
    [data.flights],
  );

  const delayedFlights = useMemo(
    () => data.flights.filter((flight) => flight.status === "delayed"),
    [data.flights],
  );

  const boardingFlights = useMemo(
    () => data.flights.filter((flight) => flight.status === "boarding"),
    [data.flights],
  );

  const activeJourneys = useMemo(
    () => data.journeys.filter((journey) => journey.status === "active"),
    [data.journeys],
  );

  const terminalActivity = useMemo(() => {
    const terminals = new Map<string, number>();

    activeFlights.forEach((flight) => {
      if (!flight.terminal) return;

      terminals.set(flight.terminal, (terminals.get(flight.terminal) ?? 0) + 1);
    });

    return Array.from(terminals.entries())
      .map(([terminal, flights]) => ({
        terminal,
        flights,
      }))
      .sort((a, b) => b.flights - a.flights);
  }, [activeFlights]);

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
              Live Operations
            </p>
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Airport operations
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            A live operational view of flights, passenger journeys, terminals
            and airport movement.
          </p>
        </div>

        <Link
          href="/admin/flights"
          className="group inline-flex items-center gap-2 self-start rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78] hover:!text-white lg:self-auto"
        >
          <span className="!text-white">Manage flights</span>

          <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* OVERVIEW */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active flights"
          value={activeFlights.length}
          icon={Plane}
        />

        <StatCard
          label="Boarding"
          value={boardingFlights.length}
          icon={Radio}
        />

        <StatCard
          label="Delayed"
          value={delayedFlights.length}
          icon={AlertTriangle}
          warning={delayedFlights.length > 0}
        />

        <StatCard
          label="Active journeys"
          value={activeJourneys.length}
          icon={Users}
        />
      </section>

      {/* MAIN GRID */}
      <section className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        {/* FLIGHT MOVEMENT */}
        <div className="overflow-hidden rounded-[28px] bg-[#111820] text-white">
          <div className="flex items-start justify-between border-b border-white/10 p-6 sm:p-7">
            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e8a735]">
                Flight movement
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Current operations
              </h2>
            </div>

            <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-white/60">
              {activeFlights.length} active
            </span>
          </div>

          {activeFlights.length > 0 ? (
            <div>
              {activeFlights.slice(0, 8).map((flight) => (
                <OperationalFlight key={flight.id} flight={flight} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <CheckCircle2 className="h-7 w-7 text-white/30" />

              <p className="mt-4 text-sm font-semibold">
                No active flight movement
              </p>

              <p className="mt-2 text-xs text-white/45">
                There are currently no scheduled, check-in, boarding or delayed
                flights.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* TERMINALS */}
          <div className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                  Terminals
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#111820]">
                  Activity
                </h2>
              </div>

              <MapPin className="h-5 w-5 text-[#315b78]" />
            </div>

            <div className="mt-6 space-y-3">
              {terminalActivity.length > 0 ? (
                terminalActivity.map((terminal) => (
                  <div
                    key={terminal.terminal}
                    className="flex items-center justify-between rounded-[18px] bg-[#f5f2eb] px-4 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#111820]">
                        Terminal {terminal.terminal}
                      </p>

                      <p className="mt-1 text-xs text-[#111820]/45">
                        Active flight movement
                      </p>
                    </div>

                    <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[#315b78]/10 px-3 text-xs font-semibold text-[#315b78]">
                      {terminal.flights}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#111820]/50">
                  No terminal activity.
                </p>
              )}
            </div>
          </div>

          {/* ATTENTION */}
          <div className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e8a735]">
                  Attention
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#111820]">
                  Operational alerts
                </h2>
              </div>

              <AlertTriangle className="h-5 w-5 text-[#e8a735]" />
            </div>

            <div className="mt-6">
              {delayedFlights.length > 0 ? (
                <div className="space-y-3">
                  {delayedFlights.slice(0, 4).map((flight) => (
                    <div
                      key={flight.id}
                      className="rounded-[18px] bg-[#e8a735]/10 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#111820]">
                          {flight.flight_number}
                        </p>

                        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9a6515]">
                          Delayed
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-[#111820]/55">
                        {flight.origin_code} → {flight.destination_code}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[18px] bg-emerald-500/[0.07] p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />

                    <div>
                      <p className="text-sm font-semibold text-[#111820]">
                        No flight delays
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#111820]/50">
                        There are no flights currently marked as delayed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OperationalFlight({ flight }: { flight: OperationsFlight }) {
  const departure = formatDeparture(flight.departure_at);

  return (
    <div className="grid gap-5 border-b border-white/10 px-6 py-5 last:border-b-0 sm:grid-cols-[110px_1fr_110px_100px_110px] sm:items-center sm:px-7">
      <div>
        <p className="text-sm font-semibold">{flight.flight_number}</p>

        <p className="mt-1 text-[10px] text-white/40">{flight.airline_name}</p>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">{flight.origin_code}</span>

          <ArrowRight className="h-4 w-4 text-white/25" />

          <span className="text-lg font-semibold">
            {flight.destination_code}
          </span>
        </div>

        <p className="mt-1 text-[10px] text-white/40">
          {flight.destination_city}
        </p>
      </div>

      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35">
          Departure
        </p>

        <p className="mt-1 text-sm font-semibold">{departure.time}</p>
      </div>

      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35">
          Gate
        </p>

        <p className="mt-1 text-sm font-semibold">{flight.gate ?? "—"}</p>
      </div>

      <FlightStatus status={flight.status} />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  warning = false,
}: {
  label: string;
  value: number;
  icon: typeof Plane;
  warning?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-[#111820]/10 bg-white/70 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-[#111820]/45">
            {label}
          </p>

          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#111820]">
            {value}
          </p>
        </div>

        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            warning ? "bg-[#e8a735]/15" : "bg-[#315b78]/10"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${
              warning ? "text-[#9a6515]" : "text-[#315b78]"
            }`}
          />
        </span>
      </div>
    </div>
  );
}

function FlightStatus({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const styles =
    normalized === "delayed"
      ? "bg-[#e8a735]/15 text-[#f0bf62]"
      : normalized === "boarding"
        ? "bg-[#315b78]/40 text-[#b9d9ee]"
        : normalized === "check_in"
          ? "bg-sky-400/15 text-sky-300"
          : "bg-white/10 text-white/65";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${styles}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatDeparture(value: string) {
  const date = new Date(value);

  return {
    time: new Intl.DateTimeFormat("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
