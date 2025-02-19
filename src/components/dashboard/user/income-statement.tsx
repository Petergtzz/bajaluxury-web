"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/format-data";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type ExpenseItem = {
  monthlyExpenses: {
    category: string;
    concept: string;
    total_amount: number;
  }[];
  month: string;
};

export function IncomeStatement({ monthlyExpenses = [], month }: ExpenseItem) {
  const exchangeRate = 19.0;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Convert date to long format
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  // Group expenses by category
  const groupedExpenses = monthlyExpenses.reduce(
    (acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = { total: 0, concepts: [] };
      }
      acc[category].total += item.total_amount / exchangeRate;
      acc[category].concepts.push({
        concept: item.concept,
        total_amount: item.total_amount / exchangeRate,
      });
      return acc;
    },
    {} as Record<
      string,
      { total: number; concepts: { concept: string; total_amount: number }[] }
    >,
  );

  const total = Object.values(groupedExpenses).reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const toggleExpand = (category: string) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight text-sm font-medium">
          Income Statement (USD) -{" "}
          {displayedDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex tracking-tight text-sm font-medium py-2 border-b border-gray-700 dark:border-gray-100">
          <div className="w-1/2 px-4">Category</div>
          <div className="w-1/4 px-4 text-right">Total Cost</div>
          <div className="w-1/4 px-4 text-right">% of Expenses</div>
        </div>

        {Object.entries(groupedExpenses).map(([category, data]) => (
          <div key={category}>
            <div
              className="flex tracking-tight text-sm font-medium py-2 border-b border-gray-300 cursor-pointer"
              onClick={() => toggleExpand(category)}
            >
              <div className="w-1/2 tracking-tight text-sm font-medium px-4 flex items-center">
                {expanded[category] ? (
                  <ChevronDown className="w-4 h-4 stroke-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 stroke-1" />
                )}{" "}
                {category}
              </div>
              <div className="w-1/4 px-4 text-right ">
                <span className="mr-1">$</span>
                {formatNumber(data.total)}
              </div>
              <div className="w-1/4 px-4 text-right">
                {total ? ((data.total / total) * 100).toFixed(2) + "%" : "0%"}
              </div>
            </div>
            {expanded[category] &&
              data.concepts.map((concept, index) => (
                <div
                  key={index}
                  className="flex text-sm py-2 border-b border-gray-300 bg-gray-100 dark:bg-gray-800"
                >
                  <div className="w-1/2 px-8"> - {concept.concept}</div>
                  <div className="w-1/4 px-4 text-right">
                    <span className="mr-1">$</span>
                    {formatNumber(concept.total_amount)}
                  </div>
                  <div className="w-1/4 px-4 text-right">
                    {((concept.total_amount / data.total) * 100).toFixed(2)}%
                  </div>
                </div>
              ))}
          </div>
        ))}

        <div className="flex tracking-tight text-sm font-bold py-2 border-t border-gray-700 ">
          <div className="w-1/2 px-4">Total</div>
          <div className="w-1/4 px-4 text-right">
            <span className="mr-1">$</span>
            {formatNumber(total)}
          </div>
          <div className="w-1/4 px-4 text-right">100%</div>
        </div>
      </CardContent>
    </Card>
  );
}
