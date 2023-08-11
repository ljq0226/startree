import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Follow {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
