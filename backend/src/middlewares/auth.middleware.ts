import { GraphqlContext } from '@/graphql/contexts';
import { MiddlewareFn } from 'type-graphql';

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
  if (!context.user) {
    throw new Error('User not authenticated');
  }

  return next();
};
