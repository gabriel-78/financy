import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;
}
