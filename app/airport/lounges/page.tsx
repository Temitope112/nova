import AirportDirectoryPage from "../components/airport-directory-page";

const lounges = [
  {
    name: "NOVA Lounge",
    location: "Terminal 2 · West Wing",
    description:
      "Quiet workspaces, dining, showers and panoramic views of the airfield.",
    hours: "24 Hours",
  },
  {
    name: "Sky Lounge",
    location: "Terminal 1 · Level 03",
    description:
      "A calm passenger lounge with refreshments, Wi-Fi and comfortable seating.",
    hours: "05:00 – 00:00",
  },
];

export default function LoungesPage() {
  return (
    <AirportDirectoryPage
      eyebrow="Lounges / NOVA"
      title="Wait differently."
      description="Step away from the terminal and reset before the next part of your journey."
      items={lounges}
    />
  );
}