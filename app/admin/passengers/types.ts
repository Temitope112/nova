export type PassengerJourney = {
  id: string;
  status: string;
  created_at: string;
  flight_id: string | null;
  flight: {
    id: string;
    flight_number: string;
    origin_code: string;
    destination_code: string;
    departure_at: string;
    terminal: string | null;
    gate: string | null;
    status: string;
  } | null;
};

export type AdminPassenger = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  journeys: PassengerJourney[];
};
