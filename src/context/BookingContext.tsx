'use client';

import { useIndexedDB } from '@/lib/indexedDB';
import { BookingContextType, TicketDetails } from '@/types';
import { createContext, useCallback, useContext } from 'react';
import { AttendeeFormValues } from '../lib/validations/attendee';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const TICKET_DETAILS_KEY = 'ticketDetails';
const ATTENDEE_DETAILS_KEY = 'attendeeDetails';

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    value: ticketDetails,
    setValue: setTicketDetails,
    isLoading: isLoadingTickets,
  } = useIndexedDB<TicketDetails | null>(TICKET_DETAILS_KEY, null);

  const {
    value: attendeeDetails,
    setValue: setAttendeeDetails,
    isLoading: isLoadingAttendee,
  } = useIndexedDB<AttendeeFormValues | null>(ATTENDEE_DETAILS_KEY, null);

  const resetBooking = useCallback(async () => {
    await Promise.all([setTicketDetails(null), setAttendeeDetails(null)]);
  }, [setTicketDetails, setAttendeeDetails]);

  // Show loading state while data is being fetched
  if (isLoadingTickets || isLoadingAttendee) {
    return <div>Loading...</div>;
  }

  return (
    <BookingContext.Provider
      value={{
        ticketDetails,
        attendeeDetails,
        setTicketDetails,
        setAttendeeDetails,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
