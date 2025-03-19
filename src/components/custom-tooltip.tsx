import { formatAmount } from "@/lib/formatter";
import { COLORS } from "@/constants/colors";
import { ALL } from "dns";

const AmountItem = ({
  label,
  amount,
  color,
}: {
  label: string;
  amount: number;
  color: string;
}) => (
  <div className="flex items-center justify-between mb-2">
    <div className="text-gray-900 dark:text-gray-200">
      <span className="mr-2" style={{ color }}>
        ●
      </span>
      {label}:
    </div>
    <div className="text-gray-900 dark:text-gray-200 ml-2">
      {formatAmount(amount)}
    </div>
  </div>
);

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      total_cash_amount: number;
      total_credit_card_amount: number;
      total_check_amount: number;
    };
  }[];
  label?: string;
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { total_cash_amount, total_credit_card_amount, total_check_amount } =
      payload[0].payload;
    const total =
      total_cash_amount + total_credit_card_amount + total_check_amount;

    return (
      <div className="bg-white dark:bg-gray-950 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <AmountItem label="Cash" amount={total_cash_amount} color={COLORS[0]} />
        <AmountItem
          label="Credit Card"
          amount={total_credit_card_amount}
          color={COLORS[2]}
        />
        <AmountItem
          label="Check"
          amount={total_check_amount}
          color={COLORS[4]}
        />

        {/* Divider Line */}
        <hr className="my-2 border-black dark:border-white" />

        <AmountItem label="Total" amount={total} color="#000" />
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
