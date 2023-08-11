import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateForwardInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
