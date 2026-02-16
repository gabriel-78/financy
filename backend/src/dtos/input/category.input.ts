import { CategoryType } from '@prisma/client';
import { Field, InputType, registerEnumType } from 'type-graphql';

registerEnumType(CategoryType, {
  name: 'CategoryType',
});

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => CategoryType)
  type!: CategoryType;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => CategoryType)
  type!: CategoryType;
}

@InputType()
export class DeleteCategoryInput {
  @Field(() => String)
  id!: string;
}
