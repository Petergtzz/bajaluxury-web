"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface MonthSelectorProps {
  defaultValue: string;
  onMonthAction: (month: string) => void;
}

export default function MonthSelector({
  defaultValue,
  onMonthAction,
}: MonthSelectorProps) {
  const now = new Date();

  // Create an array of 7 options (current month and 6 prior months)
  const options = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    return { value: formatted, label };
  });

  // When a new month is selected, update the URL so the server component re-renders.
  const handleSelect = (month: string) => {
    onMonthAction(month);
  };

  return (
    <Select onValueChange={handleSelect} value={defaultValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
