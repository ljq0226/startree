import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReportInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
