import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Star {
  @Field()
  id: number

  @Field()
  userName: string

  @Field()
  postId: number

  @Field()
  replyId: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
