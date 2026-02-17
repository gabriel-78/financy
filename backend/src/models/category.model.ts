import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import { UserModel } from './user.model';
import { CategoryType } from '@prisma/client';

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => CategoryType)
  type!: CategoryType;

  @Field(() => GraphQLISODateTime)
  createdAt!: string;

  @Field(() => GraphQLISODateTime)
  updatedAt!: string;

  @Field(() => String)
  creatorId!: string;

  @Field(() => UserModel, { nullable: true })
  creator?: UserModel;

  @Field(() => Number, { nullable: true })
  countTransactions?: number;
}
