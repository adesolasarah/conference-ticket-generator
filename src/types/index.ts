import {
  type AttendeeFormValues,
} from '@/lib/validations/attendee';

export interface TicketDetails {
  type: string;
  quantity: number;
}

export interface BookingContextType {
  ticketDetails: TicketDetails | null;
  attendeeDetails: AttendeeFormValues | null;
  setTicketDetails: (details: TicketDetails) => void;
  setAttendeeDetails: (details: AttendeeFormValues) => void;
  resetBooking: () => void;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}
