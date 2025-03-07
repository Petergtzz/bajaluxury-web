"use client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

interface MethodSelectorProps {
  defaultValue: string | null;
  onMethodAction: (method: string) => void;
}

export default function MethodSelector({
  defaultValue,
  onMethodAction,
}: MethodSelectorProps) {
  const handleSelect = (method: string) => {
    onMethodAction(method);
  };

  return (
    <Select onValueChange={handleSelect} value={defaultValue?.toString()}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Payment Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Credit Card">Credit Card</SelectItem>
          <SelectItem value="Cash">Cash</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
