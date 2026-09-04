"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Plane,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import type {
  AdminPassenger,
  PassengerJourney,
} from "./types";

export default function PassengersClient({
  passengers,
}: {
  passengers: AdminPassenger[];
}) {
  const [search, setSearch] =
    useState("");

  const [journeyStatus, setJourneyStatus] =
    useState("all");

  const [
    selectedPassenger,
    setSelectedPassenger,
  ] = useState<AdminPassenger | null>(
    null
  );

  const journeyStatuses = useMemo(() => {
    return Array.from(
      new Set(
        passengers.flatMap((passenger) =>
          passenger.journeys.map(
            (journey) => journey.status
          )
        )
      )
    );
  }, [passengers]);

  const filteredPassengers =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return passengers.filter(
        (passenger) => {
          const name =
            passenger.full_name
              ?.toLowerCase() ?? "";

          const matchesSearch =
            !query ||
            name.includes(query);

          const matchesJourney =
            journeyStatus === "all" ||
            passenger.journeys.some(
              (journey) =>
                journey.status ===
                journeyStatus
            );

          return (
            matchesSearch &&
            matchesJourney
          );
        }
      );
    }, [
      passengers,
      search,
      journeyStatus,
    ]);

  const passengersWithJourneys =
    passengers.filter(
      (passenger) =>
        passenger.journeys.length > 0
    ).length;

  const activeJourneys =
    passengers.reduce(
      (total, passenger) =>
        total +
        passenger.journeys.filter(
          (journey) =>
            journey.status === "active"
        ).length,
      0
    );

  const upcomingJourneys =
    passengers.reduce(
      (total, passenger) =>
        total +
        passenger.journeys.filter(
          (journey) =>
            journey.status === "upcoming"
        ).length,
      0
    );

  return (
    <>
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Passenger Operations
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Passengers
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            View passenger activity,
            journeys and flight context
            across the NOVA airport
            experience.
          </p>
        </div>

        {/* OVERVIEW */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Passengers"
            value={passengers.length}
            icon={Users}
          />

          <StatCard
            label="With journeys"
            value={passengersWithJourneys}
            icon={Plane}
          />

          <StatCard
            label="Active journeys"
            value={activeJourneys}
            icon={MapPin}
          />

          <StatCard
            label="Upcoming journeys"
            value={upcomingJourneys}
            icon={CalendarDays}
          />
        </section>

        {/* FILTERS */}
        <section className="mt-8 rounded-[24px] border border-[#111820]/10 bg-white/70 p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111820]/40" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search passengers"
                className="h-12 w-full rounded-xl border border-[#111820]/10 bg-[#f5f2eb] pl-11 pr-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/40 focus:border-[#315b78]/50"
              />
            </div>

            <select
              value={journeyStatus}
              onChange={(event) =>
                setJourneyStatus(
                  event.target.value
                )
              }
              className="h-12 rounded-xl border border-[#111820]/10 bg-[#f5f2eb] px-4 text-sm font-medium text-[#111820] outline-none focus:border-[#315b78]/50"
            >
              <option value="all">
                All journeys
              </option>

              {journeyStatuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {formatStatus(status)}
                  </option>
                )
              )}
            </select>
          </div>
        </section>

        <div className="mt-6">
          <p className="text-xs font-medium text-[#111820]/55">
            Showing{" "}
            {filteredPassengers.length}{" "}
            of {passengers.length}{" "}
            passengers
          </p>
        </div>

        {/* DESKTOP */}
        <section className="mt-4 hidden overflow-hidden rounded-[24px] border border-[#111820]/10 bg-white/70 lg:block">
          <div className="grid grid-cols-[1.4fr_150px_170px_1fr_60px] border-b border-[#111820]/10 bg-[#111820]/[0.025] px-6 py-4">
            <TableLabel label="Passenger" />
            <TableLabel label="Journeys" />
            <TableLabel label="Current status" />
            <TableLabel label="Flight" />
            <span />
          </div>

          {filteredPassengers.length >
          0 ? (
            filteredPassengers.map(
              (passenger) => (
                <PassengerRow
                  key={passenger.id}
                  passenger={passenger}
                  onSelect={() =>
                    setSelectedPassenger(
                      passenger
                    )
                  }
                />
              )
            )
          ) : (
            <EmptyState />
          )}
        </section>

        {/* MOBILE */}
        <section className="mt-4 space-y-3 lg:hidden">
          {filteredPassengers.length >
          0 ? (
            filteredPassengers.map(
              (passenger) => (
                <PassengerCard
                  key={passenger.id}
                  passenger={passenger}
                  onSelect={() =>
                    setSelectedPassenger(
                      passenger
                    )
                  }
                />
              )
            )
          ) : (
            <div className="rounded-[24px] border border-[#111820]/10 bg-white/70">
              <EmptyState />
            </div>
          )}
        </section>
      </div>

      <PassengerModal
        passenger={selectedPassenger}
        onClose={() =>
          setSelectedPassenger(null)
        }
      />
    </>
  );
}

