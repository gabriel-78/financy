import { CategoryIcon } from "@/components/Category/Mark";
import { CategoryTag } from "@/components/Category/Tag";
import { ManageTransactionDialog } from "@/components/Dialogs/Transaction/Manage";
import { TransactionBadge } from "@/components/Transaction/Badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import type { Transaction } from "@/types/transaction";
import { useQuery } from "@apollo/client/react";
import { Plus, SquarePen, Trash } from "lucide-react";
import { useMemo, useState } from "react";

type ListCategoryQueryData = {
  getTransactionsByUser: Transaction[];
};

export function Transaction() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const transactionsQuery = useQuery<ListCategoryQueryData>(LIST_TRANSACTIONS);

  const transactions = useMemo(
    () => transactionsQuery.data?.getTransactionsByUser ?? [],
    [transactionsQuery.data],
  );

  return (
    <div className="flex flex-col p-12 gap-8 w-full">
      <div className="flex w-full ">
        <div className="flex w-full flex-col gap-0.5 justify-start">
          <strong>Transações</strong>

          <span>Gerencie todas as suas transações financeiras</span>
        </div>

        <Button type="button" onClick={() => setOpenDialog(true)}>
          <Plus />
          Nova transação
        </Button>
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Descrição</TableHead>

            <TableHead>Data</TableHead>

            <TableHead>Categoria</TableHead>

            <TableHead className="text-right">Tipo</TableHead>

            <TableHead className="text-right">Valor</TableHead>

            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                <CategoryTag
                  color={transaction?.category?.color ?? ""}
                  className="[&>svg]:size-4 p-3 rounded-[8px]"
                >
                  <CategoryIcon
                    mark={transaction?.category?.type ?? "GENERAL_EXPENSES"}
                  />
                </CategoryTag>

                <span>{transaction.description}</span>
              </TableCell>

              <TableCell>{transaction.date}</TableCell>

              <TableCell>
                <CategoryTag color={transaction?.category?.color ?? ""}>
                  {transaction.category?.name}
                </CategoryTag>
              </TableCell>

              <TableCell className="text-right">
                <TransactionBadge type={transaction.type} />
              </TableCell>

              <TableCell className="text-right">{transaction.amount}</TableCell>

              <TableCell className="text-right">
                <Button
                  variant={"outline"}
                  className=""
                  // onClick={onDeleteCategory}
                  // disabled={loading}
                >
                  <Trash />
                </Button>

                <Button
                  variant={"outline"}
                  className=""
                  // disabled={loading}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <SquarePen />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>

            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
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
