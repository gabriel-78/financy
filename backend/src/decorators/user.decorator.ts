import { GraphqlContext } from '@/graphql/contexts';
import { User } from '@prisma/client';
import { createParameterDecorator, ResolverData } from 'type-graphql';
import { prismaClient } from '../../prisma/prisma';

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | undefined> => {
      if (!context || !context.user) {
        return undefined;
      }

      try {
        const user = await prismaClient.user.findUnique({
          where: { id: context.user },
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
  );
};
