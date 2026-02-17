import { UpdateUserInput } from '@/dtos/input/user.input';
import { IsAuth } from '@/middlewares/auth.middleware';
import { UserModel } from '@/models/user.model';
import { UserService } from '@/services/user.service';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
@UseMiddleware(IsAuth)
export class UserResolver {
  private readonly userService = new UserService();

  @Query(() => UserModel)
  async getUser(@Arg('id', () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
  ): Promise<UserModel> {
    return this.userService.updateUser(id, data);
  }
}
