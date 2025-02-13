/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface TicketProps {
  eventName: string;
  address: string;
  dateTime: string;
  userName: string;
  userEmail: string;
  ticketType: string;
  quantity: number;
  specialRequest?: string;
  barcode: string;
  profileImage?: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  readonly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  readonly = true,
}) => (
  <div className="mb-4">
    <span className="text-[#12464E] text-xs mb-1">{label}</span>
    <p
      className={`text-white word-wrap font-semibold text-wrap ${readonly ? '' : 'border-b border-[#24A0B5]'}`}
    >
      {value}
    </p>
  </div>
);

const EventTicket = ({
  eventName,
  address,
  dateTime,
  userName,
  userEmail,
  ticketType,
  quantity,
  specialRequest,
  barcode,
  profileImage = '',
}: TicketProps) => {
  return (
    <div className="max-w-sm font-sans mx-auto">
      <div className="relative bg-[#08343C] text-white p-6 rounded-lg border border-[#24A0B5]">
        <div className="absolute inset-0 rounded-lg border border-teal-400/10 pointer-events-none" />

        {/* Event Header */}
        <div className="mb-6">
          <h1 className="text-2xl text-center font-bold text-white mb-2">
            {eventName}
          </h1>
          <div className="flex items-center text-center justify-center text-sm">
            <span className="mr-1">📍</span>
            {address}
          </div>
          <div className="flex justify-center text-center items-center text-sm mt-1">
            <span className="mr-1">📅</span>
            {dateTime}
          </div>
        </div>

        {/* Profile Image */}
        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto bg-teal-400/10 rounded-lg overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#08343C]/50" />
            <div className="absolute top-1/2 w-full h-2 bg-[#24A0B5] blur-sm" />
          </div>
        </div>

        <div>
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <InputField label="Enter your name" value={userName} />
            <InputField label="Enter your email" value={userEmail} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Ticket Type" value={ticketType} />
            <InputField label="Ticket for" value={quantity.toString()} />
          </div>

          {specialRequest && (
            <div className="mt-4 ">
              <div className="text-[#12464E] text-xs mb-1">
                Special request?
              </div>
              <div className="text-gray-200 text-sm">{specialRequest}</div>
            </div>
          )}
        </div>

        {/* User Details */}

        {/* Barcode Section */}
        <div className="relative mt-8 pt-8 border-t border-dashed border-[#24A0B5]">
          {/* Ticket edge decorations */}
          <div className="absolute -left-6 -top-3 w-6 h-6 bg-[#08343C] rounded-full" />
          <div className="absolute -right-6 -top-3 w-6 h-6 bg-[#08343C] rounded-full" />

          <div className="flex justify-center">
            <div className="relative">
              <div className="text-center mb-2">
                <div className="inline-block px-4 py-1 bg-teal-400/10 rounded-full">
                  <span className="text-[#12464E] text-xs tracking-wider">
                    {barcode}
                  </span>
                </div>
              </div>
              <div
                className="h-12 w-48 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                style={{
                  backgroundSize: '2px 100%',
                  backgroundImage:
                    'repeating-linear-gradient(to right, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
