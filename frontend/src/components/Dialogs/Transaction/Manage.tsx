import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import {
  TransactionType,
  type CreateTransactionInput,
  type Transaction,
  type UpdateTransactionInput,
} from "@/types/transaction";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencyFormatter } from "@/utils/formatters/currency";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/transaction";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/category";
import type { ListCategoryQueryData } from "@/pages/Categories";

interface ManageTransactionDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
  transaction?: Transaction;
}

const manageTransactionSchema = z.object({
  description: z.string(),
  type: z.enum(TransactionType),
  date: z.date(),
  amount: z.number(),
  category: z.string(),
});

type ManageTransactionFormData = z.infer<typeof manageTransactionSchema>;

type CreateTransactionMutationData = {
  createTransaction: Transaction;
};

type UpdateTransactionMutationData = {
  updateTransaction: Transaction;
};

type CreateTransactionMutationVariables = {
  data: CreateTransactionInput;
};

type UpdateTransactionMutationVariables = {
  updateTransactionId: string;
  data: UpdateTransactionInput;
};

const moneyFormatter = currencyFormatter();

export function ManageTransactionDialog({
  open,
  onOpenChange,
  onCreated,
  transaction: transaction,
}: ManageTransactionDialogProps) {
  const form = useForm<ManageTransactionFormData>({
    resolver: zodResolver(manageTransactionSchema),
  });

  const categoriesQuery = useQuery<ListCategoryQueryData>(LIST_CATEGORIES);

  const categories = useMemo(
    () => categoriesQuery.data?.getCategoriesByCreator ?? [],
    [categoriesQuery.data],
  );

  const [createTransaction, createTransactionMutation] = useMutation<
    CreateTransactionMutationData,
    CreateTransactionMutationVariables
  >(CREATE_TRANSACTION, {
    refetchQueries: [LIST_TRANSACTIONS],
    onCompleted() {
      toast.success("Transação criada com sucesso");

      onOpenChange(false);

      onCreated?.();

      form.reset();
    },
    onError() {
      toast.error("Falha ao criar a transação");
    },
  });

  const [updateTransaction, updateTransactionMutation] = useMutation<
    UpdateTransactionMutationData,
    UpdateTransactionMutationVariables
  >(UPDATE_TRANSACTION, {
    refetchQueries: [LIST_TRANSACTIONS],
    onCompleted() {
      toast.success("Transação atualizada com sucesso");

      onOpenChange(false);

      onCreated?.();

      form.reset();
    },
    onError() {
      toast.error("Falha ao atualizar a transação");
    },
  });

  const onSubmit = async (formData: ManageTransactionFormData) => {
    if (transaction) {
      await updateTransaction({
        variables: {
          updateTransactionId: transaction.id,
          data: {
            id: transaction.id,
            description: formData.description,
            amount: formData.amount,
            categoryId: formData.category,
            date: formData.date.toISOString(),
            type: formData.type,
          },
        },
      });
    } else {
      await createTransaction({
        variables: {
          data: {
            description: formData.description,
            amount: formData.amount,
            categoryId: formData.category,
            date: formData.date.toISOString(),
            type: formData.type,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (open && transaction) {
      form.reset({
        description: transaction.description,
        amount: transaction.amount,
        category: transaction.categoryId,
        date: new Date(transaction.date),
        type: transaction.type,
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[28rem] w-full gap-6 rounded-xl">
        <DialogHeader className="">
          <DialogTitle className="text-gray-800 font-bold text-base text-left">
            {transaction ? "Editar transação" : "Nova transação"}
          </DialogTitle>

          <DialogDescription className="text-gray-600 text-sm text-left">
            {transaction
              ? "Ajuste a sua despesa ou receita"
              : "Registre sua despesa ou receita"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.log(e);
          })}
          className="gap-4 flex flex-col w-full"
        >
          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <Field className="pb-2">
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  variant="outline"
                  disabled={
                    createTransactionMutation.loading ||
                    updateTransactionMutation.loading
                  }
                  className="flex border border-solid border-gray-200 rounded-xl p-2"
                >
                  {Object.keys(TransactionType).map((key) => (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label="Light"
                      className="flex [&>svg]:size-4 p-3 items-center justify-center rounded-[8px] w-full data-[transaction=EXPENSE]:data-[state=on]:border-success data-[transaction=INCOME]:data-[state=on]:border-danger data-[state=on]:bg-gray-100 [&_svg]:data-[transaction=INCOME]:data-[state=on]:text-danger [&_svg]:data-[transaction=EXPENSE]:data-[state=on]:text-success data-[state=off]:border-transparent [&_svg]:data-[state=off]:text-gray-600 data-[state=off]:text-gray-600 data-[state=off]:font-normal shadow-none"
                      disabled={
                        createTransactionMutation.loading ||
                        updateTransactionMutation.loading
                      }
                      data-transaction={key}
                    >
                      {key === TransactionType.EXPENSE ? (
                        <ArrowUpCircle />
                      ) : (
                        <ArrowDownCircle />
                      )}

                      <span>
                        {key === TransactionType.EXPENSE
                          ? "Receita"
                          : "Despesa"}
                      </span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}
          />

          <Field className="flex flex-col w-full gap-2">
            <FieldLabel htmlFor="inline-start-input">Descrição</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="inline-start-input"
                type="text"
                placeholder="Ex. Almoço no restaurante"
                {...form.register("description")}
                disabled={
                  createTransactionMutation.loading ||
                  updateTransactionMutation.loading
                }
              />
            </InputGroup>
          </Field>

          <div className="flex w-full gap-4">
            <Controller
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <Field className="flex flex-col w-full gap-2">
                    <FieldLabel htmlFor="date-picker-simple">Data</FieldLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <InputGroup>
                          <InputGroupInput
                            id="date-picker-simple"
                            type="text"
                            placeholder="Selecione"
                            value={
                              field.value ? format(field.value, "PPP") : ""
                            }
                            disabled={
                              createTransactionMutation.loading ||
                              updateTransactionMutation.loading
                            }
                          />
                        </InputGroup>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          defaultMonth={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                );
              }}
            />

            <Controller
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <Field className="flex flex-col w-full gap-2">
                    <FieldLabel htmlFor="inline-start-input">Valor</FieldLabel>

                    <InputGroup>
                      <InputGroupInput
                        id="inline-start-input"
                        type="text"
                        placeholder={moneyFormatter.format(0)}
                        value={moneyFormatter.format(field.value)}
                        onChange={(e) => {
                          const adjustedvalue = moneyFormatter.parse(
                            e.currentTarget.value,
                          );

                          field.onChange(Number(adjustedvalue));
                        }}
                        disabled={
                          createTransactionMutation.loading ||
                          updateTransactionMutation.loading
                        }
                      />
                    </InputGroup>
                  </Field>
                );
              }}
            />
          </div>

          <Controller
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <Field className="flex flex-col w-full gap-2">
                  <FieldLabel htmlFor="date-picker-simple">
                    Categoria
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />

          <div className="flex w-full pt-2">
            <Button
              type="submit"
              className="w-full"
              size={"md"}
              disabled={
                createTransactionMutation.loading ||
                updateTransactionMutation.loading
              }
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