function PassengerRow({
  passenger,
  onSelect,
}: {
  passenger: AdminPassenger;
  onSelect: () => void;
}) {
  const journey =
    getRelevantJourney(passenger);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group grid w-full grid-cols-[1.4fr_150px_170px_1fr_60px] items-center border-b border-[#111820]/10 px-6 py-5 text-left transition last:border-b-0 hover:bg-[#111820]/[0.025]"
    >
      <PassengerIdentity
        passenger={passenger}
      />

      <p className="text-sm font-semibold text-[#111820]">
        {passenger.journeys.length}
      </p>

      {journey ? (
        <JourneyBadge
          status={journey.status}
        />
      ) : (
        <span className="text-sm text-[#111820]/40">
          No journey
        </span>
      )}

      {journey?.flight ? (
        <div>
          <p className="text-sm font-semibold text-[#111820]">
            {
              journey.flight
                .flight_number
            }
          </p>

          <p className="mt-1 text-xs text-[#111820]/50">
            {
              journey.flight
                .origin_code
            }{" "}
            →{" "}
            {
              journey.flight
                .destination_code
            }
          </p>
        </div>
      ) : (
        <span className="text-sm text-[#111820]/40">
          —
        </span>
      )}

      <div className="flex justify-end">
        <ChevronRight className="h-4 w-4 text-[#111820]/30 transition group-hover:translate-x-1 group-hover:text-[#111820]" />
      </div>
    </button>
  );
}

