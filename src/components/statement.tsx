"use client";
import { fetchIncomeStatementData } from "@/actions/fetch-turso-data";
import Loading from "@/components/loading-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { exchangeRate } from "@/constants/exchange-rate";
import { formatAmount } from "@/lib/formatter";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AlertDestructive } from "@/components/error-message";

type Statement = {
  house_id: number;
  month: string;
};

export default function IncomeStatement({ house_id, month }: Statement) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Format the month for display in the header
  const [year, mon] = month.split("-");
  const displayedDate = new Date(Number(year), Number(mon) - 1, 1);

  const {
    data: expenses,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["expenses", house_id, month],
    queryFn: () => fetchIncomeStatementData(house_id, month),
    enabled: house_id !== null && house_id !== undefined,
  });

  if (isError) {
    return <AlertDestructive message={error.message} />;
  }

  if (isPending) {
    return <Loading />;
  }

  // Group expenses by category
  const groupedExpenses = (expenses || []).reduce(
    (acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = {
          total: 0,
          concepts: [] as {
            concept: string;
            method: string;
            date: string;
            description: string;
            total_amount: number;
          }[],
        };
      }
      // Convert to USD using the exchange rate
      acc[category].total += item.total_amount / exchangeRate;
      acc[category].concepts.push({
        concept: item.concept,
        method: item.method,
        date: item.date,
        description: item.description,
        total_amount: item.total_amount / exchangeRate,
      });
      return acc;
    },
    {} as Record<
      string,
      {
        total: number;
        concepts: {
          concept: string;
          method: string;
          date: string;
          description: string;
          total_amount: number;
        }[];
      }
    >,
  );

  // Calculate overall totals for expenses and incomes
  const total = Object.values(groupedExpenses).reduce(
    (sum, group) => sum + group.total,
    0,
  );

  // Toggle the expansion for a given category
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
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex tracking-tight text-sm font-medium py-2 border-b border-gray-700 dark:border-gray-100">
          <div className="w-1/2 px-4">Category</div>
          <div className="w-1/4 px-4 text-right">Amount</div>
          <div className="w-1/4 px-4 text-right">% of Expenses</div>
        </div>

        {Object.entries(groupedExpenses).map(([category, data]) => (
          <div key={category}>
            <div
              className="flex tracking-tight text-sm font-medium py-2 border-b border-gray-300 cursor-pointer"
              onClick={() => toggleExpand(category)}
            >
              <div className="w-1/2 tracking-tight text-sm font-medium flex items-center">
                <span className="flex-shrink-0 mr-2">
                  {expanded[category] ? (
                    <ChevronDown className="w-4 h-4 stroke-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 stroke-1" />
                  )}
                </span>
                <span className="truncate" title={category}>
                  {category}
                </span>
              </div>
              <div className="w-1/4 px-4 text-right ">
                {formatAmount(data.total)}
              </div>
              <div className="w-1/4 px-4 text-right">
                {total ? ((data.total / total) * 100).toFixed(1) + "%" : "0%"}
              </div>
            </div>
            {expanded[category] &&
              data.concepts.map((concept, index) => (
                <div
                  key={index}
                  className="flex text-sm tracking-light py-2 border-b border-gray-300 bg-gray-100 dark:bg-gray-800"
                >
                  <div className="w-1/2 px-8">
                    <Tooltip>
                      <TooltipTrigger title={concept.concept}>
                        {concept.concept}
                      </TooltipTrigger>
                      <TooltipContent title={concept.description}>
                        {concept.description}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="w-1/4 px-4 text-right">
                    {formatAmount(concept.total_amount)}
                  </div>
                  <div className="w-1/4 px-4 text-right">
                    {((concept.total_amount / data.total) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
          </div>
        ))}

        <div className="flex tracking-tight text-sm font-bold py-2 border-t border-gray-700 ">
          <div className="w-1/2 px-4">Total</div>
          <div className="w-1/4 px-4 text-right">{formatAmount(total)}</div>
          <div className="w-1/4 px-4 text-right">100%</div>
        </div>
      </CardContent>
    </Card>
  );
}
