import { CategoryIcon } from "@/components/Category/Mark";
import { CategoryTag } from "@/components/Category/Tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { currencyFormatter } from "@/utils/formatters/currency";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const moneyFormatter = currencyFormatter();

export function Dashboards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-6 p-12 gap-6 w-full overflow-hidden">
      <Item variant="muted" className="w-full col-span-2">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <Wallet className="text-purple-base" />
          </ItemMedia>

          <ItemDescription className="uppercase">Saldo total</ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>{moneyFormatter.format(0)}</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="muted" className="w-full col-span-2">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <ArrowUpCircle className="text-brand-base" />
          </ItemMedia>

          <ItemDescription className="uppercase">
            Receitas do mês
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>{moneyFormatter.format(0)}</ItemTitle>
        </ItemContent>
      </Item>

      <Item variant="muted" className="w-full col-span-2">
        <ItemHeader className="gap-3 items-center justify-start">
          <ItemMedia variant="default">
            <ArrowDownCircle className="text-red-base" />
          </ItemMedia>

          <ItemDescription className="uppercase">
            Despesas do mês
          </ItemDescription>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>{moneyFormatter.format(0)}</ItemTitle>
        </ItemContent>
      </Item>

      <div className="flex grow overflow-auto col-span-4 p-px">
        <Card className="max-h-full h-fit overflow-auto">
          <CardHeader className="flex flex-row items-center gap-4 border-b sticky bg-background border-solid border-b-gray-200 justify-between top-0">
            <CardTitle>Transações recentes</CardTitle>

            <Button type="button" onClick={() => navigate("/transactions")}>
              Ver todas
              <ChevronRight />
            </Button>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-5 pt-6 overflow-auto">
            {Array.from({ length: 53 }, (_, idx) => idx).map((x) => (
              <div
                className="grid grid-cols-[1fr_minmax(8rem,10rem)_minmax(5rem,8rem)_] w-full min-h-fit overflow-hidden items-center justify-between gap-3"
                key={x}
              >
                <div className="flex grow overflow-hidden items-center justify-start gap-4">
                  <CategoryTag
                    color={"#f00f40"}
                    className="[&>svg]:size-4 p-3 rounded-[8px] shrink-0"
                  >
                    <CategoryIcon mark={"GENERAL_EXPENSES"} />
                  </CategoryTag>

                  <span className="truncate">
                    teste Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quia fugiat voluptatum beatae exercitationem et rem ex
                    eos possimus vero blanditiis assumenda harum, aspernatur
                    consequatur, doloribus repudiandae natus minima libero
                    labore.
                  </span>
                </div>

                <div className="flex grow items-center justify-center">
                  <CategoryTag color="#f000f0">
                    <span className="truncate">{`x itens`}</span>
                  </CategoryTag>
                </div>

                <div className="flex grow items-center justify-end">
                  <span className="truncate">{moneyFormatter.format(x)}</span>

                  <ArrowUpCircle className="text-brand-base" />

                  <ArrowDownCircle className="text-red-base" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex grow overflow-auto col-span-2 p-px">
        <Card className="max-h-full h-fit overflow-auto">
          <CardHeader className="flex flex-row items-center gap-4 border-b sticky bg-background border-solid border-b-gray-200 justify-between top-0">
            <CardTitle>Categorias</CardTitle>

            <Button type="button" onClick={() => navigate("/categories")}>
              Gerenciar
              <ChevronRight />
            </Button>
          </CardHeader>

          <CardContent className="flex h-full flex-col gap-5 pt-6 overflow-auto">
            {Array.from({ length: 53 }, (_, idx) => idx).map((x) => (
              <div
                className="flex w-full min-h-fit overflow-hidden items-center justify-between gap-3"
                key={x}
              >
                <CategoryTag color="#f000f0">
                  <span className="truncate">
                    teste Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quia fugiat voluptatum beatae exercitationem et rem ex
                    eos possimus vero blanditiis assumenda harum, aspernatur
                    consequatur, doloribus repudiandae natus minima libero
                    labore.
                  </span>
                </CategoryTag>

                <div className="flex min-w-fit items-center justify-end gap-3 shrink-0">
                  <span>{`x itens`}</span>

                  <span>{moneyFormatter.format(x)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
