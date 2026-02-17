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

export function CategoryCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex w-full justify-between flex-row">
        <span className="size-10">mark</span>

        <div className="flex gap-2 justify-end items-start shrink-0">
          <Button variant={"outline"} className="">
            <Trash />
          </Button>

          <Button variant={"outline"} className="">
            <SquarePen />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle>Teste</CardTitle>

        <CardDescription>Teste descrição</CardDescription>
      </CardContent>

      <CardFooter className="justify-between gap-3 items-center">
        <span>mark</span>

        <span>{`x itens`}</span>
      </CardFooter>
    </Card>
  );
}
