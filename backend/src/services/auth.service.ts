import { LoginInput, RegisterInput } from '@/dtos/input/auth.input';
import { prismaClient } from '../../prisma/prisma';
import { comparePassword, hashPassword } from '@/utils/hash';
import { signJwt } from '@/utils/jwt';
import { User } from '@prisma/client';
import { GraphQLError } from 'graphql/error';

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

  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser) {
      throw new GraphQLError('User with this email does not exist', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      });
    }

    const isPasswordValid = await comparePassword(data.password, existingUser.password);

    if (!isPasswordValid) {
      throw new GraphQLError('Invalid password', {
        extensions: {
          code: 'INVALID_PASSWORD',
        },
      });
    }

    return this.generateTokens(existingUser);
  }

  generateTokens(user: User): { token: string; refreshToken: string; user: User } {
    const token = signJwt({ id: user.id, email: user.email }, '55m');

    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');

    return { token, refreshToken, user };
  }
}
