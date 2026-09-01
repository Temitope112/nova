export type DepartureStatus =
  | "boarding"
  | "on-time"
  | "delayed"
  | "gate-closing";

export interface Departure {
  id: string;
  time: string;
  destination: string;
  airportCode: string;
  flightNumber: string;
  terminal: string;
  gate: string;
  status: DepartureStatus;
  airline: string;
}

export const departures: Departure[] = [
  {
    id: "ba075",
    time: "10:15",
    destination: "London",
    airportCode: "LHR",
    flightNumber: "BA075",
    terminal: "T2",
    gate: "B08",
    status: "boarding",
    airline: "British Airways",
  },
  {
    id: "ek784",
    time: "12:05",
    destination: "Dubai",
    airportCode: "DXB",
    flightNumber: "EK784",
    terminal: "T1",
    gate: "A14",
    status: "on-time",
    airline: "Emirates",
  },
  {
    id: "qr140",
    time: "13:20",
    destination: "Doha",
    airportCode: "DOH",
    flightNumber: "QR140",
    terminal: "T2",
    gate: "C03",
    status: "on-time",
    airline: "Qatar Airways",
  },
  {
    id: "kl588",
    time: "14:10",
    destination: "Amsterdam",
    airportCode: "AMS",
    flightNumber: "KL588",
    terminal: "T1",
    gate: "A09",
    status: "delayed",
    airline: "KLM",
  },
  {
    id: "af149",
    time: "15:40",
    destination: "Paris",
    airportCode: "CDG",
    flightNumber: "AF149",
    terminal: "T2",
    gate: "B12",
    status: "gate-closing",
    airline: "Air France",
  },
  {
    id: "lh569",
    time: "16:25",
    destination: "Frankfurt",
    airportCode: "FRA",
    flightNumber: "LH569",
    terminal: "T1",
    gate: "A18",
    status: "on-time",
    airline: "Lufthansa",
  },
];