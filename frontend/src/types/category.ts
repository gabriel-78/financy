import type { User } from ".";

export enum CategoryMark {
  WORK = "WORK",
  TRANSPORT = "TRANSPORT",
  HEALTH = "HEALTH",
  SAVINGS = "SAVINGS",
  SHOPPING = "SHOPPING",
  ENTERTAINMENT = "ENTERTAINMENT",
  GROCERIES = "GROCERIES",
  FOOD = "FOOD",
  PET = "PET",
  HOUSING = "HOUSING",
  GIFTS = "GIFTS",
  FITNESS = "FITNESS",
  EDUCATION = "EDUCATION",
  TRAVEL = "TRAVEL",
  BILLS = "BILLS",
  GENERAL_EXPENSES = "GENERAL_EXPENSES",
}

export const CategoryColor = {
  ["#16A34A"]: "#16A34A",
  ["#2563EB"]: "#2563EB",
  ["#9333EA"]: "#9333EA",
  ["#DB2777"]: "#DB2777",
  ["#DC2626"]: "#DC2626",
  ["#EA580C"]: "#EA580C",
  ["#CA8A04"]: "#CA8A04",
} as const;

export type CategoryIconType = keyof typeof CategoryMark;

export interface CreateCategoryInput {
  color: string;
  description?: string;
  name: string;
  type: CategoryIconType;
}

export interface Category {
  color: string;
  createdAt?: string;
  creator: User;
  creatorId: string;
  description?: string;
  id: string;
  name: string;
  type: CategoryIconType;
  updatedAt?: string;
}
