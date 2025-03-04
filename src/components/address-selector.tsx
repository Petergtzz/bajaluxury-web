"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { fetchAddress } from "@/actions/fetch-admin-data";

export interface Address {
  address: string;
}

interface AddressSelectorProps {
  defaultValue: string;
  onAddressAction: (month: string) => void;
}

export default function AddressSelector({
  defaultValue,
  onAddressAction,
}: AddressSelectorProps) {
  const [data, setData] = useState<Address[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const addresses = await fetchAddress();
      setData(addresses);
    };
    fetchData();
  }, []);

  const handleSelect = (month: string) => {
    onAddressAction(month);
  };

  return (
    <Select onValueChange={handleSelect} value={defaultValue}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Select Address" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((opt) => (
            <SelectItem key={opt.address} value={opt.address}>
              {opt.address}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
