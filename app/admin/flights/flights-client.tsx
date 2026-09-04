"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Filter,
  Plane,
  Plus,
  Search,
} from "lucide-react";

import type { AdminFlight } from "./types";
import AddFlightModal from "./add-flight-modal";

export default function FlightsClient({ flights }: { flights: AdminFlight[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [terminal, setTerminal] = useState("all");
  const [addFlightOpen, setAddFlightOpen] = useState(false);

  const statuses = useMemo(() => {
    return Array.from(
      new Set(flights.map((flight) => flight.status).filter(Boolean)),
    );
  }, [flights]);

  const terminals = useMemo(() => {
    return Array.from(
      new Set(
        flights
          .map((flight) => flight.terminal)
          .filter((value): value is string => Boolean(value)),
      ),
    );
  }, [flights]);

  const filteredFlights = useMemo(() => {
    const query = search.trim().toLowerCase();

    return flights.filter((flight) => {
      const matchesSearch =
        !query ||
        flight.flight_number.toLowerCase().includes(query) ||
        flight.airline_name.toLowerCase().includes(query) ||
        flight.origin_code.toLowerCase().includes(query) ||
        flight.destination_code.toLowerCase().includes(query) ||
        flight.origin_city.toLowerCase().includes(query) ||
        flight.destination_city.toLowerCase().includes(query);

      const matchesStatus = status === "all" || flight.status === status;

      const matchesTerminal =
        terminal === "all" || flight.terminal === terminal;

      return matchesSearch && matchesStatus && matchesTerminal;
    });
  }, [flights, search, status, terminal]);

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Airport Operations
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Flights
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            View, manage and update flight operations across the NOVA airport
            system.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddFlightOpen(true)}
          className="inline-flex items-center gap-2 self-start rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315b78] lg:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add flight
        </button>
      </div>

      {/* CONTROLS */}
      <section className="mt-10 rounded-[24px] border border-[#111820]/10 bg-white/70 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/40" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flight, airline or destination"
              className="h-12 w-full rounded-xl border border-[#111820]/10 bg-[#f5f2eb] pl-11 pr-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/40 focus:border-[#315b78]/50"
            />
          </div>

          {/* STATUS */}
          <div className="relative min-w-[180px]">
            <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/40" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#111820]/10 bg-[#f5f2eb] pl-11 pr-8 text-sm font-medium text-[#111820] outline-none transition focus:border-[#315b78]/50"
            >
              <option value="all">All statuses</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {formatStatus(item)}
                </option>
              ))}
            </select>
          </div>

          {/* TERMINAL */}
          <select
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
            className="h-12 min-w-[160px] rounded-xl border border-[#111820]/10 bg-[#f5f2eb] px-4 text-sm font-medium text-[#111820] outline-none transition focus:border-[#315b78]/50"
          >
            <option value="all">All terminals</option>

            {terminals.map((item) => (
              <option key={item} value={item}>
                Terminal {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* META */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs font-medium text-[#111820]/55">
          Showing {filteredFlights.length} of {flights.length} flights
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <section className="mt-4 hidden overflow-hidden rounded-[24px] border border-[#111820]/10 bg-white/70 lg:block">
        <div className="grid grid-cols-[120px_1.35fr_1fr_110px_130px_130px_60px] border-b border-[#111820]/10 bg-[#111820]/[0.025] px-6 py-4">
          <TableLabel label="Flight" />
          <TableLabel label="Route" />
          <TableLabel label="Departure" />
          <TableLabel label="Terminal" />
          <TableLabel label="Gate" />
          <TableLabel label="Status" />
          <span />
        </div>

        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <FlightRow key={flight.id} flight={flight} />
          ))
        ) : (
          <EmptyState />
        )}
      </section>

      {/* MOBILE */}
      <section className="mt-4 space-y-3 lg:hidden">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        ) : (
          <div className="rounded-[24px] border border-[#111820]/10 bg-white/70">
            <EmptyState />
          </div>
        )}
      </section>

      <AddFlightModal
        open={addFlightOpen}
        onClose={() => setAddFlightOpen(false)}
      />
    </div>
  );
}

