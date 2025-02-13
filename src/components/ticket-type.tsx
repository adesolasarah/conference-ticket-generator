// types.ts
export interface TicketType {
  type: string;
  price: number | 'Free';
  access: string;
  available: string;
}

// TicketTypeCard.tsx
export const TicketTypeCard: React.FC<{
  ticket: TicketType;
  selected?: boolean;
  onClick?: () => void;
}> = ({ ticket, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 mb-4 text-left transition-colors
        ${
          selected
            ? 'border-teal-400 bg-[#041E23]/50'
            : 'border-teal-800 bg-[#041E23]/30 hover:border-[#24A0B5]'
        }`}
    >
      <div className="text-xl font-bold mb-1">
        {typeof ticket.price === 'number' ? `$${ticket.price}` : ticket.price}
      </div>
      <div className="text-gray-300 text-sm">{ticket.access}</div>
      <div className="text-gray-400 text-xs mt-1">{ticket.available}</div>
    </button>
  );
};
