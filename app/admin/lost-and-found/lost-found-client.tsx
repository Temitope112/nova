"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Loader2,
  MapPin,
  PackageSearch,
  Search,
  UserRound,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { createClient } from "@/app/lib/supabase/client";

import {
  REPORT_STATUSES,
  type ReportStatus,
} from "./constants";

import type {
  LostFoundReport,
} from "./types";

export default function LostFoundClient({
  reports,
}: {
  reports: LostFoundReport[];
}) {
  const router = useRouter();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [
    selectedReport,
    setSelectedReport,
  ] = useState<LostFoundReport | null>(
    null
  );

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);

  const [
    updateError,
    setUpdateError,
  ] = useState("");

  const filteredReports = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return reports.filter((report) => {
      const passengerName =
        report.passenger?.full_name
          ?.toLowerCase() ?? "";

      const matchesSearch =
        !query ||
        report.item_name
          .toLowerCase()
          .includes(query) ||
        report.location_lost
          ?.toLowerCase()
          .includes(query) ||
        passengerName.includes(query);

      const matchesStatus =
        status === "all" ||
        report.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    reports,
    search,
    status,
  ]);

  const submitted =
    reports.filter(
      (report) =>
        report.status ===
        "submitted"
    ).length;

  const underReview =
    reports.filter(
      (report) =>
        report.status ===
        "under_review"
    ).length;

  const matched =
    reports.filter(
      (report) =>
        report.status ===
        "matched"
    ).length;

  const resolved =
    reports.filter(
      (report) =>
        report.status ===
        "resolved"
    ).length;

  const handleStatusChange =
    async (
      nextStatus: ReportStatus
    ) => {
      if (!selectedReport) return;

      setUpdatingStatus(true);
      setUpdateError("");

      const supabase =
        createClient();

      const { error } = await supabase
        .from(
          "lost_found_reports"
        )
        .update({
          status: nextStatus,
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          selectedReport.id
        );

      if (error) {
        console.error(
          "Lost & found update error:",
          error
        );

        setUpdateError(
          error.message
        );

        setUpdatingStatus(false);
        return;
      }

      setSelectedReport(
        (current) =>
          current
            ? {
                ...current,
                status:
                  nextStatus,
              }
            : null
      );

      router.refresh();

      setUpdatingStatus(false);
    };

  return (
    <>
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#315b78]">
            Passenger Assistance
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#111820] sm:text-5xl">
            Lost & Found
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#111820]/70">
            Review reported items,
            investigate passenger cases
            and track recovery progress.
          </p>
        </div>

        {/* STATS */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Submitted"
            value={submitted}
            icon={PackageSearch}
          />

          <StatCard
            label="Under review"
            value={underReview}
            icon={Clock3}
          />

          <StatCard
            label="Matched"
            value={matched}
            icon={AlertCircle}
          />

          <StatCard
            label="Resolved"
            value={resolved}
            icon={CheckCircle2}
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
                placeholder="Search item, passenger or location"
                className="h-12 w-full rounded-xl border border-[#111820]/10 bg-[#f5f2eb] pl-11 pr-4 text-sm text-[#111820] outline-none transition placeholder:text-[#111820]/40 focus:border-[#315b78]/50"
              />
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
              className="h-12 rounded-xl border border-[#111820]/10 bg-[#f5f2eb] px-4 text-sm font-medium text-[#111820] outline-none focus:border-[#315b78]/50"
            >
              <option value="all">
                All statuses
              </option>

              {REPORT_STATUSES.map(
                (reportStatus) => (
                  <option
                    key={
                      reportStatus
                    }
                    value={
                      reportStatus
                    }
                  >
                    {formatStatus(
                      reportStatus
                    )}
                  </option>
                )
              )}
            </select>
          </div>
        </section>

        <p className="mt-6 text-xs font-medium text-[#111820]/50">
          Showing{" "}
          {filteredReports.length}{" "}
          of {reports.length} reports
        </p>

        {/* DESKTOP */}
        <section className="mt-4 hidden overflow-hidden rounded-[24px] border border-[#111820]/10 bg-white/70 lg:block">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_150px_60px] border-b border-[#111820]/10 bg-[#111820]/[0.025] px-6 py-4">
            <TableLabel label="Item" />
            <TableLabel label="Passenger" />
            <TableLabel label="Location" />
            <TableLabel label="Status" />
            <span />
          </div>

          {filteredReports.length >
          0 ? (
            filteredReports.map(
              (report) => (
                <ReportRow
                  key={report.id}
                  report={report}
                  onSelect={() =>
                    setSelectedReport(
                      report
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
          {filteredReports.length >
          0 ? (
            filteredReports.map(
              (report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onSelect={() =>
                    setSelectedReport(
                      report
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

      <ReportModal
        report={selectedReport}
        loading={updatingStatus}
        error={updateError}
        onClose={() => {
          if (
            updatingStatus
          )
            return;

          setSelectedReport(
            null
          );

          setUpdateError("");
        }}
        onStatusChange={
          handleStatusChange
        }
      />
    </>
  );
}

function ReportRow({
  report,
  onSelect,
}: {
  report: LostFoundReport;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group grid w-full grid-cols-[1.4fr_1fr_1fr_150px_60px] items-center border-b border-[#111820]/10 px-6 py-5 text-left transition last:border-b-0 hover:bg-[#111820]/[0.025]"
    >
      <div>
        <p className="text-sm font-semibold text-[#111820]">
          {report.item_name}
        </p>

        <p className="mt-1 text-xs text-[#111820]/45">
          {formatDate(
            report.created_at
          )}
        </p>
      </div>

      <p className="text-sm text-[#111820]/70">
        {report.passenger
          ?.full_name ??
          "Unknown passenger"}
      </p>

      <div className="flex items-center gap-2 text-sm text-[#111820]/60">
        <MapPin className="h-3.5 w-3.5" />

        <span>
          {report.location_lost ??
            "Not provided"}
        </span>
      </div>

      <ReportStatusBadge
        status={report.status}
      />

      <div className="flex justify-end">
        <ChevronRight className="h-4 w-4 text-[#111820]/30 transition group-hover:translate-x-1 group-hover:text-[#111820]" />
      </div>
    </button>
  );
}

function ReportCard({
  report,
  onSelect,
}: {
  report: LostFoundReport;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-[22px] border border-[#111820]/10 bg-white/70 p-5 text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-[#111820]">
            {report.item_name}
          </p>

          <p className="mt-1 text-xs text-[#111820]/45">
            {report.passenger
              ?.full_name ??
              "Unknown passenger"}
          </p>
        </div>

        <ChevronRight className="h-4 w-4 text-[#111820]/30" />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#111820]/10 pt-4">
        <div>
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
            Location
          </p>

          <p className="mt-1 text-xs font-semibold text-[#111820]">
            {report.location_lost ??
              "Not provided"}
          </p>
        </div>

        <ReportStatusBadge
          status={report.status}
        />
      </div>
    </button>
  );
}

function ReportModal({
  report,
  loading,
  error,
  onClose,
  onStatusChange,
}: {
  report:
    | LostFoundReport
    | null;

  loading: boolean;

  error: string;

  onClose: () => void;

  onStatusChange: (
    status: ReportStatus
  ) => void;
}) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close report"
        onClick={onClose}
        className="absolute inset-0 bg-[#111820]/65 backdrop-blur-[3px]"
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-[760px] overflow-y-auto rounded-[28px] bg-[#f5f2eb] shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#111820]/10 bg-[#f5f2eb]/95 p-6 backdrop-blur-xl sm:p-8">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#315b78]">
              Lost & Found Report
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111820]">
              {report.item_name}
            </h2>

            <div className="mt-3">
              <ReportStatusBadge
                status={
                  report.status
                }
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111820]/10 transition hover:bg-[#111820]/5 disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* DETAILS */}
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailCard
              icon={UserRound}
              label="Passenger"
              value={
                report.passenger
                  ?.full_name ??
                "Unknown passenger"
              }
            />

            <DetailCard
              icon={MapPin}
              label="Location lost"
              value={
                report.location_lost ??
                "Not provided"
              }
            />

            <DetailCard
              icon={CalendarDays}
              label="Date lost"
              value={
                report.date_lost
                  ? formatDateOnly(
                      report.date_lost
                    )
                  : "Not provided"
              }
            />

            <DetailCard
              icon={Clock3}
              label="Reported"
              value={formatDateTime(
                report.created_at
              )}
            />
          </div>

          {/* DESCRIPTION */}
          <section className="mt-8">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#315b78]">
              Description
            </p>

            <div className="mt-3 rounded-[20px] border border-[#111820]/10 bg-white/65 p-5">
              <p className="text-sm leading-7 text-[#111820]/70">
                {report.description ??
                  "No description was provided for this item."}
              </p>
            </div>
          </section>

          {/* STATUS CONTROL */}
          <section className="mt-8 border-t border-[#111820]/10 pt-7">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#315b78]">
              Case management
            </p>

            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[#111820]">
              Update report status
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#111820]/55">
              Move this case through
              the Lost & Found recovery
              workflow.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {REPORT_STATUSES.map(
                (status) => {
                  const active =
                    status ===
                    report.status;

                  return (
                    <button
                      key={status}
                      type="button"
                      disabled={
                        loading ||
                        active
                      }
                      onClick={() =>
                        onStatusChange(
                          status
                        )
                      }
                      className={`flex items-center justify-between rounded-[16px] border px-4 py-3 text-left text-sm font-semibold transition ${
                        active
                          ? "border-[#315b78]/20 bg-[#315b78]/10 text-[#315b78]"
                          : "border-[#111820]/10 bg-white/60 text-[#111820] hover:bg-white"
                      } disabled:cursor-not-allowed`}
                    >
                      <span>
                        {formatStatus(
                          status
                        )}
                      </span>

                      {loading &&
                      !active ? (
                        <Loader2 className="h-4 w-4 animate-spin text-[#111820]/35" />
                      ) : active ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-[#111820]/25" />
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.07] px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
          </section>
        </div>
      </div>
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
  icon: typeof PackageSearch;
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

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#111820]/10 bg-white/60 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[#315b78]" />

        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-[#111820]/40">
          {label}
        </p>
      </div>

      <p className="mt-3 text-sm font-semibold text-[#111820]">
        {value}
      </p>
    </div>
  );
}

function ReportStatusBadge({
  status,
}: {
  status: ReportStatus;
}) {
  const styles =
    status === "submitted"
      ? "bg-[#e8a735]/15 text-[#8a641d]"
      : status ===
          "under_review"
        ? "bg-[#315b78]/12 text-[#315b78]"
        : status === "matched"
          ? "bg-violet-500/10 text-violet-700"
          : status === "resolved"
            ? "bg-emerald-500/10 text-emerald-700"
            : "bg-[#111820]/10 text-[#111820]/55";

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${styles}`}
    >
      {formatStatus(status)}
    </span>
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

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111820]/5">
        <PackageSearch className="h-5 w-5 text-[#315b78]" />
      </span>

      <h3 className="mt-4 text-lg font-semibold text-[#111820]">
        No reports found
      </h3>

      <p className="mt-2 text-sm text-[#111820]/55">
        Try changing your search or
        status filter.
      </p>
    </div>
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

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(value));
}

function formatDateOnly(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(
    new Date(`${value}T00:00:00Z`)
  );
}

function formatDateTime(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(value));
}