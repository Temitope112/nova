import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  Map,
  Plane,
  Search,
  Star,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/server";

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

type DashboardJourney = {
  id: string;
  status: string;
  created_at: string;
  flight_id: string;
  flight: Flight;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // --------------------------------------------------
  // FETCH JOURNEY + COUNTS
  // --------------------------------------------------

  const [
    journeyResult,
    savedFlightsResult,
    notificationsResult,
    reportsResult,
  ] = await Promise.all([
    supabase
      .from("journeys")
      .select(`
        id,
        flight_id,
        status,
        created_at
      `)
      .eq("user_id", user.id)
      .in("status", ["upcoming", "active"])
      .not("flight_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),

    supabase
      .from("saved_flights")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id),

    supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("is_read", false),

    supabase
      .from("lost_found_reports")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .in("status", [
        "submitted",
        "under_review",
        "matched",
      ]),
  ]);

  // --------------------------------------------------
  // GET RELATED FLIGHT
  // --------------------------------------------------

  let journey: DashboardJourney | null = null;

  if (journeyResult.error) {
    console.error(
      "Dashboard journey fetch error:",
      journeyResult.error
    );
  }

  if (journeyResult.data?.flight_id) {
    const {
      data: flight,
      error: flightError,
    } = await supabase
      .from("flights")
      .select(`
        id,
        flight_number,
        airline_name,
        airline_code,
        origin_code,
        origin_city,
        destination_code,
        destination_city,
        departure_at,
        arrival_at,
        terminal,
        gate,
        status
      `)
      .eq("id", journeyResult.data.flight_id)
      .maybeSingle();

    if (flightError) {
      console.error(
        "Dashboard flight fetch error:",
        flightError
      );
    }

    if (flight) {
      journey = {
        id: journeyResult.data.id,
        status: journeyResult.data.status,
        created_at: journeyResult.data.created_at,
        flight_id: journeyResult.data.flight_id,
        flight,
      };
    }
  }

  // --------------------------------------------------
  // COUNTS
  // --------------------------------------------------

  const savedFlightsCount =
    savedFlightsResult.count ?? 0;

  const unreadNotifications =
    notificationsResult.count ?? 0;

  const openReports =
    reportsResult.count ?? 0;

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* OVERVIEW INTRO */}

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Overview
          </p>

          <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Your airport experience, in one place.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            Track your journey, save flights, manage
            alerts and access passenger services from
            your NOVA account.
          </p>
        </div>

        <Link
          href="/dashboard/journey"
          className="inline-flex items-center gap-2 self-start rounded-full bg-[#111820] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#315b78] lg:self-auto"
        >
          Open my journey

          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* STATS */}

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          label="Upcoming journey"
          value={
            journey
              ? journey.flight.flight_number
              : "No journey"
          }
          description={
            journey
              ? `${journey.flight.origin_code} → ${journey.flight.destination_code}`
              : "Add a flight to begin"
          }
          icon={Plane}
        />

        <OverviewCard
          label="Saved flights"
          value={String(savedFlightsCount)}
          description="Flights you're watching"
          icon={Star}
        />

        <OverviewCard
          label="Notifications"
          value={String(unreadNotifications)}
          description={
            unreadNotifications === 1
              ? "1 unread update"
              : `${unreadNotifications} unread updates`
          }
          icon={Bell}
        />

        <OverviewCard
          label="Open reports"
          value={String(openReports)}
          description="Lost & Found"
          icon={Search}
        />
      </section>

      {/* MAIN CONTENT */}

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* JOURNEY */}

        <div className="min-h-[340px] rounded-[28px] bg-[#111820] p-7 text-white sm:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e8a735]">
            My journey
          </p>

          {journey ? (
            <div className="mt-14">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-medium text-white/70">
                  {journey.flight.airline_name}
                </p>

                <span className="rounded-full bg-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/70">
                  {journey.flight.status.replaceAll(
                    "_",
                    " "
                  )}
                </span>
              </div>

              <h3 className="mt-2 text-4xl font-semibold text-white">
                {journey.flight.flight_number}
              </h3>

              <div className="mt-8 flex items-center gap-4 text-xl font-medium text-white">
                <span>
                  {journey.flight.origin_code}
                </span>

                <span className="text-white/45">
                  →
                </span>

                <span>
                  {journey.flight.destination_code}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-8 text-sm font-medium text-white/65">
                {journey.flight.terminal && (
                  <span>
                    Terminal{" "}
                    {journey.flight.terminal}
                  </span>
                )}

                {journey.flight.gate && (
                  <span>
                    Gate {journey.flight.gate}
                  </span>
                )}

                <span>
                  {new Intl.DateTimeFormat(
                    "en-NG",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  ).format(
                    new Date(
                      journey.flight.departure_at
                    )
                  )}
                </span>
              </div>

              <Link
                href="/dashboard/journey"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold !text-[#111820] transition hover:bg-[#f5f2eb]"
              >
                View journey
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="flex h-[250px] flex-col items-center justify-center text-center">
              <Map className="h-7 w-7 text-white/50" />

              <h3 className="mt-5 text-2xl font-semibold text-white">
                No active journey yet.
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                Add a flight to start building your
                personalized airport journey.
              </p>

              <Link
                href="/dashboard/journey"
                className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold !text-[#111820] transition hover:bg-[#f5f2eb]"
              >
                Build my journey
              </Link>
            </div>
          )}
        </div>

        {/* QUICK ACCESS */}

        <div className="rounded-[28px] border border-[#111820]/10 bg-white/70 p-7 sm:p-9">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Quick access
          </p>

          <div className="mt-6 space-y-2">
            <QuickLink
              href="/flights"
              label="Find a flight"
            />

            <QuickLink
              href="/airport/map"
              label="Terminal map"
            />

            <QuickLink
              href="/dashboard/saved-flights"
              label="Saved flights"
            />

            <QuickLink
              href="/dashboard/notifications"
              label="Notifications"
            />

            <QuickLink
              href="/dashboard/lost-and-found"
              label="Lost & Found"
            />
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
        <p className="text-xs font-medium text-[#111820]/65">
          {label}
        </p>

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

function QuickLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium !text-[#111820]/80 transition hover:bg-[#111820]/5 hover:!text-[#111820]"
    >
      {label}

      <ArrowUpRight className="h-4 w-4 text-[#111820]/50 transition group-hover:text-[#111820]" />
    </Link>
  );
}