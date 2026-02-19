import { CategoryMark, type CategoryIconType } from "@/types/category";
import {
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Utensils,
  PawPrint,
  Home,
  Gift,
  Dumbbell,
  Wallet,
  BriefcaseBusiness,
  CarFront,
  Ticket,
  ToolCase,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
} from "lucide-react";

type CategoryIconProps = {
  mark: CategoryIconType;
};

export const CategoryIconLabels: Record<CategoryIconType, string> = {
  [CategoryMark.WORK]: "Trabalho",
  [CategoryMark.TRANSPORT]: "Transporte",
  [CategoryMark.HEALTH]: "Saúde",
  [CategoryMark.SAVINGS]: "Poupança",
  [CategoryMark.SHOPPING]: "Compras",
  [CategoryMark.ENTERTAINMENT]: "Entretenimento",
  [CategoryMark.GROCERIES]: "Supermercado",
  [CategoryMark.FOOD]: "Alimentação",
  [CategoryMark.PET]: "Animal de estimação",
  [CategoryMark.HOUSING]: "Moradia",
  [CategoryMark.GIFTS]: "Presentes",
  [CategoryMark.FITNESS]: "Academia",
  [CategoryMark.EDUCATION]: "Educação",
  [CategoryMark.TRAVEL]: "Viagem",
  [CategoryMark.BILLS]: "Contas",
  [CategoryMark.GENERAL_EXPENSES]: "Outros",
} as const;

export function CategoryIcon({ mark, ...props }: CategoryIconProps) {
  switch (mark) {
    case CategoryMark.WORK:
      return <BriefcaseBusiness {...props} />;

    case CategoryMark.TRANSPORT:
      return <CarFront {...props} />;

    case CategoryMark.HEALTH:
      return <HeartPulse {...props} />;

    case CategoryMark.SAVINGS:
      return <PiggyBank {...props} />;

    case CategoryMark.SHOPPING:
      return <ShoppingCart {...props} />;

    case CategoryMark.ENTERTAINMENT:
      return <Ticket {...props} />;

    case CategoryMark.GROCERIES:
      return <ToolCase {...props} />;

    case CategoryMark.FOOD:
      return <Utensils {...props} />;

    case CategoryMark.PET:
      return <PawPrint {...props} />;

    case CategoryMark.HOUSING:
      return <Home {...props} />;

    case CategoryMark.GIFTS:
      return <Gift {...props} />;

    case CategoryMark.FITNESS:
      return <Dumbbell {...props} />;

    case CategoryMark.EDUCATION:
      return <BookOpen {...props} />;

    case CategoryMark.TRAVEL:
      return <BaggageClaim {...props} />;

    case CategoryMark.BILLS:
      return <Mailbox {...props} />;

    case CategoryMark.GENERAL_EXPENSES:
      return <ReceiptText {...props} />;

    default:
      return <Wallet {...props} />;
  }
}
