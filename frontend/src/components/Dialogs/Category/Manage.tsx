import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CategoryColor,
  CategoryMark,
  type Category,
  type CategoryIconType,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "@/types/category";
import { CategoryIcon } from "@/components/Category/Mark";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/mutations/category";
import { useEffect } from "react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/category";

interface ManageCategoryDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
  category?: Category;
}

const manageCategorySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  mark: z.enum(CategoryMark),
  color: z.enum(CategoryColor),
});

type ManageCategoryFormData = z.infer<typeof manageCategorySchema>;

type CreateCategoryMutationData = {
  createCategory: Category;
};

type UpdateCategoryMutationData = {
  updateCategory: Category;
};

type CreateCategoryMutationVariables = {
  data: CreateCategoryInput;
};

type UpdateCategoryMutationVariables = {
  updateCategoryId: string;
  data: UpdateCategoryInput;
};

export function ManageCategoryDialog({
  open,
  onOpenChange,
  onCreated,
  category,
}: ManageCategoryDialogProps) {
  const form = useForm<ManageCategoryFormData>({
    resolver: zodResolver(manageCategorySchema),
  });

  const [createCategory, createCategoryMutation] = useMutation<
    CreateCategoryMutationData,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso");
      onOpenChange(false);
      onCreated?.();
      form.reset();
    },
    onError() {
      toast.error("Falha ao criar a categoria");
    },
  });

  const [updateCategory, updateCategoryMutation] = useMutation<
    UpdateCategoryMutationData,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES],
    onCompleted() {
      toast.success("Categoria atualizada com sucesso");
      onOpenChange(false);
      onCreated?.();
      form.reset();
    },
    onError() {
      toast.error("Falha ao atualizar a categoria");
    },
  });

  const onSubmit = async (formData: ManageCategoryFormData) => {
    if (category) {
      await updateCategory({
        variables: {
          updateCategoryId: category.id,
          data: {
            id: category.id,
            color: formData.color,
            description: formData.description,
            name: formData.title,
            type: formData.mark,
          },
        },
      });
    } else {
      await createCategory({
        variables: {
          data: {
            color: formData.color,
            description: formData.description,
            name: formData.title,
            type: formData.mark,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (open && category) {
      form.reset({
        title: category.name,
        description: category.description,
        color: category.color as keyof typeof CategoryColor,
        mark: category.type as CategoryMark,
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[28rem] w-full gap-6 rounded-xl">
        <DialogHeader className="">
          <DialogTitle className="text-gray-800 font-bold text-base text-left">
            {category ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>

          <DialogDescription className="text-gray-600 text-sm text-left">
            {category
              ? "Ajuste a categoria"
              : "Organize suas transações com categorias"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.log(e);
          })}
          className="gap-4 flex flex-col w-full"
        >
          <Field className="flex flex-col w-full gap-2">
            <FieldLabel htmlFor="inline-start-input">Título</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="inline-start-input"
                type="text"
                placeholder="Ex. Alimentação"
                {...form.register("title")}
                required
                disabled={
                  createCategoryMutation.loading ||
                  updateCategoryMutation.loading
                }
              />
            </InputGroup>
          </Field>

          <Field className="flex flex-col w-full gap-2">
            <FieldLabel htmlFor="inline-start-input">Descrição</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="inline-start-input"
                type="text"
                placeholder="Descrição da categoria"
                {...form.register("description")}
                disabled={
                  createCategoryMutation.loading ||
                  updateCategoryMutation.loading
                }
              />
            </InputGroup>

            <FieldDescription className="text-gray-500 text-xs">
              Opcional
            </FieldDescription>
          </Field>

          <Controller
            control={form.control}
            name="mark"
            render={({ field }) => (
              <Field>
                <FieldLabel>Ícone</FieldLabel>

                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  variant="outline"
                  disabled={
                    createCategoryMutation.loading ||
                    updateCategoryMutation.loading
                  }
                  className="flex flex-wrap gap-2"
                >
                  {Object.keys(CategoryMark).map((key) => (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label="Light"
                      className="flex [&>svg]:size-5 p-2.5 flex-col items-center justify-center rounded-[8px] size-[2.625rem]"
                      disabled={
                        createCategoryMutation.loading ||
                        updateCategoryMutation.loading
                      }
                    >
                      <CategoryIcon mark={key as CategoryIconType} />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="color"
            render={({ field }) => (
              <Field>
                <FieldLabel>Cor</FieldLabel>

                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  variant="outline"
                  disabled={
                    createCategoryMutation.loading ||
                    updateCategoryMutation.loading
                  }
                  className="flex flex-wrap gap-2"
                >
                  {Object.keys(CategoryColor).map((key) => (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label="Light"
                      disabled={
                        createCategoryMutation.loading ||
                        updateCategoryMutation.loading
                      }
                      className="flex p-1 flex-col items-center justify-center rounded-[8px]"
                    >
                      <div
                        className="h-5 min-w-10 w-full rounded"
                        style={{ backgroundColor: key }}
                      />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}
          />

          <div className="flex w-full justify-end gap-3 pt-2">
            <Button
              type="submit"
              className="w-full"
              size={"md"}
              disabled={
                createCategoryMutation.loading || updateCategoryMutation.loading
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
