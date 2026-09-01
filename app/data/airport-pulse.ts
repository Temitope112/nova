export type ActivityLevel =
  | "quiet"
  | "moderate"
  | "busy";

export interface TerminalActivity {
  id: string;
  terminal: string;
  level: ActivityLevel;
  percentage: number;
  description: string;
}

export const terminalActivity: TerminalActivity[] = [
  {
    id: "terminal-1",
    terminal: "Terminal 1",
    level: "moderate",
    percentage: 54,
    description: "Normal passenger flow",
  },
  {
    id: "terminal-2",
    terminal: "Terminal 2",
    level: "busy",
    percentage: 78,
    description: "Higher departure activity",
  },
];

export const airportPulse = {
  security: {
    waitTime: 6,
    previousWaitTime: 8,
  },

  parking: {
    p1: 184,
    p2: 72,
  },

  weather: {
    temperature: 28,
    condition: "Partly cloudy",
    wind: "SW 11 km/h",
  },

  operations: {
    status: "Normal operations",
    activeFlights: 42,
  },
};