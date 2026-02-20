import { GraphqlContext } from '@/graphql/contexts';
import { GraphQLError } from 'graphql/error';
import { MiddlewareFn } from 'type-graphql';

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
  if (!context.user) {
    throw new GraphQLError('User not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  return next();
};
