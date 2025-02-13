'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { EventDetails, EventCard } from '@/components/event-card';
import { TicketQuantitySelector } from '@/components/ticket-quantity-selector';
import { TicketType, TicketTypeCard } from '@/components/ticket-type';
import { useBooking } from '@/context/BookingContext';

const TicketSelectionPage = () => {
  const router = useRouter();
  const { setTicketDetails, ticketDetails } = useBooking();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(
    ticketDetails?.type ?? ''
  );
  const [quantity, setQuantity] = useState(ticketDetails?.quantity ?? 1);

  const handleSubmit = () => {
    if (!selectedTicket) {
      alert('Please select a ticket type');
      return;
    }

    setTicketDetails({ type: selectedTicket, quantity });
    router.push('/attendee-details');
  };

  const event: EventDetails = {
    name: 'Techember Fest "25',
    description:
      'Join us for an unforgettable experience at [Event Name]! Secure your spot now.',
    location: '[Event Location]',
    date: 'March 15, 2025',
    time: '7:00 PM',
  };

  const tickets: TicketType[] = [
    {
      type: 'regular',
      price: 'Free',
      access: 'REGULAR ACCESS',
      available: '20/52',
    },
    { type: 'vip', price: 150, access: 'VIP ACCESS', available: '20/52' },
    { type: 'vvip', price: 150, access: 'VVIP ACCESS', available: '20/52' },
  ];

  return (
    <div className="min-h-screen text-white px-6">
      <div className="max-w-xl mx-auto p-6 border-[1px] bg-[#041E23] border-[#24A0B5] rounded-3xl">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-light">Ticket Selection</h1>
          <span className="text-gray-400">Step 1/3</span>
        </div>

        <EventCard event={event} />

        <div className="mb-6">
          <h2 className="text-gray-300 mb-4">Select Ticket Type:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tickets.map((ticket) => (
              <TicketTypeCard
                key={ticket.type}
                ticket={ticket}
                selected={selectedTicket === ticket.type}
                onClick={() => setSelectedTicket(ticket.type)}
              />
            ))}
          </div>
        </div>

        <TicketQuantitySelector quantity={quantity} onChange={setQuantity} />

        <div className="flex space-x-4 mt-8">
          <button className="w-1/2 py-3 text-center border-2 border-[#24A0B5] rounded-lg hover:bg-teal-900/30">
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 py-3 text-center bg-[#24A0B5] rounded-lg hover:bg-teal-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelectionPage;
