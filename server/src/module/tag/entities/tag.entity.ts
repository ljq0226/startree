import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
