import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Reply {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
