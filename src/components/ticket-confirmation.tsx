/* eslint-disable @next/next/no-img-element */
'use client';

import { type AttendeeFormValues } from '@/lib/validations/attendee';

interface TicketData {
  eventName: string;
  location: string;
  date: string;
  time: string;
  ticketType: string;
  ticketQuantity: number;
  attendee: AttendeeFormValues;
  barcode: string;
}

const TicketConfirmation: React.FC<{ ticket: TicketData }> = ({ ticket }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Your Ticket is Booked!</h2>
      <p className="text-gray-300 mb-8">
        You can download or Check your email for a copy
      </p>

      <div className="bg-[#08343C]/50 rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">{ticket.eventName}</h3>
        <div className="text-gray-300 mb-4">
          <p>📍 {ticket.location}</p>
          <p>
            📅 {ticket.date} | {ticket.time}
          </p>
        </div>

        <div className="bg-teal-900/50 rounded-lg p-4 mb-4">
          {ticket.attendee.avatarUrl && (
            <img
              src={ticket.attendee.avatarUrl}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-lg object-cover mb-4"
            />
          )}

          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-gray-400">Enter your name</p>
              <p className="text-white">{ticket.attendee.name}</p>
            </div>
            <div>
              <p className="text-gray-400">Enter your email *</p>
              <p className="text-white">{ticket.attendee.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Ticket Type:</p>
              <p className="text-white">{ticket.ticketType}</p>
            </div>
            <div>
              <p className="text-gray-400">Ticket for:</p>
              <p className="text-white">{ticket.ticketQuantity}</p>
            </div>
          </div>

          {ticket.attendee.specialRequest && (
            <div className="mt-4 text-left">
              <p className="text-gray-400">Special request?</p>
              <p className="text-white">{ticket.attendee.specialRequest}</p>
            </div>
          )}
        </div>

        <div className="border-t-2 border-dashed border-teal-800 pt-4">
          <img
            src={`data:image/png;base64,${ticket.barcode}`}
            alt="Barcode"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export { TicketConfirmation };
