import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Follow {
  @Field()
  id: number

  @Field()
  name: string

  @Field()
  followedName: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
