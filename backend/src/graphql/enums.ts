import { registerEnumType } from 'type-graphql';
import { CategoryType } from '@prisma/client';

registerEnumType(CategoryType, {
  name: 'CategoryType',
});
