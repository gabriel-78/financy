import { RegisterInput } from '@/dtos/input/auth.input';
import { prismaClient } from '../../prisma/prisma';
import { hashPassword } from '@/utils/hash';
import { signJwt } from '@/utils/jwt';
import { User } from '@prisma/client';

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return this.generateTokens(user);
  }

  generateTokens(user: User): { token: string; refreshToken: string; user: User } {
    const token = signJwt({ id: user.id, email: user.email }, '15m');

    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');

    return { token, refreshToken, user };
  }
}
