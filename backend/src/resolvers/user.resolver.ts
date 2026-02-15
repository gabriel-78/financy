import { IsAuth } from '@/middlewares/auth.middleware';
import { UserModel } from '@/models/user.model';
import { UserService } from '@/services/user.service';
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
@UseMiddleware(IsAuth)
export class UserResolver {
  private readonly userService = new UserService();

  @Query(() => UserModel)
  async getUser(@Arg('id', () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
