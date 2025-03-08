"use client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface MethodSelectorProps {
  defaultValue: string;
  onMethodAction: (method: string) => void;
}

export default function MethodSelector({
  defaultValue,
  onMethodAction,
}: MethodSelectorProps) {
  const options = ["credit card", "cash"];

  const handleSelect = (method: string) => {
    onMethodAction(method);
  };

  return (
    <Select onValueChange={handleSelect} value={defaultValue}>
      <SelectTrigger className="w-full md:w-[120px]">
        <SelectValue placeholder="Payment Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
