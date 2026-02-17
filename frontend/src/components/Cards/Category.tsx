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

interface CategoryCardProps {
  category: Category;
  onDelete: (value: Category) => void;
  onEdit: (value: Category) => void;
}

export function CategoryCard({ ...props }: CategoryCardProps) {
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
            onClick={() => props.onDelete(props.category)}
          >
            <Trash />
          </Button>

          <Button
            variant={"outline"}
            className=""
            onClick={() => props.onEdit(props.category)}
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
