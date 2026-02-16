import { GqlUser } from '@/decorators/user.decorator';
import { CreateTransactionInput, UpdateTransactionInput } from '@/dtos/input/transaction.input';
import { IsAuth } from '@/middlewares/auth.middleware';
import { CategoryModel } from '@/models/category.model';
import { TransactionModel } from '@/models/transaction.model';
import { UserModel } from '@/models/user.model';
import { CategoryService } from '@/services/category.service';
import { TransactionService } from '@/services/transaction.service';
import { UserService } from '@/services/user.service';
import { User } from '@prisma/client';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private readonly categoryService = new CategoryService();
  private readonly userService = new UserService();
  private readonly transactionService = new TransactionService();

  @Query(() => TransactionModel)
  async getTransaction(@Arg('id', () => String) id: string): Promise<TransactionModel> {
    return this.transactionService.findTransaction(id);
  }

  @Query(() => [TransactionModel])
  async getTransactionsByUser(@GqlUser() user: User): Promise<TransactionModel[]> {
    return this.transactionService.findTransactionsByUser(user.id);
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User,
  ): Promise<CreateTransactionInput> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data);
  }
  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id);

    return true;
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
    return this.categoryService.findCategory(transaction.categoryId);
  }
}
