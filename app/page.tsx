import Hero from "./components/home/hero/hero";
import Departures from "./components/home/departures/departures";
import Journey from "./components/home/journey/journey";
import Terminal from "./components/home/terminal/terminal";
import Destinations from "./components/home/destinations/destinations";
import Experience from "./components/home/experience/experience";
import Pulse from "./components/home/pulse/pulse";
import Services from "./components/home/services/services";
import TravelInfo from "./components/home/travel-info/travel-info";
import FinalCta from "./components/home/final-cta/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Departures />
      <Journey />
      <Terminal />
      <Destinations />
      <Experience />
      <Pulse />
      <Services />
      <TravelInfo />
      <FinalCta />
    </>
  );
}