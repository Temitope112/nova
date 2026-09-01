export type JourneyStageStatus =
  | "complete"
  | "active"
  | "upcoming";

export interface JourneyStage {
  id: string;
  number: string;
  title: string;
  time: string;
  detail: string;
  description: string;
  status: JourneyStageStatus;
}

export interface Journey {
  id: string;
  flightNumber: string;
  airline: string;

  origin: {
    city: string;
    code: string;
  };

  destination: {
    city: string;
    code: string;
  };

  terminal: string;
  gate: string;

  departureTime: string;
  boardingTime: string;

  status: string;

  aircraft: string;

  walkToGate: string;
  securityWait: string;

  stages: JourneyStage[];
}

export const journeys: Journey[] = [
  {
    id: "ba075",
    flightNumber: "BA075",
    airline: "British Airways",

    origin: {
      city: "Lagos",
      code: "LOS",
    },

    destination: {
      city: "London",
      code: "LHR",
    },

    terminal: "T2",
    gate: "B08",

    departureTime: "10:15",
    boardingTime: "09:45",

    status: "Boarding soon",

    aircraft: "Boeing 787-9",

    walkToGate: "12 min",
    securityWait: "6 min",

    stages: [
      {
        id: "check-in",
        number: "01",
        title: "Check-in",
        time: "09:20",
        detail: "Zone C · Counter 18",
        description:
          "Check-in completed. Your boarding pass and baggage are confirmed.",
        status: "complete",
      },
      {
        id: "security",
        number: "02",
        title: "Security",
        time: "09:42",
        detail: "North Security · 6 min",
        description:
          "Security completed. You're now inside the departure zone.",
        status: "complete",
      },
      {
        id: "explore",
        number: "03",
        title: "Explore",
        time: "Now",
        detail: "Dining · Lounge · Retail",
        description:
          "You have time before boarding. Dining, shopping and the NOVA Lounge are nearby.",
        status: "active",
      },
      {
        id: "gate",
        number: "04",
        title: "Gate",
        time: "09:33",
        detail: "B08 · 12 min walk",
        description:
          "Leave for Gate B08 soon. Follow the blue route through Terminal 2.",
        status: "upcoming",
      },
      {
        id: "boarding",
        number: "05",
        title: "Boarding",
        time: "09:45",
        detail: "BA075 · London",
        description:
          "Boarding begins at Gate B08. Have your passport and boarding pass ready.",
        status: "upcoming",
      },
    ],
  },

  {
    id: "ek784",
    flightNumber: "EK784",
    airline: "Emirates",

    origin: {
      city: "Lagos",
      code: "LOS",
    },

    destination: {
      city: "Dubai",
      code: "DXB",
    },

    terminal: "T1",
    gate: "A14",

    departureTime: "12:05",
    boardingTime: "11:35",

    status: "On time",

    aircraft: "Boeing 777-300ER",

    walkToGate: "8 min",
    securityWait: "5 min",

    stages: [
      {
        id: "check-in",
        number: "01",
        title: "Check-in",
        time: "10:35",
        detail: "Zone A · Counter 09",
        description:
          "Check in with Emirates and prepare your checked baggage.",
        status: "active",
      },
      {
        id: "security",
        number: "02",
        title: "Security",
        time: "10:55",
        detail: "Central Security · 5 min",
        description:
          "Proceed through passenger security after check-in.",
        status: "upcoming",
      },
      {
        id: "explore",
        number: "03",
        title: "Explore",
        time: "11:10",
        detail: "Terminal 1",
        description:
          "Grab something to eat or explore the terminal before boarding.",
        status: "upcoming",
      },
      {
        id: "gate",
        number: "04",
        title: "Gate",
        time: "11:25",
        detail: "A14 · 8 min walk",
        description:
          "Make your way to Gate A14.",
        status: "upcoming",
      },
      {
        id: "boarding",
        number: "05",
        title: "Boarding",
        time: "11:35",
        detail: "EK784 · Dubai",
        description:
          "Boarding begins at Gate A14.",
        status: "upcoming",
      },
    ],
  },
];