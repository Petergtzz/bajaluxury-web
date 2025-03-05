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
  id: number;
  address: string;
}

interface AddressSelectorProps {
  defaultValue: number;
  onAddressAction: (address: number) => void;
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

  const handleSelect = (houseId: string) => {
    onAddressAction(Number(houseId));
  };

  return (
    <Select onValueChange={handleSelect} value={defaultValue?.toString()}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Select Address" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((opt) => (
            <SelectItem key={opt.id} value={opt.id.toString()}>
              {opt.address}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
