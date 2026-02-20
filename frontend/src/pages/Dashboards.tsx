import { CategoryIcon } from "@/components/Category/Mark";
import { CategoryTag } from "@/components/Category/Tag";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { currencyFormatter } from "@/utils/formatters/currency";
import { useQuery } from "@apollo/client/react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Plus,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import type { ListTransactionQueryData } from "./Transactions";
import { TransactionType, type Transaction } from "@/types/transaction";
import { endOfMonth, format, isWithinInterval, startOfMonth } from "date-fns";
import { ManageTransactionDialog } from "@/components/Dialogs/Transaction/Manage";

const moneyFormatter = currencyFormatter();

const start = startOfMonth(new Date());
const end = endOfMonth(new Date());

type CategorySummary = {
  id: string;
  name: string;
  transactionsCount: number;
  total: number;
  color: string;
};

function summarizeByCategory(transactions: Transaction[]): CategorySummary[] {
  const map = new Map<string, CategorySummary>();

  for (const transaction of transactions) {
    const category = transaction.category;
    if (!category) continue;

    const signedAmount =
      transaction.type === TransactionType.INCOME
        ? transaction.amount
        : -transaction.amount;

    const existing = map.get(category.id);

    if (existing) {
      existing.transactionsCount += 1;
      existing.total += signedAmount;
    } else {
      map.set(category.id, {
        id: category.id,
        name: category.name,
        transactionsCount: 1,
        total: signedAmount,
        color: category.color,
      });
    }
  }

  return Array.from(map.values());
}

