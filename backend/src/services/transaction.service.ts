import { prismaClient } from '../../prisma/prisma';
import { CreateTransactionInput, UpdateTransactionInput } from '@/dtos/input/transaction.input';

export class TransactionService {
  async findTransaction(id: string) {
    const existingTransaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error('Transaction with this id does not exist');
    }

    return existingTransaction;
  }

  async findTransactionsByUser(userId: string) {
    return prismaClient.transaction.findMany({
      where: { userId },
    });
  }

  async createTransaction(data: CreateTransactionInput, userId: string) {
    const existingCategory = await prismaClient.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!existingCategory) {
      throw new Error('Category with this id does not exist');
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        ...data,
        userId: userId,
      },
    });

    if (!transaction) {
      throw new Error('Transaction with this id does not exist');
    }

    return transaction;
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Transaction with this id does not exist');
    }

    const existingCategory = await prismaClient.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!existingCategory) {
      throw new Error('Category with this id does not exist');
    }

    return prismaClient.transaction.update({
      where: { id },
      data: {
        amount: data.amount,
        categoryId: data.categoryId,
        date: data.date,
        description: data.description,
        type: data.type,
      },
    });
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Transaction with this id does not exist');
    }

    if (transaction.userId !== userId) {
      throw new Error('You are not authorized to delete this transaction');
    }

    return prismaClient.transaction.delete({
      where: { id },
    });
  }
}
