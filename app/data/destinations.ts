export interface Destination {
  id: string;
  city: string;
  country: string;
  airportCode: string;
  image: string;
  flightTime: string;
  terminal: string;
}

export const destinations: Destination[] = [
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    airportCode: "LHR",
    image: "/london.png",
    flightTime: "6h 35m",
    terminal: "T2",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    airportCode: "DXB",
    image: "/Dubai.png",
    flightTime: "7h 45m",
    terminal: "T1",
  },
  {
    id: "paris",
    city: "Paris",
    country: "France",
    airportCode: "CDG",
    image: "/paris.png",
    flightTime: "6h 20m",
    terminal: "T2",
  },
  {
    id: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    airportCode: "CPT",
    image: "/cape-town.png",
    flightTime: "6h 10m",
    terminal: "T1",
  },
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    airportCode: "JFK",
    image: "/new-york.png",
    flightTime: "10h 40m",
    terminal: "T2",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    airportCode: "HND",
    image: "/tokyo.png",
    flightTime: "15h 15m",
    terminal: "T1",
  },
];