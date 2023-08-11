import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/module/post/entities/post.entity'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Reply {
  @Field()
  id: number

  @Field()
  userName: string

  @Field(() => User)
  user: User

  @Field(() => [Post])
  tags: Post[]

  @Field()
  postId: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
