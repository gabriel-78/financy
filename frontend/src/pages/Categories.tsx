import { CategoryCard } from "@/components/Cards/Category";
import { CategoryIcon } from "@/components/Category/Mark";
import { CreateCategoryDialog } from "@/components/Dialogs/Category/Create";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/category";
import type { Category } from "@/types/category";
import { useQuery } from "@apollo/client/react";
import { ArrowUpDown, Plus, Tag } from "lucide-react";
import { useMemo, useState } from "react";

type ListCategoryQueryData = {
  getCategoriesByCreator: Category[];
};

export function Categories() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data, loading, refetch } =
    useQuery<ListCategoryQueryData>(LIST_CATEGORIES);

  const categories = useMemo(() => data?.getCategoriesByCreator ?? [], [data]);

  const mostUsedComumCategory = useMemo(
    () =>
      categories.length === 0
        ? null
        : categories.reduce((max, current) =>
            (current?.countTransactions ?? 0) > (max?.countTransactions ?? 0)
              ? current
              : max,
          ),
    [categories],
  );

  return (
    <div className="flex flex-col p-12 gap-8 w-full">
      <div className="flex w-full ">
        <div className="flex w-full flex-col gap-0.5 justify-start">
          <strong>Categorias</strong>

          <span>Organize suas transações por categorias</span>
        </div>

        <Button type="button" onClick={() => setOpenDialog(true)}>
          <Plus />
          Nova categoria
        </Button>
      </div>

      <div className="flex gap-6">
        <Item variant="muted" className="w-full">
          <ItemMedia variant="default">
            <Tag />
          </ItemMedia>

          <ItemContent>
            <ItemTitle>{Number(categories.length).toString()}</ItemTitle>

            <ItemDescription className="uppercase">
              total de categorias
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item variant="muted" className="w-full">
          <ItemMedia variant="default">
            <ArrowUpDown className="text-purple-base" />
          </ItemMedia>

          <ItemContent>
            <ItemTitle>
              {Number(
                categories.reduce(
                  (acc, { countTransactions }) =>
                    acc + (countTransactions ?? 0),
                  0,
                ),
              ).toString()}
            </ItemTitle>

            <ItemDescription className="uppercase">
              total de transações
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item variant="muted" className="w-full">
          <ItemMedia variant="default">
            <CategoryIcon
              mark={mostUsedComumCategory?.type ?? "GENERAL_EXPENSES"}
            />
          </ItemMedia>

          <ItemContent>
            <ItemTitle>{mostUsedComumCategory?.name ?? ""}</ItemTitle>

            <ItemDescription className="uppercase">
              categoria mais utilizada
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(17.75rem,1fr))] p-px overflow-auto">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
      />
    </div>
  );
}
