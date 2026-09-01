"use client";

import { useState } from "react";

import {
  journeys,
  type Journey,
} from "../../data/journeys";

import JourneyHero from "./journey-hero";
// import JourneyOverview from "./journey-overview";
import JourneyOverview from "../journey-overview";
import JourneyTimeline from "./journey-timeline";
import JourneyMap from "./journey-map";
import JourneyNextAction from "./journey-next-action";

export default function JourneyPage() {
  const [selectedJourney, setSelectedJourney] =
    useState<Journey>(journeys[0]);

  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      <JourneyHero
        journey={selectedJourney}
        journeys={journeys}
        onJourneyChange={setSelectedJourney}
      />

      <JourneyOverview journey={selectedJourney} />

      <JourneyTimeline journey={selectedJourney} />

      <JourneyMap journey={selectedJourney} />

      <JourneyNextAction journey={selectedJourney} />
    </main>
  );
}