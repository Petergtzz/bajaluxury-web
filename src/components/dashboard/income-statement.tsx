import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ExpenseItem = {
  monthlyExpenses: { category: string; total_amount: number }[];
};

export function IncomeStatement({ monthlyExpenses = [] }: ExpenseItem) {
  const exchangeRate = 19.0;
  const cashExpensesInUsd = monthlyExpenses.map((item) => ({
    ...item,
    total_amount: item.total_amount / exchangeRate,
  }));

  const total = cashExpensesInUsd.reduce(
    (sum, item) => sum + item.total_amount,
    0,
  );

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
        <div className="flex font-bold py-2 border-b border-gray-400">
          <div className="w-1/2 px-4">Category</div>
          <div className="w-1/4 px-4 text-right">Total Cost</div>
          <div className="w-1/4 px-4 text-right">% of Expenses</div>
        </div>

        {/* Expense Rows */}
        {cashExpensesInUsd.map((item, index) => (
          <div key={index} className="flex py-2 border-b border-gray-300">
            <div className="w-1/2 px-8">{item.category}</div>
            <div className="w-1/4 px-4 text-right">
              ${item.total_amount.toFixed(2)}
            </div>
            <div className="w-1/4 px-4 text-right">
              {total
                ? ((item.total_amount / total) * 100).toFixed(2) + "%"
                : "0%"}
            </div>
          </div>
        ))}

        {/* Grand Total Row */}
        <div className="flex font-bold py-2 border-t border-gray-400">
          <div className="w-1/2 px-4">Grand Total</div>
          <div className="w-1/4 px-4 text-right">${total.toFixed(2)}</div>
          <div className="w-1/4 px-4 text-right">100%</div>
        </div>
      </CardContent>
    </Card>
  );
}
