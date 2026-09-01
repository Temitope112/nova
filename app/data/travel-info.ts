export interface TravelInfoItem {
  id: string;
  title: string;
  description: string;
}

export interface TravelPhase {
  id: string;
  number: string;
  label: string;
  eyebrow: string;
  description: string;
  items: TravelInfoItem[];
}

export const travelPhases: TravelPhase[] = [
  {
    id: "before-you-fly",
    number: "01",
    label: "Before You Fly",
    eyebrow: "Prepare / Before NOVA",
    description:
      "Get the practical details sorted before you arrive, from documents to baggage and check-in.",
    items: [
      {
        id: "check-in",
        title: "Check-in",
        description:
          "Check in online where available and confirm your airline's recommended arrival time.",
      },
      {
        id: "documents",
        title: "Travel documents",
        description:
          "Keep your passport, visa and required travel documents ready before departure.",
      },
      {
        id: "baggage",
        title: "Baggage",
        description:
          "Review your airline's baggage allowance and restricted-item requirements before packing.",
      },
    ],
  },

  {
    id: "at-airport",
    number: "02",
    label: "At the Airport",
    eyebrow: "Move / Through NOVA",
    description:
      "Know what happens from the moment you enter the terminal until you reach your gate.",
    items: [
      {
        id: "security",
        title: "Security",
        description:
          "Prepare liquids and electronics before screening to move through security more efficiently.",
      },
      {
        id: "terminal",
        title: "Find your terminal",
        description:
          "Check your flight information and follow NOVA wayfinding to your terminal and gate.",
      },
      {
        id: "boarding",
        title: "Boarding",
        description:
          "Keep an eye on live flight information for boarding calls, gate changes and final announcements.",
      },
    ],
  },

  {
    id: "connections",
    number: "03",
    label: "Connections",
    eyebrow: "Continue / Without Friction",
    description:
      "Moving through NOVA between flights should feel clear, even when your time is limited.",
    items: [
      {
        id: "transfer",
        title: "Transfer route",
        description:
          "Follow transfer signs and your journey guidance to reach the correct terminal or concourse.",
      },
      {
        id: "security-check",
        title: "Security checks",
        description:
          "Some connecting journeys may require additional security screening before your next gate.",
      },
      {
        id: "connection-time",
        title: "Connection time",
        description:
          "Check walking times and gate information early so you know exactly how much time you have.",
      },
    ],
  },

  {
    id: "arrival",
    number: "04",
    label: "Arrival",
    eyebrow: "Land / Move Forward",
    description:
      "From immigration to baggage and onward transport, know what comes after landing.",
    items: [
      {
        id: "immigration",
        title: "Immigration",
        description:
          "Have your arrival documents ready and follow the appropriate immigration lane.",
      },
      {
        id: "baggage-claim",
        title: "Baggage claim",
        description:
          "Check the information screens for your assigned baggage carousel after immigration.",
      },
      {
        id: "transport",
        title: "Onward travel",
        description:
          "Continue by taxi, private transfer, parking or other ground transport options from arrivals.",
      },
    ],
  },
];