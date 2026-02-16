import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import { UserModel } from './user.model';
import { TransactionType } from '@prisma/client';
import { CategoryModel } from './category.model';

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => Number)
  amount!: number;

  @Field(() => GraphQLISODateTime)
  date!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: string;

  @Field(() => GraphQLISODateTime)
  updatedAt!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;
}
