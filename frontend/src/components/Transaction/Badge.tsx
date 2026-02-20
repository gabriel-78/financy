import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { TransactionType } from "@/types/transaction";
import { twMerge } from "tailwind-merge";

type TransactionBadgeProps = {
  type: TransactionType;
  className?: string;
};

export function TransactionBadge({ type, className }: TransactionBadgeProps) {
  switch (type) {
    case TransactionType.EXPENSE:
      return (
        <div
          className={twMerge(
            `inline-flex text-sm items-center gap-2 font-medium text-green-600 `,
            className,
          )}
        >
          <ArrowUpCircle className="size-5" />

          <span>Entrada</span>
        </div>
      );

    case TransactionType.INCOME:
      return (
        <div
          className={twMerge(
            `inline-flex items-center gap-2 font-medium text-red-600 text-sm`,
            className,
          )}
        >
          <ArrowDownCircle className="size-5" />

          <span>Saída</span>
        </div>
      );

    default:
      return null;
  }
}
