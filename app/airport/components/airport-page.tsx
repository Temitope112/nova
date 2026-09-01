"use client";

import { useMemo, useState } from "react";

import {
  airportPlaces,
  type AirportPlace,
  type AirportPlaceCategory,
} from "../../data/airport-places";

import AirportHero from "./airport-hero";
import AirportNavigation from "./airport-navigation";
import AirportMap from "./airport-map";
import AirportLocationDetail from "./airport-location-detail";
import AirportServicesStrip from "./airport-services-strip";

export default function AirportPage() {
  const [activeCategory, setActiveCategory] =
    useState<AirportPlaceCategory>("dining");

  const categoryPlaces = useMemo(
    () =>
      airportPlaces.filter(
        (place) =>
          place.category === activeCategory,
      ),
    [activeCategory],
  );

  const [selectedPlaceId, setSelectedPlaceId] =
    useState(airportPlaces[0].id);

  const selectedPlace =
    categoryPlaces.find(
      (place) => place.id === selectedPlaceId,
    ) ?? categoryPlaces[0];

  const handleCategoryChange = (
    category: AirportPlaceCategory,
  ) => {
    setActiveCategory(category);

    const firstPlace = airportPlaces.find(
      (place) =>
        place.category === category,
    );

    if (firstPlace) {
      setSelectedPlaceId(firstPlace.id);
    }
  };

  const handleSelectPlace = (
    place: AirportPlace,
  ) => {
    setSelectedPlaceId(place.id);
  };

  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      <AirportHero />

      <AirportNavigation
        activeCategory={activeCategory}
        onChange={handleCategoryChange}
      />

      <section
        className="
          mx-auto
          max-w-[1600px]

          px-5
          pb-24

          sm:px-8

          lg:px-12
          lg:pb-32

          xl:px-16
        "
      >
        <div
          className="
            grid

            overflow-hidden

            border
            border-[#111820]/10

            lg:grid-cols-[1.45fr_0.55fr]
          "
        >
          <AirportMap
            places={categoryPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={handleSelectPlace}
          />

          <AirportLocationDetail
            place={selectedPlace}
            places={categoryPlaces}
            onSelectPlace={handleSelectPlace}
          />
        </div>
      </section>

      <AirportServicesStrip />
    </main>
  );
}