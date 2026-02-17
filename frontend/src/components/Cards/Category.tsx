import { SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Category } from "@/types/category";
import { CategoryIcon, CategoryIconLabels } from "../Category/Mark";
import { useMutation } from "@apollo/client/react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/category";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/category";

interface CategoryCardProps {
  category: Category;
  onSelected: (value: Category) => void;
}

export function CategoryCard({ ...props }: CategoryCardProps) {
  const [deleteCategoryMutation, { loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES],
  });

  const onDeleteCategory = async () => {
    await deleteCategoryMutation({
      variables: {
        deleteCategoryId: props.category.id,
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex w-full justify-between flex-row">
        <span className="size-10">
          <CategoryIcon mark={props.category?.type ?? "GENERAL_EXPENSES"} />
        </span>

        <div className="flex gap-2 justify-end items-start shrink-0">
          <Button
            variant={"outline"}
            className=""
            onClick={onDeleteCategory}
            disabled={loading}
          >
            <Trash />
          </Button>

          <Button
            variant={"outline"}
            className=""
            disabled={loading}
            onClick={() => props.onSelected(props.category)}
          >
            <SquarePen />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle>{props.category?.name ?? ""}</CardTitle>

        <CardDescription>{props.category?.description ?? ""}</CardDescription>
      </CardContent>

      <CardFooter className="justify-between gap-3 items-center">
        <span>
          {CategoryIconLabels[props.category?.type ?? "GENERAL_EXPENSES"]}
        </span>

        <span>{`${props.category?.countTransactions ?? 0} ${props.category?.countTransactions !== 1 ? "itens" : "item"}`}</span>
      </CardFooter>
    </Card>
  );
}
