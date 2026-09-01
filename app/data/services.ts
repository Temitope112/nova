export interface AirportService {
  id: string;
  number: string;
  title: string;
  description: string;
  location: string;
  availability: string;
}

export const airportServices: AirportService[] = [
  {
    id: "parking",
    number: "01",
    title: "Parking",
    description:
      "Short-stay, long-stay and premium parking with clear routes to every terminal.",
    location: "P1 · P2 · Premium",
    availability: "24 hours",
  },
  {
    id: "transfers",
    number: "02",
    title: "Transfers",
    description:
      "Airport transfers, taxis and private transport options for a smoother onward journey.",
    location: "Arrivals · Ground Level",
    availability: "24 hours",
  },
  {
    id: "fast-track",
    number: "03",
    title: "Fast Track",
    description:
      "Move through selected security and immigration points with priority access.",
    location: "T1 · T2",
    availability: "Eligible passengers",
  },
  {
    id: "assistance",
    number: "04",
    title: "Assistance",
    description:
      "Support for passengers who need extra help moving through the airport.",
    location: "All terminals",
    availability: "Request ahead",
  },
  {
    id: "baggage",
    number: "05",
    title: "Baggage",
    description:
      "Baggage support, wrapping, storage and guidance before or after your flight.",
    location: "Departures · Arrivals",
    availability: "Daily",
  },
  {
    id: "lost-found",
    number: "06",
    title: "Lost & Found",
    description:
      "Report, locate and recover items misplaced within NOVA Airport.",
    location: "Terminal 1 · Level 01",
    availability: "06:00 — 23:00",
  },
  {
    id: "wifi",
    number: "07",
    title: "Wi-Fi",
    description:
      "High-speed wireless access throughout the terminals and public areas.",
    location: "Airport-wide",
    availability: "Complimentary",
  },
  {
    id: "currency",
    number: "08",
    title: "Currency",
    description:
      "Foreign exchange, cash machines and payment support before you travel.",
    location: "T1 · T2",
    availability: "Multiple locations",
  },
];