import AirportDirectoryPage from "../components/airport-directory-page";

const dining = [
  {
    name: "NOVA Kitchen",
    location: "Terminal 2 · Level 02",
    description:
      "Contemporary Nigerian and international dishes served throughout the day.",
    hours: "05:00 – 23:00",
  },
  {
    name: "Market Hall",
    location: "Terminal 1 · Level 02",
    description:
      "Quick meals, coffee and casual dining for passengers on the move.",
    hours: "24 Hours",
  },
  {
    name: "Runway Café",
    location: "Terminal 2 · East Wing",
    description:
      "Coffee, pastries and light meals overlooking the airfield.",
    hours: "06:00 – 22:00",
  },
];

export default function DiningPage() {
  return (
    <AirportDirectoryPage
      eyebrow="Dining / NOVA"
      title="Eat before you fly."
      description="From quick coffee stops to full meals, discover dining throughout NOVA."
      items={dining}
    />
  );
}