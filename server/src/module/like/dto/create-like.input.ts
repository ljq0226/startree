import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateLikeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
