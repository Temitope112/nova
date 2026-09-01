export type FlightStatus =
  | "boarding"
  | "on-time"
  | "delayed"
  | "gate-closing";

export interface Flight {
  id: string;
  flightNumber: string;
  destination: string;
  airportCode: string;
  departureTime: string;
  status: FlightStatus;
}