import type {
  NotificationType,
} from "./constants";

export type NotificationPassenger = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type AdminNotification = {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;

  passenger:
    | NotificationPassenger
    | null;
};