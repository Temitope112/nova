export interface PlanItem {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
}

export interface TransportOption {
  id: string;
  name: string;
  time: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}

export const planItems: PlanItem[] = [
  {
    id: "arrival-time",
    number: "01",
    eyebrow: "Before you leave",
    title: "Know when to arrive.",
    description:
      "Give yourself enough time to move through check-in, security and boarding without rushing.",
    details: [
      "International flights · arrive around 3 hours before departure",
      "Domestic flights · arrive around 2 hours before departure",
      "Check your airline's recommended arrival time before travelling",
    ],
  },
  {
    id: "documents",
    number: "02",
    eyebrow: "Travel documents",
    title: "Keep the essentials close.",
    description:
      "Make sure your passport, identification and required travel documents are ready before reaching the airport.",
    details: [
      "Passport or accepted identification",
      "Boarding pass or booking confirmation",
      "Visa and destination entry documents where required",
    ],
  },
  {
    id: "baggage",
    number: "03",
    eyebrow: "Baggage",
    title: "Pack with the journey in mind.",
    description:
      "Know your airline allowance and prepare liquids, electronics and restricted items before security.",
    details: [
      "Confirm cabin and checked baggage allowance",
      "Keep valuables and travel documents in your hand luggage",
      "Check restricted and prohibited items before travelling",
    ],
  },
];

export const transportOptions: TransportOption[] = [
  {
    id: "car",
    name: "By Car",
    time: "35–60 min",
    description:
      "Direct road access with short-stay, long-stay and drop-off options available at NOVA.",
  },
  {
    id: "ride",
    name: "Taxi & Ride-hailing",
    time: "Available 24/7",
    description:
      "Dedicated passenger pickup and drop-off zones are located outside both terminals.",
  },
  {
    id: "bus",
    name: "Airport Bus",
    time: "Every 30 min",
    description:
      "Scheduled connections operate between NOVA and major transport points across Lagos.",
  },
  {
    id: "transfer",
    name: "Private Transfer",
    time: "Pre-booked",
    description:
      "Meet-and-greet transfers can be arranged before arrival for a smoother airport journey.",
  },
];

export const checklist: ChecklistItem[] = [
  {
    id: "flight",
    title: "Check your flight",
    description:
      "Confirm departure time, terminal and flight status.",
  },
  {
    id: "documents",
    title: "Travel documents",
    description:
      "Passport, ID, boarding pass and visa where required.",
  },
  {
    id: "baggage",
    title: "Check baggage",
    description:
      "Confirm allowance and remove restricted items.",
  },
  {
    id: "transport",
    title: "Plan your route",
    description:
      "Know how you're getting to NOVA and where you'll arrive.",
  },
  {
    id: "time",
    title: "Leave enough time",
    description:
      "Account for Lagos traffic and airport processing.",
  },
];