import { UpdateUserInput } from '@/dtos/input/user.input';
import { prismaClient } from '../../prisma/prisma';

export class UserService {
  async findUser(id: string) {
    const existingUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error('User with this id does not exist');
    }

    return existingUser;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User with this id does not exist');
    }

    return prismaClient.user.update({
      where: { id },
      data: {
        ...user,
        name: data.name,
      },
    });
  }
}
