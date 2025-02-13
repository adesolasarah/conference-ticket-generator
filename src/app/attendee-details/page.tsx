'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { AttendeeDetailsForm } from '@/components/attendee-details-form';
import { AttendeeFormValues } from '../../lib/validations/attendee';

export default function AttendeeDetailsPage() {
  const router = useRouter();
  const { ticketDetails, setAttendeeDetails, attendeeDetails } = useBooking();

  console.log(attendeeDetails);

  useEffect(() => {
    if (!ticketDetails) {
      router.push('/ticket-selection');
    }
  }, [ticketDetails, router]);

  const handleSubmit = (details: AttendeeFormValues) => {
    setAttendeeDetails(details);
    router.push('/confirmation');
  };

  return (
    <div className="min-h-screen bg-[#08343C] text-white">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-light">Attendee Details</h1>
          <span className="text-gray-400">Step 2/3</span>
        </div>

        <AttendeeDetailsForm
          initialData={attendeeDetails}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
