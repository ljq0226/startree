import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Like {
  @Field()
  id: number

  @Field()
  userName: string

  @Field({ nullable: true })
  postId: number

  @Field({ nullable: true })
  replyId: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
