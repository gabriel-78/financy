import { registerEnumType } from 'type-graphql';
import { CategoryType, TransactionType } from '@prisma/client';

registerEnumType(CategoryType, {
  name: 'CategoryType',
});

registerEnumType(TransactionType, {
  name: 'TransactionType',
});
