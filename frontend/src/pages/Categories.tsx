import { CategoryCard } from "@/components/Cards/Category";
import { CreateCategoryDialog } from "@/components/Dialogs/Category/Create";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ArrowUpDown, Plus, Tag } from "lucide-react";
import { useState } from "react";

export function Categories() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
            <ItemTitle>{Number(0).toString()}</ItemTitle>

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
            <ItemTitle>{Number(0).toString()}</ItemTitle>

            <ItemDescription className="uppercase">
              total de transações
            </ItemDescription>
          </ItemContent>
        </Item>

        <Item variant="muted" className="w-full">
          <ItemMedia variant="default">
            <ArrowUpDown className="text-purple-base" />
          </ItemMedia>

          <ItemContent>
            <ItemTitle>Alguma</ItemTitle>

            <ItemDescription className="uppercase">
              categoria mais utilizada
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(17.75rem,1fr))] p-px overflow-auto">
        <CategoryCard />
      </div>

      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        // onCreated={() => refetch()}
      />
    </div>
  );
}
