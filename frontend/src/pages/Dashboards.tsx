import { CategoryIcon } from "@/components/Category/Mark";
import { CategoryTag } from "@/components/Category/Tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import type { ListTransactionQueryData } from "./Transactions";
import { TransactionType, type Transaction } from "@/types/transaction";
import { endOfMonth, isWithinInterval, startOfMonth } from "date-fns";

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
    <div className="grid grid-cols-6 p-12 gap-6 w-full overflow-hidden">
      <Item variant="muted" className="w-full col-span-2">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <Wallet className="text-purple-base" />
          </ItemMedia>

          <ItemDescription className="uppercase">Saldo total</ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>{`${userBudget >= 0 ? "" : "- "}${moneyFormatter.format(userBudget)}`}</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="muted" className="w-full col-span-2">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <ArrowUpCircle className="text-brand-base" />
          </ItemMedia>

          <ItemDescription className="uppercase">
            Receitas do mês
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>{moneyFormatter.format(thisMonthBudget.income)}</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="muted" className="w-full col-span-2">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <ArrowDownCircle className="text-red-base" />
          </ItemMedia>

          <ItemDescription className="uppercase">
            Despesas do mês
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>
            {moneyFormatter.format(thisMonthBudget.expense)}
          </ItemTitle>
        </ItemContent>
      </Item>

      <div className="flex grow overflow-auto col-span-4 p-px">
        <Card className="max-h-full h-fit overflow-auto w-full">
          <CardHeader className="flex flex-row items-center gap-4 border-b sticky bg-background border-solid border-b-gray-200 justify-between top-0">
            <CardTitle>Transações recentes</CardTitle>

            <Button type="button" onClick={() => navigate("/transactions")}>
              Ver todas
              <ChevronRight />
            </Button>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-5 pt-6 overflow-auto">
            {transactions.map((transaction) => (
              <div
                className="grid grid-cols-[1fr_minmax(8rem,10rem)_minmax(5rem,8rem)_] w-full min-h-fit overflow-hidden items-center justify-between gap-3"
                key={transaction.id}
              >
                <div className="flex grow overflow-hidden items-center justify-start gap-4">
                  <CategoryTag
                    color={transaction.category?.color ?? ""}
                    className="[&>svg]:size-4 p-3 rounded-[8px] shrink-0"
                  >
                    <CategoryIcon
                      mark={transaction.category?.type ?? "GENERAL_EXPENSES"}
                    />
                  </CategoryTag>

                  <span className="truncate">{transaction.description}</span>
                </div>

                <div className="flex grow items-center justify-center">
                  <CategoryTag color={transaction.category?.color ?? ""}>
                    <span className="truncate">
                      {transaction.category?.name ?? ""}
                    </span>
                  </CategoryTag>
                </div>

                <div className="flex grow items-center justify-end gap-2">
                  <span className="truncate">
                    {moneyFormatter.format(transaction.amount)}
                  </span>

                  {transaction.type === TransactionType.INCOME ? (
                    <ArrowUpCircle className="text-brand-base" />
                  ) : (
                    <ArrowDownCircle className="text-red-base" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex grow overflow-auto col-span-2 p-px">
        <Card className="max-h-full h-fit overflow-auto w-full">
          <CardHeader className="flex flex-row items-center gap-4 border-b sticky bg-background border-solid border-b-gray-200 justify-between top-0">
            <CardTitle>Categorias</CardTitle>

            <Button type="button" onClick={() => navigate("/categories")}>
              Gerenciar
              <ChevronRight />
            </Button>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-5 pt-6 overflow-auto">
            {groupedTransaction.map((category) => (
              <div
                className="flex w-full min-h-fit overflow-hidden items-center justify-between gap-3"
                key={category.id}
              >
                <CategoryTag color={category.color}>
                  <span className="truncate">{category.name}</span>
                </CategoryTag>

                <div className="flex min-w-fit items-center justify-end gap-3 shrink-0">
                  <span>{`${category.transactionsCount} ${category.transactionsCount !== 1 ? "itens" : "item"}`}</span>

                  <span>{moneyFormatter.format(category.total)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
