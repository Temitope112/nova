import {
  Clock3,
  PackageSearch,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/server";

import ReportForm from "./report-form";

type ReportStatus =
  | "submitted"
  | "under_review"
  | "matched"
  | "resolved"
  | "closed";

type LostFoundReport = {
  id: string;
  item_name: string;
  description: string | null;
  location_lost: string | null;
  date_lost: string | null;
  status: ReportStatus;
  created_at: string;
};

const statusLabels: Record<
  ReportStatus,
  string
> = {
  submitted: "Submitted",
  under_review: "Under review",
  matched: "Matched",
  resolved: "Resolved",
  closed: "Closed",
};

export default async function LostAndFoundPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase
    .from("lost_found_reports")
    .select(`
      id,
      item_name,
      description,
      location_lost,
      date_lost,
      status,
      created_at
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Lost and found fetch error:",
      error
    );
  }

  const reports =
    (data ?? []) as LostFoundReport[];

  return (
    <div className="mx-auto max-w-[1200px]">
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
          Assistance
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
          Lost & Found
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#111820]/65">
          Report a lost item and follow its
          progress as our airport team reviews it.
        </p>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <ReportForm />

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#315b78]">
                My reports
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
                Track your items.
              </h2>
            </div>

            <span className="text-xs font-medium text-[#111820]/45">
              {reports.length}
              {reports.length === 1
                ? " report"
                : " reports"}
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-[#111820]/10 bg-white/70 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#315b78]/10">
                <PackageSearch className="h-5 w-5 text-[#315b78]" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#111820]">
                No reports yet.
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#111820]/55">
                Any lost-item report you submit will
                appear here with its current status.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {reports.map((report) => (
                <article
                  key={report.id}
                  className="
                    rounded-[24px]
                    border
                    border-[#111820]/10
                    bg-white/70
                    p-6
                  "
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-lg font-semibold text-[#111820]">
                        {report.item_name}
                      </p>

                      <p className="mt-1 text-xs text-[#111820]/45">
                        Reported{" "}
                        {new Intl.DateTimeFormat(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        ).format(
                          new Date(
                            report.created_at
                          )
                        )}
                      </p>
                    </div>

                    <StatusBadge
                      status={report.status}
                    />
                  </div>

                  {report.description && (
                    <p className="mt-4 text-sm leading-6 text-[#111820]/65">
                      {report.description}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#111820]/10 pt-4 text-xs text-[#111820]/50">
                    {report.location_lost && (
                      <span>
                        Lost at{" "}
                        {report.location_lost}
                      </span>
                    )}

                    {report.date_lost && (
                      <span>
                        Date lost{" "}
                        {new Intl.DateTimeFormat(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        ).format(
                          new Date(
                            `${report.date_lost}T00:00:00`
                          )
                        )}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReportStatus;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.12em]

        ${
          status === "matched"
            ? "bg-[#e8a735]/15 text-[#9a6813]"
            : status === "resolved"
              ? "bg-emerald-500/10 text-emerald-700"
              : status === "under_review"
                ? "bg-[#315b78]/10 text-[#315b78]"
                : "bg-[#111820]/5 text-[#111820]/60"
        }
      `}
    >
      <Clock3 className="h-3 w-3" />

      {statusLabels[status]}
    </span>
  );
}