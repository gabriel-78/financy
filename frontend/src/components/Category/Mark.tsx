import { CategoryMark, type CategoryIconType } from "@/types/category";
import {
  Briefcase,
  Car,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Film,
  ShoppingBasket,
  Utensils,
  PawPrint,
  Home,
  Gift,
  Dumbbell,
  GraduationCap,
  Plane,
  Receipt,
  Wallet,
} from "lucide-react";

type CategoryIconProps = {
  mark: CategoryIconType;
};

export function CategoryIcon({ mark, ...props }: CategoryIconProps) {
  switch (mark) {
    case CategoryMark.WORK:
      return <Briefcase {...props} />;

    case CategoryMark.TRANSPORT:
      return <Car {...props} />;

    case CategoryMark.HEALTH:
      return <HeartPulse {...props} />;

    case CategoryMark.SAVINGS:
      return <PiggyBank {...props} />;

    case CategoryMark.SHOPPING:
      return <ShoppingCart {...props} />;

    case CategoryMark.ENTERTAINMENT:
      return <Film {...props} />;

    case CategoryMark.GROCERIES:
      return <ShoppingBasket {...props} />;

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
      return <GraduationCap {...props} />;

    case CategoryMark.TRAVEL:
      return <Plane {...props} />;

    case CategoryMark.BILLS:
      return <Receipt {...props} />;

    case CategoryMark.GENERAL_EXPENSES:
      return <Wallet {...props} />;

    default:
      return <Wallet {...props} />;
  }
}
