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
import { CategoryIcon } from "../Category/Mark";
import { useMutation } from "@apollo/client/react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/category";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/category";
import { CategoryTag } from "../Category/Tag";
import { IconButton } from "../ui/icon-button";

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
          <CategoryTag
            color={props.category.color}
            className="[&>svg]:size-4 p-3 rounded-[8px]"
          >
            <CategoryIcon mark={props.category?.type ?? "GENERAL_EXPENSES"} />
          </CategoryTag>
        </span>

        <div className="flex gap-2 justify-end items-start shrink-0">
          <IconButton
            variant={"destructive"}
            className=""
            onClick={onDeleteCategory}
            disabled={loading}
          >
            <Trash />
          </IconButton>

          <IconButton
            className=""
            disabled={loading}
            onClick={() => props.onSelected(props.category)}
          >
            <SquarePen />
          </IconButton>
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle className="text-base text-gray-800 font-semibold">
          {props.category?.name ?? ""}
        </CardTitle>

        <CardDescription className="text-gray-600 text-sm font-normal">
          {props.category?.description ?? ""}
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-between gap-3 items-center">
        <CategoryTag color={props.category.color}>
          {props.category.name ?? ""}
        </CategoryTag>

        <span className="text-gray-600 text-sm whitespace-nowrap">{`${props.category?.countTransactions ?? 0} ${props.category?.countTransactions !== 1 ? "itens" : "item"}`}</span>
      </CardFooter>
    </Card>
  );
}
