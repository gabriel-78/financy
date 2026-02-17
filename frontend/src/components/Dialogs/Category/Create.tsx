import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
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
} from "@/types/category";
import { CategoryIcon } from "@/components/Category/Mark";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/category";

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
}

const createCategorySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  mark: z.enum(CategoryMark),
  color: z.enum(CategoryColor),
});

type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

type CreateCategoryMutationData = {
  createCategory: Category;
};

type CreateCategoryMutationVariables = {
  data: CreateCategoryInput;
};

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryDialogProps) {
  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const [createCategory, { loading }] = useMutation<
    CreateCategoryMutationData,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY, {
    onCompleted() {
      toast.success("Cateoria criada com sucesso");
      onOpenChange(false);
      onCreated?.();
      form.reset();
    },
    onError() {
      toast.error("Falha ao criar a categoria");
    },
  });

  const onSubmit = (formData: CreateCategoryFormData) => {
    createCategory({
      variables: {
        data: {
          color: formData.color,
          description: formData.description,
          name: formData.title,
          type: formData.mark,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[28rem] w-full">
        <DialogHeader className="space-y-2">
          <DialogTitle
            className="text-2xl font-bold leading-tight"
            onMouseEnter={() => console.log(form.getValues())}
          >
            Nova categoria
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.log(e);
          })}
          className="space-y-5 mt-6"
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
                disabled={loading}
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
                disabled={loading}
              />
            </InputGroup>

            <FieldDescription>Opcional</FieldDescription>
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
                  disabled={loading}
                  className="flex flex-wrap gap-2"
                >
                  {Object.keys(CategoryMark).map((key) => (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label="Light"
                      className="flex [&>svg]:size-5 p-2.5 flex-col items-center justify-center rounded-[8px] size-[2.625rem]"
                      disabled={loading}
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
                  disabled={loading}
                  className="flex flex-wrap gap-2"
                >
                  {Object.keys(CategoryColor).map((key) => (
                    <ToggleGroupItem
                      key={key}
                      value={key}
                      aria-label="Light"
                      disabled={loading}
                      className="flex p-1 flex-col items-center justify-center rounded-[8px]"
                    >
                      <div
                        className="h-5 w-10 w-full rounded"
                        style={{ backgroundColor: key }}
                      />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}
          />

          <div className="flex w-full justify-end gap-3 pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
