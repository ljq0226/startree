import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Star {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
