import type { Category } from "./category";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface CreateTransactionInput {
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
  categoryId: string;
}

export interface UpdateTransactionInput {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
  categoryId: string;
}

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
