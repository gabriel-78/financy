import { TransactionType } from '@prisma/client';
import { Field, InputType, registerEnumType } from 'type-graphql';

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class DeleteTransactionInput {
  @Field(() => String)
  id!: string;
}
