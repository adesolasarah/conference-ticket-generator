export interface EventDetails {
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
}

export const EventCard: React.FC<{ event: EventDetails }> = ({ event }) => {
  return (
    <div className="bg-[#041E23]/50 text-center p-6 rounded-lg mb-8">
      <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex items-center justify-center text-center text-gray-300">
        <span className="mr-2">📍</span>
        <span>{event.location}</span>
        <span className="mx-4">||</span>
        <span>{`${event.date} | ${event.time}`}</span>
      </div>
    </div>
  );
};
