import type { Category } from "./category";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

// export interface CreateCategoryInput {
//   color: string;
//   description?: string;
//   name: string;
//   type: CategoryIconType;
// }

// export interface UpdateCategoryInput {
//   id: string;
//   color: string;
//   description?: string;
//   name: string;
//   type: CategoryIconType;
// }

export interface ListTransactionInput {
  description?: string;
  type?: TransactionType[];
  categories?: string[];
  period?: { start: string; end: string };
}

export interface Transaction {
  amount: number;
  category?: Category;
  categoryId: string;
  createdAt?: string;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
  updatedAt?: string;
  userId: string;
}
