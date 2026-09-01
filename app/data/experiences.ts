export interface AirportExperience {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  location: string;
}

export const airportExperiences: AirportExperience[] = [
  {
    id: "dining",
    number: "01",
    title: "Dining",
    eyebrow: "Taste / NOVA",
    description:
      "From quick departures to long conversations. Discover local flavours and international dining throughout the terminal.",
    image: "/dinning.png",
    location: "Terminal 2 · Level 02",
  },
  {
    id: "lounge",
    number: "02",
    title: "NOVA Lounge",
    eyebrow: "Pause / Recharge",
    description:
      "Quiet spaces, thoughtful service and room to reset before the next part of your journey.",
    image: "/lounge.png",
    location: "Terminal 2 · West Wing",
  },
  {
    id: "shopping",
    number: "03",
    title: "Shopping",
    eyebrow: "Discover / Take Away",
    description:
      "Travel essentials, global names and carefully selected local brands, all within your route to the gate.",
    image: "/shopping.png",
    location: "The Avenue · Level 02",
  },
  {
    id: "culture",
    number: "04",
    title: "Art & Culture",
    eyebrow: "Nigeria / In Transit",
    description:
      "Installations, exhibitions and stories that bring contemporary Nigerian creativity into the airport.",
    image: "/culture.png",
    location: "Central Concourse",
  },
  {
    id: "family",
    number: "05",
    title: "Family",
    eyebrow: "Travel / Together",
    description:
      "Spaces designed for families to slow down, regroup and make travelling with children easier.",
    image: "/family.png",
    location: "Terminal 1 & 2",
  },
  {
    id: "business",
    number: "06",
    title: "Business",
    eyebrow: "Work / Between Flights",
    description:
      "Quiet workspaces, high-speed connectivity and meeting facilities for journeys that cannot wait.",
    image: "/business.png",
    location: "Terminal 2 · Level 03",
  },
];