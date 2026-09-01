export type AirportPlaceCategory =
  | "dining"
  | "shopping"
  | "lounge"
  | "family"
  | "business"
  | "assistance";

export interface AirportPlace {
  id: string;
  name: string;
  category: AirportPlaceCategory;

  terminal: "T1" | "T2";
  level: string;

  description: string;
  openingHours: string;

  x: number;
  y: number;
}

export const airportPlaces: AirportPlace[] = [
  {
    id: "nova-kitchen",
    name: "NOVA Kitchen",
    category: "dining",
    terminal: "T2",
    level: "Level 02",
    description:
      "Contemporary Nigerian and international dining overlooking the departure apron.",
    openingHours: "05:30 — 23:00",
    x: 68,
    y: 66,
  },
  {
    id: "market-hall",
    name: "Market Hall",
    category: "dining",
    terminal: "T1",
    level: "Level 02",
    description:
      "A relaxed food hall with coffee, quick meals and local favourites.",
    openingHours: "24 hours",
    x: 38,
    y: 61,
  },
  {
    id: "the-avenue",
    name: "The Avenue",
    category: "shopping",
    terminal: "T2",
    level: "Level 02",
    description:
      "Fashion, beauty, travel essentials and premium retail before departure.",
    openingHours: "06:00 — 22:30",
    x: 63,
    y: 48,
  },
  {
    id: "nova-lounge",
    name: "NOVA Lounge",
    category: "lounge",
    terminal: "T2",
    level: "West Wing",
    description:
      "A quiet space for dining, work and rest before your flight.",
    openingHours: "05:00 — 00:00",
    x: 75,
    y: 34,
  },
  {
    id: "family-zone",
    name: "Family Zone",
    category: "family",
    terminal: "T1",
    level: "Level 01",
    description:
      "Play, feeding and quiet spaces designed for families travelling with children.",
    openingHours: "24 hours",
    x: 27,
    y: 71,
  },
  {
    id: "nova-work",
    name: "NOVA Work",
    category: "business",
    terminal: "T2",
    level: "Level 03",
    description:
      "Workstations, meeting rooms, charging and high-speed airport Wi-Fi.",
    openingHours: "06:00 — 22:00",
    x: 72,
    y: 55,
  },
  {
    id: "assistance-centre",
    name: "Passenger Assistance",
    category: "assistance",
    terminal: "T1",
    level: "Ground Level",
    description:
      "Accessibility support, passenger guidance and special assistance.",
    openingHours: "24 hours",
    x: 22,
    y: 49,
  },
];

export const airportCategories: {
  value: AirportPlaceCategory;
  label: string;
}[] = [
  {
    value: "dining",
    label: "Dining",
  },
  {
    value: "shopping",
    label: "Shopping",
  },
  {
    value: "lounge",
    label: "Lounges",
  },
  {
    value: "family",
    label: "Family",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "assistance",
    label: "Assistance",
  },
];