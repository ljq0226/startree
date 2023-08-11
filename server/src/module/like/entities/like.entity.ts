import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Like {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
