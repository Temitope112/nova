export interface ExploreDestination {
  city: string;
  country: string;
  code: string;
  image: string;
  caption: string;
}

export interface ExploreStory {
  number: string;
  title: string;
  description: string;
  category: string;
}

export const exploreDestinations: ExploreDestination[] = [
  {
    city: "London",
    country: "United Kingdom",
    code: "LHR",
    image: "/london.png",
    caption: "Culture, movement and timeless city energy.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    code: "DXB",
    image: "/Dubai.png",
    caption: "Architecture, luxury and a city built forward.",
  },
  {
    city: "Paris",
    country: "France",
    code: "CDG",
    image: "/paris.png",
    caption: "Art, design and streets worth getting lost in.",
  },
  {
    city: "Cape Town",
    country: "South Africa",
    code: "CPT",
    image: "/cape-town.png",
    caption: "Ocean, mountains and one unforgettable skyline.",
  },
];

export const exploreStories: ExploreStory[] = [
  {
    number: "01",
    category: "Culture",
    title: "A gateway shaped by Lagos.",
    description:
      "NOVA carries the rhythm, energy and creativity of Lagos into every journey.",
  },
  {
    number: "02",
    category: "Experience",
    title: "The airport before the flight.",
    description:
      "Dining, art, retail and spaces designed to make the time between arrival and departure feel intentional.",
  },
  {
    number: "03",
    category: "Destinations",
    title: "One airport. A world of directions.",
    description:
      "Explore international connections and discover where your next journey could begin.",
  },
];