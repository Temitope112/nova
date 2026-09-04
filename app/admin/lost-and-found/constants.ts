export const REPORT_STATUSES = [
  "submitted",
  "under_review",
  "matched",
  "resolved",
  "closed",
] as const;

export type ReportStatus =
  (typeof REPORT_STATUSES)[number];