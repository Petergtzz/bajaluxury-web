"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

type ExpenseItem = {
  monthlyExpenses: {
    category: string;
    concept: string;
    total_amount: number;
  }[];
};

export function IncomeStatement({ monthlyExpenses = [] }: ExpenseItem) {
  const exchangeRate = 19.0;

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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (category: string) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const formatNumber = (num: number) =>
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight text-sm font-medium">
          Income Statement (USD) -{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex tracking-tight text-sm font-medium py-2 border-b border-gray-700">
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
                  <ChevronDown size={16} strokeWidth={1.0} />
                ) : (
                  <ChevronRight size={16} strokeWidth={1.0} />
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
                  className="flex text-sm py-2 border-b border-gray-200 bg-gray-100 dark:bg-gray-800"
                >
                  <div className="w-1/2 px-8">- {concept.concept}</div>
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

        <div className="flex tracking-tight text-sm font-bold py-2 border-t border-gray-700">
          <div className="w-1/2 px-4">Total</div>
          <div className="w-1/4 px-4 text-right">${formatNumber(total)}</div>
          <div className="w-1/4 px-4 text-right">100%</div>
        </div>
      </CardContent>
    </Card>
  );
}
