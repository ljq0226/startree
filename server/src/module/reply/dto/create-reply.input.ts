import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReplyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
