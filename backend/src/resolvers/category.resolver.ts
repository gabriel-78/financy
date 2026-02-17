import { GqlUser } from '@/decorators/user.decorator';
import { CreateCategoryInput, UpdateCategoryInput } from '@/dtos/input/category.input';
import { IsAuth } from '@/middlewares/auth.middleware';
import { CategoryModel } from '@/models/category.model';
import { UserModel } from '@/models/user.model';
import { CategoryService } from '@/services/category.service';
import { TransactionService } from '@/services/transaction.service';
import { UserService } from '@/services/user.service';
import { User } from '@prisma/client';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private readonly categoryService = new CategoryService();
  private readonly userService = new UserService();
  private readonly transactionService = new TransactionService();

  @Query(() => CategoryModel)
  async getCategory(@Arg('id', () => String) id: string): Promise<CategoryModel> {
    return this.categoryService.findCategory(id);
  }

  @Query(() => [CategoryModel])
  async getCategoriesByCreator(@GqlUser() user: User): Promise<CategoryModel[]> {
    return this.categoryService.findCategoriesByCreator(user.id);
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data);
  }
  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id, user.id);

    return true;
  }

  @FieldResolver(() => UserModel)
  async creator(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.creatorId);
  }

  @FieldResolver(() => Number)
  async countTransactions(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.countTransactions(category.id);
  }
}
