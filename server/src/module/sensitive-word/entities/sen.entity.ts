import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Sensi {
  @Field()
  id: number

  @Field()
  word: string
}
