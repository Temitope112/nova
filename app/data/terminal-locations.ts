export interface TerminalLocation {
  id: string;
  name: string;
  shortName: string;
  type:
    | "gate"
    | "security"
    | "lounge"
    | "food"
    | "retail";

  level: string;
  walkTime: number;
  description: string;

  x: number;
  y: number;

  path: string;
}

export const terminalLocations: TerminalLocation[] = [
  {
    id: "gate-b08",
    name: "Gate B08",
    shortName: "B08",
    type: "gate",
    level: "Level 2",
    walkTime: 12,
    description:
      "British Airways BA075 · London Heathrow",
    x: 78,
    y: 31,
    path:
      "M18 78 C28 72, 28 54, 40 52 C53 49, 57 36, 72 34 L78 31",
  },

  {
    id: "nova-lounge",
    name: "NOVA Lounge",
    shortName: "Lounge",
    type: "lounge",
    level: "Level 2",
    walkTime: 6,
    description:
      "Premium lounge · Dining · Shower suites",
    x: 58,
    y: 45,
    path:
      "M18 78 C27 70, 30 58, 40 55 C48 52, 51 48, 58 45",
  },

  {
    id: "security-north",
    name: "North Security",
    shortName: "Security",
    type: "security",
    level: "Level 1",
    walkTime: 3,
    description:
      "Estimated security wait · 6 minutes",
    x: 36,
    y: 63,
    path:
      "M18 78 C23 73, 27 68, 36 63",
  },

  {
    id: "market-hall",
    name: "Market Hall",
    shortName: "Dining",
    type: "food",
    level: "Level 2",
    walkTime: 8,
    description:
      "Restaurants · Coffee · Local cuisine",
    x: 62,
    y: 67,
    path:
      "M18 78 C30 70, 39 74, 48 71 C54 69, 58 68, 62 67",
  },

  {
    id: "avenue",
    name: "The Avenue",
    shortName: "Retail",
    type: "retail",
    level: "Level 2",
    walkTime: 9,
    description:
      "Fashion · Travel essentials · Duty free",
    x: 68,
    y: 54,
    path:
      "M18 78 C28 70, 36 64, 47 64 C57 63, 61 57, 68 54",
  },
];