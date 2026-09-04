export const NOTIFICATION_TYPES = [
  "flight_update",
  "gate_change",
  "journey",
  "lost_found",
  "system",
] as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[number];