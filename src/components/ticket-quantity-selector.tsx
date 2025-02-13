import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const TicketQuantitySelector: React.FC<{
  quantity: number;
  onChange: (value: number) => void;
}> = ({ quantity, onChange }) => {
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => onChange(Number(value))}
        defaultValue={quantity.toString()}
      >
        <SelectTrigger className="w-full p-3 bg-[#041E23]/30 border-2 border-teal-800 rounded-lg text-white">
          <SelectValue
            className="text-gray-300 mb-2"
            placeholder="Number of Tickets"
          />
        </SelectTrigger>
        <SelectContent className="bg-white text-black">
          <SelectGroup>
            <SelectLabel>Ticket Number</SelectLabel>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
