import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
