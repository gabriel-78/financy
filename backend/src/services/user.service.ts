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
}
