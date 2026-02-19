import { CategoryIcon } from "@/components/Category/Mark";
import { CategoryTag } from "@/components/Category/Tag";
import { ManageTransactionDialog } from "@/components/Dialogs/Transaction/Manage";
import { TransactionBadge } from "@/components/Transaction/Badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transaction";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import type { Transaction } from "@/types/transaction";
import { currencyFormatter } from "@/utils/formatters/currency";
import { useMutation, useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { Plus, SquarePen, Trash } from "lucide-react";
import { useMemo, useState } from "react";

export type ListTransactionQueryData = {
  getTransactionsByUser: Transaction[];
};

const moneyFormatter = currencyFormatter();

export function Transaction() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const [deleteTransaction, deleteTransactionMutation] = useMutation(
    DELETE_TRANSACTION,
    {
      refetchQueries: [LIST_TRANSACTIONS],
    },
  );

  const onDeleteTransaction = async (id: string) => {
    await deleteTransaction({
      variables: {
        deleteTransactionId: id,
      },
    });
  };

  const transactionsQuery =
    useQuery<ListTransactionQueryData>(LIST_TRANSACTIONS);

  const transactions = useMemo(
    () => transactionsQuery.data?.getTransactionsByUser ?? [],
    [transactionsQuery.data],
  );

  return (
    <div className="flex flex-col p-12 gap-8 w-full">
      <div className="flex w-full ">
        <div className="flex w-full flex-col gap-0.5 justify-start">
          <strong className="text-gray-800 font-bold text-2xl">
            Transações
          </strong>

          <span className="text-gray-600 text-base">
            Gerencie todas as suas transações financeiras
          </span>
        </div>

        <Button type="button" onClick={() => setOpenDialog(true)}>
          <Plus />
          Nova transação
        </Button>
      </div>

      <Table className="">
        <TableHeader className="sticky bg-background top-0">
          <TableRow>
            <TableHead className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium text-left">
              Descrição
            </TableHead>

            <TableHead className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium text-center">
              Data
            </TableHead>

            <TableHead className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium text-center">
              Categoria
            </TableHead>

            <TableHead className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium text-center">
              Tipo
            </TableHead>

            <TableHead className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium text-right">
              Valor
            </TableHead>

            <TableHead className="uppercase text-xs tracking-[0.0375rem] text-gray-500 font-medium text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="p-0">
              <TableCell className="font-medium">
                <div className="flex grow items-center justify-start gap-4">
                  <CategoryTag
                    color={transaction?.category?.color ?? ""}
                    className="[&>svg]:size-4 p-3 rounded-[8px]"
                  >
                    <CategoryIcon
                      mark={transaction?.category?.type ?? "GENERAL_EXPENSES"}
                    />
                  </CategoryTag>

                  <span className="text-base text-gray-800 font-medium">
                    {transaction.description}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <span className="w-full text-sm text-gray-600 font-normal">
                  {format(new Date(transaction.date), "dd/MM/yyyy")}
                </span>
              </TableCell>

              <TableCell className="">
                <div className="flex grow overflow-hidden items-center justify-center">
                  <CategoryTag color={transaction?.category?.color ?? ""}>
                    {transaction.category?.name}
                  </CategoryTag>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex grow overflow-hidden items-center justify-center">
                  <TransactionBadge type={transaction.type} />
                </div>
              </TableCell>

              <TableCell className="text-right">
                <span className="text-sm text-gray-800 font-semibold">
                  {`${transaction.amount > 0 ? "+" : "-"}${moneyFormatter.format(transaction.amount)}`}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex grow items-center justify-end gap-2">
                  <IconButton
                    variant={"destructive"}
                    className=""
                    onClick={() => onDeleteTransaction(transaction.id)}
                    // disabled={loading}
                  >
                    <Trash />
                  </IconButton>

                  <IconButton
                    className=""
                    // disabled={loading}
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <SquarePen />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* <TableFooter className="sticky bg-background bottom-0">
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>

            <TableCell colSpan={3} className="text-right">
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>

      <ManageTransactionDialog
        open={openDialog || !!selectedTransaction}
        onOpenChange={(value) => {
          setOpenDialog(value);
          if (!value) setSelectedTransaction(undefined);
        }}
        transaction={selectedTransaction}
      />
    </div>
  );
}
