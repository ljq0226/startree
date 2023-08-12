import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Star {
  @Field()
  id: number

  @Field(() => User)
  user: User

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
