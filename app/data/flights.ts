export type FlightType = "departure" | "arrival";

export type FlightStatus =
  | "on-time"
  | "boarding"
  | "gate-closing"
  | "delayed"
  | "landed"
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

export const flights: Flight[] = [
  {
    id: "ba075",
    type: "departure",
    flightNumber: "BA075",
    airline: "British Airways",
    city: "London",
    airport: "London Heathrow",
    airportCode: "LHR",
    scheduledTime: "10:15",
    terminal: "T2",
    gate: "B08",
    status: "boarding",
    aircraft: "Boeing 787-9",
  },
  {
    id: "ek784",
    type: "departure",
    flightNumber: "EK784",
    airline: "Emirates",
    city: "Dubai",
    airport: "Dubai International",
    airportCode: "DXB",
    scheduledTime: "12:05",
    terminal: "T1",
    gate: "A14",
    status: "on-time",
    aircraft: "Boeing 777-300ER",
  },
  {
    id: "qr140",
    type: "departure",
    flightNumber: "QR140",
    airline: "Qatar Airways",
    city: "Doha",
    airport: "Hamad International",
    airportCode: "DOH",
    scheduledTime: "13:20",
    terminal: "T2",
    gate: "C03",
    status: "on-time",
    aircraft: "Airbus A350-1000",
  },
  {
    id: "kl588",
    type: "departure",
    flightNumber: "KL588",
    airline: "KLM",
    city: "Amsterdam",
    airport: "Amsterdam Schiphol",
    airportCode: "AMS",
    scheduledTime: "14:10",
    estimatedTime: "14:45",
    terminal: "T1",
    gate: "A09",
    status: "delayed",
    aircraft: "Boeing 777-200ER",
  },
  {
    id: "af149",
    type: "departure",
    flightNumber: "AF149",
    airline: "Air France",
    city: "Paris",
    airport: "Paris Charles de Gaulle",
    airportCode: "CDG",
    scheduledTime: "15:40",
    terminal: "T2",
    gate: "B12",
    status: "gate-closing",
    aircraft: "Airbus A350-900",
  },
  {
    id: "lh569",
    type: "departure",
    flightNumber: "LH569",
    airline: "Lufthansa",
    city: "Frankfurt",
    airport: "Frankfurt Airport",
    airportCode: "FRA",
    scheduledTime: "16:25",
    terminal: "T1",
    gate: "A18",
    status: "scheduled",
    aircraft: "Airbus A330-300",
  },

  // ARRIVALS

  {
    id: "ba074",
    type: "arrival",
    flightNumber: "BA074",
    airline: "British Airways",
    city: "London",
    airport: "London Heathrow",
    airportCode: "LHR",
    scheduledTime: "05:35",
    terminal: "T2",
    gate: "B04",
    status: "landed",
    aircraft: "Boeing 787-9",
  },
  {
    id: "ek783",
    type: "arrival",
    flightNumber: "EK783",
    airline: "Emirates",
    city: "Dubai",
    airport: "Dubai International",
    airportCode: "DXB",
    scheduledTime: "11:20",
    terminal: "T1",
    gate: "A06",
    status: "on-time",
    aircraft: "Boeing 777-300ER",
  },
  {
    id: "qr139",
    type: "arrival",
    flightNumber: "QR139",
    airline: "Qatar Airways",
    city: "Doha",
    airport: "Hamad International",
    airportCode: "DOH",
    scheduledTime: "12:40",
    terminal: "T2",
    gate: "C08",
    status: "scheduled",
    aircraft: "Airbus A350-1000",
  },
  {
    id: "af148",
    type: "arrival",
    flightNumber: "AF148",
    airline: "Air France",
    city: "Paris",
    airport: "Paris Charles de Gaulle",
    airportCode: "CDG",
    scheduledTime: "14:55",
    estimatedTime: "15:20",
    terminal: "T2",
    gate: "B03",
    status: "delayed",
    aircraft: "Airbus A350-900",
  },
];