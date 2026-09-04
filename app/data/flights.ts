export type FlightType = "departure" | "arrival";

export type FlightStatus =
  | "on-time"
  | "boarding"
  | "gate-closing"
  | "delayed"
  | "landed"
  | "cancelled"
  | "scheduled";

export interface Flight {
  id: string;
  type: FlightType;
  flightNumber: string;
  airline: string;
  city: string;
  airport: string;
  airportCode: string;
  scheduledTime: string;
  estimatedTime?: string;
  terminal: "T1" | "T2";
  gate: string;
  status: FlightStatus;
  aircraft?: string;
}