export function Dashboards() {
  const [
    isVisibleManageTransactionDialog,
    setIsVisibleManageTransactionDialog,
  ] = useState<boolean>(false);

  const navigate = useNavigate();

  const transactionsQuery =
    useQuery<ListTransactionQueryData>(LIST_TRANSACTIONS);

  const transactions = useMemo(
    () =>
      transactionsQuery.data?.getTransactionsByUser
        ? [...transactionsQuery.data.getTransactionsByUser].sort(
            (left, right) =>
              new Date(right.createdAt!).getTime() -
              new Date(left.createdAt!).getTime(),
          )
        : [],
    [transactionsQuery.data],
  );

  const userBudget = useMemo(() => {
    return transactions.reduce(
      (acc, { amount, type }) =>
        type === TransactionType.INCOME ? acc + amount : acc - amount,
      0,
    );
  }, [transactions]);

  const thisMonthBudget = useMemo(() => {
    return transactions
      .filter(({ date }) =>
        isWithinInterval(new Date(date), {
          start,
          end,
        }),
      )
      .reduce(
        (acc, { amount, type }) => {
          return {
            income:
              type === TransactionType.INCOME
                ? acc.income + amount
                : acc.income,
            expense:
              type === TransactionType.EXPENSE
                ? acc.expense + amount
                : acc.expense,
          };
        },
        { income: 0, expense: 0 },
      );
  }, [transactions]);

  const groupedTransaction = useMemo(() => {
    return summarizeByCategory(transactions);
  }, [transactions]);

  return (
    <div className="grid grid-cols-6 p-12 gap-6 w-full overflow-hidden auto-rows-auto">
      <Item variant="muted" className="w-full col-span-2 gap-4">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <Wallet className="text-purple-base" />
          </ItemMedia>

          <ItemDescription className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium">
            Saldo total
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle className="text-gray-800 font-bold text-[1.75rem] leading-8">{`${userBudget >= 0 ? "" : "- "}${moneyFormatter.format(userBudget)}`}</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="muted" className="w-full col-span-2 gap-4">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <ArrowUpCircle className="text-brand-base size-5" />
          </ItemMedia>

          <ItemDescription className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium">
            Receitas do mês
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle className="text-gray-800 font-bold text-[1.75rem] leading-8">
            {moneyFormatter.format(thisMonthBudget.income)}
          </ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="muted" className="w-full col-span-2 gap-4">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <ArrowDownCircle className="text-red-base size-5" />
          </ItemMedia>

          <ItemDescription className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium">
            Despesas do mês
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle className="text-gray-800 font-bold text-[1.75rem] leading-8">
            {moneyFormatter.format(thisMonthBudget.expense)}
          </ItemTitle>
        </ItemContent>
      </Item>

      <div className="flex grow overflow-auto col-span-4 p-px">
        <Card className="max-h-full h-fit overflow-auto w-full">
          <CardHeader className="flex flex-row items-center p-5 pr-3 gap-4 border-b sticky bg-background border-solid border-b-gray-200 justify-between top-0">
            <CardTitle className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium">
              Transações recentes
            </CardTitle>

            <Button
              variant={"link"}
              type="button"
              onClick={() => navigate("/transactions")}
            >
              Ver todas
              <ChevronRight />
            </Button>
          </CardHeader>

          <CardContent className="flex h-full flex-col p-0 overflow-auto">
            {transactions.map((transaction) => (
              <div
                className="grid grid-cols-[1fr_minmax(8rem,10rem)_minmax(5rem,8rem)_] w-full min-h-fit overflow-hidden items-center justify-between gap-3 px-6 py-5 border-t border-solid border-t-gray-200 first:border-t-transparent"
                key={transaction.id}
              >
                <div className="flex grow overflow-hidden items-center justify-start gap-4">
                  <CategoryTag
                    color={transaction.category?.color ?? ""}
                    className="[&>svg]:size-5 size-10 rounded-[8px] shrink-0"
                  >
                    <CategoryIcon
                      mark={transaction.category?.type ?? "GENERAL_EXPENSES"}
                    />
                  </CategoryTag>

                  <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                    <strong className="font-medium text-base text-gray-800 truncate">
                      {transaction.description}
                    </strong>

                    <small className="font-normal text-sm text-gray-600 truncate">
                      {format(new Date(transaction.date), "dd/MM/yyyy")}
                    </small>
                  </div>
                </div>

                <div className="flex grow items-center justify-center">
                  <CategoryTag color={transaction.category?.color ?? ""}>
                    <span className="truncate">
                      {transaction.category?.name ?? ""}
                    </span>
                  </CategoryTag>
                </div>

                <div className="flex grow items-center justify-end gap-2">
                  <span className="truncate text-sm text-gray-800 font-semibold">
                    {`${transaction.type === TransactionType.INCOME ? "+" : "-"} ${moneyFormatter.format(transaction.amount)}`}
                  </span>

                  {transaction.type === TransactionType.INCOME ? (
                    <ArrowUpCircle className="text-brand-base size-4" />
                  ) : (
                    <ArrowDownCircle className="text-red-base size-4" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex w-full items-center justify-center sticky bottom-0 bg-background py-5 px-6 border-t border-solid border-t-gray-200">
            <Button
              variant={"link"}
              type="button"
              onClick={() => setIsVisibleManageTransactionDialog(true)}
            >
              <Plus />
              Ver todas as transações
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex grow overflow-auto col-span-2 p-px">
        <Card className="max-h-full h-fit overflow-auto w-full">
          <CardHeader className="flex flex-row items-center px-6 py-5 gap-4 border-b sticky bg-background border-solid border-b-gray-200 justify-between top-0">
            <CardTitle className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium">
              Categorias
            </CardTitle>

            <Button
              type="button"
              variant={"link"}
              onClick={() => navigate("/categories")}
            >
              Gerenciar
              <ChevronRight />
            </Button>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-5 overflow-auto p-6">
            {groupedTransaction.map((category) => (
              <div
                className="flex w-full min-h-fit overflow-hidden items-center justify-between gap-3"
                key={category.id}
              >
                <CategoryTag color={category.color}>
                  <span className="truncate">{category.name}</span>
                </CategoryTag>

                <div className="flex min-w-fit items-center justify-end gap-3 shrink-0">
                  <small className="text-sm font-normal text-gray-600">{`${category.transactionsCount} ${category.transactionsCount !== 1 ? "itens" : "item"}`}</small>

                  <strong className="text-sm font-semibold text-gray-800">
                    {moneyFormatter.format(category.total)}
                  </strong>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ManageTransactionDialog
        open={isVisibleManageTransactionDialog}
        onOpenChange={setIsVisibleManageTransactionDialog}
      />
    </div>
  );
}
