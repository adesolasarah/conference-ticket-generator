'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TicketConfirmation } from '@/components/ticket-confirmation';
import { useBooking } from '@/context/BookingContext';
import EventTicket from '@/components/event-ticket';

export default function ConfirmationPage() {
  const router = useRouter();
  const { ticketDetails, attendeeDetails, resetBooking } = useBooking();

  useEffect(() => {
    if (!ticketDetails || !attendeeDetails) {
      router.push('/ticket-selection');
    }
  }, [ticketDetails, attendeeDetails, router]);

  const handleDownload = () => {
    // Implement ticket download logic
    console.log('Downloading ticket...');
  };

  const handleBookAnother = () => {
    resetBooking();
    router.push('/ticket-selection');
  };

  if (!ticketDetails || !attendeeDetails) return null;

  return (
    <div className="min-h-screen bg-[#08343C] text-white">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-light">Ready</h1>
          <span className="text-gray-400">Step 3/3</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl text-center font-bold text-white mb-2">
            Your Ticket is Booked!
          </h1>
          <p className="flex items-center text-center justify-center text-sm">
            Check your email for a copy or you can download
          </p>
        </div>

        <EventTicket
          eventName='Techember Fest "25'
          address="04 Rumens road, Ikoyi, Lagos"
          dateTime="March 15, 2025 | 7:00 PM"
          userName={attendeeDetails.name}
          userEmail={attendeeDetails.email}
          ticketType={ticketDetails.type}
          quantity={ticketDetails.quantity}
          specialRequest={attendeeDetails.specialRequest}
          barcode="234567                891026"
          profileImage={attendeeDetails.avatarUrl}
        />

        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleBookAnother}
            className="w-1/2 py-3 text-center border-2 border-[#24A0B5] rounded-lg hover:bg-teal-900/30"
          >
            Book Another Ticket
          </button>
          <button
            onClick={handleDownload}
            className="w-1/2 py-3 text-center bg-[#24A0B5] rounded-lg hover:bg-teal-400"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
