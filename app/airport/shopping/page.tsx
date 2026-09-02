import AirportDirectoryPage from "../components/airport-directory-page";

const shopping = [
  {
    name: "The Avenue",
    location: "Terminal 2 · Level 02",
    description:
      "Fashion, accessories and international retail inside the departure zone.",
    hours: "06:00 – 22:00",
  },
  {
    name: "NOVA Duty Free",
    location: "Terminal 2 · Airside",
    description:
      "Fragrance, beauty, gifts and selected international products.",
    hours: "24 Hours",
  },
  {
    name: "Lagos Made",
    location: "Terminal 1 · Departure Hall",
    description:
      "A curated selection of Nigerian design, craft and contemporary products.",
    hours: "07:00 – 21:00",
  },
];

export default function ShoppingPage() {
  return (
    <AirportDirectoryPage
      eyebrow="Shopping / NOVA"
      title="Take something with you."
      description="Discover international retail and a little of Lagos before you leave."
      items={shopping}
    />
  );
}