function FlightRow({ flight }: { flight: AdminFlight }) {
  const departure = formatDeparture(flight.departure_at);

  return (
    <button
      type="button"
      className="group grid w-full grid-cols-[120px_1.35fr_1fr_110px_130px_130px_60px] items-center border-b border-[#111820]/10 px-6 py-5 text-left transition last:border-b-0 hover:bg-[#111820]/[0.025]"
    >
      <div>
        <p className="text-sm font-semibold text-[#111820]">
          {flight.flight_number}
        </p>

        {flight.airline_code && (
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#111820]/45">
            {flight.airline_code}
          </p>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-[#111820]">
          {flight.origin_code}

          <span className="mx-2 text-[#111820]/30">→</span>

          {flight.destination_code}
        </p>

        <p className="mt-1 text-xs text-[#111820]/50">
          {flight.origin_city} → {flight.destination_city}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#111820]">{departure.time}</p>

        <p className="mt-1 text-xs text-[#111820]/50">{departure.date}</p>
      </div>

      <p className="text-sm font-medium text-[#111820]/70">
        {flight.terminal ? `T${flight.terminal}` : "—"}
      </p>

      <p className="text-sm font-medium text-[#111820]/70">
        {flight.gate ?? "—"}
      </p>

      <StatusBadge status={flight.status} />

      <div className="flex justify-end">
        <ChevronRight className="h-4 w-4 text-[#111820]/30 transition group-hover:translate-x-1 group-hover:text-[#111820]" />
      </div>
    </button>
  );
}

function FlightCard({ flight }: { flight: AdminFlight }) {
  const departure = formatDeparture(flight.departure_at);

  return (
    <button
      type="button"
      className="w-full rounded-[22px] border border-[#111820]/10 bg-white/70 p-5 text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#111820]">
            {flight.flight_number}
          </p>

          <p className="mt-1 text-xs text-[#111820]/50">
            {flight.airline_name}
          </p>
        </div>

        <StatusBadge status={flight.status} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-xl font-semibold text-[#111820]">
          {flight.origin_code}
        </span>

        <ArrowUpRight className="h-4 w-4 rotate-45 text-[#111820]/35" />

        <span className="text-xl font-semibold text-[#111820]">
          {flight.destination_code}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[#111820]/10 pt-4">
        <MiniMeta label="Departure" value={departure.time} />

        <MiniMeta
          label="Terminal"
          value={flight.terminal ? `T${flight.terminal}` : "—"}
        />

        <MiniMeta label="Gate" value={flight.gate ?? "—"} />
      </div>
    </button>
  );
}

function TableLabel({ label }: { label: string }) {
  return (
    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#111820]/45">
      {label}
    </p>
  );
}

function MiniMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-[#111820]">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const className =
    normalized === "delayed"
      ? "bg-[#e8a735]/15 text-[#9a6515]"
      : normalized === "boarding"
        ? "bg-[#315b78]/12 text-[#315b78]"
        : normalized === "cancelled"
          ? "bg-red-500/10 text-red-600"
          : normalized === "departed"
            ? "bg-[#111820]/10 text-[#111820]/65"
            : "bg-emerald-500/10 text-emerald-700";

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${className}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111820]/5">
        <Plane className="h-5 w-5 text-[#315b78]" />
      </span>

      <h3 className="mt-4 text-lg font-semibold text-[#111820]">
        No flights found
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#111820]/55">
        Try changing your search or filters.
      </p>
    </div>
  );
}

function formatDeparture(value: string) {
  const date = new Date(value);

  return {
    time: new Intl.DateTimeFormat("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),

    date: new Intl.DateTimeFormat("en-NG", {
      day: "2-digit",
      month: "short",
    }).format(date),
  };
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
