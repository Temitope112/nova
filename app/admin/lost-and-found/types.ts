import type {
  ReportStatus,
} from "./constants";

export type LostFoundPassenger = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type LostFoundReport = {
  id: string;
  user_id: string | null;
  item_name: string;
  description: string | null;
  location_lost: string | null;
  date_lost: string | null;
  status: ReportStatus;
  created_at: string;
  updated_at: string;

  passenger:
    | LostFoundPassenger
    | null;
};