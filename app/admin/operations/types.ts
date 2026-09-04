export type OperationsFlight = {
  id: string;
  flight_number: string;
  airline_name: string;
  origin_code: string;
  origin_city: string;
  destination_code: string;
  destination_city: string;
  departure_at: string;
  arrival_at: string | null;
  terminal: string | null;
  gate: string | null;
  status: string;
};

export type OperationsJourney = {
  id: string;
  user_id: string;
  flight_id: string | null;
  status: string;
};

export type OperationsData = {
  flights: OperationsFlight[];
  journeys: OperationsJourney[];
};