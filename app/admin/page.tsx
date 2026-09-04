import Link from "next/link";
import { ArrowUpRight, Bell, Clock3, Plane, Search } from "lucide-react";

import { createClient } from "@/app/lib/supabase/server";

type Flight = {
  id: string;
  flight_number: string;
  airline_name: string;
  origin_code: string;
  origin_city: string;
  destination_code: string;
  destination_city: string;
  departure_at: string;
  terminal: string | null;
  gate: string | null;
  status: string;
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    flightsCountResult,
    delayedFlightsResult,
    reportsResult,
    notificationsResult,
    recentFlightsResult,
  ] = await Promise.all([
    supabase.from("flights").select("*", {
      count: "exact",
      head: true,
    }),

    supabase
      .from("flights")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "delayed"),

    supabase
      .from("lost_found_reports")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("status", ["submitted", "under_review", "matched"]),

    supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("is_read", false),

    supabase
      .from("flights")
      .select(
        `
        id,
        flight_number,
        airline_name,
        origin_code,
        origin_city,
        destination_code,
        destination_city,
        departure_at,
        terminal,
        gate,
        status
      `,
      )
      .order("departure_at", {
        ascending: true,
      })
      .limit(5),
  ]);

  if (flightsCountResult.error) {
    console.error("Admin flights count error:", flightsCountResult.error);
  }

  if (delayedFlightsResult.error) {
    console.error("Admin delayed flights error:", delayedFlightsResult.error);
  }

  if (reportsResult.error) {
    console.error("Admin reports count error:", reportsResult.error);
  }

  if (notificationsResult.error) {
    console.error(
      "Admin notifications count error:",
      notificationsResult.error,
    );
  }

  if (recentFlightsResult.error) {
    console.error("Admin flights fetch error:", recentFlightsResult.error);
  }

  const totalFlights = flightsCountResult.count ?? 0;

  const delayedFlights = delayedFlightsResult.count ?? 0;

  const openReports = reportsResult.count ?? 0;

  const unreadNotifications = notificationsResult.count ?? 0;

  const flights = (recentFlightsResult.data as Flight[] | null) ?? [];

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* OVERVIEW INTRO */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Operations Overview
          </p>

          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Airport operations, in one place.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#111820]/70">
            Monitor flights, service requests and operational activity across
            the NOVA airport environment.
          </p>
        </div>

        <Link
          href="/admin/flights"
          className="inline-flex items-center gap-2 self-start rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78] lg:self-auto"
        >
          Manage flights
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* STATS */}
      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label="Scheduled flights"
          value={String(totalFlights)}
          description="Flights in the system"
          icon={Plane}
        />

        <OverviewCard
          label="Delayed flights"
          value={String(delayedFlights)}
          description={
            delayedFlights === 1
              ? "1 flight needs attention"
              : `${delayedFlights} flights need attention`
          }
          icon={Clock3}
        />

        <OverviewCard
          label="Open reports"
          value={String(openReports)}
          description="Lost & Found cases"
          icon={Search}
        />

        <OverviewCard
          label="Unread alerts"
          value={String(unreadNotifications)}
          description="Passenger notifications"
          icon={Bell}
        />
      </section>

      {/* MAIN CONTENT */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* FLIGHT OPERATIONS */}
        <div className="rounded-[28px] bg-[#111820] p-7 text-white sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8a735]">
                Flight operations
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Upcoming flights
              </h2>
            </div>

            <Link
              href="/admin/flights"
              className="group hidden items-center gap-2 text-xs font-semibold !text-white/70 transition hover:!text-white sm:flex"
            >
              View all
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {flights.length > 0 ? (
            <div className="mt-8">
              {flights.map((flight) => (
                <FlightRow key={flight.id} flight={flight} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <Plane className="h-7 w-7 text-white/40" />

              <h3 className="mt-5 text-xl font-semibold text-white">
                No flights available.
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">
                Flight operations will appear here once records are available.
              </p>
            </div>
          )}
        </div>

        {/* QUICK ACCESS */}
        <div className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-7 sm:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Operations
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
            Quick access
          </h2>

          <div className="mt-6 space-y-2">
            <QuickLink href="/admin/flights" label="Manage flights" />

            <QuickLink href="/admin/passengers" label="Passenger records" />

            <QuickLink
              href="/admin/lost-and-found"
              label="Lost & Found reports"
            />

            <QuickLink href="/admin/notifications" label="Notifications" />

            <QuickLink href="/admin/operations" label="Airport operations" />
          </div>

          {/* SYSTEM STATUS */}
          <div className="mt-8 border-t border-[#111820]/10 pt-7">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111820]/45">
              System status
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-30" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <div>
                <p className="text-sm font-semibold text-[#111820]">
                  Operational
                </p>

                <p className="mt-1 text-xs text-[#111820]/50">
                  NOVA services are online
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OverviewCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-[24px] border border-[#111820]/10 bg-white/70 p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[#111820]/65">{label}</p>

        <Icon className="h-4 w-4 text-[#315b78]" />
      </div>

      <p className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-[#111820]">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-[#111820]/55">
        {description}
      </p>
    </div>
  );
}

function FlightRow({ flight }: { flight: Flight }) {
  const departureTime = new Intl.DateTimeFormat("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(flight.departure_at));

  const normalizedStatus = flight.status.replaceAll("_", " ").toLowerCase();

  return (
    <div className="grid gap-4 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[90px_1fr_auto] sm:items-center">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45">
          Flight
        </p>

        <p className="mt-1 text-sm font-semibold text-white">
          {flight.flight_number}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-white">
          {flight.origin_code}
          <span className="mx-2 text-white/35">→</span>
          {flight.destination_code}
        </p>

        <p className="mt-1 text-xs text-white/45">
          {flight.airline_name}
          {flight.terminal ? ` · Terminal ${flight.terminal}` : ""}
          {flight.gate ? ` · Gate ${flight.gate}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-4 sm:justify-end">
        <p className="font-mono text-xs font-semibold text-white">
          {departureTime}
        </p>

        <StatusBadge status={normalizedStatus} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "delayed"
      ? "bg-[#e8a735]/15 text-[#e8a735]"
      : status === "boarding"
        ? "bg-[#315b78] text-white"
        : status === "cancelled"
          ? "bg-red-500/15 text-red-300"
          : "bg-white/10 text-white/65";

  return (
    <span
      className={`rounded-full px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${statusClass}`}
    >
      {status}
    </span>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium !text-[#111820]/80 transition hover:bg-[#111820]/5 hover:!text-[#111820]"
    >
      {label}

      <ArrowUpRight className="h-4 w-4 text-[#111820]/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#111820]" />
    </Link>
  );
}