function PassengerCard({
  passenger,
  onSelect,
}: {
  passenger: AdminPassenger;
  onSelect: () => void;
}) {
  const journey =
    getRelevantJourney(passenger);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-[22px] border border-[#111820]/10 bg-white/70 p-5 text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <PassengerIdentity
          passenger={passenger}
        />

        <ChevronRight className="h-4 w-4 text-[#111820]/30" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#111820]/10 pt-4">
        <MiniMeta
          label="Journeys"
          value={String(
            passenger.journeys.length
          )}
        />

        <div>
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
            Status
          </p>

          <div className="mt-2">
            {journey ? (
              <JourneyBadge
                status={
                  journey.status
                }
              />
            ) : (
              <span className="text-xs text-[#111820]/45">
                No journey
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function PassengerIdentity({
  passenger,
}: {
  passenger: AdminPassenger;
}) {
  const name =
    passenger.full_name?.trim() ||
    "NOVA Passenger";

  const initial =
    name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {passenger.avatar_url ? (
        <img
          src={passenger.avatar_url}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#315b78]/10 text-sm font-semibold text-[#315b78]">
          {initial}
        </span>
      )}

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#111820]">
          {name}
        </p>

        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[#111820]/40">
          Passenger
        </p>
      </div>
    </div>
  );
}

function PassengerModal({
  passenger,
  onClose,
}: {
  passenger: AdminPassenger | null;
  onClose: () => void;
}) {
  if (!passenger) return null;

  const name =
    passenger.full_name?.trim() ||
    "NOVA Passenger";

  const journey =
    getRelevantJourney(passenger);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close passenger"
        onClick={onClose}
        className="absolute inset-0 bg-[#111820]/65 backdrop-blur-[3px]"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[28px] bg-[#f5f2eb] shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#111820]/10 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111820] text-white">
              <UserRound className="h-5 w-5" />
            </span>

            <div>
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
                Passenger
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
                {name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10 transition hover:bg-[#111820]/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <DetailCard
              label="Journeys"
              value={String(
                passenger.journeys.length
              )}
            />

            <DetailCard
              label="Member since"
              value={formatDate(
                passenger.created_at
              )}
            />

            <DetailCard
              label="Journey status"
              value={
                journey
                  ? formatStatus(
                      journey.status
                    )
                  : "None"
              }
            />
          </div>

          <div className="mt-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
              Journey context
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#111820]">
              Current travel
            </h3>

            {journey ? (
              <JourneyPanel
                journey={journey}
              />
            ) : (
              <div className="mt-5 rounded-[22px] border border-[#111820]/10 bg-white/60 p-6">
                <p className="text-sm text-[#111820]/55">
                  This passenger has no
                  journey records yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyPanel({
  journey,
}: {
  journey: PassengerJourney;
}) {
  return (
    <div className="mt-5 rounded-[24px] bg-[#111820] p-6 text-white">
      <div className="flex items-center justify-between gap-4">
        <JourneyBadge
          status={journey.status}
          dark
        />

        <Plane className="h-4 w-4 text-white/40" />
      </div>

      {journey.flight ? (
        <>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-3xl font-semibold">
              {
                journey.flight
                  .origin_code
              }
            </span>

            <ArrowRight className="h-5 w-5 text-white/35" />

            <span className="text-3xl font-semibold">
              {
                journey.flight
                  .destination_code
              }
            </span>
          </div>

          <p className="mt-2 text-sm text-white/55">
            {
              journey.flight
                .flight_number
            }
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            <DarkMeta
              label="Departure"
              value={formatDateTime(
                journey.flight
                  .departure_at
              )}
            />

            <DarkMeta
              label="Terminal"
              value={
                journey.flight
                  .terminal
                  ? `T${journey.flight.terminal}`
                  : "—"
              }
            />

            <DarkMeta
              label="Gate"
              value={
                journey.flight.gate ??
                "—"
              }
            />
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-white/55">
          No flight is attached to this
          journey.
        </p>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
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

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#315b78]/10">
          <Icon className="h-4 w-4 text-[#315b78]" />
        </span>
      </div>
    </div>
  );
}

function JourneyBadge({
  status,
  dark = false,
}: {
  status: string;
  dark?: boolean;
}) {
  const normalized =
    status.toLowerCase();

  const style = dark
    ? "bg-white/10 text-white"
    : normalized === "active"
      ? "bg-[#315b78]/12 text-[#315b78]"
      : normalized === "upcoming"
        ? "bg-[#e8a735]/15 text-[#8a641d]"
        : normalized === "cancelled"
          ? "bg-red-500/10 text-red-600"
          : "bg-emerald-500/10 text-emerald-700";

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${style}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#111820]/10 bg-white/60 p-4">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#111820]">
        {value}
      </p>
    </div>
  );
}

function TableLabel({
  label,
}: {
  label: string;
}) {
  return (
    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#111820]/45">
      {label}
    </p>
  );
}

function MiniMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-[#111820]">
        {value}
      </p>
    </div>
  );
}

function DarkMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-xs font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111820]/5">
        <Users className="h-5 w-5 text-[#315b78]" />
      </span>

      <h3 className="mt-4 text-lg font-semibold text-[#111820]">
        No passengers found
      </h3>

      <p className="mt-2 text-sm text-[#111820]/55">
        Try changing your search or
        journey filter.
      </p>
    </div>
  );
}

function getRelevantJourney(
  passenger: AdminPassenger
) {
  return (
    passenger.journeys.find(
      (journey) =>
        journey.status === "active"
    ) ??
    passenger.journeys.find(
      (journey) =>
        journey.status === "upcoming"
    ) ??
    passenger.journeys[0] ??
    null
  );
}

function formatStatus(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(value));
}

function formatDateTime(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(value));
}