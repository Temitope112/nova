export const FLIGHT_STATUSES = [
  "scheduled",
  "check_in",
  "boarding",
  "departed",
  "delayed",
  "cancelled",
  "arrived",
] as const;

export type FlightStatus =
  (typeof FLIGHT_STATUSES)[number];