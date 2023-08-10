import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
